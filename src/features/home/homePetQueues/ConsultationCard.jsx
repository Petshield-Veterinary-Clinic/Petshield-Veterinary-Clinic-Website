import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, ButtonBase, Paper, Typography } from "@material-ui/core";
import {
  Check,
  LibraryBooksOutlined,
  Person,
  PostAdd,
  Event,
} from "@material-ui/icons";
import RxIcon from "../../../assets/rx_icon.png";
import classNames from "classnames";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    consultationInfoContainer: {
      display: "flex",
      padding: theme.spacing(1),
    },
    consultationButtonsContainer: {
      display: "grid",
      gridTemplate: "1fr 1fr 1fr / 1fr 1fr",
      padding: theme.spacing(1),
      gridGap: "0.3em",
    },
    consultationButton: {
      padding: theme.spacing(1),
      borderRadius: "5px",
      borderColor: theme.palette.primary.main,
      border: "1px solid",
    },
    petAvatar: {
      height: theme.spacing(7),
      width: theme.spacing(7),
      marginRight: "1em",
    },
    owner: {
      opacity: "0.6",
    },
    finish: {
      border: "1px solid green",

      color: "green",
    },
    rxIcon: {
      border: "1px solid black",
      backgroundColor: "white",
      "& img": {
        height: "20px",
      },
    },
  };
});

export const ConsultationCard = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.consultationInfoContainer}>
        <Avatar className={classes.petAvatar}></Avatar>
        <div>
          <Typography variant="h6">PetName</Typography>
          <Typography className={classes.owner}>Owner: Paolo</Typography>
        </div>
      </div>
      <div className={classes.consultationButtonsContainer}>
        <ButtonBase className={classes.consultationButton}>
          <PostAdd />
        </ButtonBase>
        <ButtonBase className={classes.consultationButton}>
          <Person />
        </ButtonBase>
        <ButtonBase className={classes.consultationButton}>
          <LibraryBooksOutlined />
        </ButtonBase>
        <ButtonBase
          className={classNames(classes.consultationButton, classes.finish)}
        >
          <Check />
        </ButtonBase>
        <ButtonBase className={classes.consultationButton}>
          <Event />
        </ButtonBase>
        <ButtonBase
          className={classNames(classes.consultationButton, classes.rxIcon)}
        >
          <img src={RxIcon} alt="rx"></img>
        </ButtonBase>
      </div>
    </Paper>
  );
};
