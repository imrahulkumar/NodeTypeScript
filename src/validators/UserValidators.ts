import { format } from "path";
import { body } from 'express-validator'

import * as Joi from 'joi'

export class UserValidators {

    static login() {
        return [
            body('username', 'Username is Required').isString(),
            body('email', 'Email is Required').isEmail(),
            body('password').custom((value,req:any) => {       
                if (req.body.email) {
                    return true
                }
                else {
                    throw new Error('Testing Custom Validation');
                }
            })]
    }


    // static login() {
    // return [body('username', 'Username is Required').isString(),
    // body('email', 'Email is Required').isEmail()]


    // const schema = Joi.object().keys({ 
    //     username: Joi.string().message.alphanum().min(3).max(30).required(),
    //     email: Joi.number().integer().min(1970).max(2013), 
    //   }); 


    // }

}