import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../features/modals/modalSlice";
import { useHistory } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

// Confirmation function holders
// this was made because redux actions cannot
// contain non-serializable data

export const ConfirmationModal = ({ isVisible, title, message, type }) => {
  const [open, setOpen] = useState(isVisible);

  const history = useHistory();
  const dispatch = useDispatch();

  const functions = {
    LOGOUT: {
      handlePositivePressed: () => {
        dispatch(logout());
        history.replace("/auth/login");
        dispatch(hideModal());
      },
      handleNegativePressed: (dispatch) => {
        dispatch(hideModal());
      },
    },
  };
  const { handleNegativePressed, handlePositivePressed } = functions[type];

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };

  return (
    <Dialog open={open} onClose={handleOnClose} onExited={handleOnExited}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={() => {
            handleNegativePressed(dispatch);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="text"
          onClick={() => {
            handlePositivePressed(dispatch, history);
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
