import { ViewState } from "@devexpress/dx-react-scheduler";
import { connectProps } from "@devexpress/dx-react-core";
import {
  Scheduler,
  Appointments,
  MonthView,
  Toolbar,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  ClientAppointmentTooltipContent,
  ClientAppointmentTooltipHeader,
} from "./ClientAppointmentTooltip";
import { useLocation } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MonthCell } from "./ClientAppointmentsSchedulerMonthCell";
import ClientAppointment from "./ClientAppointment";
import { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "100%",
      borderRadius: "10px",
      overflow: "hidden",
    },
    button: {
      color: theme.palette.background.default,
      padding: 0,
    },
    appointmentWrapper: {
      display: "flex",
      flexWrap: "wrap",
    },
  };
});

export const ClientAppointmentsScheduler = ({ data }) => {
  const classes = useStyles();
  const location = useLocation();
  const [appointmentVisible, setAppointmentVisible] = useState(false);
  const [notificationState, setNotificationState] = useState(location.state);
  const [isEditing, setIsEditing] = useState(false);

  const [appointmentMeta, setAppointmentMeta] = useState({
    target: null,
    data: {},
  });

  const handleOnAppointmentMetaChanged = ({ data, target }) => {
    setIsEditing(false);
    setAppointmentMeta({ data, target });
  };

  const tooltipHeader = connectProps(ClientAppointmentTooltipHeader, () => {
    return {
      setIsEditing,
      isEditing,
      setAppointmentVisible,
    };
  });
  const tooltipContent = connectProps(ClientAppointmentTooltipContent, () => {
    return {
      setIsEditing,
      isEditing,
      setAppointmentVisible,
      onAppointmentMetaChanged: handleOnAppointmentMetaChanged,
    };
  });

  const appointment = connectProps(ClientAppointment, () => {
    return {
      classes,
      setAppointmentVisible: setAppointmentVisible,
      onAppointmentMetaChange: handleOnAppointmentMetaChanged,
      notificationState,
      setNotificationState,
    };
  });
  return (
    <Paper className={classes.root}>
      <Scheduler height="auto" data={data} className={classes.root}>
        <ViewState />

        <MonthView timeTableCellComponent={MonthCell} />
        <Toolbar />
        <DateNavigator />
        <Appointments appointmentComponent={appointment} />
        <AppointmentTooltip
          headerComponent={tooltipHeader}
          contentComponent={tooltipContent}
          visible={appointmentVisible}
          onVisibilityChange={(visible) => setAppointmentVisible(visible)}
          appointmentMeta={appointmentMeta}
          onAppointmentMetaChange={handleOnAppointmentMetaChanged}
        />

        <AppointmentForm />
      </Scheduler>
    </Paper>
  );
};
