export declare class UserController {
    static signup(req: any, res: any, next: any): Promise<void>;
    static verify(req: any, res: any, next: any): Promise<void>;
    static resendVerificationEmail(req: any, res: any, next: any): Promise<void>;
    static login(req: any, res: any, next: any): Promise<void>;
    static updatePassword(req: any, res: any, next: any): Promise<void>;
    static sendResetPassword(req: any, res: any, next: any): Promise<void>;
    static updateProfilePic(req: any, res: any, next: any): Promise<void>;
    static test(req: any, res: any, next: any): Promise<void>;
}
