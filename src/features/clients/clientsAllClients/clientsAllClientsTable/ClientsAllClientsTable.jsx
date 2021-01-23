import React, { useState } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { blue } from "@material-ui/core/colors";
import ClientsAllClientsTableHeader from "./ClientsAllClientsTableHeader";
import { ClientsAllClientsTableRow } from "./ClientsAllClientsTableRow";

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

    expandedContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
    },
    buttonGrid: {
      height: "100%",
      display: "grid",
      gridTemplate: "1fr 1fr  / 1fr 1fr 1fr",
      placeContent: "center",
      gridGap: "0.3em",
    },
    petAvatar: {
      height: theme.spacing(7),
      width: theme.spacing(7),
      marginRight: "1em",
      placeSelf: "center",
    },
    owner: {
      opacity: "0.6",
    },

    rxIcon: {
      border: "1px solid black",
      backgroundColor: "white",
      "& img": {
        height: "20px",
      },
    },
  };
});

export const ClientsAllClientsTable = ({ data, columns }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { getTableProps, headerGroups, prepareRow, rows, setFilter } = useTable(
    {
      data,
      columns,
    },
    useFilters,
    useSortBy
  );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOnClientDeleteButtonPressed = (itemIndex) => {};

  const handleSearchClientChanged = (searchTerm) => {
    setFilter("col1", searchTerm);
  };

  return (
    <Paper className={classes.root}>
      <ClientsAllClientsTableHeader
        handleSearchClientChanged={handleSearchClientChanged}
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
                    <div className={classes.tableHeader}>
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
                <TableCell>Actions</TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody className={classes.container}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, _) => {
                prepareRow(row);
                return (
                  <ClientsAllClientsTableRow row={row} classes={classes} />
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
