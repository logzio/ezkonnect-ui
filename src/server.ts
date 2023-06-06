import { config } from './config/config';

import App from './app';
import PodController from './pods/pods.controller';
import MainController from './main/main.controller';


const controllers = [new MainController(), new PodController()];

const app = new App(controllers, config.port);

app.listen();
