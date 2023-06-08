import React, {
    FunctionComponent,
    useState,
    useEffect,
    useContext,
} from 'react';
import styled from 'styled-components';
import Notification from '../../components/Notification';
import { PodContext } from '../../context/pods/podContext';
enum NotificationStatus {
    'Success',
    'Info',
    'Warning',
    'Danger',
}

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
    const { notifications, removeNotifications } = useContext(PodContext);
    const closeButtonHandler = (idx: number) => {
        removeNotifications(idx);
    };

    return notifications.length != 0 ? (
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
