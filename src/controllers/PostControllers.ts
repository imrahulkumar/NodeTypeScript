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

    static async getPostByUser(req, res, next) {
        const userId = req.user.user_id;
        try {
            // const post = await Post.find({ user_id: userId }).exec(); //When not populate the comment.
            const post = await Post.find({ user_id: userId }).populate('comments').exec(); // When need to populate the comment also.
            res.send(post);

        } catch (e) {
            next(e);
        }
    }

}