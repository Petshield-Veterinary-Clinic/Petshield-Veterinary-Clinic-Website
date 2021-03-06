import React, { useMemo } from "react";
import { ClientPaymentsTable } from "./ClientPaymentsTable";
import moment from "moment";
import { currencyFormatter } from "../../../../utils/formatter";

const ClientPaymentsTableContainer = ({ itemSales }) => {
  const data = useMemo(() => {
    return itemSales.map((itemSale) => {
      return {
        col1: moment(itemSale.CreatedAt).format("L"),
        col2: itemSale.client.clientName,
        col3: itemSale.item.name,
        col4: currencyFormatter(itemSale.item.price),
        col5: itemSale.quantity,
        col6: currencyFormatter(itemSale.sales),
        col7: `${Number(itemSale.item.incentiveRate).toFixed(2)}%`,
        col8: itemSale.item.isIncentiveFixed
          ? currencyFormatter(itemSale.item.incentiveAmount)
          : currencyFormatter(itemSale.incentives * itemSale.quantity),
        col9: currencyFormatter(itemSale.netSales),
        col10: itemSale.item.category,
      };
    });
  }, [itemSales]);

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "col1",
      },
      {
        Header: "Client",
        accessor: "col2",
      },
      {
        Header: "Product",
        accessor: "col3",
      },
      {
        Header: "Price",
        accessor: "col4",
      },
      {
        Header: "Qty",
        accessor: "col5",
      },
      {
        Header: "Sales",
        accessor: "col6",
      },
      {
        Header: "Rate",
        accessor: "col7",
      },
      {
        Header: "Incentives",
        accessor: "col8",
      },
      {
        Header: "Net Sales",
        accessor: "col9",
      },
      {
        Header: "Category",
        accessor: "col10",
      },
    ],
    []
  );

  const stateToProps = {
    data,
    columns,
    itemSales,
  };

  return <ClientPaymentsTable {...stateToProps} />;
};

export default ClientPaymentsTableContainer;
