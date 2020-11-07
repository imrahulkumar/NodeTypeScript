import { body, query, param } from 'express-validator'
import Post from '../modals/Post'


export class CommentValidators {

    static addComment() {
        return [
            body('content', 'Content is required').isString(),
            param('id').custom(async (id, { req }) => {
                try {
                    let isFound = await Post.findOne({ _id: id });
                    if (isFound) {
                        req.post = isFound;
                        return true;
                    }
                    else {
                        throw new Error('Post Does Not Exist');
                    }
                } catch (e) {
                    throw new Error(e);
                }
            })

        ]
    }

    static editComment() {
        return [
            body('content', 'Content is Required').isString()
        ]
    }


}