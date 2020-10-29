import React, { Fragment, useEffect, useState } from "react";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import jwt from "jsonwebtoken";
import axios from "axios";
import { toast } from "react-toastify";
import MuiInput from "../components/MuiInput";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Loader from "../components/Loader";

const useStyles = makeStyles((theme) => ({
    nameStyle: {
        fontWeight: "bold",
        color: "crimson",
    },
    paperStyle: {
        margin: "10% auto",
        width: "60%",
        padding: theme.spacing(5),
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

const ResetPassword = ({ match, history }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const [values, setValues] = useState({
        name: "",
        token: "",
        newPassword: "",
        showPassword: false,
    });

    useEffect(() => {
        let token = match.params.token;
        let name = jwt.decode(token);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const [errors, setErrors] = useState({});

    const { name, token, newPassword, showPassword } = values;

    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });

        validate({ [name]: event.target.value });
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

        if ("newPassword" in values)
            temp.newPassword =
                newPassword.length > 5
                    ? ""
                    : "Minimum 6 characters are required.";

        setErrors({ ...temp });

        if (values) return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(true);

        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: { newPassword, resetPasswordLink: token },
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

    const resetPasswordForm = () => (
        <Paper elevation={4} className={classes.paperStyle}>
            <h1 className="logo">PicHub</h1>
            <Typography variant="subtitle1" className={classes.mb}>
                Enter your New Secure Password.
            </Typography>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <MuiInput
                    label="New Password"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    className={classes.mb}
                    value={newPassword}
                    onChange={handleChange("newPassword")}
                    error={errors.newPassword}
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
                        className={classes.mb}
                        type="submit"
                    >
                        Reset Password
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
                    minHeight: "100vh",
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
                        src="https://res.cloudinary.com/dnja3kt1q/image/upload/v1602294511/logo/secure_qdvh09.png"
                        alt="securesvg"
                        className="thumbImage"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    {resetPasswordForm()}
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ResetPassword;
