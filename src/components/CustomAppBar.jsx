import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircleOutlined } from "@material-ui/icons";
import { drawerWidth } from "../consts";
import { hideModal, showModal } from "../features/modals/modalSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}));

export const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOnSignoutPressed = () => {
    handleMenuClose();
    dispatch(
      showModal({
        modalType: "CONFIRMATION_MODAL",
        modalProps: {
          title: "Logout?",
          message: "Are you sure you want to logout?",
          handlePositivePressed: () => {
            dispatch(logout());
            history.replace("/auth/login");
          },
          handleNegativePressed: () => {
            dispatch(hideModal());
          },
        },
      })
    );
  };

  const renderMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleOnSignoutPressed}>Logout</MenuItem>
      </Menu>
    );
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Petshield Veterinary Clinic and Grooming Center System
          </Typography>
          <div className={classes.grow}></div>
          <IconButton edge="end" onClick={handleMenuOpen}>
            <AccountCircleOutlined color="secondary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu()}
    </>
  );
};
