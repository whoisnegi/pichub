import React, { Fragment, useEffect, useState } from "react";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import { toast } from "react-toastify";
import Axios from "axios";
import jwt from "jsonwebtoken";
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
    loader: {
        marginLeft: "7.5rem",
        marginBottom: "1.5rem",
    },
}));

const AccountActivation = ({ match, history }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        name: "",
        token: "",
    });

    useEffect(() => {
        let token = match.params.token;
        let { name } = jwt.decode(token);
        if (token) {
            setValues({ ...values, name, token });
        }
    }, []);

    const { name, token } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(true);

        Axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: { token },
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

    const accountActivate = () => (
        <Paper elevation={4} className={classes.paperStyle}>
            <h1 className="logo">PicHub</h1>
            <h3 className="mb">
                Hey <span className={classes.nameStyle}>{name}</span>, Ready to
                activate your account?
            </h3>
            {open ? (
                <div className={classes.loader}>
                    <Loader />
                </div>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Activate Account
                </Button>
            )}
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
                        src="https://res.cloudinary.com/dnja3kt1q/image/upload/v1602294463/logo/Account_Activation_rehypz.png"
                        alt="acountsvg"
                        className="thumbImage"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    {accountActivate()}
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default AccountActivation;
