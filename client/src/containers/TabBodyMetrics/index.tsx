import React, { FunctionComponent, useContext } from 'react';
import Table from '../../components/Table';
import Tab from '../../components/Tab';
import { PodRows } from '../PodRows';
import { PodContext } from '../../context/pods/podContext';

interface IProps {
    onClick?: () => void;
}

const TabBodyMetrics: FunctionComponent<IProps> = () => {
    const { podsState } = useContext(PodContext);

    return (
        <Tab>
            <Table.TableWrapper
                columnWidths={['170px', '80px', '80px', '170px']}
            >
                <Table.TableHeader>
                    <Table.TableHeaderCell>Pods</Table.TableHeaderCell>
                    <Table.TableHeaderCell>Namespace</Table.TableHeaderCell>
                    <Table.TableHeaderCell>Type</Table.TableHeaderCell>
                    <Table.TableHeaderCell> </Table.TableHeaderCell>
                </Table.TableHeader>
                <Table.TableBody>
                    {podsState.metrcisPods && (
                        <PodRows
                            podsData={podsState.metrcisPods}
                            type='metrics'
                        />
                    )}
                </Table.TableBody>
            </Table.TableWrapper>
        </Tab>
    );
};

export default TabBodyMetrics;
