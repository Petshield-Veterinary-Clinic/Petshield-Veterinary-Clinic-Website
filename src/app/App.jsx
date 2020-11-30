import { Router, Redirect, Route, Switch } from "react-router";
import "./App.css";
import React, { useEffect } from "react";
import { CustomAppBar } from "../components/CustomAppBar";
import { CustomDrawer } from "../components/CustomDrawer";
import { makeStyles } from "@material-ui/core/styles";

import HomeDashboard from "../features/homeDashboard/HomeDashboard";
import InventoryItems from "../features/inventory/inventoryItems/InventoryItems";
import InventorySales from "../features/inventory/inventorySales/InventorySales";
import ModalManager from "../features/modals/ModalManager";
import PrivateRoute from "../components/PrivateRoute";
import LoginPage from "../features/auth/login/loginPage";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, CssBaseline } from "@material-ui/core";
import { checkAuth } from "../features/auth/authSlice";
import history from "./history";

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
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  const renderContent = () => {
    if (isLoading) {
      return <CircularProgress />;
    }
    return (
      <div className={classes.root}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/Petshield-Veterinary-Clinic-Website/auth/login"
              component={LoginPage}
            />
            <Route path="/Petshield-Veterinary-Clinic-Website/content">
              <CssBaseline />
              <CustomDrawer />
              <CustomAppBar />
              <Switch>
                <PrivateRoute
                  path="/Petshield-Veterinary-Clinic-Website/content/home/dashboard"
                  component={HomeDashboard}
                />
                <PrivateRoute
                  path="/Petshield-Veterinary-Clinic-Website/content/inventory/sales"
                  component={InventorySales}
                />
                <PrivateRoute
                  path="/Petshield-Veterinary-Clinic-Website/content/inventory/items"
                  component={InventoryItems}
                />
                <Redirect
                  from="/"
                  to="/Petshield-Veterinary-Clinic-Website/content/home/dashboard"
                />
              </Switch>
            </Route>
            <Redirect
              from="/"
              to="/Petshield-Veterinary-Clinic-Website/content/home/dashboard"
            />
          </Switch>
        </Router>
        <ModalManager />
      </div>
    );
  };
  return renderContent();
};

export default App;
