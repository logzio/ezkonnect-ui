import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import errorHandler from './middleware/errorHandler.middleware';
import NotFoundError from './errors/NotFoundError';
import Controller from './interfaces/controller.interface';

class App {
	public app: express.Application;
	public port: number;

	constructor(controllers: Controller[], port: number) {
		this.app = express();
		this.port = port;
		this.initializeMiddlewares();
		this.initializeControllers(controllers);
		this.initializeErrorHandling();
	}

	private initializeMiddlewares() {
		this.app.use(cors({
			origin: '*'
		}));
		this.app.use(helmet());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

	}

	private initializeErrorHandling() {
		this.app.use(errorHandler);
	}



	private initializeControllers(controllers: Controller[]) {
		controllers.forEach((controller: Controller) => {
			this.app.use('/', controller.router);
		});

		// catch 404 and forward to error handler
		this.app.use('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
			next(new NotFoundError("The requested resource doesn't exist"));
		});
	}



	public listen() {
		this.app.listen(this.port, () => {
			console.log(`App listening on the port ${this.port}`);
		});
	}
}

export default App;

