"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const Post_1 = require("../modals/Post");
class PostController {
    static addPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.user_id;
            const content = req.body.content;
            const postObj = {
                user_id: userId,
                content: content,
                created_at: new Date(),
                updated_at: new Date()
            };
            try {
                let post = yield new Post_1.default(postObj).save();
                res.send(post);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getPostByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.user_id;
            //PAGINATION LOGIC BEGIN
            const page = parseInt(req.query.page) || 1;
            const perPage = parseInt(req.query.perPage) || 2;
            let currentPage = page;
            let prevPage = page === 1 ? null : page - 1;
            let pageToken = page + 1; // next page
            let totalPage;
            //PAGINATION LOGIC END
            try {
                // const post = await Post.find({ user_id: userId }).exec(); //When not populate the comment.
                // const post = await Post.find({ user_id: userId }).populate('comments').exec(); // When need to populate the comment also.
                // res.send(post);
                // estimatedDocumentCount is efficent than countDocument but did not accept criteria fields 
                const postCount = yield Post_1.default.countDocuments({ user_id: userId });
                totalPage = Math.ceil(postCount / perPage);
                if (page > totalPage) {
                    throw Error("Page Not Exist");
                }
                if (totalPage === page || totalPage === 0) {
                    pageToken = null;
                }
                const posts = yield Post_1.default.find({ user_id: userId }, { __v: 0, user_id: 0 })
                    .populate('').limit(perPage).skip((perPage * page) - perPage);
                res.json({
                    post: posts,
                    totalPage: totalPage,
                    currentPage: currentPage,
                    prevPage: prevPage,
                    nextPage: pageToken
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //PAGINATION LOGIC BEGIN
            const page = parseInt(req.query.page) || 1;
            const perPage = parseInt(req.query.perPage) || 2;
            let currentPage = page;
            let prevPage = page === 1 ? null : page - 1;
            let pageToken = page + 1; // next page
            let totalPage;
            //PAGINATION LOGIC END
            try {
                const postCount = yield Post_1.default.estimatedDocumentCount();
                totalPage = Math.ceil(postCount / perPage);
                if (page > totalPage) {
                    throw Error("Page Not Exist");
                }
                if (totalPage === page || totalPage === 0) {
                    pageToken = null;
                }
                const posts = yield Post_1.default.find({}, { __v: 0, user_id: 0 })
                    .populate('').limit(perPage).skip((perPage * page) - perPage);
                //Virtual Field Logic
                console.log("comment Count", posts[0].commentCount);
                res.json({
                    post: posts,
                    totalPage: totalPage,
                    currentPage: currentPage,
                    prevPage: prevPage,
                    nextPage: pageToken,
                    postCount: posts[0].commentCount
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getPostById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({
                post: req.post,
                commentCount: req.post.commentCount
            });
        });
    }
    static editPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = req.body.content;
            const postId = req.params.id;
            console.log("hello id", postId);
            try {
                const updatePost = yield Post_1.default.findOneAndUpdate({ _id: postId }, {
                    content: content,
                    updated_at: new Date()
                }, { new: true }).populate('comments');
                if (updatePost) {
                    res.send(updatePost);
                }
                else {
                    throw new Error('Post Does not Exist');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = req.post;
            try {
                yield post.remove();
                res.send(post);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.PostController = PostController;
