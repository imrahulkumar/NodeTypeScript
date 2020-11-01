import { body, query } from 'express-validator'

export class PostValidators {

    static addPost() {
        return [
            body('content', 'Post is required').isString()
        ]
    }


}