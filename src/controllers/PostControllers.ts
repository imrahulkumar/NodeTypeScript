import Post from "../modals/Post";


export class PostController {

    static async addPost(req, res, next) {
        const userId = req.user.user_id;
        const content = req.body.content;
        const postObj = {
            user_id: userId,
            content: content,
            created_at: new Date(),
            updated_at: new Date()
        };

        try {
            let post = await new Post(postObj).save();
            res.send(post);
        } catch (e) {
            next(e);
        }


    }


}