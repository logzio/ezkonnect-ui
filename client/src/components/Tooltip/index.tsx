import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ReactComponent as TooltipIcon } from '../../assets/icons/tooltip.svg';

interface IProps {
    message: string;
    onClick?: () => void;
}
const TooltipWrapperText = styled.span`
    border-radius: 2px;
    font-size: 11px;
    line-height: 15px;
    display: flex;
    align-items: center;
    color: #ffffff;
    padding: 3px 6px;
    position: absolute;
    z-index: 1000;
    font-weight: 400;
    display: none;
    max-width: 180px;
    top: 20px;
`;
const TooltipWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 5px;
    &:hover .tooltip-message {
        display: flex;
        background: #1a4251;
    }
`;
const Tooltip: FunctionComponent<IProps> = ({ message }) => {
    return (
        <TooltipWrapper data-testid='tooltip'>
            <TooltipIcon data-testid='icon' />
            <TooltipWrapperText
                data-testid='tooltip-message'
                className='tooltip-message'
            >
                {message}
            </TooltipWrapperText>
        </TooltipWrapper>
    );
};

export default Tooltip;
