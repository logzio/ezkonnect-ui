import React, { FunctionComponent, useContext } from 'react';
import Table from '../../components/Table';
import Tab from '../../components/Tab';
import { PodRows } from '../PodRows';
import { PodContext } from '../../context/pods/podContext';
import Tooltip from '../../components/Tooltip';

interface IProps {
    onClick?: () => void;
}

const TabBodyLogs: FunctionComponent<IProps> = () => {
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
                        <Tooltip message='The cluster containing the chosen pod.' />
                    </Table.TableHeaderCell>
                    <Table.TableHeaderCell>
                        Log Type{' '}
                        <Tooltip message='Type of selected pod. You can review or edit unassociated pods.' />
                    </Table.TableHeaderCell>
                    <Table.TableHeaderCell> </Table.TableHeaderCell>
                </Table.TableHeader>
                <Table.TableBody>
                    {podsState.logsPods && (
                        <PodRows podsData={podsState.logsPods} type='logs' />
                    )}
                </Table.TableBody>
            </Table.TableWrapper>
        </Tab>
    );
};

export default TabBodyLogs;
