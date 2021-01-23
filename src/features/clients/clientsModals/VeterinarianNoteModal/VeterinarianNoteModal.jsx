import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { updateClient } from "../../clientsSlice";
import { hideModal } from "../../../modals/modalSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    content: {
      display: "flex",
      height: "400px",
      width: "400px",
      alignItems: "center",
      padding: theme.spacing(2),
    },
  };
});

export const VeterinarianNoteModal = ({ isVisible, index }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isVisible);
  const { clients } = useSelector((state) => state.clients);
  const client = useMemo(() => clients[index], [index, clients]);
  const [veterinarianNote, setVeterinarianNote] = useState(
    client.veterinarianNote ? client.veterinarianNote : ""
  );

  const dispatch = useDispatch();

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnSubmit = () => {
    const newClient = { ...client, veterinarianNote: veterinarianNote };
    dispatch(updateClient(newClient));
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
      className={classes.root}
    >
      <DialogTitle>Add Veterinarian Note</DialogTitle>
      <div className={classes.content}>
        <TextField
          fullWidth
          label="Note"
          multiline
          rows={10}
          value={veterinarianNote}
          onChange={(e) => setVeterinarianNote(e.target.value)}
        />
      </div>
      <DialogActions>
        <Button variant="outlined" onClick={handleOnClose}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleOnSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
