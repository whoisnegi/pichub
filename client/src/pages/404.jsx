import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

const FallBack = () => {
    return (
        <div style={{ textAlign: "center", height: "77vh" }}>
            <h2 style={{ marginTop: "7%", letterSpacing: "1px" }}>
                Ooops! Look like you've got lost...
            </h2>
            <img
                alt="404"
                src="https://res.cloudinary.com/dnja3kt1q/image/upload/v1602294456/logo/404_a68e8s.png"
            />
            <br />
            <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to="/signup"
                size="large"
                endIcon={<HomeRoundedIcon />}
            >
                Go Home
            </Button>
        </div>
    );
};

export default FallBack;
