import express from 'express';
import Controller from '../interfaces/controller.interface';
import axios from 'axios';

class PodController implements Controller {
	public path = '/api/v1';
	public router = express.Router();


	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/state`, this.getAllPods);
		this.router.get(`${this.path}/annotate/traces`, this.updateTraces);
		this.router.get(`${this.path}/annotate/logs`, this.updateLogs);

	}

	private getAllPods = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			const content = await axios({
				method: 'get',
				url: `${process.env.VITE_ENDPOINT_API}/api/v1/state`,
			})
				.then(function (response) {
					return response.data;
				})
				.catch((err) => {
					throw err;
				});
			res.statusCode = 200;
			res.send({
				pods: content,
			});
		} catch (err) {
			next(err);
		}
	};

	private updateLogs = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			const updatedLogs = req.body;

			const responseSuccess = await axios
				.post(
					`${process.env.VITE_ENDPOINT_API}/api/v1/annotate/logs`,
					updatedLogs,
				)
				.then((response) => response.data)
				.catch((err) => {
					throw err;
				});
			res.statusCode = 200;
			res.send(responseSuccess);
		} catch (err) {
			next(err);
		}
	}

	private updateTraces = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			const updatedTraces = req.body;
			const responseSuccess = await axios
				.post(
					`${process.env.VITE_ENDPOINT_API}/api/v1/annotate/traces`,
					updatedTraces,
				)
				.then((response) => response.data)
				.catch((err) => {
					throw err;
				});
			res.statusCode = 200;
			res.send(responseSuccess);
		} catch (err) {
			next(err);
		}
	}

}

export default PodController;
