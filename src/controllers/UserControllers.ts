import { body, validationResult } from 'express-validator'
import User from '../modals/User';
import { NodeMailer } from '../utils/NodeMailer';
import { Utils } from '../utils/Utils';
import * as Bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariable } from '../environments/env';

export class UserController {

    static async signup(req, res, next) {
        let d = req.body;
        const email = d.email;
        const password = d.password;
        const username = d.username;
        const verificationToken = Utils.generateVerificationToken();

        let MAX_TOKEN_TIME = new Utils().MAX_TOKEN_TIME;
        try {
            const hash = await Utils.encryptPassword(req.password);
            const data = {
                email: email,
                password: hash,
                username: username,
                verified: false,
                verification_token: verificationToken,
                verification_token_time: Date.now() + MAX_TOKEN_TIME
            }

            let user = await new User(data).save();

            res.send(user);

            //SEND VERIFICATION EMAIL
            await NodeMailer.sendEmail({
                to: ['rahulgbu13@gmail.com'],
                subject: 'Email Verification',
                html: `<h1>${verificationToken}</h1>`
            })

        }
        catch (e) {
            next(e);
        }
    }

    static async verify(req, res, next) {

        const verificationToken = req.body.verification_token;
        const email = req.user.email;

        try {
            const user = await User.findOneAndUpdate({
                email: email,
                verification_token: parseInt(verificationToken),
                verification_token_time: { $gt: Date.now() }

            }, { verified: true }, { new: true });

            if (user) {
                res.send(user);
            } else {
                throw new Error('Verification Token Is Expired. PLease Request For a new One.')
            }
        } catch (e) {
            console.log("ee", e);

            next(e)
        }
    }



    static async resendVerificationEmail(req, res, next) {
        // console.log(re)
        const email = req.user.email;
        const verificationToken = Utils.generateVerificationToken();
        try {
            const user = await User.findOneAndUpdate({ email: email }, {
                verification_token: verificationToken,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
            })

            if (user) {
                //SEND VERIFICATION EMAIL
                console.log("verification code:", verificationToken)
                await NodeMailer.sendEmail({
                    to: ['rahulgbu13@gmail.com'],
                    subject: 'Email Verification',
                    html: `<h1>${verificationToken}</h1>`
                })

                res.json({
                    success: true
                })

            } else {
                throw Error('User Does not Exist')
            }

        }
        catch (e) {
            next(e)
        }
    }

    static async login(req, res, next) {
        let d = req.body;
        const email = d.email;
        const password = d.password;
        const user = req.user;

        try {
            await Utils.comparePassword({ plainPassword: password, encryptPassword: user.password });
            const data = { user_id: req.user._id, email: req.user.email }
            const token = Jwt.sign(data, getEnvironmentVariable().jwt_secret, { expiresIn: '120d' });
            const response = { user: user, toke: token };
            res.json(response)
        } catch (e) {
            next(e);
        }

    }

    static async updatePassword(req, res, next) {
        const user_id = req.user.user_id;
        const password = req.body.password;
        const newPassword = req.body.new_password;

        try {
            User.findOne({ _id: user_id }).then(async (user: any) => {
                await Utils.comparePassword({ plainPassword: password, encryptPassword: user.password })
            });
            const encryptPassword = await Utils.encryptPassword(newPassword);

            const newUser = await User.findOneAndUpdate({ _id: user_id }, { password: encryptPassword }, { new: true });

            res.send(newUser);
        }
        catch (e) {
            next(e);
        }

    }

}