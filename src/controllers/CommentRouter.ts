import Comment from '../modals/Comment'


export class CommentController {


    static async addComment(req, res, next) {

        const content = req.body.content;
        const post = req.post;
        console.log("post", post);
        let postObj: any = { _id: post._id, comments: [] }

        try {
            const comment = new Comment({
                content: content,
                created_at: new Date(),
                updated_at: new Date()
            });
            postObj.comments.push(comment);
            await Promise.all([comment.save(), postObj.save()]);
            res.send(comment);

        } catch (e) {
            next(e)
        }

    }


}