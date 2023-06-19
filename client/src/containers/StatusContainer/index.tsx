import React, { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import Notification from '../../components/Notification';
import { NotificationContext } from '../../context/notificationsContext/notificationContext';
import { NotificationStatus } from '../../utils/interfaces';

const TabWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    right: 0;
`;
interface INotification {
    message: string;
    type: NotificationStatus;
}

const StatusContainer: FunctionComponent = () => {
    const { notifications, removeNotification } =
        useContext(NotificationContext);
    const closeButtonHandler = (idx: number) => {
        removeNotification(idx);
    };

    return notifications && notifications.length != 0 ? (
        <TabWrapper>
            {notifications.map((notification: INotification, idx: number) => (
                <Notification
                    key={`${notification.type}_${idx}`}
                    message={notification.message}
                    type={notification.type}
                    closeButtonHandler={closeButtonHandler}
                    idx={idx}
                />
            ))}
        </TabWrapper>
    ) : (
        <></>
    );
};

export default StatusContainer;
