import React from "react";
import { Button, Select, MenuItem, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { showModal } from "../../../modals/modalSlice";
import { useSelector } from "react-redux";
import moment from "moment";

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

const InventorySalesTableHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAddTransactionPressed = (_) => {
    dispatch(
      showModal({
        modalType: "ADD_SALE_MODAL",
        modalProps: {},
      })
    );
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
