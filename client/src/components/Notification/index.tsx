import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import CloseIconSvg from '../../assets/icons/close-icon.svg';

enum NotificationStatus {
    'Success',
    'Info',
    'Warning',
    'Danger',
}

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
const CloseIcon = styled.svg`
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
            <NotificationBody type={type}>
                <NotificationContent>
                    <IconWrapper></IconWrapper>
                    <NotificationMessage>
                        <NotificationMessageParagraph>
                            {message}
                        </NotificationMessageParagraph>
                    </NotificationMessage>
                </NotificationContent>
            </NotificationBody>
            <CloseIcon
                onClick={() => {
                    closeButtonHandler(idx);
                }}
                width='10'
                height='10'
                viewBox='0 0 10 10'
            >
                <path
                    d='M5.90234 4.75L9.3125 1.33984C9.4375 1.21484 9.5 1.06641 9.5 0.894531C9.5 0.722656 9.4375 0.570313 9.3125 0.4375C9.17969 0.3125 9.02734 0.25 8.85547 0.25C8.68359 0.25 8.53516 0.3125 8.41016 0.4375L5 3.84766L1.58984 0.4375C1.46484 0.3125 1.31641 0.25 1.14453 0.25C0.972656 0.25 0.820312 0.3125 0.6875 0.4375C0.5625 0.570313 0.5 0.722656 0.5 0.894531C0.5 1.06641 0.5625 1.21484 0.6875 1.33984L4.09766 4.75L0.6875 8.16016C0.5625 8.28516 0.5 8.43359 0.5 8.60547C0.5 8.77734 0.5625 8.92969 0.6875 9.0625C0.757812 9.125 0.828125 9.17188 0.898438 9.20312C0.96875 9.23438 1.05078 9.25 1.14453 9.25C1.23828 9.25 1.32031 9.23438 1.39062 9.20312C1.46094 9.17188 1.52734 9.125 1.58984 9.0625L5 5.65234L8.41016 9.0625C8.47266 9.125 8.54688 9.17188 8.63281 9.20312C8.71875 9.23438 8.79297 9.25 8.85547 9.25C8.91797 9.25 8.99219 9.23438 9.07812 9.20312C9.16406 9.17188 9.24219 9.125 9.3125 9.0625C9.4375 8.92969 9.5 8.77734 9.5 8.60547C9.5 8.43359 9.4375 8.28516 9.3125 8.16016L5.90234 4.75Z'
                    fill='#7A7A7A'
                />
            </CloseIcon>
        </NotificationWrapper>
    );
};

export default Notification;
