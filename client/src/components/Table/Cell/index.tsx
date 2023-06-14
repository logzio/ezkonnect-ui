import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IProps {
    children: React.ReactNode;
    display?: string;
    width?: string;
    color?: string;
    flexDirection?: string;
    onClick?: () => void;
}
interface ITableCellStyledProps {
    width?: string;
    color?: string;
    display?: string;
    flexDirection?: string;
}

const CellWrapper = styled.div<ITableCellStyledProps>`
    padding: 32px;
    background-color: #fff;
    flex: 1 ${({ width }) => width || 'auto'};
    position: relative;
    display: ${({ display }) => display || 'flex'};
    align-items: center;
    color: ${({ color }) => color || '#464646'};
    flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
`;
const Cell: FunctionComponent<IProps> = ({ children, ...props }) => {
    return <CellWrapper {...props}>{children}</CellWrapper>;
};

export default Cell;
