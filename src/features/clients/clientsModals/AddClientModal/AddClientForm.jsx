import React from "react";
import { useForm } from "react-hook-form";
import { TextField, InputAdornment } from "@material-ui/core";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdPets } from "react-icons/md";

export const AddClientForm = ({ classes, onSubmit }) => {
  const { handleSubmit, register, errors } = useForm();

  return (
    <form
      className={classes.form}
      id="addClientForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        className={classes.field}
        variant="outlined"
        label="Full Name"
        name="clientName"
        inputRef={register({
          required: true,
        })}
        error={!!errors.clientName}
      />
      <TextField
        className={classes.field}
        variant="outlined"
        label="Address"
        name="address"
        inputRef={register({
          required: true,
        })}
        error={!!errors.address}
      />
      <div className={classes.fieldGroup}>
        <TextField
          className={classes.field}
          variant="outlined"
          label="Email"
          name="email"
          type="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdEmail />
              </InputAdornment>
            ),
          }}
          inputRef={register({})}
        />
        <TextField
          className={classes.field}
          variant="outlined"
          label="Contact Number"
          name="contactNumber"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaPhoneAlt />
              </InputAdornment>
            ),
          }}
          inputRef={register({
            pattern: /((^(\+)(\d){12}$)|(^\d{11}$))/,
          })}
          error={!!errors.contactNumber}
        />
      </div>
      <br></br>
      <TextField
        className={classes.field}
        variant="outlined"
        label="Pet Name"
        name="petName"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdPets />
            </InputAdornment>
          ),
        }}
        inputRef={register({
          required: true,
        })}
        error={!!errors.petName}
      />
      <div className={classes.fieldGroup}>
        <TextField
          className={classes.field}
          variant="outlined"
          label="Pet Species"
          name="petSpecies"
          inputRef={register({
            required: true,
          })}
          error={!!errors.petSpecies}
        />
        <TextField
          className={classes.field}
          variant="outlined"
          label="Pet Breed"
          name="petBreed"
          inputRef={register({
            required: true,
          })}
          error={!!errors.petBreed}
        />
      </div>
    </form>
  );
};
