import * as nodeMailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport'


export class NodeMailer {

    private static initializeTransport() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }))
    }


    static sendEmail(data: { to: [string], subject: string, html: string }) {
       NodeMailer.initializeTransport().sendMail({
           from:'rahulgbu13@gmail.com',
           to:data.to,
           subject:data.subject,
           html:data.html
       })
    }

}