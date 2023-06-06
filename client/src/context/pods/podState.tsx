import React, { useReducer, FunctionComponent } from 'react';
import { PodContext } from './podContext';
import { PodReducer } from './podReducer';
import api from '../../utils/api';
import {
    SET_LOG_PODS,
    SET_TRACES_PODS,
    SET_ALL_PODS,
    GET_LOG_LIST,
    ADD_LOG_TYPE,
    UPDATE_LOG_TYPE,
    ADD_BULK_LOG_TYPE,
    SET_NOTIFICATION,
    REMOVE_NOTIFICATION,
    UPDATE_BULK_POD_LOG,
    ADD_LOG_TYPE_TO_LIST,
    UPDATE_POD,
    UPDATE_POD_BULK,
} from '../types';
import { parseHandler, getAllLogTypes } from '../../utils/parsePodData';
import {
    IPod,
    IItemToSend,
    NotificationStatus,
    IContextState,
} from '../../utils/interfaces';
import { getErrorMessage } from '../../utils/error';
interface IProps {
    children: React.ReactNode;
}

export const PodState: React.FC<IProps> = ({ children }) => {
    const initialState: IContextState = {
        logsPods: null,
        tracesPods: null,
        podsItems: [],
        logList: [],
        notifications: [],
    };
    const [state, dispatch] = useReducer(PodReducer, initialState);

    const getAllPods = async () => {
        const podsItems = await api.getPods();
        const parsedLogs = parseHandler(podsItems, 'application');
        const parsedTrace = parseHandler(podsItems, 'language');
        const allLogTypes = getAllLogTypes(podsItems);

        dispatch({ type: SET_TRACES_PODS, payload: parsedTrace });
        dispatch({ type: SET_LOG_PODS, payload: parsedLogs });
        dispatch({ type: GET_LOG_LIST, payload: allLogTypes });
        dispatch({ type: SET_ALL_PODS, payload: podsItems });
    };

    const addLogTypeToTheList = (logTypeName: string) => {
        dispatch({ type: ADD_LOG_TYPE, payload: logTypeName });
    };

    const updatePodHandler = async (type: string, dataIndifier: string) => {
        dispatch({ type: UPDATE_POD, payload: { type, dataIndifier } });
    };

    const updatePodHandlerAPI = async (
        type: string,
        dataIndifier: string,
        status: boolean,
    ) => {
        try {
            const podsItems = state[`${type}Pods`][dataIndifier].podsItem.map(
                (item: IPod) => {
                    return {
                        name: item.name,
                        controller_kind: item.controller_kind,
                        namespace: item.namespace,
                        action: status ? 'delete' : 'add',
                    };
                },
            );
            await api.updatePod(podsItems);
            dispatch({
                type: UPDATE_POD_BULK,
                payload: {
                    typeAPI: type,
                    dataIndifierAPI: dataIndifier,
                    statusAPI: status,
                },
            });
            setNotifications(
                `${
                    state[`${type}Pods`][dataIndifier].podsItem.length
                } Pods were successfully deployed to cluster`,
                NotificationStatus.Success,
            );
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            setNotifications(errorMessage, NotificationStatus.Danger);
        }
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

                await api.updateLogPod(updatedPodsWithNewLogTypes);

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
                    `${state.logsPods[applicationName].podsItem.length} Pod were successfully deployed to cluster`,
                    NotificationStatus.Success,
                );
            }
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            setNotifications(errorMessage, NotificationStatus.Danger);
        }
    };

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
        }, 3000);
    };

    const addLogTypeAPI = async (
        podName: string,
        isDelete: boolean = false,
    ) => {
        if (state.logsPods) {
            const podUpdated = state.logsPods['Undetected'].podsItem.find(
                (pod: IPod) => pod.name === podName,
            );
            podUpdated.log_type = isDelete ? '' : podUpdated.log_type;
            if (podUpdated) {
                try {
                    const podItemToSend: IItemToSend = {
                        name: podUpdated.name,
                        controller_kind: podUpdated.controller_kind,
                        namespace: podUpdated.namespace,
                        log_type: isDelete ? '' : podUpdated.log_type,
                    };

                    const response = await api.updateLogPod([podItemToSend]);
                    if (response) {
                        dispatch({
                            type: UPDATE_LOG_TYPE,
                            payload: {
                                podName: podUpdated.name,
                                log_type: isDelete ? '' : podUpdated.log_type,
                            },
                        });
                        setNotifications(
                            '1 Pod were successfully deployed to cluster',
                            NotificationStatus.Success,
                        );
                    }
                } catch (err) {
                    const errorMessage = getErrorMessage(err);
                    setNotifications(errorMessage, NotificationStatus.Danger);
                }
            } else {
                setNotifications('Cant find pod', NotificationStatus.Danger);
            }
        }
    };

    return (
        <PodContext.Provider
            value={{
                podsState: state,
                logList: state.logList,
                notifications: state.notifications,
                getAllPods: getAllPods,
                updatePodAPI: updatePodHandlerAPI,
                updatePod: updatePodHandler,
                updateLogTypePod,
                updateLogTypeBulkToList,
                addLogTypeToTheList,
                addLogTypeAPI,
                updateLogTypeBulk,
                updateLogTypeBulkAPI,
                setNotifications,
            }}
        >
            {children}{' '}
        </PodContext.Provider>
    );
};
