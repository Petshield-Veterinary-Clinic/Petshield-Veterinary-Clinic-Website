import { useState } from "react";
import {
  Typography,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Collapse,
  Box,
  ButtonBase,
} from "@material-ui/core";
import { AccountBalance, Event, Delete } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import RxIcon from "../../../../assets/rx_icon.png";
import { FaCashRegister, FaClipboardList } from "react-icons/fa";
import classNames from "classnames";
import { showModal } from "../../../modals/modalSlice";

const useStyles = makeStyles((theme) => {
  return {
    actionsContainer: {
      display: "grid",
      gridTemplate: "1fr 1fr / 1fr 1fr",
      gridGap: theme.spacing(1),
    },
    actionButton: {
      padding: theme.spacing(1),
      borderRadius: "5px",
      borderColor: theme.palette.primary.main,
      border: "1px solid",
    },
    deleteButton: {
      borderColor: theme.palette.error.main,
      color: theme.palette.error.main,
    },
  };
});

export const ClientsAllClientsTableRow = ({ row }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const renderCell = (cell) => {
    return (
      <Typography
        style={{
          fontSize: "1rem",
        }}
      >
        {cell.render("Cell")}
      </Typography>
    );
  };

  const handleOnDeleteButtonPressed = (index) => {};

  const handleOnTransactionsButtonPressed = (index) => {
    dispatch(
      showModal({
        modalType: "CLIENT_TRANSACTIONS_MODAL",
        modalProps: {
          index,
        },
      })
    );
  };

  const handleOnAppointmentsButtonPressed = (index) => {};

  return (
    <>
      <TableRow key={row.id} {...row.getRowProps()}>
        {row.cells.map((cell, index) => {
          return (
            <TableCell key={`col${index}`}>
              <div {...cell.getCellProps()}>{renderCell(cell)}</div>
            </TableCell>
          );
        })}
        <TableCell>
          <div className={classes.actionsContainer}>
            <ButtonBase
              className={classes.actionButton}
              onClick={() => handleOnTransactionsButtonPressed(row.index)}
            >
              <AccountBalance />
            </ButtonBase>
            <ButtonBase
              className={classes.actionButton}
              onClick={() => handleOnAppointmentsButtonPressed(row.index)}
            >
              <Event />
            </ButtonBase>
            <ButtonBase
              className={classNames([
                classes.actionButton,
                classes.deleteButton,
              ])}
              onClick={() => handleOnDeleteButtonPressed(row.index)}
            >
              <Delete />
            </ButtonBase>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};
