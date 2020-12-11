import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../features/modals/modalSlice";
const useStyles = makeStyles((_) => {
  return {};
});

export const ErrorModal = ({ isVisible, message, duration }) => {
  const [open, setOpen] = useState(isVisible);
  const dispatch = useDispatch();

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };

  const handleOnEnter = () => {
    setTimeout(
      () => {
        setOpen(!isVisible);
      },
      duration ? duration : 2000
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      onEnter={handleOnEnter}
      TransitionProps={{ onExited: handleOnExited }}
    >
      <DialogTitle>Error!</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
