import Router from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import House from './domain/models/House';

import SessionController from './api/controllers/SessionController';
import HouseController from './api/controllers/HouseController';
import DashBoardController from './api/controllers/DashBoardController';
import ReservaController from './api/controllers/ReservaController';

const routes = new Router();
const upload = multer(uploadConfig);

// Session
routes.post('/sessions', SessionController.store);

// Houses
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/houses/:id', upload.single('thumbnail'), HouseController.update);
routes.delete('/houses', HouseController.destroy);

// Dashboard
routes.get('/dashboard', DashBoardController.show);

// Reserva
routes.post('/houses/:house_id/reserva', ReservaController.store);


export default routes;