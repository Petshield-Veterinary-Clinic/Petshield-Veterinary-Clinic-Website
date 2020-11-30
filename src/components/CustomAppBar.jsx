import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import { drawerWidth } from "../consts";
import { showModal } from "../features/modals/modalSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

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
  const { user } = useSelector((state) => state.auth);
  const isMenuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();
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
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        keepMounted
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
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
          <Typography noWrap>
            Petshield Veterinary Clinic and Grooming Center System
          </Typography>
          <div className={classes.grow}></div>
          <Typography>{`${_.capitalize(user.branchName)}-Branch`}</Typography>
          <IconButton edge="end" onClick={handleMenuOpen}>
            <AccountCircle style={{ fontSize: "2rem" }} color="secondary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu()}
    </>
  );
};
