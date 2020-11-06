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
        this.router.get('/me', GlobalCheckErrorMiddleWare.authentication, PostController.getPostByUser)
        this.router.get('/all', GlobalCheckErrorMiddleWare.authentication, PostController.getAllPosts)
        this.router.get('/:id', GlobalCheckErrorMiddleWare.authentication, PostValidators.getPostId(), GlobalCheckErrorMiddleWare.checkError, PostController.getPostById)
    }

    postRoutes() {
        this.router.post('/add', GlobalCheckErrorMiddleWare.authentication, PostValidators.addPost(), GlobalCheckErrorMiddleWare.checkError, PostController.addPost)
    }

    patchRoutes() { }
    deleteRoutes() { }

}

export default new PostRouter().router;