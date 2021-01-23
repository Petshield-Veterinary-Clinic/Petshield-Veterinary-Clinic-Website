import { useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
} from "@material-ui/core";
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

const InventorySalesTableHeader = ({
  toggleAddItemSaleRow,
  showAddItemSaleRow,
  setSelectedClient,
}) => {
  const classes = useStyles();
  const { isClientsLoading, clients } = useSelector((state) => state.clients);
  const handleAddTransactionPressed = () => {
    toggleAddItemSaleRow(!showAddItemSaleRow);
  };

  const renderClientNameField = () => {
    if (!showAddItemSaleRow) {
      return null;
    }
    return (
      <Autocomplete
        loading={isClientsLoading}
        options={clients}
        getOptionLabel={(option) => option.clientName}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Client Name"
            variant="outlined"
            helperText="Enter client name here."
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isClientsLoading ? (
                    <CircularProgress color="secondary" size="1.5rem" />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        onChange={(_, data, reason) => {
          if (reason === "select-option") {
            setSelectedClient(data);
          }
        }}
      />
    );
  };

  return (
    <div className={classes.root}>
      <div>{renderClientNameField()}</div>

      <div>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddTransactionPressed}
        >
          {`${showAddItemSaleRow ? "Cancel" : "Add"}  Transaction`}
        </Button>
      </div>
    </div>
  );
};

export default InventorySalesTableHeader;
