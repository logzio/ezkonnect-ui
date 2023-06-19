import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { TableContext } from '../TableWrapper';

interface IProps {
    children: React.ReactNode;
    classNames?: string;
}

const TableRowWrapper = styled.div`
    display: flex;
    border-bottom: 1px solid rgb(216, 216, 216);
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: stretch;
    align-items: stretch;
    padding: 0px;
    background-color: #fff;
    &.sub-item {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
        border: 0px;
    }
    &.active {
        max-height: 83px;
        overflow: visible;
        border-bottom: 1px solid rgb(216, 216, 216);

        transition: 0.3s all ease-in-out;
    }
`;
const childrenWithSize = (
    children: React.ReactNode,
    columnWidths: string[],
) => {
    if (!columnWidths) return children;

    return React.Children.map(children, (child, index) =>
        React.cloneElement(child as any, { width: columnWidths[index] }),
    );
};
const TableRow: FunctionComponent<IProps> = ({ children, classNames }) => {
    return (
        <TableRowWrapper className={classNames ? classNames : ''}>
            <TableContext.Consumer>
                {({ columnWidths }: any) =>
                    childrenWithSize(children, columnWidths)
                }
            </TableContext.Consumer>
        </TableRowWrapper>
    );
};

export default TableRow;
