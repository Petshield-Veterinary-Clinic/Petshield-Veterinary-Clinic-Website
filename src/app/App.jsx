import { Router, Redirect, Route, Switch } from "react-router";
import "./App.css";
import React, { useEffect } from "react";
import { CustomAppBar } from "../components/CustomAppBar";
import { CustomDrawer } from "../components/CustomDrawer";
import { makeStyles } from "@material-ui/core/styles";

import HomeDashboard from "../features/home/homeDashboard/HomeDashboard";
import HomePetQueues from "../features/home/homePetQueues/HomePetQueues";
import InventoryItems from "../features/inventory/inventoryItems/InventoryItems";
import InventorySales from "../features/inventory/inventorySales/InventorySales";
import ModalManager from "../features/modals/ModalManager";
import PrivateRoute from "../components/PrivateRoute";
import LoginPage from "../features/auth/login/loginPage";
import { useDispatch } from "react-redux";
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
            <Route path="/content">
              <CustomDrawer />
              <CustomAppBar />
              <Switch>
                <PrivateRoute
                  path="/content/home/dashboard"
                  component={HomeDashboard}
                />
                <PrivateRoute
                  path="/content/home/pet-queues"
                  component={HomePetQueues}
                />
                <PrivateRoute
                  path="/content/inventory/sales"
                  component={InventorySales}
                />
                <PrivateRoute
                  path="/content/inventory/items"
                  component={InventoryItems}
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
