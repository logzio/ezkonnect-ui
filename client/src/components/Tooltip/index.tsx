import React, { FunctionComponent, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as TooltipIcon } from '../../assets/icons/tooltip.svg';
import { positionTooltip } from '../../utils/positionTooltip';

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
    background: #1a4251;
`;
const TooltipWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 5px;

    &:hover .tooltip-message {
        display: flex;
    }
`;

const Tooltip: FunctionComponent<IProps> = ({ message }) => {
    const ref = useRef(null);

    return (
        <TooltipWrapper
            ref={ref}
            onMouseEnter={() => positionTooltip(ref.current!)}
            data-testid='tooltip'
        >
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
