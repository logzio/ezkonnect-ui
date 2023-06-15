import React, { FunctionComponent, useRef } from 'react';
import styled from 'styled-components';
import { positionTooltip } from '../../utils/positionTooltip';
interface IProps {
    children: React.ReactNode;
    message: string;
}

const InfoWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 5px;
    &:hover .info-message {
        display: flex;
        background: #1a4251;
    }
    & > svg {
        event-pointer: none;
    }
`;
const MessageWrapperText = styled.span`
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
    width: 100%;
`;
const Info: FunctionComponent<IProps> = ({ children, message }) => {
    const ref = useRef(null);

    return (
        <InfoWrapper
            ref={ref}
            onMouseEnter={() => positionTooltip(ref.current, 60)}
            data-testid='info'
        >
            {children}
            <MessageWrapperText
                data-testid='info-message'
                className='info-message'
            >
                {message}
            </MessageWrapperText>
        </InfoWrapper>
    );
};

export default Info;
