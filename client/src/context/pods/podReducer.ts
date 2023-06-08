import {
	SET_LOG_PODS,
	SET_METRIC_PODS,
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
	ADD_SERVICE_NAME_BULK
} from '../types';
import { IPod, IParsedItem, IContextState, INotification, IParsedLogsData } from '../../utils/interfaces';
import { convertArrayToSelectOption } from '../../utils/covert';



// @ts-ignore
export const PodReducer = (currentState: IContextState, action: Action): IContextState => {
	switch (action.type) {

		case GET_SERVICE_NAME_LIST: {
			const convertedServiceNames = convertArrayToSelectOption(action.payload);

			return { ...currentState, serviceNameList: [...convertedServiceNames] }

		}
		case ADD_SERVICE_NAME: {

			const convertedTServiceName = convertArrayToSelectOption([action.payload])[0];
			const updatedList = [...currentState.serviceNameList];
			const chenckupIndex = updatedList.findIndex(item => item.name === convertedTServiceName.name);
			if (chenckupIndex > 0) {
				return currentState
			}
			updatedList.push(convertedTServiceName);
			return { ...currentState, serviceNameList: [...updatedList] };
		}
		case SET_TRACES_PODS:
			{
				return { ...currentState, tracesPods: action.payload };
			}

		case SET_LOG_PODS: {

			return { ...currentState, logsPods: action.payload };
		}
		case SET_ALL_PODS: {

			return { ...currentState, podsItems: [...action.payload] };
		}
		case ADD_LOG_TYPE: {

			const convertedType = convertArrayToSelectOption([action.payload])[0];
			const updatedList = [...currentState.logList];
			const chenckupIndex = updatedList.findIndex(item => item.name === convertedType.name);
			if (chenckupIndex > 0) {
				return currentState
			}
			updatedList.push(convertedType);
			return { ...currentState, logList: [...updatedList] };
		}
		case GET_LOG_LIST:
			{
				const convertedTypes = convertArrayToSelectOption(action.payload);
				return { ...currentState, logList: [...convertedTypes] };
			}
		case UPDATE_LOG_TYPE: {
			const updatedState = currentState.logsPods;

			if (!currentState.logsPods || !updatedState) {
				break;
			}
			const currentPodList = currentState.logsPods['Undetected'].podsItem;

			const indexOfPod = currentPodList.findIndex((pod: IPod) => pod.name === action.payload.podName);
			currentPodList[indexOfPod].log_type = action.payload.log_type;
			if (currentPodList[indexOfPod].isTouched) {

				currentPodList[indexOfPod].isTouched = false;
			} else {
				currentPodList[indexOfPod].isTouched = true;

			}
			updatedState['Undetected'].podsItem = [...currentPodList]
			return {
				...currentState, logsPods: updatedState
			};
		}

		case ADD_SERVICE_NAME_BULK: {
			if (!currentState.tracesPods) {
				break;
			}
			const currentBulkPodList = { ...currentState.tracesPods[action.payload.applicationName] };
			const updatedBulkState = { ...currentState.tracesPods };
			currentBulkPodList.service_name_default = action.payload.serviceName;

			const updatedPods = currentBulkPodList.podsItem.map((pod: IPod) => {

				pod.container_name = action.payload.serviceName;
				return pod
			})
			currentBulkPodList.podsItem = [...updatedPods];
			updatedBulkState[action.payload.applicationName] = { ...currentBulkPodList }
			return {
				...currentState, tracesPods: updatedBulkState
			};
		}


		case ADD_LOG_TYPE_TO_LIST: {
			if (!currentState.logsPods) {
				break;
			}
			const currentBulkPodList = { ...currentState.logsPods[action.payload.applicationName] };
			const updatedBulkState = { ...currentState.logsPods };
			currentBulkPodList.logTypeOnSelect = action.payload.log_type;

			const updatedPods = currentBulkPodList.podsItem.map((pod: IPod) => {

				pod.log_type = action.payload.log_type;
				return pod
			})
			currentBulkPodList.podsItem = [...updatedPods];
			currentBulkPodList.isTouched = true;
			updatedBulkState[action.payload.applicationName] = { ...currentBulkPodList }
			return {
				...currentState, logsPods: updatedBulkState
			};
		}

		case ADD_BULK_LOG_TYPE: {
			if (!currentState.logsPods) {
				break;
			}
			const cBulkPodList = { ...currentState.logsPods[action.payload.applicationName] };
			const uBulkState = { ...currentState.logsPods };
			cBulkPodList.log_type_default = action.payload.log_type;
			const uPods = cBulkPodList.podsItem.map((pod: IPod) => {

				pod.log_type = action.payload.log_type;
				return pod
			})
			cBulkPodList.podsItem = [...uPods];
			cBulkPodList.isTouched = true;
			uBulkState[action.payload.applicationName] = { ...cBulkPodList }
			return {
				...currentState, logsPods: uBulkState
			};
		}
		case SET_NOTIFICATION: {

			const updatedNotifications = [...currentState.notifications];
			updatedNotifications.push({
				message: action.payload.notification,
				type: action.payload.typeNotification,
				notificationId: action.payload.notificationId
			});
			return {
				...currentState, notifications: [...updatedNotifications]

			};
		}
		case REMOVE_NOTIFICATION: {

			const findIndex = currentState.notifications.findIndex(
				(notif: INotification) => notif.notificationId === action.payload.tempId,
			);
			let updRemovedNotification: INotification[] = [];
			if (currentState.notifications.length === 1) {
				updRemovedNotification = [];
			} else {
				updRemovedNotification = [...currentState.notifications.splice(findIndex, 1)];
			}
			return {
				...currentState, notifications: [...updRemovedNotification]

			};
		}
		case UPDATE_BULK_POD_LOG: {
			if (!currentState.logsPods) {
				break;
			}
			const { bulkStatus, applicationName, log_type } = action.payload;
			const currBulkPodList = { ...currentState.logsPods[applicationName] };
			const updBulkState = { ...currentState.logsPods };
			if (bulkStatus) {
				currBulkPodList.log_type_default = log_type;
				currBulkPodList.isTouched = false;

			} else {
				currBulkPodList.log_type_default = '';
				currBulkPodList.isTouched = true;

			}
			const updPods = currBulkPodList.podsItem.map((pod: IPod) => {

				pod.log_type = log_type;
				return pod
			})
			currBulkPodList.podsItem = [...updPods];
			updBulkState[applicationName] = { ...currBulkPodList }
			return {
				...currentState, logsPods: updBulkState
			};
		}
		case UPDATE_POD: {

			const { type, dataIndifier } = action.payload;
			const currBulkPod = { ...currentState[`${type}Pods`][dataIndifier] };
			const updBulkPodState = { ...currentState[`${type}Pods`] };

			currBulkPod.isTouched = true;

			updBulkPodState[dataIndifier] = { ...currBulkPod }

			return { ...currentState, [`${type}Pods`]: updBulkPodState };
		}

		case UPDATE_POD_BULK: {

			const { typeAPI, dataIndifierAPI, statusAPI } = action.payload;
			const currBulkPodAPI = { ...currentState[`${typeAPI}Pods`][dataIndifierAPI] };
			const updBulkPodStateAPI = { ...currentState[`${typeAPI}Pods`] };

			const updPodsAPI = currBulkPodAPI.podsItem.map((pod: IPod) => {

				pod[`${typeAPI}_instrumented`] = !statusAPI;
				return pod
			});

			currBulkPodAPI.isTouched = !statusAPI;
			currBulkPodAPI.podsItem = [...updPodsAPI];

			updBulkPodStateAPI[dataIndifierAPI] = { ...currBulkPodAPI };

			return { ...currentState, [`${typeAPI}Pods`]: updBulkPodStateAPI };
		}
		default:
			return { ...currentState }
	}
};
