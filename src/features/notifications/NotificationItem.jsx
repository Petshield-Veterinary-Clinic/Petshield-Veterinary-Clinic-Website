import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { Divider, ListItem, Typography } from "@material-ui/core";
import moment from "moment";
import className from "classnames";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: theme.spacing(1),
    },
    title: {
      fontWeight: "bold",
      fontSize: "1.2rem",
    },
    message: {
      fontSize: "1rem",
    },
    seen: {
      opacity: "50%",
    },
    date: {
      color: "#FFFFFFB3",
      fontSize: "0.8rem",
    },
  };
});

export const NotificationItem = ({ notif, index, onNotificationPressed }) => {
  const classes = useStyles();
  const [seen, setSeen] = useState(notif.seen);
  const appointment = JSON.parse(notif.payload);

  return (
    <>
      <ListItem
        button
        onClick={() => {
          setSeen(true);
          onNotificationPressed(notif, index);
        }}
        className={
          seen ? className([classes.root, classes.seen]) : classes.root
        }
        key={notif.ID}
      >
        <Typography className={classes.title}>
          {appointment.client.clientName}
        </Typography>
        <Typography className={classes.message}>{notif.message}</Typography>
        <Typography className={classes.date}>
          {moment(notif.CreatedAt).format("MMMM DD, YYYY")}
        </Typography>
      </ListItem>
      <Divider />
    </>
  );
};
