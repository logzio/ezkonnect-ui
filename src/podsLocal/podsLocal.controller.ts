import express from 'express';
import Controller from '../interfaces/controller.interface';
import fs from 'fs';
import { IPod } from '../pods/pods.interface';
import path from 'path';

class PodLocalController implements Controller {
	public path = '/api/test';
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

			const content = JSON.parse(
				fs.readFileSync(path.join(__dirname, '..', 'data.json'), 'utf8'),
			);
			res.statusCode = 200;
			res.send(content);
		} catch (err) {
			console.log(err);
			next(err)
		}
	};

	/**
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @param  {express.NextFunction} next
	 */
	private updateLogs = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			const content = JSON.parse(
				fs.readFileSync(path.join(__dirname, '..', 'data.json'), 'utf8'),
			);
			let updatedPods;
			if (req.body.length > 1) {
				updatedPods = [...content];
			} else {
				updatedPods = content.map((pod: IPod) => {
					if (pod.name === req.body[0].name) {
						pod.log_type = req.body[0].log_type;
					}

					return pod;
				});
			}
			fs.writeFile(
				path.join(__dirname, '..', 'data.json'),
				JSON.stringify(updatedPods),
				function writeJSON(err) {
					if (err) return console.log(err);
				},
			);

			const responseSuccess = [
				{
					name: 'my-deployment',
					namespace: 'default',
					controller_kind: 'deployment',
					updated_annotations: {
						'logz.io/application_type': 'application',
					},
				},
				{
					name: 'my-statefulset',
					namespace: 'default',
					controller_kind: 'statefulset',
					updated_annotations: {
						'logz.io/application_type': 'system',
					},
				},
			];
			res.statusCode = 200;
			res.send(responseSuccess);
		} catch (err) {
			next(err)
		}
	}
	/**
	 * @param  {express.Request} req
	 * @param  {express.Response} res
	 * @param  {express.NextFunction} next
	 */
	private updateTraces = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			const content = JSON.parse(
				fs.readFileSync(path.join(__dirname, '..', 'data.json'), 'utf8'),
			);
			let updatedPods;
			if (req.body.length > 1) {
				updatedPods = [...content];
			} else {
				updatedPods = content.map((pod: IPod) => {
					if (pod.name === req.body[0].name) {
						pod.traces_instrumented = req.body[0].action === 'delete' ? false : true;
					}

					return pod;
				});
			}
			fs.writeFile(
				path.join(__dirname, '..', 'data.json'),
				JSON.stringify(updatedPods),
				function writeJSON(err) {
					if (err) return console.log(err);
					console.log(JSON.stringify(content));
				},
			);

			const responseSuccess = [
				{
					name: 'my-deployment',
					namespace: 'default',
					controller_kind: 'deployment',
					updated_annotations: {
						'logz.io/instrument': 'true',
					},
				},
				{
					name: 'my-statefulset',
					namespace: 'default',
					controller_kind: 'statefulset',
					updated_annotations: {
						'logz.io/instrument': 'rollback',
					},
				},
			];

			res.statusCode = 200;
			res.send(responseSuccess);
		} catch (err) {
			next(err);
		}
	}

}

export default PodLocalController;
