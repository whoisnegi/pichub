import React, { useState } from "react";
import { Avatar, Typography, Paper, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import MuiInput from "../components/MuiInput";
import { connect } from "react-redux";
import httpRequest from "../config/axiosConfig";
import {
    updateUserAction,
    updateAvatarAction,
    removeAvatarAction,
} from "../redux/actions/profileActions";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Progress from "../components/Progress";

const useStyles = makeStyles((theme) => ({
    placement: {
        margin: "20px 40px",
        padding: theme.spacing(3),
        paddingLeft: "30%",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "10%",
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    pb: {
        paddingBottom: theme.spacing(4),
    },
    ml: {
        marginLeft: theme.spacing(10),
    },
    input: {
        display: "none",
    },
    label: {
        color: "#efb6b2",
        fontWeight: "700",
        textDecoration: "none",
        "&:hover": {
            cursor: "pointer",
            fontWeight: "500",
        },
    },
    username: {
        fontFamily: "Montserrat",
        fontSize: "23px",
        fontWeight: "400",
    },
    textStyles: {
        fontSize: "16px",
        position: "relative",
        top: "8px",
        fontWeight: "500",
        color: "#9e9e9e",
    },
}));

const userExist = async (value) => {
    const option = {
        data: { username: value },
        url: "user/username/check",
        method: "POST",
    };
    const res = await httpRequest(option);
    return res.data.result;
};

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => {
        if (val.length > 0) {
            valid = false;
        }
    });
    return valid;
};

const EditProfileForm = ({
    user,
    updateUserProfile,
    updateAvatar,
    removeAvatar,
}) => {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = async (e) => {
        setOpen(true);
        let file = e.target.files[0];
        const types = ["image/png", "image/jpeg", "image/jpg"];
        if (file && types.includes(file.type)) {
            setFile(file);
            setError("");
            const bodyFormData = new FormData();
            bodyFormData.append("avatar", file);
            await updateAvatar(bodyFormData);
            setOpen(false);
        } else {
            setError("Please select an image file (png/jpeg)");
            setFile(null);
        }
    };

    const handleRemoveProfilePhoto = async (e) => {
        if (user.avatar === undefined || user.avatar.length === 0) {
            toast.error("No profile pic found !");
        } else {
            setOpen(true);
            await removeAvatar();
            setOpen(false);
        }
    };

    const [values, setValues] = useState({
        username: user ? user.username : "",
        name: user ? user.name : "",
        age: user ? user.age : "",
        bio: user ? user.bio : "",
    });

    const [errors, setErrors] = useState({
        username: "",
        name: "",
        bio: "",
        age: "",
    });

    const { username, name, age, bio } = values;

    const handleChange = (name) => async (e) => {
        let value = e.target.value;
        let err = errors;

        setValues({ ...values, [name]: value });

        switch (name) {
            case "name":
                err.name =
                    value.length < 5 && value.length !== 0
                        ? "Name must be of 5 characters long"
                        : "";
                break;
            case "age":
                if (isNaN(value)) {
                    err.age = "Age must be anumber";
                } else if (!isNaN(value) && (value < 1 || value > 120)) {
                    err.age = "Age must be between 1 to 120";
                }
                if (value === "") {
                    err.age = "";
                }
                break;
            case "bio":
                err.bio =
                    value.length > 100 && value.length !== 0
                        ? "You can add upto 100 letters only"
                        : "";
                break;
            case "username":
                err.username = (await userExist(value))
                    ? "Username already exists"
                    : "";
                break;
            default:
                break;
        }
        setErrors({ ...err });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm(errors)) {
            let data = values;
            for (let i in data) {
                if (data[i] === "") {
                    delete data[i];
                }
            }
            await updateUserProfile(data);
            toast.success("Profile Updated");
            setTimeout(() => {
                history.goBack();
            }, 1000);
        } else {
            toast.error("Please provide valid inputs");
        }
    };

    return user ? (
        <Paper className={classes.placement} elevation={3}>
            <Grid container className={classes.pb}>
                <Grid item xs={1}>
                    {open ? (
                        <Loader color="secondary" />
                    ) : (
                        <Avatar
                            alt={user.name}
                            src={
                                user.avatar
                                    ? user.avatar.imageUrl
                                    : "https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png"
                            }
                            className={classes.large}
                        />
                    )}
                </Grid>

                <Grid item xs={6} className={classes.ml}>
                    <Typography variant="h6" className={classes.username}>
                        {user.username}
                    </Typography>
                    <input
                        onChange={handleFileChange}
                        accept="image/*"
                        className={classes.input}
                        id="input-button-file"
                        type="file"
                    />
                    <label htmlFor="input-button-file">
                        <Typography
                            variant="overline"
                            display="inline"
                            className={classes.label}
                        >
                            Change Profile Photo
                        </Typography>
                    </label>

                    <Typography
                        variant="overline"
                        display="inline"
                        className={classes.label}
                        style={{
                            marginLeft: "10px",
                        }}
                        onClick={handleRemoveProfilePhoto}
                    >
                        Remove Profile Photo
                    </Typography>

                    <div>
                        <Link to="/forget-password" className={classes.label}>
                            <Typography
                                variant="overline"
                                display="inline"
                                className={classes.label}
                            >
                                Change Password
                            </Typography>
                        </Link>
                    </div>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <Grid container className={classes.pb}>
                <Grid item xs={1}>
                    <Typography variant="button" className={classes.textStyles}>
                        Username
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.ml}>
                    <MuiInput
                        label="Username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={handleChange("username")}
                        error={errors.username}
                    />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <Grid container className={classes.pb}>
                <Grid item xs={1}>
                    <Typography variant="button" className={classes.textStyles}>
                        Name
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.ml}>
                    <MuiInput
                        label="Name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={handleChange("name")}
                        error={errors.name}
                    />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <Grid container className={classes.pb}>
                <Grid item xs={1}>
                    <Typography variant="button" className={classes.textStyles}>
                        Age
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.ml}>
                    <MuiInput
                        label="Age"
                        name="age"
                        type="text"
                        value={age}
                        onChange={handleChange("age")}
                        error={errors.age}
                    />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <Grid container className={classes.pb}>
                <Grid item xs={1}>
                    <Typography variant="button" className={classes.textStyles}>
                        Bio
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.ml}>
                    <MuiInput
                        label="Bio"
                        name="bio"
                        type="text"
                        multiline={true}
                        rows={3}
                        value={bio}
                        onChange={handleChange("bio")}
                        error={errors.bio}
                    />
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>

            <Grid container className={classes.pb}>
                <Grid item xs={1}></Grid>
                <Grid
                    item
                    xs={6}
                    className={classes.ml}
                    style={{ textAlign: "right" }}
                >
                    <Button variant="outlined" onClick={handleSubmit}>
                        Update Profile
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    ) : (
        <Progress />
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userRoot.user,
    };
};

const mapDispatchToprops = (dispatch) => {
    return {
        updateUserProfile: (data) => dispatch(updateUserAction(data)),
        updateAvatar: (formData) => dispatch(updateAvatarAction(formData)),
        removeAvatar: () => dispatch(removeAvatarAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToprops)(EditProfileForm);
