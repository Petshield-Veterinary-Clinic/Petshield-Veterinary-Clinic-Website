import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CustomAppBar } from "./components/CustomAppBar";
import { CustomDrawer } from "./components/CustomDrawer";
import { makeStyles } from "@material-ui/core/styles";
import HomePage from "./pages/home-page/HomePage";
import { CssBaseline } from "@material-ui/core";
import ItemTransactionsPage from "./pages/Inventory/ItemTransactionsPage";
import AllItemsPage from "./pages/Inventory/AllItemsPage";

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
            <Route exact path="/home/dashboard" component={HomePage} />
            <Route
              exact
              path="/inventory/item-transactions"
              component={ItemTransactionsPage}
            />
            <Route exact path="/inventory/all-items" component={AllItemsPage} />
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
