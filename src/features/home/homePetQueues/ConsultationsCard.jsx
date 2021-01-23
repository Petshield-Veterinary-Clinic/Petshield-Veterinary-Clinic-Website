import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardContent,
  Divider,
  List,
} from "@material-ui/core";
import ConsultationsIcon from "../../../assets/consultations.svg";
import { ReactSVG } from "react-svg";
import { ConsultationCard } from "./ConsultationCard";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "100%",
      width: "100%",
    },
    icon: {
      height: "45px",
      width: "45px",
      fill: "white !important",
    },
    title: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      marginBottom: "1em",
    },
    subTitle: {
      opacity: "0.6",
    },
    consultationList: {
      marginTop: "1em",
    },
  };
});

export const ConsultationsCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.title}>
          <div>
            <Typography variant="h5">Consultations</Typography>
            <Typography className={classes.subTitle} variant="body1">
              Pets to consult:{" "}
            </Typography>
          </div>
          <ReactSVG
            src={ConsultationsIcon}
            beforeInjection={(svg) => {
              svg.classList.add(classes.icon);
            }}
          />
        </div>
        <Divider />
        <List className={classes.consultationList}>
          <ConsultationCard />
        </List>
      </CardContent>
    </Card>
  );
};
