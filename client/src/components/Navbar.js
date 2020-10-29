import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Avatar,
    Button,
    IconButton,
    Switch,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { setUserSignout } from "../redux/actions/authActions";
import { connect } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Public";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        height: 65,
    },
}));

const Navbar = (props) => {
    const classes = useStyles();

    const handleClick = () => {
        props.setUserSignout();
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="inherit" className="navContainer">
                <Toolbar>
                    <Typography variant="h4" className="navTitle">
                        <Link className="navTitle underline" to="/">
                            PicHub
                        </Link>
                    </Typography>

                    <Switch
                        color="default"
                        checked={props.checked}
                        onChange={props.onChange}
                    />

                    {props.isAuth ? (
                        <Fragment>
                            <IconButton component={Link} to="/dashboard">
                                <HomeIcon />
                            </IconButton>
                            <IconButton component={Link} to="/discover">
                                <PublicIcon />
                            </IconButton>
                            <Link to="/profile">
                                <IconButton>
                                    <Avatar
                                        alt={props.user.name}
                                        src={
                                            props.user.avatar
                                                ? props.user.avatar.imageUrl
                                                : "https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png"
                                        }
                                    />
                                </IconButton>
                            </Link>
                            <Link to="/" className="underline">
                                <Button
                                    variant="outlined"
                                    onClick={handleClick}
                                    color="primary"
                                >
                                    Signout
                                </Button>
                            </Link>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button component={Link} to="/">
                                Home
                            </Button>
                            <Button component={Link} to="/signin">
                                Login
                            </Button>
                            <Button component={Link} to="/signup">
                                SignUp
                            </Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.userRoot.isAuthenticated,
        user: state.userRoot.user,
    };
};

export default connect(mapStateToProps, { setUserSignout })(Navbar);
