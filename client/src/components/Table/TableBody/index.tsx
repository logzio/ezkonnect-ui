import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const TableBodyWrapper = styled.div`
    border-width: 0px 1px;
    border-style: solid;
    border-color: rgb(216, 216, 216);
`;

const TableBody: FunctionComponent<IProps> = ({ children }) => {
    return <TableBodyWrapper>{children}</TableBodyWrapper>;
};

export default TableBody;
