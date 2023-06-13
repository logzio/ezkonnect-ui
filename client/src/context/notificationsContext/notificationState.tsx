import React, { useReducer, useMemo } from 'react';
import { NotificationContext } from './notificationContext';
import { NotificationReducer } from './notificationReducer';
import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from '../types';

import { NotificationStatus, IContextState } from '../../utils/interfaces';
interface IProps {
    children: React.ReactNode;
}

export const NotificationState: React.FC<IProps> = ({ children }) => {
    const initialState: IContextState = {
        notifications: [],
    };
    const [state, dispatch] = useReducer(NotificationReducer, initialState);

    const setNotifications = (message: string, type: NotificationStatus) => {
        const temporaryId = Math.floor(100000 + Math.random() * 900000);

        dispatch({
            type: SET_NOTIFICATION,
            payload: {
                notification: message,
                typeNotification: type,
                notificationId: temporaryId,
            },
        });

        setTimeout(() => {
            dispatch({
                type: REMOVE_NOTIFICATION,
                payload: {
                    tempId: temporaryId,
                },
            });
        }, 10000);
    };

    const value = useMemo(
        () => ({
            notifications: state.notifications,
            setNotifications,
        }),
        [state],
    );
    return (
        <NotificationContext.Provider value={value}>
            {children}{' '}
        </NotificationContext.Provider>
    );
};
