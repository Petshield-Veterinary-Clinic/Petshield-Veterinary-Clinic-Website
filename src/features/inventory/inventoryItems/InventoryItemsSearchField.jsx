import { InputAdornment, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

import { clearItemsSearch, searchItems } from "../inventorySearchSlice";

import _ from "lodash";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingBottom: "1em",
    },
  };
});

const InventoryItemsSearchField = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const search = (searchTerm) => {
    if (searchTerm === "") {
      dispatch(clearItemsSearch());
    } else {
      dispatch(searchItems(searchTerm));
    }
  };

  const debouncedSearch = _.debounce(search, 800);

  const handleOnChange = (e) => {
    debouncedSearch(e.target.value);
  };
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
      onChange={handleOnChange}
    />
  );
};

export default InventoryItemsSearchField;
