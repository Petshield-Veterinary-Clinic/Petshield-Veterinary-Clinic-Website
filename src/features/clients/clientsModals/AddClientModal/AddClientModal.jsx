import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../../modals/modalSlice";
import { addClient } from "../../clientsSlice";
import { AddClientForm } from "./AddClientForm";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    form: {
      display: "flex",
      flexDirection: "column",
    },
    field: {
      marginBottom: theme.spacing(2),
    },
    fieldGroup: {
      display: "grid",
      gridTemplate: "1fr / 1fr 1fr",
      gridGap: theme.spacing(2),
    },
  };
});

export const AddClientModal = ({ isVisible }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isVisible);
  const dispatch = useDispatch();

  const handleOnSubmit = (data) => {
    const parsedData = {
      ...data,
      pet: {
        petName: data.petName,
        species: data.petSpecies,
        petBreed: data.petBreed,
      },
    };

    dispatch(addClient(parsedData));
    dispatch(hideModal());
  };

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
      fullWidth
    >
      <DialogTitle>
        <Typography align="center" variant="h5">
          Add Client
        </Typography>
      </DialogTitle>
      <DialogContent>
        <AddClientForm classes={classes} onSubmit={handleOnSubmit} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>Cancel</Button>
        <Button form="addClientForm" type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
