import React, { useReducer, FunctionComponent, useMemo } from 'react';
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
    GET_SERVICE_NAME_LIST,
    ADD_SERVICE_NAME,
    ADD_SERVICE_NAME_BULK,
} from '../types';
import {
    parseHandler,
    getAllLogTypes,
    getAllServiceNames,
    multipleParseHandler,
} from '../../utils/parsePodData';
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
        serviceNameList: [],
        notifications: [],
    };
    const [state, dispatch] = useReducer(PodReducer, initialState);

    const getAllPods = async () => {
        const podsItems = await api.getPods();
        const parsedLogs = parseHandler(podsItems, 'application');
        const parsedTrace = multipleParseHandler(
            podsItems,
            'language',
            'namespace',
            'container_name',
        );
        const allLogTypes = getAllLogTypes(podsItems);
        // const allServiceNames = getAllServiceNames(podsItems);
        // console.log(parsedTrace);
        dispatch({ type: SET_TRACES_PODS, payload: parsedTrace });
        dispatch({ type: SET_LOG_PODS, payload: parsedLogs });
        dispatch({ type: GET_LOG_LIST, payload: allLogTypes });
        // dispatch({
        //     type: GET_SERVICE_NAME_LIST,
        //     payload: allServiceNames,
        // });
        dispatch({ type: SET_ALL_PODS, payload: podsItems });
    };

    const addLogTypeToTheList = (logTypeName: string) => {
        dispatch({ type: ADD_LOG_TYPE, payload: logTypeName });
    };
    const addServiceNameToTheList = (
        applicationName: string,
        serviceName: string,
    ) => {
        dispatch({
            type: ADD_SERVICE_NAME,
            payload: { applicationName, serviceName },
        });
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
                        service_name: item.container_name,
                        namespace: item.namespace,
                        action: status ? 'delete' : 'add',
                    };
                },
            );
            const response = await api.updatePod(podsItems);
            if (response.length && response.length === 0) {
                throw new Error(
                    ` Error ${response.status}: ${response.statusText}`,
                );
            }

            dispatch({
                type: UPDATE_POD_BULK,
                payload: {
                    typeAPI: type,
                    dataIndifierAPI: dataIndifier,
                    statusAPI: status,
                },
            });
            setNotifications(
                `Instrumentation was added to the ${
                    state[`${type}Pods`][dataIndifier].podsItem.length
                } pods `,
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

    const updateServiceNameBulk = (
        applicationName: string,
        serviceName: string,
    ) => {
        dispatch({
            type: ADD_SERVICE_NAME_BULK,
            payload: { applicationName, serviceName },
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

    const addLogTypeAPI = async (podName: string, isDelete = false) => {
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
                        '1 Pod were successfully deployed to cluster',
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
            podsState: state,
            serviceNameList: state.serviceNameList,
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
            addServiceNameToTheList,
            updateServiceNameBulk,
        }),
        [state],
    );
    return <PodContext.Provider value={value}>{children} </PodContext.Provider>;
};
