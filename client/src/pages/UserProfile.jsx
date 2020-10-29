import React, { useEffect, useState } from "react";
import { Grid, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import UploadDialog from "../components/UploadDialog";
import { setProfile } from "../redux/actions/profileActions";
import UserBio from "../components/UserBio";
import ProfileTab from "../components/ProfileTab";
import Progress from "../components/Progress";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
    typographyStyles: {
        fontWeight: 500,
        display: "inline",
        marginRight: "8%",
    },
    usernameStyles: {
        fontFamily: "Montserrat",
        fontWeight: "300",
        fontSize: "1.8rem",
        margin: "0.9rem 0 1.5rem 0",
    },
    nameBioStyles: {
        fontSize: "15px",
        fontWeight: "500",
    },
    lowFontWeightStyles: {
        fontWeight: 200,
        fontSize: "0.9rem",
    },
    imgCenter: {
        textAlign: "center",
    },
    gridImg: {
        marginTop: "40px",
    },
    input: {
        display: "none",
    },
    photoUploadStyle: {
        marginTop: "20px",
        textAlign: "center",
    },
    errorStyle: {
        margin: "auto",
        marginTop: "10px",
    },
}));

function UserProfile({ isAuth, setProfileData, profile }) {
    const classes = useStyles();
    const [showProgress, setShowProgress] = useState(false);
    const [error, setError] = useState("");

    const { gridImg, photoUploadStyle } = classes;

    useEffect(() => {
        setProfileData();
    }, [setProfileData]);

    return profile.posts ? (
        <Grid container className="mt">
            <Grid item md={2}></Grid>
            <Grid container item md={8} xs={12} direction="column">
                {/* Users Bio */}
                <UserBio
                    user={profile.user}
                    classes={classes}
                    postCount={profile.posts.length}
                    showFollowButton={false}
                />

                {/* Photo upload Modal*/}
                <Grid item xs={12} className={photoUploadStyle}>
                    <UploadDialog
                        setShowProgress={setShowProgress}
                        setError={setError}
                    />
                </Grid>
                {error && (
                    <Typography
                        variant="caption"
                        color="error"
                        className={classes.errorStyle}
                    >
                        {error}
                    </Typography>
                )}

                {/* Uploading Loader */}
                {showProgress && (
                    <div
                        className={classes.root}
                        style={{
                            marginTop: "20px",
                            textAlign: "center",
                        }}
                    >
                        <LinearProgress color="secondary" />
                    </div>
                )}

                <ProfileTab
                    posts={profile.posts}
                    gridImg={gridImg}
                    user={profile.user}
                />
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    ) : (
        <Progress />
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileRoot,
        isAuth: state.userRoot.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProfileData: () => {
            dispatch(setProfile());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
