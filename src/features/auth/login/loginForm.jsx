import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      width: "100%",
    },
    textField: {
      paddingBottom: "1em",
    },
  };
});

const LoginForm = ({ onSubmit }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const { register, errors, handleSubmit } = useForm();

  const handleShowPasswordPressed = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      id="loginForm"
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        className={classes.textField}
        variant="outlined"
        label="Username"
        name="username"
        size="small"
        helperText={!!errors.username ? "This field is required!" : ""}
        inputRef={register({
          required: true,
        })}
        error={!!errors.username}
      />
      <TextField
        className={classes.textField}
        variant="outlined"
        label="Password"
        name="password"
        size="small"
        helperText={!!errors.password ? "This field is required!" : ""}
        type={showPassword ? "text" : "password"}
        inputRef={register({
          required: true,
        })}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton onClick={handleShowPasswordPressed}>
                {showPassword ? (
                  <VisibilityOff color="secondary" />
                ) : (
                  <Visibility color="secondary" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={!!errors.password}
      />
    </form>
  );
};
export default LoginForm;
