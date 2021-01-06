import React from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gridGap: "1em",
      paddingBottom: "1em",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      },
    },
    itemCount: {
      display: "flex",
      alignItems: "center",
    },
  };
});

const InventorySalesTableHeader = ({ toggleAddItemSaleRow }) => {
  const classes = useStyles();

  const handleAddTransactionPressed = () => {
    toggleAddItemSaleRow(true);
  };

  return (
    <div className={classes.root}>
      <div></div>

      <div>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddTransactionPressed}
        >
          Add Transaction
        </Button>
      </div>
    </div>
  );
};

export default InventorySalesTableHeader;
