import React, { useMemo } from "react";
import { ClientsAllClientsTable } from "./ClientsAllClientsTable";
import moment from "moment";

const ClientsAllClientsTableContainer = ({ clients }) => {
  const data = useMemo(() => {
    return clients.map((client) => {
      return {
        col1: client.clientName,
        col2: client.pet.petName,
        col3: client.contactNumber,
        col4: client.email,
        col5: client.address,
        col6: moment(Date(client.lastVisit)).format("MM-DD-YYYY hh:mm A"),
        col7: moment(Date(client.nextVisit)).format("MM-DD-YYYY hh:mm A"),
      };
    });
  }, [clients]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "col1",
      },
      {
        Header: "Pet Name",
        accessor: "col2",
      },
      {
        Header: "Contact Number",
        accessor: "col3",
      },
      {
        Header: "Contact Number",
        accessor: "col4",
      },
      {
        Header: "Address",
        accessor: "col5",
      },
      {
        Header: "Date Visited",
        accessor: "col6",
      },
      {
        Header: "Next Visit",
        accessor: "col7",
      },
    ],
    []
  );

  const stateToProps = {
    data,
    columns,
  };

  return <ClientsAllClientsTable {...stateToProps} />;
};

export default ClientsAllClientsTableContainer;
