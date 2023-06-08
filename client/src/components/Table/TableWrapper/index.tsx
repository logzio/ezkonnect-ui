import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export const TableContext = React.createContext({});

interface IProps {
    children: React.ReactNode;
    columnWidths: string[];
    onClick?: () => void;
}

const DivTableWrapper = styled.div`
    border-width: 0px 1px;
    border-style: solid;
    border-color: rgb(216, 216, 216);
`;

const TableWrapper: FunctionComponent<IProps> = ({
    children,
    columnWidths,
}) => {
    return (
        <TableContext.Provider
            value={{
                columnWidths,
            }}
        >
            <DivTableWrapper>{children}</DivTableWrapper>
        </TableContext.Provider>
    );
};

export default TableWrapper;
