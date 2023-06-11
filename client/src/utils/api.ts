import { IItemToSend } from "./interfaces";

const BASE_URL = 'http://localhost:8080/';

const settings = {
	getPodsURL: "api/test/state",
	updateTracePodsURL: "api/test/annotate/traces",
	updateLogTypePodsUrl: "api/test/annotate/logs"
}

/**
 * Class that have methods to manage API calls
 * @param  {string} baseUrl
 */
class Api {
	baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	customFetch = async (method: string, url: string, bodyToSend: object) => {
		return await fetch(`${BASE_URL}${url}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			...(Object.keys(bodyToSend).length > 0
				? { body: JSON.stringify(bodyToSend) }
				: {}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw res;
				}
			})
			.catch((err) => {
				return err;
			});
	};

	getPods = async () => {
		const data = await this.customFetch('GET', settings.getPodsURL, {});

		if (data.length) {
			return data;
		}
		if (data.pods.length) {
			return data.pods;
		}



	}
	updatePod = async (podData: IItemToSend[]) => {
		const data = await this.customFetch('POST', settings.updateTracePodsURL, podData)
		if (data) {
			return data;
		}
	}

	updateLogPod = async (podData: IItemToSend[]) => {

		const data = await this.customFetch('POST', settings.updateLogTypePodsUrl, podData)
		if (data) {
			return data;
		}
		return data.error;
	}
}

const api = new Api(BASE_URL)

export default api;