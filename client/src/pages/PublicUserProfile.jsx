import React, { useEffect, lazy, Suspense } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { setPublicProfileData } from "../redux/actions/profileActions";
import LoaderImage from "../images/placeholder.gif";
import PublicProfileBio from "../components/PublicProfileBio";
import Progress from "../components/Progress";

const Card2 = lazy(() => import("../components/Card2"));

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
        fontFamily: 'Montserrat',
        fontWeight: "300",
        fontSize: "1.8rem",
        margin: "0.9rem 0 1.5rem 0",
    },
    nameBioStyles: {
        fontSize: "15px",
        fontWeight: "500"
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
}));

function UserProfile({ setProfile, publicProfile }) {
    const classes = useStyles();
    const { gridImg } = classes;

    const { userId } = useParams();
    useEffect(() => {
        setProfile(userId);
    }, [setProfile, userId]);

    return publicProfile ? (
        <Grid container style={{ marginTop: "20px"}}>
            <Grid item md={2}></Grid>
            <Grid container item md={8} xs={12} direction="column">
                {/* Users Bio */}
                <PublicProfileBio
                    user={publicProfile.user}
                    classes={classes}
                    postCount={publicProfile.posts}
                    userId={userId}
                />

                {/* User Posts */}
                <Grid container item xs={12} className={gridImg}  >
                    {publicProfile.posts &&
                        publicProfile.posts.map((post) => (
                            <Grid item xs={4} key={post._id}>
                                <Suspense
                                    fallback={
                                        <img
                                            src={LoaderImage}
                                            alt="loader_image"
                                            width={345}
                                        />
                                    }
                                >
                                    <Card2 post={post} />
                                </Suspense>
                            </Grid>
                        ))}
                </Grid>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    ) : (
        <Progress />
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfile: (userId) => dispatch(setPublicProfileData(userId)),
    };
};

const mapStateToProps = (state) => {
    return {
        publicProfile: state.publicRoot.publicProfile,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
