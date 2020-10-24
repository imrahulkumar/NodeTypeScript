import { nextTick } from "process";

export class UserController {

    static login(req, res, next) {
        // res.send('we are here to login');
        const error = new Error('user does not exist');
        next(error)
    }

    static test(req, res, next) {
        console.log('called');

    }
}