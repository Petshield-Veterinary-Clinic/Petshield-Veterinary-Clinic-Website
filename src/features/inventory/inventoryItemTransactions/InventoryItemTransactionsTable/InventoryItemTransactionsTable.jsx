import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { blue } from "@material-ui/core/colors";
import InventoryItemTransactionsTableFooter from "./InventoryItemTransactionsTableFooter";
import InventoryItemTransactionsTableHeader from "./InventoryItemTransactionsTableHeader";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      height: "100%",
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: "20px",
      padding: "1.5em",
      overflowX: "auto",
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

export const InventoryItemTransactionsTable = ({ data, columns }) => {
  const classes = useStyles();

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
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
    useSortBy,
    usePagination
  );

  const renderCell = (cell) => {
    return <Typography>{cell.render("Cell")}</Typography>;
  };

  return (
    <Paper className={classes.root}>
      <InventoryItemTransactionsTableHeader
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
      <Table {...getTableProps()}>
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
        <TableBody>
          {page.map((row, _) => {
            prepareRow(row);
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
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
      <InventoryItemTransactionsTableFooter
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        gotoPage={gotoPage}
        pageCount={pageCount}
        pageSize={pageSize}
        pageIndex={pageIndex}
        itemsCount={data.length}
      />
    </Paper>
  );
};
