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


        //PAGINATION LOGIC BEGIN

        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 2;
        let currentPage = page;
        let prevPage = page === 1 ? null : page - 1;
        let pageToken = page + 1;  // next page
        let totalPage;

        //PAGINATION LOGIC END


        try {
            // const post = await Post.find({ user_id: userId }).exec(); //When not populate the comment.
            // const post = await Post.find({ user_id: userId }).populate('comments').exec(); // When need to populate the comment also.
            // res.send(post);

            // estimatedDocumentCount is efficent than countDocument but did not accept criteria fields 
            const postCount = await Post.countDocuments({ user_id: userId });
            totalPage = Math.ceil(postCount / perPage);

            if (totalPage === page || totalPage === 0) {
                pageToken = null;
            }
            const posts = await Post.find({ user_id: userId }, { __v: 0, user_id: 0 })
                .populate('').limit(perPage).skip((perPage * page) - perPage);

            res.json({
                post: posts,
                totalPage: totalPage,
                currentPage: currentPage,
                prevPage: prevPage,
                nextPage: pageToken
            })

        } catch (e) {
            next(e);
        }
    }

}