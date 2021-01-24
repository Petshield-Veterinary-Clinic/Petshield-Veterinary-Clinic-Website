import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../../modals/modalSlice";
import { useHistory } from "react-router-dom";
import { fetchClientAppointments } from "../../clientsSlice";
import { DayPicker, LocalizationProvider, PickersDay } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import moment from "moment-timezone";
import classnames from "classnames";

const useStyles = makeStyles((theme) => {
  return {
    root: {},
    loadingIndicator: {
      width: "300px",
      height: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center,",
    },
    hasAppointment: {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: theme.palette.common.white,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    selected: {
      backgroundColor: `#424242 !important`,
      color: theme.palette.common.white,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  };
});

export const ClientAppointmentsModal = ({ isVisible, clientIndex }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isVisible);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const history = useHistory();
  const { isAppointmentsLoading, clientAppointments, clients } = useSelector(
    (state) => state.clients
  );

  const client = clients[clientIndex];
  const dispatch = useDispatch();

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };

  const handleOnDateChanged = (value) => {
    setSelectedDate(value);
    const appointment = clientAppointments.find((a) =>
      moment(a.date).isSame(value, "date")
    );

    if (appointment) {
      setOpen(!isVisible);

      history.push("/clients/appointments", {
        appointment,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchClientAppointments({ clientId: client.ID }));
  }, [dispatch, client]);

  const renderContent = () => {
    if (isAppointmentsLoading) {
      return (
        <div className={classes.loadingIndicator}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DayPicker
          date={selectedDate}
          onChange={handleOnDateChanged}
          disableHighlightToday
          allowSameDateSelection
          renderDay={(date, _selectedDates, PickersDayComponentProps) => (
            <CustomDay
              classes={classes}
              date={date}
              selectedDate={selectedDate}
              _selectedDates={_selectedDates}
              PickersDayComponentProps={PickersDayComponentProps}
              appointments={clientAppointments}
            />
          )}
          allowKeyboardControl={false}
        />
      </LocalizationProvider>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      TransitionProps={{ onExited: handleOnExited }}
    >
      <DialogTitle style={{ textAlign: "center" }}>Appointments</DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose}>DONE</Button>
      </DialogActions>
    </Dialog>
  );
};

const CustomDay = ({
  date,
  classes,
  _selectedDates,
  selectedDate,
  PickersDayComponentProps,
  appointments,
}) => {
  const adjustedDate = moment(date).tz("Asia/Manila");
  // Check if the client has an appointment
  const hasAppointment =
    appointments.find((a) => {
      const appointmentDate = moment(a.date).tz("Asia/Manila");
      return appointmentDate.isSame(adjustedDate, "date");
    }) !== undefined;

  const isSelected = moment(selectedDate).isSame(date, "date");
  return (
    <PickersDay
      className={classnames({
        [classes.hasAppointment]: hasAppointment,
        [classes.selected]: isSelected,
      })}
      {...PickersDayComponentProps}
    ></PickersDay>
  );
};
