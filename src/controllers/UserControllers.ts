import { validationResult } from 'express-validator'
import User from '../modals/User';

export class UserController {

    static signup(req, res, next) {
        const error = validationResult(req);
        let d = req.body;
        const email = d.email;
        const password = d.password;
        const username = d.username;
        if (!error.isEmpty()) {
            next(new Error(error.array()[0].msg));
            return;
        }
        const data = {
            email: email,
            password: password,
            username: username
        }
        let user = new User(data);

        user.save().then((user) => {
            res.send(user)
        }).catch(err => {
            next(err)
        })

    }


}