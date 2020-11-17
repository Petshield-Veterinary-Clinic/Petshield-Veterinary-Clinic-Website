import React from "react";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "center",
    },
  };
});

const InventoryAllItemsTableButtons = ({
  gotoPage,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageCount,
}) => {
  return (
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
  );
};

export default InventoryAllItemsTableButtons;
