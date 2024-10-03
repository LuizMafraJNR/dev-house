import Router from 'express';
import SessionController from './api/controllers/SessionController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

export default routes;