import User from "../modals/User";
import { validationResult } from 'express-validator'

export class UserController {

    static login(req, res, next) {
        // res.send('we are here to login');
        // const error = new Error('user does not exist');
        // next(error)

        // const email = req.body.email;
        // const password = req.body.password;
        // const user = new User({ email: email, password: password });


        // user.save().then((user) => {
        //     res.send(user);
        // }).catch(err => {
        //     next(err)
        // })


        const error = validationResult(req)

        if (!error.isEmpty()) {
            console.log(error.array())
        }

    }

    // static test(req, res, next) {
    //     console.log('called');

    // }
}