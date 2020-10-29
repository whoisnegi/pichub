import React, { Fragment, useState } from "react";
import MuiInput from "../components/MuiInput";
import { toast } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { connect } from "react-redux";
import { setUserLogin } from "../redux/actions/authActions";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
} from "@material-ui/core";
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

const Signin = ({ setUser, error, removeLoginError, isAuth }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false,
    });

    const [errors, setErrors] = useState({});
    const { email, password, showPassword } = values;

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

        if ("email" in values)
            temp.email = /[\D\d*]{4}@[\D]{4}.[\D]{3}/.test(email)
                ? ""
                : "Email Address is not Valid.";

        if ("password" in values)
            temp.password =
                password.length > 5 ? "" : "Minimum 7 characters are required.";

        setErrors({ ...temp });

        if (values) return Object.values(temp).every((x) => x === "");
    };

    // Button Submit Event
    const handleSubmit = async (e) => {
        e.preventDefault();
        setValues({ ...values });
        setOpen(true);
        await setUser({ email, password });
        setOpen(false);
    };

    if (error) {
        toast.error(error);
        removeLoginError();
    }

    const loginForm = () => (
        <Paper className={classes.form} elevation={3}>
            {/* <Loader open={open}/> */}
            <h1 className="logo">PicHub</h1>
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
                        className={classes.mb}
                        type="submit"
                    >
                        Log In
                    </Button>
                )}

                <Link className="link" to="/forget-password">
                    Forgot Password?
                </Link>
            </form>
        </Paper>
    );

    if (isAuth) {
        return <Redirect to="/dashboard" />;
    }

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
                        src="https://res.cloudinary.com/dnja3kt1q/image/upload/v1602294502/logo/login_inx93e.png"
                        alt="loginsvg"
                        className="thumbImage"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    {loginForm()}
                    <Paper className={classes.formBottom} variant="outlined">
                        Don't have an account?{" "}
                        <Link className="link" to="/signup">
                            Sign Up
                        </Link>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUserLogin(user)),
        removeLoginError: () => dispatch({ type: "UNSET_LOGIN_ERROR" }),
    };
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.userRoot.isAuthenticated,
        error: state.userRoot.error,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
