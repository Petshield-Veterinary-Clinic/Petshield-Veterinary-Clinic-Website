import { Router, Redirect, Route, Switch } from "react-router";
import "./App.css";
import React, { useEffect } from "react";
import { CustomAppBar } from "../components/CustomAppBar";
import { CustomDrawer } from "../components/CustomDrawer";
import { makeStyles } from "@material-ui/core/styles";

import HomeDashboard from "../features/homeDashboard/HomeDashboard";
import InventoryAllItems from "../features/inventory/inventoryAllItems/InventoryAllItems";
import InventoryItemTransactions from "../features/inventory/inventoryItemTransactions/InventoryItemTransactions";
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
            <Route exact path="/auth/login" component={LoginPage} />
            <Route path="/content">
              <CssBaseline />
              <CustomDrawer />
              <CustomAppBar />
              <Switch>
                <PrivateRoute
                  path="/content/home/dashboard"
                  component={HomeDashboard}
                />
                <PrivateRoute
                  path="/content/inventory/item-transactions"
                  component={InventoryItemTransactions}
                />
                <PrivateRoute
                  path="/content/inventory/all-items"
                  component={InventoryAllItems}
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
