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
const useStyles = makeStyles((_) => {
  return {};
});

export const ConfirmationModal = ({
  isVisible,
  title,
  message,
  handlePositivePressed,
  handleNegativePressed,
}) => {
  const [open, setOpen] = useState(isVisible);
  const dispatch = useDispatch();

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
        <Button variant="text" onClick={handleNegativePressed}>
          Cancel
        </Button>
        <Button variant="text" onClick={handlePositivePressed}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
