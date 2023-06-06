import { IPod, IParsedLogsData } from "./interfaces";

export const getAllLogTypes = (podsArray: IPod[]) => {
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


export const parseHandler = (podsArray: IPod[], filterField: string): IParsedLogsData => {

	const allLogTypes = getAllLogTypes(podsArray);

	const parsedData: IParsedLogsData = {};
	podsArray.forEach(data => {
		if (data[filterField] != null) {
			if (parsedData[data[filterField]]) {
				parsedData[data[filterField]].pods++;
			} else {
				parsedData[data[filterField]] = {
					pods: 1,
					all_log_types: [...allLogTypes],
					traces_instrumented: data.traces_instrumented,
					log_type_default: '',
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

export const displayNamespaces = (namespaces: string[]): string => {
	const uniqueNamespaces = namespaces.filter((element, index) => {
		return namespaces.indexOf(element) === index;
	});
	if (uniqueNamespaces.length <= 2) return uniqueNamespaces.join(', ');

	return `${uniqueNamespaces[0]}, ${uniqueNamespaces[1]} and ${uniqueNamespaces.length - 2} more.`

}