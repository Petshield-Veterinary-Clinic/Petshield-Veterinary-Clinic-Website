import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomeDashboard from "./homeDashboard/HomeDashboard";
import HomePetQueues from "./homePetQueues/HomePetQueues";

const HomePage = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/dashboard`} component={HomeDashboard} />
      <Route exact path={`${match.url}/pet-queues`} component={HomePetQueues} />
      <Redirect to={`${match.url}/dashboard`} />
    </Switch>
  );
};

export default HomePage;
