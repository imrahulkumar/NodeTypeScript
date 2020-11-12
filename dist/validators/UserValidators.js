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
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../modals/User");
class UserValidators {
    static signup() {
        return [
            express_validator_1.body('email', 'Email is Required').isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        throw new Error('User Already Exist');
                    }
                    else {
                        return true;
                    }
                });
            }),
            express_validator_1.body('password', 'Password is Required').isAlphanumeric()
                .isLength({ min: 0, max: 20 }).withMessage('Password can be from 8-20 characters only'),
            express_validator_1.body('username', 'User Name is Required').isString()
        ];
    }
    static verifyUser() {
        return [
            express_validator_1.body('verification_token', 'Verifiction Token is Required').isNumeric(),
        ];
    }
    static resendVerificationEmail() {
        return [express_validator_1.query('email', 'Email is required').isEmail()];
    }
    static login() {
        return [express_validator_1.body('email', 'Email is required').isEmail().custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }),
            express_validator_1.body('password', 'Password is Required').isAlphanumeric()];
    }
    static updatePassword() {
        return [
            express_validator_1.body('email', 'Email is Required').custom((email, { req }) => {
                return User_1.default.findOne({ email: email }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }),
            express_validator_1.body('password', 'Password is Required').isAlphanumeric(),
            express_validator_1.body('new_password', 'New Password is Required').isAlphanumeric(),
            express_validator_1.body('reset_password_token', 'Reset Password Token is Required').isNumeric()
                .custom((token, { req }) => {
                if (new Date(req.user.reset_password_token_time).getTime() < Date.now()) {
                    throw new Error('Token is Expired.');
                }
                else if (Number(req.user.reset_password_token) === Number(token)) {
                    return true;
                }
                else {
                    req.errorStatus = 422;
                    throw new Error('Reset Password Token is Invalid. Please Try Again.');
                }
            })
        ];
    }
    static sendResetPassword() {
        return [
            express_validator_1.query('email', 'Email is Required').isEmail().custom((email, { req }) => __awaiter(this, void 0, void 0, function* () {
                return yield User_1.default.findOne({ email: email }).then((user) => {
                    if (user) {
                        return true;
                    }
                    else {
                        throw new Error("Email Does not Exist");
                    }
                });
            }))
        ];
    }
    static updateProfilePic() {
        return [
            express_validator_1.body('profile_pic').custom((profilePic, { req }) => {
                if (req.file) {
                    return true;
                }
                else {
                    throw new Error('File not uploaded');
                }
            })
        ];
    }
}
exports.UserValidators = UserValidators;
