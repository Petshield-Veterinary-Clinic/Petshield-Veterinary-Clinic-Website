import React, { useMemo, useState } from "react";
import { InventorySalesTable } from "./InventorySalesTable";
import moment from "moment";

const InventorySalesTableContainer = ({ itemSales }) => {
  const data = useMemo(() => {
    return itemSales.map((itemSale) => {
      return {
        col1: itemSale.item.name,
        col2: itemSale.quantity,
        col3: `₱${Number(itemSale.sales).toFixed(2)}`,
        col4: itemSale.item.isIncentiveFixed
          ? `₱${Number(itemSale.item.incentiveAmount).toFixed(2)}`
          : `${Number(itemSale.item.incentiveRate).toFixed(2)}%`,
        col5: `₱${Number(itemSale.netSales).toFixed(2)}`,
        col6: moment(itemSale.CreatedAt).format("L"),
        col7: itemSale.item.salesCategory,
      };
    });
  }, [itemSales]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "col1",
      },
      {
        Header: "Quantity",
        accessor: "col2",
      },
      {
        Header: "Sales",
        accessor: "col3",
      },
      {
        Header: "Incentives",
        accessor: "col4",
      },
      {
        Header: "Net Sales",
        accessor: "col5",
      },
      {
        Header: "Transaction Date",
        accessor: "col6",
      },
      {
        Header: "Category",
        accessor: "col7",
      },
    ],
    []
  );

  const stateToProps = {
    data,
    columns,
    itemSales,
  };

  return <InventorySalesTable {...stateToProps} />;
};

export default InventorySalesTableContainer;
