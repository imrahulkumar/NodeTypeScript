
import { body, query } from 'express-validator'
import User from '../modals/User';

export class UserValidators {

    static signup() {
        return [
            body('email', 'Email is Required').isEmail()
                .custom((email, { req }) => {
                    return User.findOne({ email: email }).then((user) => {
                        if (user) {
                            throw new Error('User Already Exist')
                        } else {
                            return true;
                        }
                    });
                }),
            body('password', 'Password is Required').isAlphanumeric()
                .isLength({ min: 0, max: 20 }).withMessage('Password can be from 8-20 characters only'),
            body('username', 'User Name is Required').isString()
        ];
    }

    static verifyUser() {
        return [
            body('verification_token', 'Verifiction Token is Required').isNumeric(),
            body('email', 'Email is required').isEmail()
        ]
    }

    static resendVerificationEmail() {
        return [query('email', 'Email is required').isEmail()]
    }

}