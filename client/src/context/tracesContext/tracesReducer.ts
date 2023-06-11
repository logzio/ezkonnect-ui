import {
	SET_TRACES_PODS,
	UPDATE_POD,
	UPDATE_POD_BULK,
	GET_SERVICE_NAME_LIST,
	ADD_SERVICE_NAME,
	ADD_SERVICE_NAME_BULK
} from '../types';
import { IPod, ITracesContextState } from '../../utils/interfaces';
import { convertArrayToSelectOption } from '../../utils/covert';


export const TracesReducer = (currentState: ITracesContextState, action: any): ITracesContextState => {
	switch (action.type) {

		case GET_SERVICE_NAME_LIST: {
			const convertedServiceNames = convertArrayToSelectOption(action.payload);

			return { ...currentState, serviceNameList: [...convertedServiceNames] }

		}
		case ADD_SERVICE_NAME: {
			if (!currentState.tracesPods) {
				return { ...currentState }
			}
			const updatedList = [...currentState.tracesPods[action.payload.applicationName].all_service_names];
			const chenckupIndex = updatedList.findIndex(item => item === action.payload.serviceName);
			if (chenckupIndex > 0) {
				return currentState
			}
			updatedList.push(action.payload.serviceName);

			const currentBulkPodList = { ...currentState.tracesPods[action.payload.applicationName] };
			const updatedBulkState = { ...currentState.tracesPods };
			currentBulkPodList.service_name_default = action.payload.serviceName;
			currentBulkPodList.all_service_names = [...updatedList];
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
		case SET_TRACES_PODS:
			{
				return { ...currentState, tracesPods: action.payload };
			}

		case ADD_SERVICE_NAME_BULK: {
			if (!currentState.tracesPods) {
				return { ...currentState }
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
