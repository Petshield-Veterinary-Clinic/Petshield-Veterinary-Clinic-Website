import React from "react";
import { Switch, Route } from "react-router";
import ClientsAgreementForm from "./clientsAgreementForm/ClientsAgreementForm";
import ClientsAllClients from "./clientsAllClients/ClientsAllClients";
import ClientsAppointments from "./clientsAppointments/ClientsAppointments";
import ClientsPayments from "./clientsPayments/ClientsPayments";

const ClientsPage = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/all-clients`} component={ClientsAllClients} />
      <Route
        path={`${match.url}/agreement-form`}
        component={ClientsAgreementForm}
      />
      <Route
        path={`${match.url}/appointments`}
        component={ClientsAppointments}
      />
      <Route path={`${match.url}/payments`} component={ClientsPayments} />
    </Switch>
  );
};

export default ClientsPage;
