import React, { FunctionComponent, useContext } from 'react';
import Table from '../../components/Table';
import Tab from '../../components/Tab';
import { PodRows } from '../PodRows';
import Tooltip from '../../components/Tooltip';
import { LogsContext } from '../../context/logsContext/logsContext';

interface IProps {
    onClick?: () => void;
}

const TabBodyLogs: FunctionComponent<IProps> = () => {
    const { logsPods } = useContext(LogsContext);
    return (
        <Tab>
            <Table.TableWrapper
                columnWidths={['170px', '80px', '80px', '170px']}
            >
                <Table.TableHeader>
                    <Table.TableHeaderCell>Applications</Table.TableHeaderCell>
                    <Table.TableHeaderCell>
                        Namespace
                        <Tooltip message='The namespace containing the chosen app.' />
                    </Table.TableHeaderCell>
                    <Table.TableHeaderCell>
                        Log Type
                        <Tooltip message='The log type of selected app. You can review or edit unassociated apps.' />
                    </Table.TableHeaderCell>
                    <Table.TableHeaderCell> </Table.TableHeaderCell>
                </Table.TableHeader>
                <Table.TableBody>
                    {logsPods && <PodRows podsData={logsPods} type='logs' />}
                </Table.TableBody>
            </Table.TableWrapper>
        </Tab>
    );
};

export default TabBodyLogs;
