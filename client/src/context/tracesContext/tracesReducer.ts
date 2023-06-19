import {
	SET_TRACES_PODS,
	UPDATE_POD,
	UPDATE_POD_BULK,
	ADD_SERVICE_NAME,
	ADD_SERVICE_NAME_BULK
} from '../types';
import { IPod, ITracesContextState } from '../../utils/interfaces';


interface Ipayload {
	applicationName?: string;
	serviceName?: string;
	dataIndifier?: string;
	type?: string;
	typeAPI?: string;
	dataIndifierAPI?: string;
	statusAPI?: boolean;
}

interface IAction {
	type: string;
	payload: Ipayload;

}


export const TracesReducer = (currentState: ITracesContextState, action: IAction): ITracesContextState => {
	switch (action.type) {

		case ADD_SERVICE_NAME: {
			const { applicationName, serviceName } = action.payload;
			if (!currentState.tracesPods || !applicationName || !serviceName) {
				return { ...currentState }
			}
			const updatedList = [...currentState.tracesPods[applicationName].all_service_names];
			const chenckupIndex = updatedList.findIndex(item => item === action.payload.serviceName);
			if (chenckupIndex > 0) {
				return currentState
			}
			updatedList.push(serviceName);

			const currentBulkPodList = { ...currentState.tracesPods[applicationName] };
			const updatedBulkState = { ...currentState.tracesPods };
			currentBulkPodList.service_name_default = serviceName;
			currentBulkPodList.all_service_names = [...updatedList];
			const updatedPods = currentBulkPodList.podsItem.map((pod: IPod) => {

				pod.container_name = serviceName;
				return pod
			})
			currentBulkPodList.podsItem = [...updatedPods];
			updatedBulkState[applicationName] = { ...currentBulkPodList }
			return {
				...currentState, tracesPods: updatedBulkState
			};


		}
		case SET_TRACES_PODS:
			{
				return { ...currentState, tracesPods: action.payload };
			}

		case ADD_SERVICE_NAME_BULK: {
			const { applicationName, serviceName } = action.payload;
			if (!currentState.tracesPods || !applicationName || !serviceName) {
				return { ...currentState }
			}
			const currentBulkPodList = { ...currentState.tracesPods[applicationName] };
			const updatedBulkState = { ...currentState.tracesPods };
			currentBulkPodList.service_name_default = action.payload.serviceName;

			const updatedPods = currentBulkPodList.podsItem.map((pod: IPod) => {

				pod.container_name = serviceName;
				return pod
			})
			currentBulkPodList.podsItem = [...updatedPods];
			updatedBulkState[applicationName] = { ...currentBulkPodList }
			return {
				...currentState, tracesPods: updatedBulkState
			};
		}
		case UPDATE_POD: {

			const { type, dataIndifier } = action.payload;
			if (!dataIndifier) {
				return { ...currentState }
			}
			const currBulkPod = { ...currentState[`${type}Pods`][dataIndifier] };
			const updBulkPodState = { ...currentState[`${type}Pods`] };

			currBulkPod.isTouched = true;

			updBulkPodState[dataIndifier] = { ...currBulkPod }

			return { ...currentState, [`${type}Pods`]: updBulkPodState };
		}

		case UPDATE_POD_BULK: {

			const { typeAPI, dataIndifierAPI, statusAPI } = action.payload;

			if (!dataIndifierAPI) {
				return { ...currentState };
			}
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
