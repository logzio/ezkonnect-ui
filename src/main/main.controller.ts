import express from 'express';
import Controller from '../interfaces/controller.interface';
import path from 'path';

class MainController implements Controller {
	public path = '/';
	public router = express.Router();


	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.getHomepage);
	}

	private getHomepage = (req: express.Request, res: express.Response) => {
		res.sendFile(path.join(__dirname, '../client/dist/index.html'));
	};

}

export default MainController