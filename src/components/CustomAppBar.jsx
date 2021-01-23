import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { AccountCircle, Menu as MenuIcon } from "@material-ui/icons";
import { drawerWidth } from "../consts";
import { showModal } from "../features/modals/modalSlice";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../features/drawer/drawerSlice";
import { Notifications } from "../features/notifications/Notifications";

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    width: "100%",
    backgroundColor: "#272727",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none ",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const appbarTitles = {
  dashboard: "Dashboard",
  "pet-queues": "Pet Queues",
  "all-clients": "All Clients",
  payments: "Payments",
  appointments: "Appointments",
  "appointment-form": "Appointment Form",
  items: "All Items",
  sales: "All Sales",
};

export const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [appbarTitle, setAppbarTitle] = useState("");
  const location = useLocation();
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const pathname = location.pathname;
    const splittedPathname = pathname.split("/");
    const appbarTitle =
      appbarTitles[splittedPathname[splittedPathname.length - 1]];
    setAppbarTitle(appbarTitle);
  }, [location, appbarTitle, setAppbarTitle]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  const handleOnSignoutPressed = () => {
    handleMenuClose();
    dispatch(
      showModal({
        modalType: "LOGOUT_MODAL",
        modalProps: {
          title: "Logout",
          message: "Are you sure you want to logout from the session?",
        },
      })
    );
  };

  const renderMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOnSignoutPressed}>Logout</MenuItem>
      </Menu>
    );
  };

  const renderTitle = () => {
    return "Petshield Veterinary Clinic - " + appbarTitle;
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography>{renderTitle()}</Typography>
          <div className={classes.grow}></div>

          <Notifications />
          <IconButton edge="end" onClick={handleMenuOpen}>
            <AccountCircle style={{ fontSize: "2rem" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu()}
    </>
  );
};
