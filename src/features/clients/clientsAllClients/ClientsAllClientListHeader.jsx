import { TextField, Button, InputAdornment } from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { showModal } from "../../modals/modalSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: theme.spacing(2),
    },
  };
});

export const ClientsAllClientsHeader = ({ fuse, setClientResultsSearch }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleOnAddClientPressed = () => {
    dispatch(
      showModal({
        modalType: "ADD_CLIENT_MODAL",
      })
    );
  };
  const handleSearchClientChanged = (value) => {
    if (value !== "") {
      const results = fuse.search(value);
      setClientResultsSearch(results.map((result) => result.item));
    } else {
      setClientResultsSearch(null);
    }
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
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={handleOnAddClientPressed}
      >
        Add Client
      </Button>
    </div>
  );
};
