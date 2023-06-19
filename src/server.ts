import { config } from './config/config';

import App from './app';
import PodController from './pods/pods.controller';
import PodLocalController from './podsLocal/podsLocal.controller';

import MainController from './main/main.controller';


const controllers = [new PodController(), new MainController(), new PodLocalController()];

const app = new App(controllers, config.port);

app.listen();
