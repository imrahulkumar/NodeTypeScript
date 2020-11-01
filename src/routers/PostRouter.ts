import { Router } from 'express';
import { PostController } from '../controllers/PostControllers';
import { UserController } from '../controllers/UserControllers';
import { GlobalCheckErrorMiddleWare } from '../middleware/CheckError';
import { Utils } from '../utils/Utils';
import { PostValidators } from '../validators/PostValidators';
import { UserValidators } from '../validators/UserValidators';

class PostRouter {

    public router: Router;


    constructor() {
        this.router = Router();

        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }


    getRoutes() {
     this.router.get('/me',GlobalCheckErrorMiddleWare.authentication,PostController.getPostByUser)
    }

    postRoutes() {
        this.router.post('/add', GlobalCheckErrorMiddleWare.authentication, PostValidators.addPost(), GlobalCheckErrorMiddleWare.checkError, PostController.addPost)
    }

    patchRoutes() { }
    deleteRoutes() { }

}

export default new PostRouter().router;