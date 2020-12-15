import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Divider,
  List,
  Typography,
} from "@material-ui/core";
import AdmittedIcon from "../../../assets/admitted.svg";
import { ReactSVG } from "react-svg";
import { AdmittanceCard } from "./AdmittanceCard";
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
    admittancesList: {
      marginTop: "1em",
    },
  };
});
export const AdmittancesCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.title}>
          <div>
            <Typography variant="h5">Admitted</Typography>
            <Typography className={classes.subTitle} variant="body1">
              Pets admitted:
            </Typography>
          </div>
          <ReactSVG
            src={AdmittedIcon}
            beforeInjection={(svg) => {
              svg.classList.add(classes.icon);
            }}
          />
        </div>
        <Divider />
        <List className={classes.admittancesList}>
          <AdmittanceCard />
        </List>
      </CardContent>
    </Card>
  );
};
