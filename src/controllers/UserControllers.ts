import { validationResult } from 'express-validator'
import User from '../modals/User';
import { NodeMailer } from '../utils/NodeMailer';
import { Utils } from '../utils/Utils';

export class UserController {

    static async signup(req, res, next) {
        const error = validationResult(req);
        let d = req.body;
        const email = d.email;
        const password = d.password;
        const username = d.username;
        const verificationToken = Utils.generateVerificationToken();

        let MAX_TOKEN_TIME = new Utils().MAX_TOKEN_TIME
        const data = {
            email: email,
            password: password,
            username: username,
            verified: false,
            verification_token: verificationToken,
            verification_token_time: Date.now() + MAX_TOKEN_TIME
        }

        try {
            let user = await new User(data).save();
            res.send(user);

            //SEND VERIFICATION EMAIL
            await  NodeMailer.sendEmail({
                to: ['rahulgbu13@gmail.com'],
                subject: 'Email Verification',
                html: `<h1>${verificationToken}</h1>`
            })
            // console.log("a:::", a);


          
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
}