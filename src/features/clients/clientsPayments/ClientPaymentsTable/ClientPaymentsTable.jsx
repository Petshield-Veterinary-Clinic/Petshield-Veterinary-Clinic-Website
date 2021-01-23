import React, { useState } from "react";
import { useTable, useSortBy } from "react-table";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Delete } from "@material-ui/icons";

import { blue } from "@material-ui/core/colors";
import ClientPaymentsTableHeader from "./ClientPaymentsTableHeader";
import { ClientPaymentsTableAddItemRow } from "./ClientPaymentsTableAddItemRow";
import { showModal } from "../../../modals/modalSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      height: "100%",
      padding: "1.5em",
      overflow: "hidden",
      backgroundColor: "#1d1d1d",
      [theme.breakpoints.up("sm")]: {
        overflow: "auto",
      },
    },

    showItemCountButtons: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    showItemCountField: {
      width: "50px",
    },
    tableHeader: {
      display: "flex",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    pagination: {
      display: "flex",
      width: "100%",
      paddingTop: "1em",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inStock: {
      color: theme.palette.secondary.main,
      border: "2px solid red",
      borderColor: theme.palette.secondary.main,
      borderRadius: "10px",
      padding: "1em",
      textAlign: "center",
      fontWeight: "bold",
    },
    itemDiscounted: {
      color: blue[400],
      border: "2px solid red",
      borderColor: blue[400],
      borderRadius: "10px",
      padding: "1em",
      textAlign: "center",
      fontWeight: "bold",
    },
    outOfStock: {
      color: "red",
      border: "2px solid red",
      borderRadius: "10px",
      padding: "1em",
      textAlign: "center",
      fontWeight: "bold",
    },
    deleteButton: {
      borderColor: "red",
    },
  };
});

export const ClientPaymentsTable = ({ data, columns }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAddItemSaleRow, toggleAddItemSaleRow] = useState(false);
  const [selectedClient, setSelectedClient] = useState({});
  const { getTableProps, headerGroups, prepareRow, rows } = useTable(
    {
      data,
      columns,
    },
    useSortBy
  );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onItemSaleDeleteButtonPressed = (itemIndex) => {
    dispatch(
      showModal({
        modalType: "DELETE_SALE_CONFIRMATION_MODAL",
        modalProps: {
          title: "Delete transaction?",
          message: "Are you sure you want to delete this transaction?",
          itemIndex,
        },
      })
    );
  };

  return (
    <Paper className={classes.root}>
      <ClientPaymentsTableHeader
        toggleAddItemSaleRow={toggleAddItemSaleRow}
        showAddItemSaleRow={showAddItemSaleRow}
        setSelectedClient={setSelectedClient}
        selectedClient={selectedClient}
      />
      <TableContainer>
        <Table {...getTableProps()} stickyHeader>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    {...header.getHeaderProps(header.getSortByToggleProps())}
                  >
                    <div key={header.id} className={classes.tableHeader}>
                      {header.render("Header")}
                      {header.isSorted ? (
                        header.isSortedDesc ? (
                          <ArrowDownwardIcon fontSize="small" />
                        ) : (
                          <ArrowUpwardIcon fontSize="small" />
                        )
                      ) : null}
                    </div>
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody className={classes.container}>
            <ClientPaymentsTableAddItemRow
              showAddItemSaleRow={showAddItemSaleRow}
              toggleAddItemSaleRow={toggleAddItemSaleRow}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
            />
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, _) => {
                prepareRow(row);
                return (
                  <>
                    <TableRow key={row.id} {...row.getRowProps()}>
                      {row.cells.map((cell, index) => {
                        return (
                          <TableCell key={`col${index}`}>
                            <div {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </div>
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Button
                          className={classes.deleteButton}
                          variant="outlined"
                          onClick={() => {
                            onItemSaleDeleteButtonPressed(row.index);
                          }}
                        >
                          <Delete color="error" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        rowsPerPage={rowsPerPage}
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
