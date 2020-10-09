import { Button } from "@material-ui/core";
import React from "react";
import Image from "../images/404.png";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { Link } from "react-router-dom";

const FallBack = () => {
  return (
    <div style={{ textAlign: "center", height: "77vh" }}>
      <h2 style={{ marginTop: "7%", letterSpacing: "1px" }}>
        Ooops! Look like you've got lost...
      </h2>
      <img alt="404" src={Image} />
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
