import React, { useReducer, useMemo, useContext } from 'react';
import { TracesContext } from './tracesContext';
import { TracesReducer } from './tracesReducer';
import { NotificationContext } from '../notificationsContext/notificationContext';
import api from '../../utils/api';
import {
    SET_TRACES_PODS,
    UPDATE_POD,
    UPDATE_POD_BULK,
    ADD_SERVICE_NAME,
    ADD_SERVICE_NAME_BULK,
} from '../types';
import { multipleParseHandler } from '../../utils/parsePodData';
import {
    IPod,
    NotificationStatus,
    ITracesContextState,
} from '../../utils/interfaces';
import { getErrorMessage } from '../../utils/error';
interface IProps {
    children: React.ReactNode;
}

export const TracesState: React.FC<IProps> = ({ children }) => {
    const { setNotifications } = useContext(NotificationContext);

    const initialState: ITracesContextState = {
        tracesPods: null,
        serviceNameList: [],
    };
    const [state, dispatch] = useReducer(TracesReducer, initialState);

    const getAllParsedTracesPods = async (podsItems: IPod[]) => {
        const parsedTrace = multipleParseHandler(
            podsItems,
            'language',
            'namespace',
            'container_name',
        );
        dispatch({ type: SET_TRACES_PODS, payload: parsedTrace });
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
                `Instrumentation was ${status ? 'deleted' : 'added'} to ${
                    state[`${type}Pods`][dataIndifier].podsItem.length
                }  ${
                    state[`${type}Pods`][dataIndifier].podsItem[0]
                        .controller_kind
                }`,
                NotificationStatus.Success,
            );
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            setNotifications(errorMessage, NotificationStatus.Danger);
        }
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
    const value = useMemo(
        () => ({
            tracesPods: state.tracesPods,
            serviceNameList: state.serviceNameList,
            getAllParsedTracesPods,
            updatePodAPI: updatePodHandlerAPI,
            updatePod: updatePodHandler,
            addServiceNameToTheList,
            updateServiceNameBulk,
        }),
        [state],
    );
    return (
        <TracesContext.Provider value={value}>
            {children}{' '}
        </TracesContext.Provider>
    );
};
