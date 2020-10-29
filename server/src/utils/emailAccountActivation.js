import nodeMailer from "nodemailer";

const emailAccountActivation = async (email, emailSubject, emailFormat) => {
    try {
        const { MY_EMAIL, MY_PASSWORD } = process.env;

        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: MY_EMAIL,
                pass: MY_PASSWORD,
            },
        });

        transporter.sendMail({
            from: MY_EMAIL,
            to: email,
            subject: emailSubject,
            html: emailFormat,
        });
    } catch (e) {
        console.log(e);
    }
};

export default emailAccountActivation;
