import React from "react";
import { useDispatch } from "react-redux";
import { Button, TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { showModal } from "../../../modals/modalSlice";

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

const ClientsAllClientsTableHeader = ({ handleSearchClientChanged }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleAddClientPressed = () => {
    dispatch(
      showModal({
        modalType: "ADD_CLIENT_MODAL",
      })
    );
  };

  return (
    <div className={classes.root}>
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
          handleSearchClientChanged(e.target.value);
        }}
      ></TextField>
      <div>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddClientPressed}
        >
          Add Client
        </Button>
      </div>
    </div>
  );
};

export default ClientsAllClientsTableHeader;
