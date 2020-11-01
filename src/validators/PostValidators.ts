import { body, query } from 'express-validator'
import User from '../modals/User';

export class PostValidators {

    static addPost() {
        return [
            body('content', 'Post is required').isString()
        ]
    }


}