import { Router, Redirect, Route, Switch } from "react-router";
import React, { useEffect } from "react";
import { CustomAppBar } from "../components/CustomAppBar";
import { CustomDrawer } from "../components/CustomDrawer";
import { makeStyles } from "@material-ui/core/styles";

import ModalManager from "../features/modals/ModalManager";
import PrivateRoute from "../components/PrivateRoute";
import LoginPage from "../features/auth/login/loginPage";
import { useDispatch } from "react-redux";
import { checkAuth } from "../features/auth/authSlice";
import history from "./history";
import ClientsAppointments from "../features/clients/clientsAppointments/ClientsAppointments";
import ClientsAgreementForm from "../features/clients/clientsAgreementForm/ClientsAgreementForm";
import ClientsAllClients from "../features/clients/clientsAllClients/ClientsAllClients";
import ClientsPayments from "../features/clients/clientsPayments/ClientsPayments";
import HomePage from "../features/home/HomePage";
import ClientsPage from "../features/clients/ClientsPage";
import InventoryPage from "../features/inventory/InventoryPage";

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
        <Router history={history}>
          <Switch>
            <Route exact path="/auth/login" component={LoginPage} />
            <Route path="/admin"></Route>
            <Route path="/content">
              <CustomDrawer />
              <CustomAppBar />
              <Switch>
                <PrivateRoute path="/content/home" component={HomePage} />
                <PrivateRoute path="/content/clients" component={ClientsPage} />
                <PrivateRoute
                  path="/content/inventory"
                  component={InventoryPage}
                />
                <PrivateRoute
                  exact
                  path="/content/clients/all-clients"
                  component={ClientsAllClients}
                />
                <PrivateRoute
                  exact
                  path="/content/clients/agreement-form"
                  component={ClientsAgreementForm}
                />
                <PrivateRoute
                  exact
                  path="/content/clients/appointments"
                  component={ClientsAppointments}
                />
                <PrivateRoute
                  exact
                  path="/content/clients/payments"
                  component={ClientsPayments}
                />
                <Redirect from="/" to="/content/home/dashboard" />
              </Switch>
            </Route>
            <Redirect from="/" to="/content/home/dashboard" />
          </Switch>
        </Router>
        <ModalManager />
      </div>
    );
  };
  return renderContent();
};

export default App;
