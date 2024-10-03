import express from 'express';
import mongoose from 'mongoose';
import routes from './route';

class App {
    
    constructor() {
        this.server = express();

        mongoose.connect('mongodb+srv://luizm14tk:devhouse@devhouse.doesr.mongodb.net/?retryWrites=true&w=majority&appName=DevHouse', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        this.middlewares();
        this.routes();
    }
    

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

}

export default new App().server;