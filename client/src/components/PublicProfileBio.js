import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { setFollowUser, setUnFollowUser } from "../redux/actions/postActions";
import { Redirect } from "react-router-dom";
const UserBio = ({
    user,
    classes,
    postCount,
    userId,
    followUser,
    unFollowUser,
    loggedInUser,
}) => {
    const {
        typographyStyles,
        imgCenter,
        usernameStyles,
        lowFontWeightStyles,
        nameBioStyles,
    } = classes;

    if (user) {
        const id = user._id;
    }

    return (
        user &&
        (loggedInUser._id === userId ? (
            <Redirect to="/profile" />
        ) : (
            <Grid container item xs={12}>
                <Grid item xs={4} className={imgCenter}>
                    <img
                        src={
                            user.avatar
                                ? user.avatar.imageUrl
                                : "https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png"
                        }
                        alt="profile pic"
                        width="180px"
                        style={{ borderRadius: 100 }}
                    ></img>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h4" className={usernameStyles}>
                        {user.username}

                        {/* Follow/Unfollow Button  */}

                        {console.log(loggedInUser.following, user._id)}
                        {loggedInUser.following.some(
                            (follow) => follow.userId.toString() === user._id
                        ) ? (
                            <Button
                                variant="outlined"
                                style={{ marginLeft: "40px" }}
                                onClick={() => unFollowUser(userId)}
                            >
                                Unfollow
                            </Button>
                        ) : (
                            <Button
                                variant="outlined"
                                style={{ marginLeft: "40px" }}
                                onClick={() => followUser(userId)}
                            >
                                Follow
                            </Button>
                        )}
                    </Typography>
                    <Typography className={typographyStyles}>
                        {postCount.length}{" "}
                        <span className={lowFontWeightStyles}>posts</span>
                    </Typography>
                    <Typography className={typographyStyles}>
                        {user.followers.length ? user.followers.length : 0}{" "}
                        <span className={lowFontWeightStyles}>followers</span>
                    </Typography>
                    <Typography className={typographyStyles}>
                        {user.following.length ? user.following.length : 0}{" "}
                        <span className={lowFontWeightStyles}>following</span>
                    </Typography>
                    <div style={{ marginTop: "1.5rem" }}>
                        <Typography variant="button" className={nameBioStyles}>
                            {user.name}
                        </Typography>
                    </div>
                    <Typography className={lowFontWeightStyles}>
                        {user.bio
                            ? user.bio
                            : "Update your bio! So that people know you better"}
                    </Typography>
                </Grid>
            </Grid>
        ))
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        followUser: (userId) => dispatch(setFollowUser(userId)),
        unFollowUser: (userId) => dispatch(setUnFollowUser(userId)),
    };
};

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.userRoot.user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBio);
