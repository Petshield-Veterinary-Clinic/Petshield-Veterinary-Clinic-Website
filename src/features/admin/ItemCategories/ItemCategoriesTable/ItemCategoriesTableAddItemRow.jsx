import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, TableCell, TableRow, Button } from "@material-ui/core";
import { addItemCategory } from "../../../itemCategory/itemCategorySlice";

import { Check, Cancel } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { showInfoModal } from "../../../modals/infoModalSlice";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      height: "100%",
    },
    loadingIndicator: {
      width: "10px",
      height: "10px",
    },
    quantityCell: {},
    buttonRows: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr / 1fr",
      gridGap: "1em",
    },
    submitButton: {
      borderColor: "green",
      color: "green",
    },
    cancelButton: {
      borderColor: "red",
      color: "red",
    },
  };
});

export const ItemCategoriesTableAddItemRow = ({
  showAddItemCategoryRow,
  toggleAddItemCategoryRow,
}) => {
  const { categories } = useSelector((state) => state.itemCategories);
  const { reset, handleSubmit, register, errors } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const classes = useStyles();

  const dispatch = useDispatch();

  // Only show this row when the user pressed the add item button
  if (!showAddItemCategoryRow) {
    return null;
  }

  const onSubmitPressed = (values) => {
    if (
      !categories.find(
        (categ) =>
          String(categ.name).toLowerCase() === String(values.name).toLowerCase()
      )
    ) {
      dispatch(addItemCategory(values));
    } else {
      dispatch(
        showInfoModal({
          modalType: "ERROR_MODAL",
          modalProps: {
            message: "Existing Category",
            isInfoModal: true,
          },
        })
      );
    }

    reset();
    toggleAddItemCategoryRow(false);
  };

  const onCancelPressed = () => {
    reset();
    toggleAddItemCategoryRow(false);
  };

  return (
    <TableRow className={classes.root}>
      <TableCell>
        <form id="addItemCategoryForm" onSubmit={handleSubmit(onSubmitPressed)}>
          <TextField
            fullWidth
            name={"name"}
            label="Category Name"
            inputRef={register({
              required: true,
            })}
            error={!!errors.name}
            helperText={!!errors.name ? "Invalid Input" : ""}
          />
        </form>
      </TableCell>

      <TableCell>
        <div className={classes.buttonRows}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.submitButton}
            form="addItemCategoryForm"
            type="submit"
          >
            <Check />
          </Button>
          <Button
            variant="outlined"
            className={classes.cancelButton}
            onClick={onCancelPressed}
          >
            <Cancel />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
