import React, { FunctionComponent, useContext } from 'react';
import Table from '../../components/Table';
import Tab from '../../components/Tab';
import { PodContext } from '../../context/pods/podContext';
import { PodRows } from '../PodRows';
import Tooltip from '../../components/Tooltip';

interface IProps {
    onClick?: () => void;
}

const TabBodyTraces: FunctionComponent<IProps> = () => {
    const { podsState } = useContext(PodContext);

    return (
        <Tab>
            <Table.TableWrapper
                columnWidths={['170px', '80px', '80px', '170px']}
            >
                <Table.TableHeader>
                    <Table.TableHeaderCell>Pods</Table.TableHeaderCell>
                    <Table.TableHeaderCell>
                        Namespace{' '}
                        <Tooltip message='The namespace containing the chosen app.' />
                    </Table.TableHeaderCell>
                    <Table.TableHeaderCell>
                        Service name{' '}
                        <Tooltip message='The service associated with the application' />
                    </Table.TableHeaderCell>
                    <Table.TableHeaderCell> </Table.TableHeaderCell>
                </Table.TableHeader>
                <Table.TableBody>
                    {podsState.tracesPods && (
                        <PodRows
                            podsData={podsState.tracesPods}
                            type='traces'
                        />
                    )}
                </Table.TableBody>
            </Table.TableWrapper>
        </Tab>
    );
};

export default TabBodyTraces;
