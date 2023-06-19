import React, { FunctionComponent, useContext } from 'react';
import Table from '../../components/Table';
import Tab from '../../components/Tab';
import { PodRows } from '../PodRows';
import Tooltip from '../../components/Tooltip';
import { TracesContext } from '../../context/tracesContext/tracesContext';

interface IProps {
    onClick?: () => void;
}

const TabBodyTraces: FunctionComponent<IProps> = () => {
    const { tracesPods } = useContext(TracesContext);
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
                        Service name
                        <Tooltip message='The service associated with the application' />
                    </Table.TableHeaderCell>
                    <Table.TableHeaderCell> </Table.TableHeaderCell>
                </Table.TableHeader>
                <Table.TableBody>
                    {tracesPods && (
                        <PodRows podsData={tracesPods} type='traces' />
                    )}
                </Table.TableBody>
            </Table.TableWrapper>
        </Tab>
    );
};

export default TabBodyTraces;
