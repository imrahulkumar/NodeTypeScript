import { validationResult } from 'express-validator'
import User from '../modals/User';
import { NodeMailer } from '../utils/NodeMailer';
import { Utils } from '../utils/Utils';
import * as Bcrypt from 'bcrypt';
import { nextTick } from 'process';
import { rejects } from 'assert';

export class UserController {

    static async signup(req, res, next) {
        let d = req.body;
        const email = d.email;
        const password = d.password;
        const username = d.username;
        const verificationToken = Utils.generateVerificationToken();

        let MAX_TOKEN_TIME = new Utils().MAX_TOKEN_TIME;
        try {
            const hash = await UserController.encryptPassword(req, res, next);
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
        const email = req.body.email;

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
        const email = req.query.email;
        const verificationToken = Utils.generateVerificationToken();
        try {
            const user = await User.findOneAndUpdate({ email: email }, {
                verification_token: verificationToken,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
            })

            if (user) {
                //SEND VERIFICATION EMAIL
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

        User.findOne({ email: email }).then((user: any) => {
            Bcrypt.compare(password, user.password, (err, same) => {
                res.send(same)
            })
        })
    }


    private static async encryptPassword(req, res, next) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(hash)
                }
            })
        })
    }

}