import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InventorySalesTable } from "./InventorySalesTable";
import moment from "moment";

const InventorySalesTableContainer = ({ itemSales }) => {
  const dispatch = useDispatch();

  const data = useMemo(() => {
    return itemSales.map((itemSale) => {
      return {
        col1: itemSale.item.name,
        col2: itemSale.quantity,
        col3: `₱${Number(itemSale.sales).toFixed(2)}`,
        col4: `${Number(itemSale.incentives).toFixed(2)}%`,
        col5: `₱${Number(itemSale.netSales).toFixed(2)}`,
        col6: moment(itemSale.CreatedAt).format("L"),
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
    ],
    []
  );
  return <InventorySalesTable data={data} columns={columns} />;
};

export default InventorySalesTableContainer;
