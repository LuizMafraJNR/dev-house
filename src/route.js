import Router from 'express';
import SessionController from './api/controllers/SessionController'; muklt
import HouseController from './api/controllers/HouseController';
import multer from 'multer';
import uploadConfig from './config/upload';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/houses', upload.single('thumbnail'), HouseController.store);

export default routes;