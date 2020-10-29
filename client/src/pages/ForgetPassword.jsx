import React, { Fragment, useState } from "react";
import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import MuiInput from "../components/MuiInput";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "50%",
        margin: "5% auto 0px auto",
        padding: "20px",
        textAlign: "center",
    },
    mb: {
        marginBottom: theme.spacing(5),
    },
    loader: {
        marginLeft: "7.5rem",
        marginBottom: "1.5rem",
    },
}));

const ForgetPassword = ({ history }) => {
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);

    const [values, setValues] = useState({
        email: "",
    });

    const { email } = values;

    // Validations
    const validate = (values) => {
        let temp = { ...errors };

        if ("email" in values)
            temp.email = /[\D\d]{4}@[\D]{4}.[\D]{3}/.test(email)
                ? ""
                : "Email Address is not Valid.";

        setErrors({ ...temp });

        if (values) return Object.values(temp).every((x) => x === "");
    };

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });

        validate({ [name]: event.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpen(true);

        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API}/forget-password`,
            data: { email },
        })
            .then((response) => {
                toast.success(response.data.message);
                setOpen(false);

                setTimeout(() => {
                    history.push("/signin");
                }, 3000);
            })
            .catch((error) => {
                toast.error(error.response.data.error);
                setOpen(false);
            });
    };

    const passwordForgetForm = () => (
        <Paper className={classes.form} elevation={3}>
            <h1 className="logo">PicHub</h1>
            <Typography variant="subtitle1" gutterBottom>
                Enter your email and we will send you a password reset link.
            </Typography>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <MuiInput
                    label="Email Address"
                    name="email"
                    type="email"
                    className={classes.mb}
                    value={email}
                    onChange={handleChange("email")}
                    error={errors.email}
                />
                {open ? (
                    <div className={classes.loader}>
                        <Loader />
                    </div>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.mb}
                        type="submit"
                    >
                        Request Password Reset Link
                    </Button>
                )}
            </form>
        </Paper>
    );

    return (
        <Fragment>
            <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                style={{
                    minHeight: "90vh",
                }}
            >
                <Grid
                    item
                    xs={12}
                    md={6}
                    className="bg"
                    style={{
                        minHeight: "90vh",
                    }}
                >
                    <img
                        src="https://res.cloudinary.com/dnja3kt1q/image/upload/v1602294480/logo/forgot_password_xwmmbk.png"
                        alt="forgetsvg"
                        className="thumbImage"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    {passwordForgetForm()}
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ForgetPassword;
