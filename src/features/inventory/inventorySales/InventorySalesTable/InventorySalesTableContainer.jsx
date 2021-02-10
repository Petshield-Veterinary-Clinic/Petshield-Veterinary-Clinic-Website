import React, { useMemo } from "react";
import { InventorySalesTable } from "./InventorySalesTable";
import moment from "moment";

const InventorySalesTableContainer = ({ itemSales }) => {
  const data = useMemo(() => {
    return itemSales.map((itemSale) => {
      return {
        col1: moment(itemSale.CreatedAt).format("L"),
        col2: itemSale.item ? itemSale.item.name : "",
        col3: `₱${Number(itemSale.item.price).toFixed(2)}`,
        col4: itemSale.quantity,
        col5: `₱${Number(itemSale.sales).toFixed(2)}`,
        col6: `${Number(itemSale.item.incentiveRate).toFixed(2)}%`,
        col7: itemSale.item.isIncentiveFixed
          ? `₱${Number(itemSale.item.incentiveAmount).toFixed(2)}`
          : `₱${Number(itemSale.incentives * itemSale.quantity).toFixed(2)}`,
        col8: `₱${Number(itemSale.netSales).toFixed(2)}`,
        col9: itemSale.item.category,
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
        Header: "Product",
        accessor: "col2",
      },
      {
        Header: "Price",
        accessor: "col3",
      },
      {
        Header: "Qty",
        accessor: "col4",
      },
      {
        Header: "Sales",
        accessor: "col5",
      },
      {
        Header: "Rate",
        accessor: "col6",
      },
      {
        Header: "Incentives",
        accessor: "col7",
      },
      {
        Header: "Net Sales",
        accessor: "col8",
      },
      {
        Header: "Category",
        accessor: "col9",
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
