import User from "../models/user";
import jwt from "jsonwebtoken";
import emailAccountActivation from "../utils/emailAccountActivation";

class UserAuthControl {
    static async signup(req, res) {
        try {
            const { name, username, email, password } = req.body;
            //check if same email exists or not
            let userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(406).json({
                    error: "Email already exists.",
                });
            }

            // Set token for email i.e, valid for 10 minutes
            const token = jwt.sign(
                {
                    name,
                    username,
                    email,
                    password,
                },
                process.env.JWT_ACCOUNT_ACTIVATION,
                { expiresIn: "10m" }
            );

            /* ****************
                Mail Format
            ******************* */
            const emailSubject = "Account activation link for PicHub.";

            const emailFormat = `
                <h1 style="text-align: center;color: RED;">
                PicHub
                </h1><hr/>
                <h3>Dear ${name},</h3>
                <h4>You are one step closer to Activate Your Account</h4>
                <h3>Please use the following link to activate your account</h3>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p><hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `;

            // Send Mail
            emailAccountActivation(email, emailSubject, emailFormat);

            res.status(200).json({
                message: `Email has been sent to ${email}.
        Follow the instruction to Activate Your Account`,
            });
        } catch (e) {
            res.status(400).json({
                statusCode: 400,
                error: e.message,
                message: err.message,
            });
        }
    }

    static async accountActivation(req, res) {
        const { token } = req.body;

        if (token) {
            jwt.verify(
                token,
                process.env.JWT_ACCOUNT_ACTIVATION,
                (err, decodedToken) => {
                    if (err) {
                        return res.status(401).json({
                            error: "Expired Link. SignUp Again",
                        });
                    }
                    const { name, username, email, password } = jwt.decode(
                        token
                    );

                    const user = new User({
                        name,
                        username,
                        email,
                        password,
                    });

                    user.save((err, user) => {
                        if (err) {
                            return res.status(401).json({
                                error: "Error saving user in DB",
                            });
                        }
                        return res.json({
                            message: "Signup Success. Please SignIn.",
                        });
                    });
                }
            );
        } else {
            return res.json({
                message: "Something went wrong. Try Again.",
            });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findByCredentials(email, password);
            const token = await user.generateAuthToken();
            res.json({
                user,
                token,
                statusCode: 200,
                message: "Login Success",
                error: "",
            });
        } catch (e) {
            res.status(400).send({
                statusCode: 400,
                error: e.message,
                // error: 'Invalid Credentials',
                message: "",
            });
        }
    }

    static async logout(req, res) {
        try {
            req.user.tokens = req.user.tokens.filter((objToken) => {
                // [{id, token}, {id, token}..]
                return objToken.token !== req.token;
            });
            await req.user.save();
            res.status(200).json({
                statusCode: 200,
                message: "Logout successfully",
                error: "",
            });
        } catch (e) {
            res.status(500).json({
                statusCode: 500,
                error: "Server Error",
                message: "",
            });
        }
    }

    static async logoutAll(req, res) {
        try {
            req.user.tokens = [];
            await req.user.save();
            res.status(200).json({
                statusCode: 200,
                message: "Logout successfully",
                error: "",
            });
        } catch (e) {
            res.status(500).json({
                statusCode: 500,
                error: "Server Error",
                message: "",
            });
        }
    }

    static async forgetPassword(req, res) {
        const { email } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    error: "User with that Email Address does not exist",
                });
            }

            // Set token for email ie, valid for 10 minutes
            const token = jwt.sign(
                { _id: user._id, name: user.name },
                process.env.JWT_RESET_PASSWORD,
                {
                    expiresIn: "10m",
                }
            );

            /* ****************
      Mail Format
      ******************* */
            const emailSubject = "Password Reset link for PicHub.";

            const emailFormat = `
        <h1 style="text-align: center;color: RED;">
          PicHub
        </h1><hr/>
        <h3>Please use the following link to reset your password.</h3>
        <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p><hr />
        <p>This email may contain sensetive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `;

            // Send Mail
            emailAccountActivation(email, emailSubject, emailFormat);

            return user.updateOne(
                { resetPasswordLink: token },
                (err, success) => {
                    if (err) {
                        return res.status(400).json({
                            error:
                                "Database connection error on user password forget request",
                        });
                    } else {
                        return res.json({
                            message: `Email has been sent to ${email}.
              Follow the instruction to reset your password.`,
                        });
                    }
                }
            );
        } catch (e) {
            res.status(400).send({
                statusCode: 400,
                error: e.message,
                message: "",
            });
        }
    }

    static async resetPassword(req, res) {
        const { resetPasswordLink, newPassword } = req.body;

        if (resetPasswordLink) {
            jwt.verify(
                resetPasswordLink,
                process.env.JWT_RESET_PASSWORD,
                async (err, decoded) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Expired link. Try Again.",
                        });
                    }

                    const user = await User.findById(decoded._id);

                    user.password = newPassword;

                    await user.save();

                    res.json({
                        message:
                            "Great! Now you can login with your New Password.",
                    });
                }
            );
        }
    }
}

export default UserAuthControl;
