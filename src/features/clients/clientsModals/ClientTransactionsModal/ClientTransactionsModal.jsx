import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal } from "../../../modals/modalSlice";
import { fetchClientPaymentHistory } from "../../clientsSlice";
import ClientTransactionsTableContainer from "./ClientTransactionsTable/ClientTransactionsTableContainer";

const useStyles = makeStyles((theme) => {
  return {
    content: {
      display: "flex",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

export const ClientTransactionsModal = ({ isVisible, index }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(isVisible);
  const { clients, paymentHistory, isPaymentsLoading } = useSelector(
    (state) => state.clients
  );

  const client = clients[index];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClientPaymentHistory(client.ID));
  }, [dispatch, client]);

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };

  const renderContent = () => {
    if (isPaymentsLoading) {
      return <CircularProgress />;
    }
    return (
      <ClientTransactionsTableContainer
        paymentHistory={paymentHistory}
        client={client}
      />
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      disableBackdropClick={true}
      TransitionProps={{ onExited: handleOnExited }}
      fullScreen
    >
      <DialogTitle>Payment History</DialogTitle>
      <DialogContent className={classes.content}>
        {renderContent()}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleOnClose}>
          DONE
        </Button>
      </DialogActions>
    </Dialog>
  );
};
