import { IItemToSend } from "./interfaces";



const BASE_URL = '/';

const settings = {
	getPodsURL: "api/v1/state",
	updateTracePodsURL: "api/v1/annotate/traces",
	updateLogTypePodsUrl: "api/v1/annotate/logs"
}

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