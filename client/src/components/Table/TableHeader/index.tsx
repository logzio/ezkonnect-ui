import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { TableContext } from '../TableWrapper';

interface IProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const TableHeaderWrapper = styled.div`
    background: rgba(216, 216, 216, 0.2);
    border: 1px solid rgb(216, 216, 216);
    -webkit-box-align: stretch;
    align-items: stretch;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: stretch;
    align-items: stretch;
    padding: 0px;

    .cell:last-child {
        border: none;
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
const TableHeader: FunctionComponent<IProps> = ({ children }) => {
    return (
        <TableHeaderWrapper>
            <TableContext.Consumer>
                {({ columnWidths }: any) =>
                    childrenWithSize(children, columnWidths)
                }
            </TableContext.Consumer>
        </TableHeaderWrapper>
    );
};

export default TableHeader;
