import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CustomAppBar } from "../components/CustomAppBar";
import { CustomDrawer } from "../components/CustomDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import HomeDashboard from "../features/homeDashboard/HomeDashboard";
import InventoryAllItems from "../features/inventoryAllItems/InventoryAllItems";
import InventoryItemTransactions from "../features/inventoryItemTransactions/InventoryItemTransactions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }, // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <CustomAppBar />
        <CustomDrawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/home/dashboard" component={HomeDashboard} />
            <Route
              exact
              path="/inventory/item-transactions"
              component={InventoryItemTransactions}
            />
            <Route
              exact
              path="/inventory/all-items"
              component={InventoryAllItems}
            />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
