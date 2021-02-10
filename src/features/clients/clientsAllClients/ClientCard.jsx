import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import {
  Avatar,
  ButtonBase,
  Typography,
  ListItem,
  Collapse,
  Paper,
  Hidden,
  Divider,
} from "@material-ui/core";
import { showModal } from "../../modals/modalSlice";
import {
  Person,
  PostAdd,
  AccountBalance,
  Event,
  EventNote,
} from "@material-ui/icons";
import RxIcon from "../../../assets/rx_icon.png";
import classNames from "classnames";
import moment from "moment";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginBottom: theme.spacing(2),
    },
    container: {
      display: "flex",
      borderRadius: "10px",
      backgroundColor: "#2f2f2f",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
    },
    infoContainer: {
      display: "flex",
      justifyContent: "flex-start",
      // padding: theme.spacing(1),
    },
    buttonsContainer: {
      display: "flex",
      gridGap: "0.3em",
      justifyContent: "space-evenly",
      padding: "1em",
      [theme.breakpoints.up("sm")]: {
        display: "grid",
        gridTemplate: "1fr 1fr / 1fr 1fr",
        padding: theme.spacing(1),
        gridGap: "0.3em",
      },
    },
    consultationButton: {
      zIndex: "10",
      padding: theme.spacing(1),
      borderRadius: "5px",
      borderColor: theme.palette.primary.main,
      border: "1px solid",
    },
    petAvatar: {
      height: theme.spacing(7),
      width: theme.spacing(7),
      marginRight: "1em",
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
    },
    subTitle: {
      opacity: "0.6",
      fontSize: "0.9rem",
    },
    rxIcon: {
      border: "1px solid black",
      backgroundColor: "white",
      "& img": {
        height: "20px",
      },
    },
    clientMoreDetails: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
    },
  };
});

export const ClientCard = ({ client, index }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOnPaymentHistoryPressed = () => {
    dispatch(
      showModal({
        modalType: "CLIENT_TRANSACTIONS_MODAL",
        modalProps: {
          index,
        },
      })
    );
  };

  const handleOnAddVeterinarianNotePressed = () => {
    dispatch(
      showModal({
        modalType: "CLIENT_VETERINARIAN_NOTE_MODAL",
        modalProps: { index },
      })
    );
  };

  const handleOnAddAppointmentPressed = () => {
    dispatch(
      showModal({
        modalType: "ADD_APPOINTMENT_MODAL",
        modalProps: {
          clientIndex: index,
          startDate: Date().toString(),
        },
      })
    );
  };
  const handleOnAppointmentsPressed = () => {
    dispatch(
      showModal({
        modalType: "CLIENT_APPOINTMENTS_MODAL",
        modalProps: {
          clientIndex: index,
        },
      })
    );
  };

  const handleOnItemPressed = () => {
    setOpen(!open);
  };

  return (
    <Paper className={classes.root}>
      <ListItem
        button
        className={classes.container}
        onClick={handleOnItemPressed}
      >
        <div className={classes.infoContainer}>
          <Hidden smDown>
            <Avatar className={classes.petAvatar}></Avatar>
          </Hidden>
          <div>
            <Typography variant="h6">{`Pet Name: ${client.pet.petName}`}</Typography>
            <Typography
              className={classes.subTitle}
            >{`Owner: ${client.clientName}`}</Typography>
            <Typography
              className={classes.subTitle}
            >{`Pet Species: ${client.pet.species}`}</Typography>
            <Typography
              className={classes.subTitle}
            >{`Pet Breed: ${client.pet.petBreed}`}</Typography>
            <Typography className={classes.subTitle}>{`Last Visit: ${moment(
              client.lastVisit
            ).format("MM-DD-YYYY HH-MM-SS A")}`}</Typography>
            <Typography className={classes.subTitle}>{`Next Visit: ${moment(
              client.nextVisit
            ).format("MM-DD-YYYY HH-MM-SS A")}`}</Typography>
          </div>
        </div>
        <Hidden smDown>
          <div className={classes.buttonsContainer}>
            <ButtonBase
              className={classes.consultationButton}
              onClick={handleOnPaymentHistoryPressed}
            >
              <AccountBalance />
            </ButtonBase>
            <ButtonBase className={classes.consultationButton}>
              <Person />
            </ButtonBase>
            <ButtonBase
              className={classes.consultationButton}
              onClick={handleOnAddVeterinarianNotePressed}
            >
              <PostAdd />
            </ButtonBase>
            <ButtonBase
              className={classes.consultationButton}
              onClick={handleOnAppointmentsPressed}
            >
              <EventNote />
            </ButtonBase>
            <ButtonBase
              className={classes.consultationButton}
              onClick={handleOnAddAppointmentPressed}
            >
              <Event />
            </ButtonBase>
            <ButtonBase
              className={classNames(classes.consultationButton, classes.rxIcon)}
            >
              <img src={RxIcon} alt="rx"></img>
            </ButtonBase>
          </div>
        </Hidden>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Hidden smUp>
          <Divider />
          <div className={classes.buttonsContainer}>
            <ButtonBase
              className={classes.consultationButton}
              onClick={handleOnPaymentHistoryPressed}
            >
              <AccountBalance />
            </ButtonBase>
            <ButtonBase className={classes.consultationButton}>
              <Person />
            </ButtonBase>
            <ButtonBase
              className={classes.consultationButton}
              onClick={handleOnAddVeterinarianNotePressed}
            >
              <PostAdd />
            </ButtonBase>
            <ButtonBase
              className={classes.consultationButton}
              onClick={handleOnAppointmentsPressed}
            >
              <EventNote />
            </ButtonBase>
            <ButtonBase
              className={classes.consultationButton}
              onClick={handleOnAddAppointmentPressed}
            >
              <Event />
            </ButtonBase>
            <ButtonBase
              className={classNames(classes.consultationButton, classes.rxIcon)}
            >
              <img src={RxIcon} alt="rx"></img>
            </ButtonBase>
          </div>
          <Divider />
        </Hidden>
        <div className={classes.clientMoreDetails}>
          <Typography>{`Address: ${client.address}`}</Typography>
          <Typography>{`Contact Number: ${client.contactNumber}`}</Typography>
          <Typography>{`Email: ${client.email}`}</Typography>
          <Typography>{`Veterinarian Note: ${client.veterinarianNote}`}</Typography>
        </div>
      </Collapse>
    </Paper>
  );
};
