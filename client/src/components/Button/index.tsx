import React, { FunctionComponent, useRef } from 'react';
import { positionTooltip } from '../../utils/positionTooltip';
import styled from 'styled-components';

const ButtonYellow = styled.button`
    background: #f7c15c;
    border-radius: 3px;
    font-size: 14px;
    line-height: 130%;
    color: #002e42;
    border: 0px;
    padding: 6px 10px;
    cursor: pointer;
    height: 30px;
    display: flex;
    &:hover {
        background-color: rgb(222, 174, 83);
    }
    &:active {
        background-color: rgb(198, 154, 74);
    }
    &:disabled {
        opacity: 0.7;
        background: rgb(231, 231, 231);
        cursor: no-drop;
    }
`;
const ButtonWhite = styled.button`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    color: #002e42;
    background: #f7f7f7;
    border: 1px solid #d7d7d7;
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
    display: flex;

    &:hover {
        background-color: rgb(231, 231, 231);
    }
    &:active {
        background-color: rgb(215, 215, 215);
    }
`;
const ButtonTransparent = styled.button`
    font-weight: 500;
    font-size: 14px;
    line-height: 130%;
    border: 0;
    background-color: transparent;
    color: #6585b6;
    display: flex;

    cursor: pointer;
`;
const ButtonWrapper = styled.div`
    display: flex;
    position: relative;
    &:hover .hint-message {
        display: flex;
    }
`;
const HintMessageWrapper = styled.div`
    background: #1a4251;
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
    top: 35px;
    min-width: 180px;
`;
interface IProps {
    children: React.ReactNode;
    color: string;
    onClick: () => void;
    disabled?: boolean;
    hintMessage?: string;
}

const Button: FunctionComponent<IProps> = ({
    children,
    color,
    onClick,
    disabled,
    hintMessage,
}) => {
    const ref = useRef(null);

    const renderButton = () => {
        switch (color) {
            case 'yellow':
                return (
                    <ButtonWrapper>
                        <ButtonYellow onClick={onClick} disabled={disabled}>
                            {children}
                        </ButtonYellow>
                    </ButtonWrapper>
                );

            case 'transparent':
                return (
                    <ButtonTransparent onClick={onClick} disabled={disabled}>
                        {children}
                    </ButtonTransparent>
                );
            case 'white':
                return (
                    <ButtonWhite onClick={onClick} disabled={disabled}>
                        {children}
                    </ButtonWhite>
                );
            default:
                return (
                    <ButtonTransparent disabled={disabled}>
                        {children}
                    </ButtonTransparent>
                );
        }
    };

    return hintMessage ? (
        <ButtonWrapper
            ref={ref}
            onMouseEnter={() => positionTooltip(ref.current, 35)}
        >
            {renderButton()}
            <HintMessageWrapper
                data-testid='hint-message'
                className='hint-message'
            >
                {hintMessage}
            </HintMessageWrapper>
        </ButtonWrapper>
    ) : (
        <ButtonWrapper>{renderButton()}</ButtonWrapper>
    );
};

export default Button;
