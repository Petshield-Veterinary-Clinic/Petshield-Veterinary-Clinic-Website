import React, { useMemo } from "react";
import { ItemCategoriesTable } from "./ItemCategoriesTable";
const ItemCategoriesTableContainer = ({ categories }) => {
  const data = useMemo(() => {
    return categories.map((category) => {
      return {
        col1: category.name,
      };
    });
  }, [categories]);

  const columns = useMemo(
    () => [
      {
        Header: "Category",
        accessor: "col1",
      },
    ],
    []
  );

  const stateToProps = {
    data,
    columns,
    categories,
  };

  return <ItemCategoriesTable {...stateToProps} />;
};

export default ItemCategoriesTableContainer;
