import React, { useMemo } from "react";
import { currencyFormatter } from "../../../../utils/formatter";
import { InventoryItemsTable } from "./InventoryItemsTable";

const InventoryItemsTableContainer = ({ items }) => {
  const data = useMemo(() => {
    return items.map((item) => {
      let status = "";
      const isDiscounted = item.discount > 0;
      const discountAmount = isDiscounted
        ? item.price * (item.discount / 100)
        : 0;
      // Check if the item is In Stock and if has discount
      if (item.discount > 0 && item.inStock > 0) {
        status = "Discounted";
      } else if (item.discount === 0 && item.inStock > 0) {
        status = "In Stock";
      } else {
        status = "Out of Stock";
      }

      return {
        col1: item.name,
        col2: item.category,
        col3: item.inStock,
        col4: status,
        col5: currencyFormatter(item.price),
        col6: item.discount,
        col7: currencyFormatter(item.price - discountAmount),
      };
    });
  }, [items]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "col1",
      },
      {
        Header: "Category",
        accessor: "col2",
      },
      {
        Header: "Stock",
        accessor: "col3",
      },
      {
        Header: "Status",
        accessor: "col4",
      },
      {
        Header: "Original Price",
        accessor: "col5",
      },
      {
        Header: "Discount",
        accessor: "col6",
      },
      {
        Header: "Total Price",
        accessor: "col7",
      },
    ],
    []
  );

  const mapStateToProps = {
    data,
    columns,
    items,
  };

  return <InventoryItemsTable {...mapStateToProps} />;
};

export default InventoryItemsTableContainer;
