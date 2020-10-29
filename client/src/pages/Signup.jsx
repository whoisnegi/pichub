import React, { Fragment, useState } from "react";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
} from "@material-ui/core";
import MuiInput from "../components/MuiInput";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "axios";
import { isAuth } from "../utils/helper";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Loader from "../components/Loader";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "50%",
        margin: "5% auto 0px auto",
        padding: theme.spacing(4),
        textAlign: "center",
    },
    formBottom: {
        width: "50%",
        margin: "10px auto",
        padding: theme.spacing(4),
        textAlign: "center",
    },
    mb: {
        marginBottom: theme.spacing(4),
    },
    loader: {
        marginLeft: "7.5rem",
        marginBottom: "1.5rem",
    },
}));

const Signup = ({ history }) => {
    const classes = useStyles();

    const [values, setValues] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        showPassword: false,
    });

    const [errors, setErrors] = useState({});

    const [open, setOpen] = useState(false);

    const { username, name, email, password, showPassword } = values;

    const handleChange = (name) => (event) => {
        validate({ [name]: event.target.value });

        setValues({ ...values, [name]: event.target.value });
    };

    // Show Password Text
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    // Validations
    const validate = (values) => {
        let temp = { ...errors };

        if ("username" in values)
            temp.username =
                username.length >= 2
                    ? ""
                    : "Minimum characters length should be 3.";

        if ("name" in values)
            temp.name =
                name.length >= 2
                    ? ""
                    : "Minimum characters length should be 3.";

        if ("email" in values)
            temp.email = /[\D\d]{4}@[\D]{4}.[\D]{3}/.test(email)
                ? ""
                : "Email Address is not Valid.";

        if ("password" in values)
            temp.password =
                password.length > 5 ? "" : "Minimum 7 characters are required.";

        setErrors({ ...temp });

        if (values) return Object.values(temp).every((x) => x === "");
    };

    // Button Submit Event
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values });
        setOpen(true);

        Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/user`,
            data: { username, name, email, password },
        })
            .then((response) => {
                setValues({
                    ...values,
                    username: "",
                    name: "",
                    email: "",
                    password: "",
                });

                toast.success(response.data.message);
                setOpen(false);

                setTimeout(() => {
                    history.push("/signin");
                }, 3000);
            })
            .catch((error) => {
                setValues({ ...values });
                toast.error(error.response.data.error);
                setOpen(false);
            });
    };

    const signupForm = () => (
        <Paper className={classes.form} elevation={3}>
            <h1 className="logo">PicHub</h1>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <MuiInput
                    label="Username"
                    name="username"
                    type="text"
                    className={classes.mb}
                    value={username}
                    onChange={handleChange("username")}
                    error={errors.username}
                />
                <MuiInput
                    label="Name"
                    name="name"
                    type="text"
                    className={classes.mb}
                    value={name}
                    onChange={handleChange("name")}
                    error={errors.name}
                />
                <MuiInput
                    label="Email Address"
                    name="email"
                    type="email"
                    className={classes.mb}
                    value={email}
                    onChange={handleChange("email")}
                    error={errors.email}
                />
                <MuiInput
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={classes.mb}
                    value={password}
                    onChange={handleChange("password")}
                    error={errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={handleClickShowPassword}>
                                    {values.showPassword ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {open ? (
                    <div className={classes.loader}>
                        <Loader />
                    </div>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                    >
                        Sign Up
                    </Button>
                )}
            </form>
        </Paper>
    );

    return (
        <Fragment>
            {isAuth() ? <Redirect to="/dashboard" /> : null}
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
                        src="https://res.cloudinary.com/dnja3kt1q/image/upload/v1602294508/logo/signup_ooxhp0.png"
                        alt="signupsvg"
                        className="thumbImage"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    {signupForm()}
                    <Paper className={classes.formBottom} variant="outlined">
                        Have an account{" "}
                        <Link className="link" to="/signin">
                            Log In
                        </Link>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Signup;
