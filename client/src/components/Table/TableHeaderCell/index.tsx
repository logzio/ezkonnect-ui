import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface IProps {
    children: React.ReactNode;
    onClick?: () => void;
}
interface ITableCellStyledProps {
    width?: string;
}

const TableHeaderCellWrapper = styled.div<ITableCellStyledProps>`
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    min-height: 45px;
    width: 100%;
    display: flex;
    word-break: break-word;
    border-right: 1px solid rgb(216, 216, 216);
    flex: 1 ${({ width }) => width || 'auto'};
`;
const TitleWrapper = styled.span`
    display: flex;
    padding: 0px 32px;
    min-height: 20px;
    flex: 1 1 170px;
    flex-direction: row;
    line-height: 1.3;
    word-break: break-word;
    font-weight: 500;
    color: black;
    min-width: 0px;
    font-size: 14px;
    position: relative;
`;

const TableHeaderCell: FunctionComponent<IProps> = ({ children, ...props }) => {
    return (
        <TableHeaderCellWrapper className='cell' {...props}>
            <TitleWrapper className='cell-title'>{children}</TitleWrapper>
        </TableHeaderCellWrapper>
    );
};

export default TableHeaderCell;
