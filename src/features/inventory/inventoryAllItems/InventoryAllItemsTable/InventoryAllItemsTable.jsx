import React, { useMemo } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
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

import InventoryAllItemsTableFooter from "./InventoryAllItemsTableFooter";
import InventoryAllItemsTableHeader from "./InventoryAllItemsTableHeader";
import { showModal } from "../../../modals/modalSlice";
import { blue } from "@material-ui/core/colors";

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

export const InventoryAllItemsTable = ({ items }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const data = useMemo(() => {
    return items.map((item) => {
      let status = "";
      const isDiscounted = item.discount > 0;
      const discountAmount = isDiscounted
        ? item.price * (item.discount / 100)
        : 0;
      // Check if the item is In Stock and if has discount
      if (item.discount > 0 && item.inStock > 0) {
        status = "Discounted";
      } else if (item.discount === 0 && item.inStock > 0) {
        status = "In Stock";
      } else {
        status = "Out of Stock";
      }

      return {
        col1: item.ID,
        col2: item.name,
        col3: item.salesCategory,
        col4: item.inStock,
        col5: status,
        col6: item.price.toFixed(2),
        col7: item.discount,
        col8: (item.price - discountAmount).toFixed(2),
      };
    });
  }, [items]);

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
      {
        Header: "Original Price",
        accessor: "col6",
      },
      {
        Header: "Discount",
        accessor: "col7",
      },
      {
        Header: "Total Price",
        accessor: "col8",
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
    if (cell.column.id === "col6" || cell.column.id === "col8") {
      return <Typography>₱{cell.render("Cell")}</Typography>;
    } else if (cell.column.id === "col7") {
      const discountAmount =
        (cell.row.values.col7 / 100) * cell.row.values.col6;
      return (
        <Typography>
          {cell.render("Cell")}%{` (${discountAmount.toFixed(2)})`}
        </Typography>
      );
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

  return (
    <Paper className={classes.root}>
      <InventoryAllItemsTableHeader
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
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
                      <TableCell>
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
                  <TableCell>
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
      <InventoryAllItemsTableFooter
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        gotoPage={gotoPage}
        pageCount={pageCount}
        pageSize={pageSize}
        pageIndex={pageIndex}
        itemsCount={items.length}
      />
    </Paper>
  );
};
