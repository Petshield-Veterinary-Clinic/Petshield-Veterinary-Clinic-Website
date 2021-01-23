import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { hideModal, showModal } from "../../modals/modalSlice";
import { deleteItem } from "../inventoryItems/inventoryItemsSlice";

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
    deleteBtn: {
      borderColor: "red",
      color: "red",
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

  const handleDeleteItemPressed = (itemId) => {
    setOpen(!isVisible);

    dispatch(deleteItem(item.ID));
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
        <br />
        <Button
          className={classes.deleteBtn}
          fullWidth
          variant="outlined"
          onClick={handleDeleteItemPressed}
        >
          Delete Item
        </Button>
      </DialogContent>
    </Dialog>
  );
};
