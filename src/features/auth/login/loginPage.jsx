import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Paper, Typography } from "@material-ui/core";
import LoginForm from "./loginForm";
import { logIn } from "../authSlice";
import { Redirect } from "react-router-dom";
import bg from "../../../assets/login_background.png";
import logo from "../../../assets/logo.png";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    background: {
      height: "100vh",
      width: "100%",
      position: "absolute",
      top: "0",
      left: "0",
      backgroundImage: `url(${bg})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      filter: "blur(4px)",
    },
    container: {
      display: "grid",
      width: "100%",
      height: "100%",
      maxHeight: "500px",
      maxWidth: "500px",
      gridTemplate: "1fr 1fr 1fr/ 1fr",
      placeContent: "center",
      padding: "1em",
      zIndex: 2,
    },
    loading: {
      display: "grid",
      width: "100%",
      height: "100%",
      placeContent: "center",
    },

    centerItem: {
      display: "grid",
      placeSelf: "center",
    },

    logo: {
      position: "fixed",
      top: "0",
      margin: "1em auto",
      width: "80px",
      height: "80px",
      zIndex: 2,
    },
  };
});

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  const handleSubmit = (data) => {
    dispatch(logIn(data));
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={classes.loading}>
          <CircularProgress color="primary" />
        </div>
      );
    }

    if (Object.keys(user).length === 0) {
      return (
        <Paper variant={"outlined"} className={classes.container}>
          <Typography
            className={classes.centerItem}
            align="center"
            variant={"h5"}
          >
            Petshield Veterinary Clinic
          </Typography>
          <div>
            <LoginForm onSubmit={handleSubmit} />
            <Button
              color="primary"
              form="loginForm"
              type="submit"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
          </div>
        </Paper>
      );
    } else {
      return <Redirect to="/home/dashboard" />;
    }
  };

  return (
    <Paper className={classes.root} elevation={0}>
      <img className={classes.logo} src={logo} alt="logo"></img>
      <div className={classes.background}></div>
      {renderContent()}
    </Paper>
  );
};

export default LoginPage;
