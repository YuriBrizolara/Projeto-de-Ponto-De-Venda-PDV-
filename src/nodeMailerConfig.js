const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
const send = (to, subject, text, res) => {
    try {
        transporter.sendMail(
            {
                from: process.env.MAIL_FROM,
                to,
                subject,
                text,
            });
        return res;
    } catch (error) {

        return res.status(400).json('Erro ao efetuar o envio do email');
    };
};
module.exports = send;
