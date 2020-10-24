import { Router } from 'express';
import { UserController } from '../controllers/UserControllers';

class UserRouter {

    public router: Router;


    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }


    getRoutes() {
        this.router.get('/login', UserController.login, UserController.test);
    }
    postRoutes() {

    }
    patchRoutes() {

    }
    deleteRoutes() {

    }

}

export default new UserRouter().router;