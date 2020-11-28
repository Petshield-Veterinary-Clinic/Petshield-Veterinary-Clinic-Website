import React from "react";
import { Button, Select, MenuItem, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { showModal } from "../../../modals/modalSlice";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  };
});

const InventorySalesTableHeader = ({ setPageSize, pageSize }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const showItemCountValues = [10, 20, 30, 40, 50];

  const handleAddTransactionPressed = (_) => {
    dispatch(
      showModal({
        modalType: "ADD_TRANSACTION_MODAL",
        modalProps: {},
      })
    );
  };

  const handleOnItemCountChange = (e) => {
    setPageSize(e.target.value);
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography>
          Show &nbsp;
          <Select value={pageSize} onChange={handleOnItemCountChange}>
            {showItemCountValues.map((itemCount) => (
              <MenuItem key={itemCount} value={itemCount}>
                {itemCount}
              </MenuItem>
            ))}
          </Select>
          &nbsp; entries
        </Typography>
      </div>
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
