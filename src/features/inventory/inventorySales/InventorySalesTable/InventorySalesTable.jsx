import React, { useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { blue } from "@material-ui/core/colors";
import InventorySalesTableFooter from "./InventorySalesTableFooter";
import InventorySalesTableHeader from "./InventorySalesTableHeader";

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
  };
});

export const InventorySalesTable = ({ data, columns }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      data,
      columns,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    useSortBy
  );

  const renderCell = (cell) => {
    return <Typography>{cell.render("Cell")}</Typography>;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <InventorySalesTableHeader
        pageSize={pageSize}
        setPageSize={setPageSize}
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
              </TableRow>
            ))}
          </TableHead>
          <TableBody className={classes.container}>
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
                              {renderCell(cell)}
                            </div>
                          </TableCell>
                        );
                      })}
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
