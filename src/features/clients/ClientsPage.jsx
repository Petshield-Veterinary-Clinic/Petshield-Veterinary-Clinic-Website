import React from "react";
import { Switch, Route } from "react-router-dom";

import ClientsAllClients from "./clientsAllClients/ClientsAllClients";
import ClientsAppointments from "./clientsAppointments/ClientsAppointments";
import ClientPayments from "./clientsPayments/ClientPayments";

const ClientsPage = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/all-clients`} component={ClientsAllClients} />

      <Route
        path={`${match.url}/appointments`}
        component={ClientsAppointments}
      />
      <Route path={`${match.url}/payments`} component={ClientPayments} />
    </Switch>
  );
};

export default ClientsPage;
