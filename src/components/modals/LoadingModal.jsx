import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../features/modals/modalSlice";
const useStyles = makeStyles((_) => {
  return {
    loadingIndicator: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center,",
    },
  };
});

export const LoadingModal = ({ isVisible }) => {
  const [open, setOpen] = useState(isVisible);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      TransitionProps={{ onExited: handleOnExited }}
      fullWidth={false}
    >
      <DialogTitle>Loading...</DialogTitle>
      <DialogContent className={classes.loadingIndicator}>
        <CircularProgress color="secondary" />
      </DialogContent>
    </Dialog>
  );
};
