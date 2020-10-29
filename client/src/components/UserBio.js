import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function UserBio({ user, classes, postCount }) {
    const {
        typographyStyles,
        imgCenter,
        usernameStyles,
        lowFontWeightStyles,
        nameBioStyles,
    } = classes;

    return (
        user && (
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
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h4" className={usernameStyles}>
                        {user.username}
                        <Link to="/profile/edit" className="underline">
                            <Button
                                variant="outlined"
                                style={{
                                    marginLeft: "20px",
                                }}
                            >
                                EDIT PROFILE
                            </Button>
                        </Link>
                    </Typography>
                    <Typography className={typographyStyles}>
                        {postCount}{" "}
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
        )
    );
}

export default UserBio;
