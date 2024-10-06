import Router from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import House from './domain/models/House';

import SessionController from './api/controllers/SessionController';
import HouseController from './api/controllers/HouseController';
import DashBoardController from './api/controllers/DashBoardController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/houses/:id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses', HouseController.destroy);

routes.get('/dashboard', DashBoardController.show);


export default routes;