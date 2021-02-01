import React from "react";
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { useDispatch } from "react-redux";

import InventoryItemsTableFooter from "./InventoryItemsTableFooter";
import InventoryItemsTableHeader from "./InventoryItemsTableHeader";
import { showModal } from "../../../modals/modalSlice";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      height: "100%",

      backgroundColor: "#1d1d1d",
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

export const InventoryItemsTable = ({ data, columns, items }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setFilter,
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
    useFilters,
    useSortBy,
    usePagination
  );

  const getCellProps = (cellInfo) => {
    if (cellInfo.value === "Out of Stock") {
      return {
        className: classes.outOfStock,
      };
    } else if (cellInfo.value === "In Stock") {
      return {
        className: classes.inStock,
      };
    } else if (cellInfo.value === "Discounted") {
      return {
        className: classes.itemDiscounted,
      };
    }
    return {
      className: "",
    };
  };

  const renderCell = (cell) => {
    if (cell.column.id === "col5") {
      return <Typography>₱{cell.render("Cell")}</Typography>;
    } else if (cell.column.id === "col7") {
      const discountAmount =
        (cell.row.values.col6 / 100) * cell.row.values.col5;
      return (
        <Typography>
          ₱{cell.render("Cell")}
          {` (${discountAmount.toFixed(2)})`}
        </Typography>
      );
    } else if (cell.column.id === "col6") {
      return <Typography>{cell.render("Cell")}%</Typography>;
    }
    return <Typography>{cell.render("Cell")}</Typography>;
  };

  const handleManageItemPress = (itemIndex) => {
    dispatch(
      showModal({
        modalType: "MANAGE_ITEM_MODAL",
        modalProps: {
          item: items[itemIndex],
          itemIndex,
        },
      })
    );
  };

  const handleSearchItemChanged = (searchTerm) => {
    setFilter("col1", searchTerm);
  };

  return (
    <Paper className={classes.root}>
      <InventoryItemsTableHeader
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleSearchItemChanged={handleSearchItemChanged}
      />
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
        <TableBody>
          {page.map((row, _) => {
            prepareRow(row);
            return (
              <>
                <TableRow key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <TableCell key={`col${index}`}>
                        <div
                          {...cell.getCellProps([
                            {
                              className: cell.column.className,
                            },
                            getCellProps(cell),
                          ])}
                        >
                          {renderCell(cell)}
                        </div>
                      </TableCell>
                    );
                  })}
                  <TableCell key={row.id}>
                    <Button
                      fullWidth
                      endIcon={<EditIcon></EditIcon>}
                      variant="contained"
                      onClick={() => {
                        handleManageItemPress(row.index);
                      }}
                    >
                      Manage Item
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
      <InventoryItemsTableFooter
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        gotoPage={gotoPage}
        pageCount={pageCount}
        pageSize={pageSize}
        pageIndex={pageIndex}
        itemsCount={rows.length}
      />
    </Paper>
  );
};
