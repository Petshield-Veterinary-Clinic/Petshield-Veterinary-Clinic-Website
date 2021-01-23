import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../../modals/modalSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import moment from "moment";

import { AddAppointmentForm } from "./AddAppointmentForm";
import { fetchClients, addAppointment } from "../../clientsSlice";
const useStyles = makeStyles((theme) => {
  return {
    content: {
      display: "flex",
      height: "400px",
      width: "100%",
      alignItems: "flex-start",
      padding: theme.spacing(2),
      flexDirection: "column",
    },
  };
});

export const AddAppointmentModal = ({ isVisible, startDate, clientIndex }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isVisible);
  const [isVaccine, setIsVaccine] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!clientIndex) {
      dispatch(fetchClients());
    }
  }, [dispatch, clientIndex]);

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnSubmit = (data) => {
    // Convert date to milliseconds
    const formattedDate = moment(data.date).toISOString();
    dispatch(
      addAppointment({
        clientId: data.client.ID,
        appointment: { ...data, date: formattedDate },
      })
    );
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
      fullWidth
    >
      <DialogTitle>Schedule Appointment</DialogTitle>
      <DialogContent className={classes.content}>
        <FormControlLabel
          label="For Vaccine"
          control={
            <Checkbox
              checked={isVaccine}
              onChange={(e) => setIsVaccine(e.target.checked)}
            />
          }
        />
        <AddAppointmentForm
          onSubmit={handleOnSubmit}
          startDate={startDate}
          isVaccine={isVaccine}
          clientIndex={clientIndex}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleOnClose}>
          Cancel
        </Button>
        <Button form="addAppointmentForm" variant="outlined">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
