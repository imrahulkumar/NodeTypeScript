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
exports.CommentValidators = void 0;
const express_validator_1 = require("express-validator");
const Comment_1 = require("../modals/Comment");
const Post_1 = require("../modals/Post");
class CommentValidators {
    static addComment() {
        return [
            express_validator_1.body('content', 'Content is required').isString(),
            express_validator_1.param('id').custom((id, { req }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let isFound = yield Post_1.default.findOne({ _id: id });
                    if (isFound) {
                        req.post = isFound;
                        return true;
                    }
                    else {
                        throw new Error('Post Does Not Exist');
                    }
                }
                catch (e) {
                    throw new Error(e);
                }
            }))
        ];
    }
    static editComment() {
        return [
            express_validator_1.body('content', 'Content is Required').isString()
        ];
    }
    static deleteComment() {
        return [
            express_validator_1.param('id').custom((id, { req }) => {
                return Comment_1.default.findOne({ _id: id }).then((comment) => {
                    if (comment) {
                        req.comment = comment;
                        return true;
                    }
                    else {
                        throw new Error("Comment Does Not Exist");
                    }
                });
            })
        ];
    }
}
exports.CommentValidators = CommentValidators;
