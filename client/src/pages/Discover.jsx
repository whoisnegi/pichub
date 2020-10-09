import React, { Fragment, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { setPublicPosts } from "../redux/actions/postActions";
import MainCard from "../components/MainCard";
import Progress from "../components/Progress";

const Dashboard = ({ posts, setPosts, isAuth }) => {
    useEffect(() => {
        setPosts();
    }, [setPosts]);

    console.log(posts)
    const render = posts ? (
        <Fragment>
            <Grid container direction="row">
                <Grid item md={3} sm={2} xs={1}></Grid>
                <Grid item md={6} sm={8} xs={10}>
                    {posts &&
                        posts.map((post) => (
                            <MainCard key={post._id} post={post} />
                        ))}
                </Grid>
            </Grid>
        </Fragment>
    ) : (
        <Progress />
    );

    return render;
};

const mapStateToProps = (state) => {
    return {
        posts: state.publicRoot.posts,
        isAuth: state.userRoot.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPosts: () => {
            dispatch(setPublicPosts());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
