import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { InventoryItemsTable } from "./InventoryItemsTable";

const InventoryItemsTableContainer = ({ items }) => {
  const dispatch = useDispatch();
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
        col1: item.ID,
        col2: item.name,
        col3: item.salesCategory,
        col4: item.inStock,
        col5: status,
        col6: Number(item.price).toFixed(2),
        col7: item.discount,
        col8: (item.price - discountAmount).toFixed(2),
      };
    });
  }, [items]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "col1",
      },
      {
        Header: "Name",
        accessor: "col2",
      },
      {
        Header: "Category",
        accessor: "col3",
      },
      {
        Header: "Stock",
        accessor: "col4",
      },
      {
        Header: "Status",
        accessor: "col5",
      },
      {
        Header: "Original Price",
        accessor: "col6",
      },
      {
        Header: "Discount",
        accessor: "col7",
      },
      {
        Header: "Total Price",
        accessor: "col8",
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
