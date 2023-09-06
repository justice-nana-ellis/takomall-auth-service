import nodemailer from "nodemailer";
export const sendEmail = (template: string, to: string, subject: string) => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        // service: "gmail",
        auth: {
            user: "e6439d92c0b124",
            pass: "dd41bbe420e654"
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const mailOptions = {
        from: `Takomall <${process.env.USER_EMAIL}>`,
        to,
        subject,
        html: template,
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return error;
        } else {
            return "Email sent";
        }
    });
};