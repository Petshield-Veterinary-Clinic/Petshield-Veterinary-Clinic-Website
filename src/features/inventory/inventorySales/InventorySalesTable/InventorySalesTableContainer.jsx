import React, { useMemo } from "react";
import { InventorySalesTable } from "./InventorySalesTable";
import moment from "moment";
import { currencyFormatter } from "../../../../utils/formatter";

const InventorySalesTableContainer = ({ itemSales, salesDate }) => {
  const data = useMemo(() => {
    return itemSales.map((itemSale) => {
      return {
        col1: moment(itemSale.CreatedAt).format("L"),
        col2: itemSale.item ? itemSale.item.name : "",
        col3: currencyFormatter(Number(itemSale.item.price)),
        col4: itemSale.quantity,
        col5: currencyFormatter(Number(itemSale.sales)),
        col6: `${Number(itemSale.item.incentiveRate).toFixed(2)}%`,
        col7: itemSale.item.isIncentiveFixed
          ? currencyFormatter(Number(itemSale.item.incentiveAmount))
          : currencyFormatter(Number(itemSale.incentives * itemSale.quantity)),
        col8: currencyFormatter(Number(itemSale.netSales)),
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
    salesDate,
  };

  return <InventorySalesTable {...stateToProps} />;
};

export default InventorySalesTableContainer;
