import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import { hideModal } from "../../features/modals/modalSlice";
import { hideInfoModal } from "../../features/modals/infoModalSlice";

export const ErrorModal = ({ isVisible, message, duration, isInfoModal }) => {
  const [open, setOpen] = useState(isVisible);
  const dispatch = useDispatch();

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    if (isInfoModal) {
      dispatch(hideInfoModal());
    } else {
      dispatch(hideModal());
    }
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
      TransitionProps={{ onExited: handleOnExited, onEnter: handleOnEnter }}
    >
      <DialogTitle>Error!</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
