import {
	SET_LOG_PODS,
	GET_LOG_LIST,
	ADD_LOG_TYPE,
	UPDATE_LOG_TYPE,
	ADD_BULK_LOG_TYPE,
	UPDATE_BULK_POD_LOG,
	ADD_LOG_TYPE_TO_LIST,

} from '../types';
import { IPod, ILogsContextState, IParsedPodsData, } from '../../utils/interfaces';
import { convertArrayToSelectOption } from '../../utils/covert';

interface IPayload {
	log_type?: string;
	podName?: string;
	applicationName?: string;
	bulkStatus?: boolean;
	logTypeName?: string;
	allLogTypes?: string[]
	logsPods?: IParsedPodsData;
}


interface IAction {
	type: string;
	payload: IPayload;
}


export const LogsReducer = (currentState: ILogsContextState, action: IAction): ILogsContextState => {
	switch (action.type) {
		case SET_LOG_PODS: {

			const { logsPods } = action.payload;
			if (!logsPods) {
				return { ...currentState };
			}
			return { ...currentState, logsPods: { ...logsPods } };
		}

		case ADD_LOG_TYPE: {
			const { logTypeName } = action.payload;
			if (!logTypeName) {
				return { ...currentState }
			}
			const convertedType = convertArrayToSelectOption([logTypeName])[0];
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
				const { allLogTypes } = action.payload;
				if (!allLogTypes || allLogTypes?.length === 0) {
					return { ...currentState }
				}
				const convertedTypes = convertArrayToSelectOption(allLogTypes);
				return { ...currentState, logList: [...convertedTypes] };
			}
		case UPDATE_LOG_TYPE: {
			const updatedState = currentState.logsPods;

			if (!currentState.logsPods || !updatedState) {
				return { ...currentState }
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
		case ADD_LOG_TYPE_TO_LIST: {
			if (!currentState.logsPods || !action.payload.applicationName) {
				return { ...currentState }
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
			if (!currentState.logsPods || !action.payload.applicationName) {
				return { ...currentState }
			}
			const cBulkPodList = { ...currentState.logsPods[action.payload.applicationName] };
			const uBulkState = { ...currentState.logsPods };
			let logType = action.payload.log_type;
			if (action.payload.log_type === '') {
				logType = action.payload.applicationName;
			}
			cBulkPodList.log_type_default = logType;
			const uPods = cBulkPodList.podsItem.map((pod: IPod) => {

				pod.log_type = logType;
				return pod
			})
			cBulkPodList.podsItem = [...uPods];
			cBulkPodList.isTouched = true;
			uBulkState[action.payload.applicationName] = { ...cBulkPodList }
			return {
				...currentState, logsPods: uBulkState
			};
		}
		case UPDATE_BULK_POD_LOG: {
			const { bulkStatus, applicationName, log_type } = action.payload;
			if (!currentState.logsPods || !applicationName) {
				return { ...currentState }
			}

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
		default:
			return { ...currentState }
	}
};
