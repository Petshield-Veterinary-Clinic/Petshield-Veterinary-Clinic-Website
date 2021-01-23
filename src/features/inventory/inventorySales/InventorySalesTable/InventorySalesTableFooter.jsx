import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
  return {
    root: {
      display: "table-cell",
      width: "100%",
      paddingTop: "1em",
      alignItems: "center",
      justifyContent: "space-between",
    },
  };
});
const InventorySalesTableFooter = ({
  gotoPage,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageCount,
  pageSize,
  pageIndex,
  itemsCount,
}) => {
  const classes = useStyles();
  const renderCurrPageItemCount = () => {
    const currPageItemCount =
      pageSize * (pageIndex + 1) >= itemsCount
        ? itemsCount
        : pageSize * (pageIndex + 1);

    return (
      <Typography>{`Showing ${currPageItemCount} out of ${itemsCount} items`}</Typography>
    );
  };

  return (
    <div className={classes.root}>
      {renderCurrPageItemCount()}
      <div>
        <Button
          variant="outlined"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          FIRST
        </Button>
        <Button
          variant="outlined"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          PREV
        </Button>
        <Button
          variant="outlined"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          NEXT
        </Button>
        <Button
          variant="outlined"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          LAST
        </Button>
      </div>
    </div>
  );
};

export default InventorySalesTableFooter;
