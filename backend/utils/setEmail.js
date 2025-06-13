const nodemailer = require('nodemailer')


const sendEmail = options => {
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    const mailoption = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text

    }
    transport.sendMail(mailoption)
}
module.exports = sendEmail