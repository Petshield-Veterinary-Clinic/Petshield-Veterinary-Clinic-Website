import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal, showModal } from "../../modals/modalSlice";

const useStyles = makeStyles((_) => {
  return {
    content: {
      display: "flex",
      width: "100%",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "1em",
    },
  };
});

export const InventoryManageItemModal = ({ isVisible, item, itemIndex }) => {
  const [open, setOpen] = useState(isVisible);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleOnClose = () => {
    setOpen(!isVisible);
  };

  const handleOnExited = () => {
    dispatch(hideModal());
  };

  const handleModifyItemPressed = () => {
    setOpen(!isVisible);
    dispatch(
      showModal({
        modalType: "MODIFY_ITEM_MODAL",
        modalProps: {
          item,
          itemIndex,
        },
      })
    );
  };
  const handleDiscountItemPressed = () => {
    setOpen(!isVisible);
    dispatch(
      showModal({
        modalType: "DISCOUNT_ITEM_MODAL",
        modalProps: {
          item,
          itemIndex,
        },
      })
    );
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      TransitionProps={{ onExited: handleOnExited }}
      fullWidth
    >
      <DialogTitle>Manage Item</DialogTitle>
      <DialogContent className={classes.content}>
        <Button fullWidth variant="contained" onClick={handleModifyItemPressed}>
          Modify Item
        </Button>
        <br />
        <Button
          fullWidth
          variant="outlined"
          onClick={handleDiscountItemPressed}
        >
          Discount Item
        </Button>
      </DialogContent>
    </Dialog>
  );
};
