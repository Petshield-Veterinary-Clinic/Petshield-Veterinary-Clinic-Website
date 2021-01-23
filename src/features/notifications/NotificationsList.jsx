import { makeStyles } from "@material-ui/core/styles";
import { List, Button, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { NotificationItem } from "./NotificationItem";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "400px",
      height: "300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: theme.spacing(1),
    },
  };
});

export const NotificationsList = ({
  notifications,
  onNotificationPressed,
  onClearNotificationsPressed,
}) => {
  const classes = useStyles();

  const renderListItems = () => {
    return Object.keys(notifications).map((k, i) => {
      const n = notifications[k];
      return (
        <NotificationItem
          notif={n}
          index={i}
          onNotificationPressed={onNotificationPressed}
        />
      );
    });
  };

  const renderContent = () => {
    if (Object.keys(notifications).length !== 0) {
      return (
        <>
          {renderListItems()}
          <Button
            variant="text"
            color="error"
            onClick={onClearNotificationsPressed}
            startIcon={<Delete color="error" />}
          >
            Clear Notifications
          </Button>
        </>
      );
    }
    return <Typography align="center">No Notifications</Typography>;
  };

  return <List className={classes.root}>{renderContent()}</List>;
};
