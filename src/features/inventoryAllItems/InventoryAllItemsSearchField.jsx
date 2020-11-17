import { InputAdornment, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import {
  fetchAllItems,
  fetchAllItemsWithSearch,
} from "./inventoryAllItemsSlice";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingBottom: "1em",
    },
  };
});

const InventoryAllItemsSearchField = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        dispatch(fetchAllItemsWithSearch(searchTerm));
      } else {
        dispatch(fetchAllItems());
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch, fetchAllItems, fetchAllItemsWithSearch]);

  return (
    <TextField
      className={classes.root}
      fullWidth
      size="small"
      variant="outlined"
      label="Search Item"
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={({ target: { value } }) => {
        setSearchTerm(value);
      }}
    />
  );
};

export default InventoryAllItemsSearchField;
