import React, { FunctionComponent, useState, useContext } from 'react';
import styled from 'styled-components';
import Table from '../../components/Table';
import Tag from '../../components/Tag';
import Text from '../../components/Text';
import Select from '../../components/Select';
import InputSelect from '../../components/InputSelect';
import RowContoller from '../RowController';
import LanguageLogo from '../LanguageLogo';
import { IPod } from '../../utils/interfaces';
import { displayNamespaces } from '../../utils/parsePodData';
import LogsButtonController from '../LogsButtonController';
import {
    converLanguageName,
    convertArrayToSelectOption,
} from '../../utils/covert';
import { LogsContext } from '../../context/logsContext/logsContext';
import { TracesContext } from '../../context/tracesContext/tracesContext';
import { ReactComponent as IconArrow } from '../../assets/icons/chevron-right-icon.svg';
import { ReactComponent as IconWarning } from '../../assets/icons/warning.svg';

import Info from '../../components/Info';

const IconArrowWrapper = styled(IconArrow)`
    transform: rotate(270deg);
    transition: 0.3s all ease-in-out;
    margin-right: 10px;
    cursor: pointer;
    &.active {
        transform: rotate(360deg);
    }
`;
export interface IPodsItem {
    name: string;
    namespace: string;
    log_type: string;
}

export interface IPodsData {
    _id: string;
    engine: string;
    pods: number;
    namespace: string;
    all_log_types: string[];
    podsItem: IPodsItem[];
}

interface IExpendList {
    [key: string]: boolean;
}

interface IProps {
    podsData: IPodsData[];
    type: string;
}

