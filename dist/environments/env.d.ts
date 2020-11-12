export interface Environment {
    db_url: string;
    jwt_secret: string;
    emailjs_com: {
        service_id: string;
        user_id: string;
    };
}
export declare function getEnvironmentVariable(): Environment;
