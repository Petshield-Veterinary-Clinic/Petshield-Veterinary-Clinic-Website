import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/lab";
import moment from "moment";
import {
  appointmentFollowUpReoccuranceTypes,
  appointmentFollowUpTypes,
  appointmentVaccineReoccuranceTypes,
  appointmentVaccineTypes,
} from "../../../../consts";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      height: "100%",
      width: "100%",
      flexDirection: "column",
      gap: theme.spacing(2),
    },
  };
});
export const AddAppointmentForm = ({
  onSubmit,
  startDate,
  isVaccine,
  clientIndex,
}) => {
  const classes = useStyles();
  const { clients, isClientsLoading } = useSelector((state) => state.clients);
  const defaultClient = clientIndex
    ? {
        ...clients[clientIndex],
        clientName: `${clients[clientIndex].clientName} - ${clients[clientIndex].pet.petName}`,
      }
    : null;

  const data = useMemo(
    () =>
      Object.keys(clients).map((key) => {
        const client = clients[key];
        // Modify the client name to be easily distinguishable with duplicate owner names.
        const newClientName = `${client.clientName} - ${client.pet.petName}`;
        return { ...client, clientName: newClientName };
      }),
    [clients]
  );

  const { handleSubmit, errors, control } = useForm();

  const renderTypeFields = () => {
    return (
      <>
        <Controller
          name="type"
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={""}
          render={({ onChange, ...restProps }) => (
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="appointment-type">{`${
                isVaccine ? "Vaccine" : "Follow Up"
              } Type`}</InputLabel>
              <Select
                labelId="appointment-type"
                onChange={(e) => onChange(e.target.value)}
                {...restProps}
              >
                {isVaccine
                  ? appointmentVaccineTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))
                  : appointmentFollowUpTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
              </Select>
              <FormHelperText error={!!errors.type}>
                {!!errors.type ? "Please enter a type" : ""}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="reoccurance"
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={""}
          render={({ onChange, ...restProps }) => (
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="appointment-reoccurance">Next Visit</InputLabel>
              <Select
                labelId="appointment-reoccurance"
                onChange={(e) => onChange(e.target.value)}
                {...restProps}
              >
                {isVaccine
                  ? appointmentVaccineReoccuranceTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))
                  : appointmentFollowUpReoccuranceTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
              </Select>
              <FormHelperText error={!!errors.reoccurance}>
                {!!errors.reoccurance ? "Please enter a type" : ""}
              </FormHelperText>
            </FormControl>
          )}
        />
      </>
    );
  };

  return (
    <form
      className={classes.root}
      id="addAppointmentForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="client"
        control={control}
        defaultValue={clientIndex ? defaultClient : null}
        rules={{
          required: true,
        }}
        render={({ onChange, ...restProps }) => (
          <Autocomplete
            size="small"
            options={data}
            loading={isClientsLoading}
            getOptionLabel={(option) => option.clientName}
            getOptionSelected={(option, value) =>
              option.clientName === value.clientName
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Client Name"
                fullWidth
                error={!!errors.client}
                helperText={!!errors.client ? "Enter a client" : ""}
              />
            )}
            onChange={(_, val) => {
              onChange(val);
            }}
            {...restProps}
          />
        )}
      />
      <Controller
        id="appointment-date"
        name="date"
        control={control}
        defaultValue={moment(startDate).toDate()}
        rules={{
          required: true,
        }}
        render={(props) => (
          <DatePicker
            allowSameDateSelection
            renderInput={(props) => (
              <TextField {...props} size="small" label="Appointment Date" />
            )}
            {...props}
          />
        )}
      />
      {renderTypeFields()}
      <Controller
        name="veterinarianNotes"
        control={control}
        defaultValue={""}
        rules={{}}
        render={(props) => (
          <TextField label="Notes" multiline size="small" rows={5} {...props} />
        )}
      />
    </form>
  );
};