export const PodRows: FunctionComponent<IProps> = ({ podsData, type }) => {
    const [itemExpend, setItemExpend] = useState<IExpendList>({});
    const { addServiceNameToTheList, updateServiceNameBulk } =
        useContext(TracesContext);
    const {
        logList,
        updateLogTypePod,
        updateLogTypeBulkToList,
        addLogTypeToTheList,
    } = useContext(LogsContext);
    const onChangeSelectBulk = async (
        applicationName: string,
        log_type: string,
    ) => {
        await updateLogTypeBulkToList(applicationName, log_type);
    };

    const onChangeSelectInput = (e: React.FormEvent) => {
        addLogTypeToTheList(e.target[0].value);
    };

    const onClickRowHandler = (e: React.MouseEvent, _id: string) => {
        const target = e.target as Element;

        const classArray = target.classList.value.split(' ');
        const idx = classArray.findIndex((cls: string) => cls === 'active');
        if (idx > 0) {
            target.classList.remove('active');
        } else {
            target.classList.add('active');
        }
        if (itemExpend[_id]) {
            setItemExpend((prev) => {
                return { ...prev, [_id]: false };
            });
        } else {
            setItemExpend((prev) => {
                return { ...prev, [_id]: true };
            });
        }
    };

    const renderDetectedPods = () => {
        return Object.keys(podsData).map((key: string) => {
            if (key === 'Undetected') {
                return;
            }
            return (
                <div key={`${key}`}>
                    <Table.TableRow>
                        <Table.Cell>
                            <IconArrowWrapper
                                onClick={(e) => {
                                    onClickRowHandler(e, key);
                                }}
                            />

                            <LanguageLogo identifier={key} />
                            <Text tag='p'>
                                <b>{converLanguageName(key)} </b> was detected
                                in{' '}
                                <b>
                                    {podsData[key].podsItem[0].name}{' '}
                                    {podsData[key].podsItem[0].controller_kind}{' '}
                                </b>
                            </Text>
                        </Table.Cell>
                        <Table.Cell>
                            <Text tag={'p'} classNames={'disabled'}>
                                {displayNamespaces(podsData[key].namespaces)}
                            </Text>
                        </Table.Cell>
                        <Table.Cell display='block'>
                            {type === 'logs' ? (
                                <Select
                                    options={logList}
                                    onChangeSelect={(option) => {
                                        onChangeSelectBulk(key, option);
                                    }}
                                    currentValue={
                                        podsData[key].logTypeOnSelect || key
                                    }
                                />
                            ) : (
                                <InputSelect
                                    options={convertArrayToSelectOption(
                                        podsData[key].all_service_names,
                                    )}
                                    onChangeSelect={(option) => {
                                        updateServiceNameBulk(key, option);
                                    }}
                                    currentValue={
                                        podsData[key].service_name_default ||
                                        podsData[key].all_service_names[0]
                                    }
                                    maxWidthSelect='200px'
                                    fieldDisabled={true}
                                    description='Create new Service name'
                                    placeHolder={'Service name'}
                                    onChangeValue={(e: React.FormEvent) => {
                                        addServiceNameToTheList(
                                            key,
                                            e.target[0].value,
                                        );
                                    }}
                                />
                            )}
                        </Table.Cell>
                        <Table.Cell flexDirection='row-reverse'>
                            {type === 'logs' ? (
                                <LogsButtonController
                                    type={key}
                                    podLogType={podsData[key].log_type_default}
                                    onSelectValue={
                                        podsData[key].logTypeOnSelect
                                    }
                                    isTouched={podsData[key].isTouched}
                                    dataIndifier={key}
                                />
                            ) : (
                                <>
                                    <RowContoller
                                        dataIndifier={key}
                                        type={type}
                                        isTouched={podsData[key].isTouched}
                                        status={
                                            podsData[key].podsItem[0][
                                                `${type}_instrumented`
                                            ]
                                        }
                                    />
                                    {podsData[key].podsItem[0]
                                        .opentelemetry_preconfigured ? (
                                        <Info message='Opentelemetry instrumentation resources were detected in this application environment.'>
                                            <IconWarning />
                                        </Info>
                                    ) : (
                                        ''
                                    )}
                                </>
                            )}
                        </Table.Cell>
                    </Table.TableRow>
                    {podsData[key].podsItem.length > 0
                        ? podsData[key].podsItem.map((pod: IPod) => (
                              <Table.TableRow
                                  key={`${pod.name}_${pod.namespace}`}
                                  classNames={
                                      itemExpend[key]
                                          ? 'sub-item active'
                                          : 'sub-item'
                                  }
                              >
                                  <Table.Cell>
                                      <Text tag='p' classNames='tableElement'>
                                          {pod.name}
                                      </Text>
                                  </Table.Cell>
                                  <Table.Cell>
                                      <Text tag={'p'} classNames={'disabled'}>
                                          {pod.namespace}
                                      </Text>
                                  </Table.Cell>
                                  <Table.Cell display='block'>
                                      {type === 'logs' ? (
                                          pod.log_type ? (
                                              <Tag>{pod.log_type} </Tag>
                                          ) : (
                                              ''
                                          )
                                      ) : (
                                          <Tag>
                                              {pod.container_name
                                                  ? pod.container_name
                                                  : 'not-assigned'}
                                          </Tag>
                                      )}
                                  </Table.Cell>
                                  <Table.Cell> </Table.Cell>
                              </Table.TableRow>
                          ))
                        : ''}
                </div>
            );
        });
    };

    const renderUndetectedPods = () => {
        return (
            <div key={`${type}_Undetected`}>
                <Table.TableRow>
                    <Table.Cell>
                        <IconArrowWrapper
                            onClick={(e) => {
                                onClickRowHandler(e, 'Undetected');
                            }}
                        />

                        <Text tag='p'>
                            <b>
                                {type === 'logs' ? (
                                    <>
                                        Applications with undetected log types (
                                        {podsData['Undetected'].pods})
                                    </>
                                ) : (
                                    <>
                                        Applications with non-supported
                                        languages ({podsData['Undetected'].pods}
                                        )
                                    </>
                                )}
                            </b>
                        </Text>
                    </Table.Cell>
                    <Table.Cell>{podsData['Undetected'].namespace}</Table.Cell>
                </Table.TableRow>

                {podsData['Undetected'].podsItem.length > 0
                    ? podsData['Undetected'].podsItem.map((pod: IPod) => (
                          <Table.TableRow
                              key={`${pod.name}_${pod.namespace}`}
                              classNames={
                                  itemExpend['Undetected']
                                      ? 'sub-item active'
                                      : 'sub-item'
                              }
                          >
                              <Table.Cell>
                                  <Text tag='p' classNames='tableElement'>
                                      {pod.name}
                                  </Text>
                              </Table.Cell>
                              <Table.Cell>
                                  <Text tag={'p'} classNames={'disabled'}>
                                      {pod.namespace}
                                  </Text>
                              </Table.Cell>
                              <Table.Cell display='block'>
                                  {type === 'logs' ? (
                                      <InputSelect
                                          options={logList}
                                          onChangeValue={(e) => {
                                              onChangeSelectInput(e);
                                              updateLogTypePod(
                                                  pod.name,
                                                  e.target[0].value,
                                              );
                                          }}
                                          description='Create new log type'
                                          onChangeSelect={(log_type) => {
                                              updateLogTypePod(
                                                  pod.name,
                                                  log_type,
                                              );
                                          }}
                                          placeHolder={'log_type'}
                                          currentValue={`${
                                              pod.log_type ? pod.log_type : ''
                                          }`}
                                      />
                                  ) : pod.container_name ? (
                                      <Tag>{pod.container_name}</Tag>
                                  ) : (
                                      ''
                                  )}
                              </Table.Cell>
                              <Table.Cell flexDirection='row-reverse'>
                                  {type === 'logs' ? (
                                      <LogsButtonController
                                          type='Undetected'
                                          podName={pod.name}
                                          podLogType={
                                              pod.log_type ? pod.log_type : ''
                                          }
                                          isTouched={pod.isTouched}
                                      />
                                  ) : (
                                      ''
                                  )}
                              </Table.Cell>
                          </Table.TableRow>
                      ))
                    : ''}
            </div>
        );
    };

    return (
        <>
            {renderDetectedPods()}
            {renderUndetectedPods()}
        </>
    );
};
