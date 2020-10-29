import React, { Fragment } from "react";
import {
    Grid,
    Typography,
    makeStyles,
    Avatar,
    Button,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "35px",
        border: `1.2px solid ${theme.palette.grey[300]}`,
        padding: theme.spacing(1),
        borderRadius: "3px",
        maxWidth: 200,
        boxShadow: "2px 2px 3px -2px rgba(0,0,0,0.75)",
        position: "sticky",
        top: theme.spacing(8),
    },
    avatar: {
        width: theme.spacing(14),
        height: theme.spacing(14),
    },
    container: {
        marginTop: theme.spacing(1),
    },
    ProfileButton: {
        textTransform: "none",
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        fontWeight: theme.typography.fontWeightMedium,
        margin: "auto",
    },
    username: {
        fontFamily: "Montserrat",
    },
}));

const UserDataTab = ({ user }) => {
    const classes = useStyles();
    const { root } = classes;

    const ChannelPhoto = ({ classes }) => {
        return (
            <Avatar
                alt={user.name}
                className={classes.avatar}
                src={
                    user.avatar
                        ? user.avatar.imageUrl
                        : "https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png"
                }
            />
        );
    };

    const UserName = ({ classes }) => {
        return (
            <div className={classes.container}>
                <Typography className={classes.username}>
                    @{user.username}
                </Typography>
            </div>
        );
    };

    const Name = () => {
        return (
            <Typography color="textSecondary" variant="caption">
                {user.name}
            </Typography>
        );
    };

    const ProfileButton = ({ classes }) => {
        return (
            <div className={classes.container}>
                <Button
                    endIcon={<ArrowForwardIcon />}
                    className={classes.ProfileButton}
                    variant="outlined"
                    size="small"
                    to="/profile"
                    component={Link}
                >
                    Profile
                </Button>
            </div>
        );
    };

    return (
        user && (
            <Fragment>
                <Grid
                    alignItems="center"
                    className={root}
                    container
                    direction="column"
                >
                    <ChannelPhoto classes={classes} />
                    <UserName classes={classes} />
                    <Name classes={classes} />
                    <ProfileButton classes={classes} />
                </Grid>
            </Fragment>
        )
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userRoot.user,
    };
};

export default connect(mapStateToProps)(UserDataTab);
