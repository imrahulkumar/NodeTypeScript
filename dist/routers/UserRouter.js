"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserControllers_1 = require("../controllers/UserControllers");
const CheckError_1 = require("../middleware/CheckError");
const Utils_1 = require("../utils/Utils");
const UserValidators_1 = require("../validators/UserValidators");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        //STEP 3: To resend the verification
        this.router.get('/send/verification/email', UserValidators_1.UserValidators.resendVerificationEmail(), UserControllers_1.UserController.resendVerificationEmail);
        //STEP 4: To reset the password
        this.router.get('/reset/password', UserValidators_1.UserValidators.sendResetPassword(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, UserControllers_1.UserController.sendResetPassword);
        //To check the index
        this.router.get('/test', UserControllers_1.UserController.test);
    }
    postRoutes() {
        //STEP 1 : To create a user using signup
        this.router.post('/signup', UserValidators_1.UserValidators.signup(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, UserControllers_1.UserController.signup);
        this.router.post('/login', UserValidators_1.UserValidators.login(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, UserControllers_1.UserController.login);
    }
    patchRoutes() {
        //STEP 2 : To verify the email
        this.router.patch('/verify', UserValidators_1.UserValidators.verifyUser(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, UserControllers_1.UserController.verify);
        //STEP 5 : To update the password
        this.router.patch('/update/password', CheckError_1.GlobalCheckErrorMiddleWare.authentication, UserValidators_1.UserValidators.updatePassword(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, UserControllers_1.UserController.updatePassword);
        //STEP 6 : To update the profile pic.
        this.router.patch('/update/profilePic', CheckError_1.GlobalCheckErrorMiddleWare.authentication, new Utils_1.Utils().multer.single('profile_pic'), UserValidators_1.UserValidators.updateProfilePic(), CheckError_1.GlobalCheckErrorMiddleWare.checkError, UserControllers_1.UserController.updateProfilePic);
    }
    deleteRoutes() {
    }
}
exports.default = new UserRouter().router;
