import React, { useReducer, useMemo, useContext } from 'react';
import { LogsContext } from './logsContext';
import { LogsReducer } from './logsReducer';
import { NotificationContext } from '../notificationsContext/notificationContext';
import api from '../../utils/api';
import {
    SET_LOG_PODS,
    GET_LOG_LIST,
    ADD_LOG_TYPE,
    UPDATE_LOG_TYPE,
    ADD_BULK_LOG_TYPE,
    UPDATE_BULK_POD_LOG,
    ADD_LOG_TYPE_TO_LIST,
} from '../types';
import { parseHandler, getAllLogTypes } from '../../utils/parsePodData';
import {
    IPod,
    IItemToSend,
    NotificationStatus,
    ILogsContextState,
} from '../../utils/interfaces';
import { getErrorMessage } from '../../utils/error';
interface IProps {
    children: React.ReactNode;
}

export const LogsState: React.FC<IProps> = ({ children }) => {
    const { setNotifications } = useContext(NotificationContext);
    const initialState: ILogsContextState = {
        logsPods: null,
        logList: [],
    };
    const [state, dispatch] = useReducer(LogsReducer, initialState);

    const getAllParsedLogsPods = async (podsItems: IPod[]) => {
        const parsedLogs = parseHandler(podsItems, 'application');

        const allLogTypes = getAllLogTypes(podsItems);
        dispatch({ type: SET_LOG_PODS, payload: parsedLogs });
        dispatch({ type: GET_LOG_LIST, payload: allLogTypes });
    };

    const addLogTypeToTheList = (logTypeName: string) => {
        dispatch({ type: ADD_LOG_TYPE, payload: logTypeName });
    };

    const updateLogTypePod = (podName: string, log_type: string) => {
        dispatch({
            type: UPDATE_LOG_TYPE,
            payload: { podName, log_type },
        });
    };

    const updateLogTypeBulkToList = (
        applicationName: string,
        log_type: string,
    ) => {
        dispatch({
            type: ADD_LOG_TYPE_TO_LIST,
            payload: { applicationName, log_type },
        });
    };

    const updateLogTypeBulk = (applicationName: string, log_type: string) => {
        dispatch({
            type: ADD_BULK_LOG_TYPE,
            payload: { applicationName, log_type },
        });
    };

    const updateLogTypeBulkAPI = async (
        applicationName: string,
        bulkStatus: boolean,
    ) => {
        try {
            if (state.logsPods) {
                const updatedPodsWithNewLogTypes: IItemToSend[] =
                    state.logsPods[applicationName].podsItem.map(
                        (pod: IPod) => {
                            return {
                                name: pod.name,
                                controller_kind: pod.controller_kind,
                                namespace: pod.namespace,
                                log_type: bulkStatus ? pod.log_type : '',
                            };
                        },
                    );

                const response = await api.updateLogPod(
                    updatedPodsWithNewLogTypes,
                );
                if (response.length && response.length === 0) {
                    throw new Error(
                        ` Error ${response.status}: ${response.statusText}`,
                    );
                }
                dispatch({
                    type: UPDATE_BULK_POD_LOG,
                    payload: {
                        applicationName,
                        bulkStatus,
                        log_type:
                            state.logsPods[applicationName].podsItem[0]
                                .log_type,
                    },
                });
                setNotifications(
                    `Log type was updated on ${
                        state.logsPods[applicationName].podsItem.length
                    } ${
                        state.logsPods[applicationName].podsItem.length > 2
                            ? 'pods'
                            : 'pod'
                    } `,
                    NotificationStatus.Success,
                );
            }
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            setNotifications(errorMessage, NotificationStatus.Danger);
        }
    };

    const addLogTypeAPI = async (podName: string, isDelete = false) => {
        if (state.logsPods) {
            const podUpdated = state.logsPods['Undetected'].podsItem.find(
                (pod: IPod) => pod.name === podName,
            );
            // podUpdated.log_type = isDelete ? '' : podUpdated.log_type;
            console.log(isDelete, podUpdated.log_type);
            if (podUpdated) {
                try {
                    const podItemToSend: IItemToSend = {
                        name: podUpdated.name,
                        controller_kind: podUpdated.controller_kind,
                        namespace: podUpdated.namespace,
                        log_type: isDelete ? '' : podUpdated.log_type,
                    };

                    const response = await api.updateLogPod([podItemToSend]);
                    if (response.length && response.length === 0) {
                        throw new Error(
                            ` Error ${response.status}: ${response.statusText}`,
                        );
                    }
                    dispatch({
                        type: UPDATE_LOG_TYPE,
                        payload: {
                            podName: podUpdated.name,
                            log_type: isDelete ? '' : podUpdated.log_type,
                        },
                    });
                    setNotifications(
                        `Log type was ${
                            isDelete ? 'deleted' : 'added'
                        } on application: ${podUpdated.name}`,
                        NotificationStatus.Success,
                    );
                } catch (err) {
                    const errorMessage = getErrorMessage(err);
                    setNotifications(errorMessage, NotificationStatus.Danger);
                }
            } else {
                setNotifications('Cant find pod', NotificationStatus.Danger);
            }
        }
    };
    const value = useMemo(
        () => ({
            logsPods: state.logsPods,
            logList: state.logList,
            getAllParsedLogsPods,
            updateLogTypePod,
            updateLogTypeBulkToList,
            addLogTypeToTheList,
            addLogTypeAPI,
            updateLogTypeBulk,
            updateLogTypeBulkAPI,
        }),
        [state],
    );
    return (
        <LogsContext.Provider value={value}>{children} </LogsContext.Provider>
    );
};
