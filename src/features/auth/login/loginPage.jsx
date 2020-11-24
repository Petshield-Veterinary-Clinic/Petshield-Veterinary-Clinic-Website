import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import LoginForm from "./loginForm";
import { checkAuth, logIn } from "../authSlice";
import { Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.palette.background.default,
      boxSizing: "border-box",
    },
    container: {
      display: "flex",
      width: "100%",
      maxWidth: "600px",
      flexDirection: "column",
      border: "1px solid red",
      borderColor: theme.palette.secondary.main,
      padding: "1em",
    },
  };
});

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = (data) => {
    dispatch(logIn(data));
  };

  const renderContent = () => {
    if (isLoading) {
      return <CircularProgress />;
    }

    if (Object.keys(user).length === 0) {
      return (
        <Paper className={classes.container}>
          <Typography align="center" variant="h4">
            Petshield Veterinary Clinic
          </Typography>
          <LoginForm onSubmit={handleSubmit} />
          <Button form="loginForm" type="submit" variant="contained">
            Login
          </Button>
        </Paper>
      );
    } else {
      return <Redirect to="/home/dashboard" />;
    }
  };

  return <div className={classes.root}>{renderContent()}</div>;
};

export default LoginPage;
