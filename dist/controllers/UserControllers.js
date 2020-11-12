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
exports.UserController = void 0;
const User_1 = require("../modals/User");
const Utils_1 = require("../utils/Utils");
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
const Emailjs_1 = require("../utils/Emailjs");
const TemplateEmailjs_1 = require("../utils/TemplateEmailjs");
class UserController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let d = req.body;
            const email = d.email;
            const password = d.password;
            const username = d.username;
            const verificationToken = Utils_1.Utils.generateVerificationToken();
            let MAX_TOKEN_TIME = new Utils_1.Utils().MAX_TOKEN_TIME;
            try {
                const hash = yield Utils_1.Utils.encryptPassword(password);
                const data = {
                    email: email,
                    password: hash,
                    username: username,
                    verified: false,
                    verification_token: verificationToken,
                    verification_token_time: Date.now() + MAX_TOKEN_TIME
                };
                let user = yield new User_1.default(data).save();
                res.send(user);
                //SEND VERIFICATION EMAIL
                let templateParams = { name: data.username, verificationToken: data.verification_token, to: email };
                let templateId = new TemplateEmailjs_1.EmailTemplate().emailTemplate.emailVerification.templateId;
                Emailjs_1.Emailjs.sendEmail({ template_id: templateId, template_params: templateParams });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static verify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificationToken = req.body.verification_token;
            const email = req.body.email;
            try {
                const user = yield User_1.default.findOneAndUpdate({
                    email: email,
                    verification_token: parseInt(verificationToken),
                    verification_token_time: { $gt: Date.now() }
                }, { verified: true }, { new: true });
                if (user) {
                    res.send(user);
                }
                else {
                    throw new Error('Verification Token Is Expired. PLease Request For a new One.');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static resendVerificationEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.query.email;
            const verificationToken = Utils_1.Utils.generateVerificationToken();
            try {
                const user = yield User_1.default.findOneAndUpdate({ email: email }, {
                    verification_token: verificationToken,
                    verification_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME
                });
                if (user) {
                    //SEND VERIFICATION EMAIL  
                    let templateParams = { name: user.username, verificationToken: verificationToken, to: email };
                    let templateId = new TemplateEmailjs_1.EmailTemplate().emailTemplate.emailVerification.templateId;
                    Emailjs_1.Emailjs.sendEmail({ template_id: templateId, template_params: templateParams });
                    res.json({ success: true });
                }
                else {
                    throw Error('User Does not Exist');
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let d = req.body;
            const email = d.email;
            const password = d.password;
            const user = req.user;
            try {
                yield Utils_1.Utils.comparePassword({ plainPassword: password, encryptPassword: user.password });
                const data = { user_id: req.user._id, email: req.user.email };
                const token = Jwt.sign(data, env_1.getEnvironmentVariable().jwt_secret, { expiresIn: '120d' });
                const response = { user: user, toke: token };
                res.json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const password = req.body.password;
            const newPassword = req.body.new_password;
            try {
                yield User_1.default.findOne({ _id: user._id }).then((user) => __awaiter(this, void 0, void 0, function* () {
                    yield Utils_1.Utils.comparePassword({ plainPassword: password, encryptPassword: user.password });
                }));
                const encryptPassword = yield Utils_1.Utils.encryptPassword(newPassword);
                const newUser = yield User_1.default.findOneAndUpdate({ _id: user._id }, { password: encryptPassword }, { new: true });
                res.send(newUser);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static sendResetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.query.email;
            const resetPasswordToken = Utils_1.Utils.generateVerificationToken();
            try {
                let updateUser = yield User_1.default.findOneAndUpdate({ email: email }, {
                    updated_at: new Date(), reset_password_token: resetPasswordToken,
                    reset_password_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME
                }, { new: true });
                res.send(updateUser);
                //SEND RESET VERIFICATION EMAIL
                let templateParams = { name: updateUser.username, verificationToken: resetPasswordToken, to: email };
                let templateId = new TemplateEmailjs_1.EmailTemplate().emailTemplate.resetPaswordEmail.templateId;
                Emailjs_1.Emailjs.sendEmail({ template_id: templateId, template_params: templateParams });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static updateProfilePic(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.user_id;
                const fileUrl = 'https://localhost:5000/' + req.file.path;
                const user = yield User_1.default.findOneAndUpdate({ _id: userId }, { updated_at: new Date(), profile_pic_url: fileUrl }, { new: true });
                res.send(user);
            }
            catch (e) {
                next(e);
            }
        });
    }
    //Single Field Indexing 
    // static async test(req, res, next) {
    //     const user = await User.find({ email: 'ashish.k@mailinator.com' })
    //                       .setOptions({explain:'executionStats'});
    //                       res.send(user)
    // }
    // Multi Field Indexing
    static test(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.find({ email: 'rahul.k@mailinator.com',
                password: '$2b$10$5mRQr1IU5SjQfDR6WeKNJOoLcZB9IiFg0i81tdgSWReXRKV7Cm5VG"' })
                .setOptions({ explain: 'executionStats' });
            res.send(user);
        });
    }
}
exports.UserController = UserController;
