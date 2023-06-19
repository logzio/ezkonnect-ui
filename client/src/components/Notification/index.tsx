import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../assets/icons/close-icon.svg';
import { NotificationStatus } from '../../utils/interfaces';

interface IProps {
    message: string;
    type: NotificationStatus;
    closeButtonHandler: (idx: number) => void;
    idx: number;
}
const NotificationWrapper = styled.div`
    right: 0px;
    top: auto;
    margin-right: 20px;
    margin-bottom: 15px;
    width: 480px;
    z-index: 2147483001;
    position: relative;
`;

interface INotificationBodyWrapper {
    type: NotificationStatus;
}

const NotificationBody = styled.div<INotificationBodyWrapper>`
    background: #ffffff;
    border: 1px solid rgba(121, 125, 130, 0.6);
    box-shadow: 0px 15px 12px rgba(0, 0, 0, 0.22),
        0px 19px 38px rgba(0, 0, 0, 0.3),
        inset 3px 0px 0px
            ${({ type }) => {
                if (type === NotificationStatus.Success) {
                    return '#1ca521';
                } else if (type === NotificationStatus.Warning) {
                    return '#F9CD7D';
                } else if (type === NotificationStatus.Info) {
                    return '#6585B6';
                } else if (type === NotificationStatus.Danger) {
                    return '#E04336';
                }
            }};
    border-radius: unset;
    padding: 25px 50px 25px 15px;
    margin: 0;
    background: #fff;
    display: block;
    width: auto;
    line-height: 1.5;
    vertical-align: middle;
    position: relative;
`;

const NotificationContent = styled.div`
    display: flex;
    box-sizing: border-box;
`;
const IconWrapper = styled.div``;
const NotificationMessage = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    -webkit-font-smoothing: antialiased;
    margin-left: 15px;
    font-family: Roboto, sans-serif;
    color: rgb(28, 30, 33);
    display: flex;
    box-sizing: border-box;
    -webkit-box-align: baseline;
    align-items: baseline;
    flex-direction: column;
    width: fit-content;
`;
const NotificationTitle = styled.div`
    display: flex;
    -webkit-box-align: baseline;
    align-items: baseline;
    font-family: Roboto, sans-serif;
    font-size: 18px;
    color: rgb(28, 30, 33);
`;
const NotificationMessageParagraph = styled.div`
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    color: rgb(0, 0, 0);
    word-break: break-word;
`;
const CloseIconWrapper = styled.div`
    right: 15px;
    top: 20px;
    line-height: 0;
    position: absolute;
    color: #000;
    cursor: pointer;
    outline: none;
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: 0.2;
    text-decoration: none;
    &:hover {
        opacity: 0.7;
    }
`;

const Notification: FunctionComponent<IProps> = ({
    message,
    type,
    closeButtonHandler,
    idx,
}) => {
    return (
        <NotificationWrapper>
            <NotificationBody role='notification-body' type={type}>
                <NotificationContent>
                    <IconWrapper></IconWrapper>
                    <NotificationMessage>
                        <NotificationMessageParagraph>
                            {message}
                        </NotificationMessageParagraph>
                    </NotificationMessage>
                </NotificationContent>
            </NotificationBody>
            <CloseIconWrapper>
                <CloseIcon
                    onClick={() => {
                        closeButtonHandler(idx);
                    }}
                />
            </CloseIconWrapper>
        </NotificationWrapper>
    );
};

export default Notification;
