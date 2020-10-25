import { validationResult } from 'express-validator'
import User from '../modals/User';

export class UserController {

    static async signup(req, res, next) {
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
        
        try {
            let user = await new User(data).save();
            res.send(user);
        }
        catch (e) {
            next(e);
        }



    }


}