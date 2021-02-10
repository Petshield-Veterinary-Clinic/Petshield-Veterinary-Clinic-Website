import { TextField, Button, InputAdornment, Hidden } from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { showModal } from "../../modals/modalSlice";
import { searchClients, fetchClients } from "../clientsSlice";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      marginBottom: theme.spacing(2),
      justifyContent: "space-between",
    },
  };
});

export const ClientsAllClientsHeader = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleOnAddClientPressed = () => {
    dispatch(
      showModal({
        modalType: "ADD_CLIENT_MODAL",
      })
    );
  };
  const search = (value) => {
    if (value !== "") {
      dispatch(searchClients(value));
    } else {
      dispatch(fetchClients());
    }
  };
  const debouncedSearch = debounce(search, 800);

  const handleSearchClientChanged = (e) => {
    debouncedSearch(e.target.value);
  };
  return (
    <div className={classes.root}>
      <Hidden smUp>
        <TextField
          variant="outlined"
          label="Search"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          onChange={handleSearchClientChanged}
        ></TextField>
      </Hidden>
      <Hidden smDown>
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
          onChange={handleSearchClientChanged}
        ></TextField>
      </Hidden>
      <Hidden smDown>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleOnAddClientPressed}
        >
          Add Client
        </Button>
      </Hidden>
    </div>
  );
};
