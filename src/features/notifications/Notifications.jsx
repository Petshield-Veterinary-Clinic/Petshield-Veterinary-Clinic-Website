import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IconButton, Badge, Menu, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Notifications as NotificationIcon } from "@material-ui/icons";
import {
  fetchNotifications,
  clearNotifications,
  updateNotification,
} from "./notificationsSlice";

import { NotificationsList } from "./NotificationsList";

const useStyles = makeStyles((theme) => {
  return {
    loadingIndicator: {
      width: "400px",
      height: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

export const Notifications = () => {
  const { notifications, isLoading } = useSelector(
    (state) => state.notifications
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnNotificationPressed = (notification, index) => {
    const appointment = JSON.parse(notification.payload);
    history.push("/clients/appointments", {
      appointment,
    });
    dispatch(updateNotification({ notificationId: notification.ID, index }));

    setAnchorEl(null);
  };

  const handleOnClearNotificationsPressed = () => {
    dispatch(clearNotifications());
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={classes.loadingIndicator}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <NotificationsList
        notifications={notifications}
        onNotificationPressed={handleOnNotificationPressed}
        onClearNotificationsPressed={handleOnClearNotificationsPressed}
      />
    );
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Badge
          badgeContent={
            Object.keys(notifications)
              .map((k) => notifications[k])
              .filter((n) => !n.seen).length
          }
        >
          <NotificationIcon />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        {renderContent()}
      </Menu>
    </div>
  );
};
