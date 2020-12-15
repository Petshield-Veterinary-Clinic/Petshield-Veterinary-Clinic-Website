import React from "react";
import {
  Button,
  Select,
  MenuItem,
  Typography,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
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
      alignItem: "center",
    },
    itemCount: {
      display: "flex",
      alignItems: "center",
    },
  };
});

const InventoryItemsTableHeader = ({
  setPageSize,
  pageSize,
  handleSearchItemChanged,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const showItemCountValues = [10, 20, 30, 40, 50];

  const handleAddItemPressed = (_) => {
    dispatch(
      showModal({
        modalType: "ADD_ITEM_MODAL",
        modalProps: {},
      })
    );
  };

  const handleOnItemCountChange = (e) => {
    setPageSize(e.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.itemCount}>
        <Typography>Show &nbsp;</Typography>
        <Select value={pageSize} onChange={handleOnItemCountChange}>
          {showItemCountValues.map((itemCount) => (
            <MenuItem key={itemCount} value={itemCount}>
              {itemCount}
            </MenuItem>
          ))}
        </Select>
        <Typography>&nbsp; entries</Typography>
      </div>

      <div>
        <TextField
          variant="outlined"
          label="Search"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            handleSearchItemChanged(e.target.value);
          }}
        ></TextField>
      </div>
    </div>
  );
};

export default InventoryItemsTableHeader;
