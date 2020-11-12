"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentRouter_1 = require("../controllers/CommentRouter");
const CheckError_1 = require("../middleware/CheckError");
const CommentValidators_1 = require("../validators/CommentValidators");
class CommentRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() { }
    postRoutes() {
        //id of that post where comment is going to add. This is basically called param.
        this.router.post('/add/:id', CheckError_1.GlobalCheckErrorMiddleWare.authentication, CommentValidators_1.CommentValidators.addComment(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, CommentRouter_1.CommentController.addComment);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', CheckError_1.GlobalCheckErrorMiddleWare.authentication, CommentValidators_1.CommentValidators.editComment(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, CommentRouter_1.CommentController.editComment);
    }
    deleteRoutes() {
        this.router.delete('/delete/:id', CheckError_1.GlobalCheckErrorMiddleWare.authentication, CommentValidators_1.CommentValidators.deleteComment(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, CommentRouter_1.CommentController.deleteComment);
    }
}
exports.default = new CommentRouter().router;
