import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

import InventoryAllItemsTableButtons from "./InventoryAllItemsTableButtons";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      height: "100%",
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: "20px",
      padding: "1.5em",
    },
    showItemCountButtons: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    showItemCountField: {
      width: "50px",
    },
    pagination: {
      display: "flex",
      width: "100%",
      paddingTop: "1em",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inStock: {},
    outOfStock: {
      color: "red",
      border: "1px solid red",
      borderRadius: "20px",
      textAlign: "center",
    },
  };
});

export const InventoryAllItemsTable = ({ items }) => {
  const classes = useStyles();
  const data = useMemo(
    () =>
      items.map((item) => {
        return {
          col1: item.ID,
          col2: item.name,
          col3: item.salesCategory,
          col4: item.inStock,
          col5:
            Number.parseInt(item.inStock) === 0 ? "Out of Stock" : "In Stock",
        };
      }),
    [items]
  );

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "col1",
      },
      {
        Header: "Name",
        accessor: "col2",
      },
      {
        Header: "Category",
        accessor: "col3",
      },
      {
        Header: "Stock",
        accessor: "col4",
      },
      {
        Header: "Status",
        accessor: "col5",
      },
    ],
    []
  );

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
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
    }
    return {
      className: "",
    };
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.showItemCountButtons}>
        <div>
          <span>Showing &nbsp;</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>&nbsp; entries</span>
        </div>
      </div>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow>
              {headerGroup.headers.map((header) => (
                <TableCell {...header.getHeaderProps()}>
                  {header.render("Header")}
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
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        {...cell.getCellProps([
                          {
                            className: cell.column.className,
                          },
                          getCellProps(cell),
                        ])}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <Button
                      fullWidth
                      endIcon={<EditIcon></EditIcon>}
                      variant="contained"
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
      {/* Pagination can be built however you'd like. This is just a very basic UI
      implementation: */}
      <div className={classes.pagination}>
        <span>
          Showing{" "}
          <strong>
            {pageSize * (pageIndex + 1) >= items.length
              ? items.length
              : pageSize * (pageIndex + 1)}
          </strong>{" "}
          out of <strong>{items.length}</strong> items.
        </span>
        <div>
          <InventoryAllItemsTableButtons
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            previousPage={previousPage}
            nextPage={nextPage}
            gotoPage={gotoPage}
            pageCount={pageCount}
          />
        </div>
      </div>
    </Paper>
  );
};
