import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, TextField, Button } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/lab";
import { Edit, Delete } from "@material-ui/icons";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateAppointment, removeAppointment } from "../../clientsSlice";
import moment from "moment";

const useStyles = makeStyles((theme) => {
  return {
    icon: {
      color: theme.palette.action.active,
    },
    textCenter: {
      textAlign: "center",
    },
    commandButton: {
      backgroundColor: "rgba(255,255,255,0.65)",
    },
    header: {
      display: "flex",

      justifyContent: "space-between",
    },
    form: {
      display: "flex",
      marginTop: theme.spacing(2),
      width: "100%",
      flexDirection: "column",
      gap: theme.spacing(2),
    },
  };
});

export const ClientAppointmentTooltipHeader = ({
  children,
  appointmentData,
  setIsEditing,
  isEditing,
  setAppointmentVisible,

  ...restProps
}) => {
  const dispatch = useDispatch();
  const handleOnDeletePressed = () => {
    const { appointment } = appointmentData;
    dispatch(removeAppointment({ appointmentId: appointment.ID }));
    setAppointmentVisible(false);
  };
  const classes = useStyles();
  return (
    <AppointmentTooltip.Header
      className={classes.header}
      {...restProps}
      appointmentData={appointmentData}
    >
      <IconButton onClick={handleOnDeletePressed}>
        <Delete color="error" />
      </IconButton>
      <IconButton onClick={() => setIsEditing(!isEditing)}>
        <Edit color={isEditing ? "primary" : "action"} />
      </IconButton>
    </AppointmentTooltip.Header>
  );
};

export const ClientAppointmentTooltipContent = ({
  children,
  appointmentData,
  setIsEditing,
  isEditing,
  setAppointmentVisible,
  onAppointmentMetaChanged,
  ...restProps
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const { appointment } = appointmentData;

  const onSubmit = (data) => {
    const formattedDate = moment(data.date).toISOString();
    const newAppointment = {
      ...appointment,
      date: formattedDate,
      veterinarianNote: data.veterinarianNotes,
    };
    setAppointmentVisible(false);
    dispatch(updateAppointment({ appointment: newAppointment }));
  };

  return (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <form
        className={classes.form}
        id="updateAppointmentForm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          id="appointment-date"
          name="date"
          control={control}
          defaultValue={moment(appointment.date).toDate()}
          rules={{
            required: true,
          }}
          render={(props) => (
            <DateTimePicker
              disabled={!isEditing}
              renderInput={(props) => (
                <TextField
                  {...props}
                  size="small"
                  label="Appointment Date"
                  readOnly={!isEditing}
                />
              )}
              {...props}
            />
          )}
        />
        <Controller
          name="veterinarianNotes"
          control={control}
          defaultValue={appointment.veterinarianNote}
          rules={{}}
          render={(props) => (
            <TextField
              disabled={!isEditing}
              label="Notes"
              multiline
              size="small"
              rows={5}
              {...props}
            />
          )}
        />
        {isEditing ? (
          <Button form="updateAppointmentForm">Update Appointment</Button>
        ) : null}
      </form>
    </AppointmentTooltip.Content>
  );
};
