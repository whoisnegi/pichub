import React, {
  Fragment,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import AccountImage from "../images/Account_Activation.png";
import { toast } from "react-toastify";
import Axios from "axios";
import jwt from "jsonwebtoken";

const useStyles = makeStyles((theme) => ({
  nameStyle: {
    fontWeight: "bold",
    color: "crimson",
  },
  paperStyle: {
    margin: "10% auto",
    width: "60%",
    padding: theme.spacing(5),
    textAlign: "center",
  },
}));

const AccountActivation = ({ match, history }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    token: "",
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
      // setValues({ ...values, token });
    }
  }, []);

  // const name = "bhavleen";
  const { name, token } = values;
  // const { token } = values;

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((response) => {
        toast.success(response.data.message);

        setTimeout(() => {
          history.push("/signin");
        }, 4000);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const accountActivate = () => (
    <Paper elevation={4} className={classes.paperStyle}>
      <h1 className="logo">PicHub</h1>
      <h3 className="mb">
        Hey{" "}
        <span className={classes.nameStyle}>{name}</span>,
        Ready to activate your account?
      </h3>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Activate Account
      </Button>
    </Paper>
  );

  return (
    <Fragment>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{
          minHeight: "90vh",
        }}
      >
        <Grid item xs={12} md={6}>
          {accountActivate()}
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          className="bg"
          style={{
            minHeight: "90vh",
          }}
        >
          <img
            src={AccountImage}
            alt="acountsvg"
            className="thumbImage"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AccountActivation;
