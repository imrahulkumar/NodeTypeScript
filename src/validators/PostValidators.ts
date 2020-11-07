import { body, param, query } from 'express-validator'
import Post from '../modals/Post'

export class PostValidators {

    static addPost() {
        return [
            body('content', 'Post is required').isString()
        ]
    }

    static getPostId() {
        return [param('id').custom((id, { req }) => {
            return Post.findOne({ _id: id }).then((post) => {
                if (post) {
                    req.post = post;
                    return true;
                } else {
                    throw new Error('Post Not Exist');
                }
            })

        })]
    }

    static editPost() {
        return [
            body('content', 'Post is required').isString()
        ]
    }

}