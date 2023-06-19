import express from 'express';
import Controller from '../interfaces/controller.interface';
import axios from 'axios';

class PodController implements Controller {
	public path = '/api/v1';
	public router = express.Router();


	constructor() {
		this.initializeRoutes();
	}

	/**
	 * Method that initiale routes that can be used for frontend
	 */
	private initializeRoutes() {
		this.router.get(`${this.path}/state`, this.getAllPods);
		this.router.post(`${this.path}/annotate/traces`, this.updateTraces);
		this.router.post(`${this.path}/annotate/logs`, this.updateLogs);

	}
	/**
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @param  {express.NextFunction} next
	 */
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
					console.log(err);
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

	/**
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @param  {express.NextFunction} next
	 */
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
					console.log(err);

					throw err;
				});
			res.statusCode = 200;
			res.send(responseSuccess);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @param  {express.NextFunction} next
	 */
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
					console.log(err);

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
