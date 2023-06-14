import { IPod, IParsedLogsData } from "./interfaces";

/**
 * Function recieve a array of Pods from API, extracting all possible log types
 * @param  {IPod[]} podsArray 
 * @returns {string[]} logArray 
 */
export const getAllLogTypes = (podsArray: IPod[]): string[] => {
	const logArray: string[] = [];

	podsArray.forEach(pod => {
		if (pod.application && !logArray.includes(pod.application)) {
			logArray.push(pod.application)
		}
		if (pod.log_type && !logArray.includes(pod.log_type)) {
			logArray.push(pod.log_type)
		}
	});
	return logArray
}

/**
 * Function get array of Pods what was received from API and extracts all possible service_names
 * @param  {IPod[]} podsArray
 * @returns {string[]} serviceNameArray
 *  */
export const getAllServiceNames = (podsArray: IPod[]): string[] => {
	const serviceNameArray: string[] = [];
	podsArray.forEach(pod => {
		if (pod.container_name && !serviceNameArray.includes(pod.container_name)) {
			serviceNameArray.push(pod.container_name)
		}

	});
	return serviceNameArray;
}

/**
 * Function recieve a array of Pods from API, and filters them based on 3 object fields, 
 * and Primary field is main field if it's not exists set is as Undetected
 * @param  {IPod[]} podsArray
 * @param  {string} filterFieldPrimary
 * @param  {string} filterFieldSecondary
 * @param  {string} filterFieldThird
 * @returns IParsedLogsData
 */
export const multipleParseHandler = (podsArray: IPod[], filterFieldPrimary: string, filterFieldSecondary: string, filterFieldThird: string): IParsedLogsData => {
	const allLogTypes = getAllLogTypes(podsArray);

	const parsedData: IParsedLogsData = {};

	podsArray.forEach(data => {
		if (data[filterFieldPrimary] != null) {

			if (parsedData[`${data[filterFieldPrimary]}_${data[filterFieldSecondary]}_${data.name}-${data[filterFieldThird]}`]) {
				parsedData[`${data[filterFieldPrimary]}_${data[filterFieldSecondary]}_${data.name}-${data[filterFieldThird]}`].pods = parsedData[`${data[filterFieldPrimary]}_${data[filterFieldSecondary]}_${data.name}-${data[filterFieldThird]}`].pods + 1;
			} else {
				parsedData[`${data[filterFieldPrimary]}_${data[filterFieldSecondary]}_${data.name}-${data[filterFieldThird]}`] = {
					pods: 1,
					all_log_types: [...allLogTypes],
					all_service_names: [],
					traces_instrumented: data.traces_instrumented,
					log_type_default: '',
					service_name_default: data.container_name ? `${data.name}-${data.container_name}` : '',
					namespaces: [],
					isTouched: false,
					podsItem: [],
					logTypeOnSelect: ''

				}
			}
			parsedData[`${data[filterFieldPrimary]}_${data[filterFieldSecondary]}_${data.name}-${data[filterFieldThird]}`].namespaces.push(data.namespace);
			parsedData[`${data[filterFieldPrimary]}_${data[filterFieldSecondary]}_${data.name}-${data[filterFieldThird]}`].podsItem.push(data);
			if (data.container_name) {
				parsedData[`${data[filterFieldPrimary]}_${data[filterFieldSecondary]}_${data.name}-${data[filterFieldThird]}`].all_service_names.push(data.container_name);
			}
		} else {
			if (parsedData['Undetected']) {
				parsedData['Undetected'].pods++;
			} else {
				parsedData['Undetected'] = {
					pods: 1,
					all_log_types: [...allLogTypes],
					all_service_names: [],

					traces_instrumented: data.traces_instrumented,
					namespaces: [],
					log_type_default: '',
					podsItem: [],
				}

			}
			parsedData['Undetected'].namespaces.push(data.namespace);
			parsedData['Undetected'].podsItem.push(data);
			if (data.container_name) {
				parsedData['Undetected'].all_service_names.push(data.container_name);
			}

		}
	});


	return parsedData;
}

/**
 * Function recieve a array of Pods from API, and filters them based on 1 object field, 
 * if it's not exists set is as Undetected
 * @param  {IPod[]} podsArray
 * @param  {string} filterField
 * @returns IParsedLogsData
 */
export const parseHandler = (podsArray: IPod[], filterField: string): IParsedLogsData => {

	const allLogTypes = getAllLogTypes(podsArray);
	const allServiceNames = getAllServiceNames(podsArray);
	const parsedData: IParsedLogsData = {};
	podsArray.forEach(data => {
		if (data[filterField] != null) {
			if (parsedData[data[filterField]]) {
				parsedData[data[filterField]].pods++;
			} else {
				parsedData[data[filterField]] = {
					pods: 1,
					all_log_types: [...allLogTypes],
					all_service_names: [...allServiceNames],
					traces_instrumented: data.traces_instrumented,
					log_type_default: '',
					service_name_default: '',
					namespaces: [],
					isTouched: false,
					podsItem: [],
					logTypeOnSelect: ''

				}
			}

			if (data.log_type != '') {
				parsedData[data[filterField]].log_type_default = data.log_type;
				parsedData[data[filterField]].logTypeOnSelect = data.log_type;
			}

			parsedData[data[filterField]].namespaces.push(data.namespace);
			parsedData[data[filterField]].podsItem.push(data);
		} else {
			if (parsedData['Undetected']) {
				parsedData['Undetected'].pods++;
			} else {
				parsedData['Undetected'] = {
					pods: 1,
					all_log_types: [...allLogTypes],
					all_service_names: [...allServiceNames],

					traces_instrumented: data.traces_instrumented,
					namespaces: [],
					log_type_default: '',
					podsItem: [],
				}

			}
			parsedData['Undetected'].namespaces.push(data.namespace);
			parsedData['Undetected'].podsItem.push(data);
		}

	});

	return parsedData;
}
/**
 * Display namesspaces with in the detected pods was more that 1 namspace display string of joining them with space. 
 * If it's more that 2 display message and N more. 
 * @param  {string[]} namespaces
 * @returns string
 */
export const displayNamespaces = (namespaces: string[]): string => {
	const uniqueNamespaces = namespaces.filter((element, index) => {
		return namespaces.indexOf(element) === index;
	});
	if (uniqueNamespaces.length <= 2) return uniqueNamespaces.join(', ');

	return `${uniqueNamespaces[0]}, ${uniqueNamespaces[1]} and ${uniqueNamespaces.length - 2} more.`

}