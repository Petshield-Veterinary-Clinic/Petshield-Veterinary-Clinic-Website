import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ModalManager from "../features/modals/ModalManager";

import PrivateLayout from "../components/PrivateLayout";
import LoginPage from "../features/auth/login/loginPage";
import { useDispatch } from "react-redux";
import { checkAuth } from "../features/auth/authSlice";

import HomePage from "../features/home/HomePage";
import ClientsPage from "../features/clients/ClientsPage";
import InventoryPage from "../features/inventory/InventoryPage";
import InfoModalManager from "../features/modals/InfoModalManager";
import AdminPage from "../features/admin/AdminPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    padding: 0,
    margin: 0,
  }, // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  toastContainer: {
    zIndex: "1000000",
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  const renderContent = () => {
    return (
      <div className={classes.root}>
        <BrowserRouter>
          <Switch>
            <Route path="/auth/login" component={LoginPage} />
            <PrivateLayout path="/home" component={HomePage} />
            <PrivateLayout path="/clients" component={ClientsPage} />
            <PrivateLayout path="/inventory" component={InventoryPage} />
            <PrivateLayout path="/admin" component={AdminPage} />
            <Redirect from="/" to="/home/dashboard" />
          </Switch>
          <ModalManager />
          <InfoModalManager />
        </BrowserRouter>
      </div>
    );
  };
  return renderContent();
};

export default App;
