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
  Typography,
  TablePagination,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Delete } from "@material-ui/icons";
import { blue } from "@material-ui/core/colors";
import ItemCategoriesTableHeader from "./ItemCategoriesTableHeader";
import { ItemCategoriesTableAddItemRow } from "./ItemCategoriesTableAddItemRow";
import { useDispatch } from "react-redux";
import { deleteItemCategory } from "../../../itemCategory/itemCategorySlice";

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

export const ItemCategoriesTable = ({ data, columns, categories }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAddItemCategoryRow, toggleAddItemCategoryRow] = useState(false);
  const { getTableProps, headerGroups, prepareRow, rows } = useTable(
    {
      data,
      columns,
    },
    useSortBy
  );

  const renderCell = (cell) => {
    return <Typography>{cell.render("Cell")}</Typography>;
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onItemCategoryDeleteButtonPressed = (itemIndex) => {
    const itemCategory = categories[itemIndex];

    dispatch(deleteItemCategory(itemCategory.ID));
  };

  return (
    <Paper className={classes.root}>
      <ItemCategoriesTableHeader
        toggleAddItemCategoryRow={toggleAddItemCategoryRow}
        showAddItemCategoryRow={showAddItemCategoryRow}
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
            <ItemCategoriesTableAddItemRow
              showAddItemCategoryRow={showAddItemCategoryRow}
              toggleAddItemCategoryRow={toggleAddItemCategoryRow}
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
                              {renderCell(cell)}
                            </div>
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Button
                          className={classes.deleteButton}
                          variant="outlined"
                          onClick={() => {
                            onItemCategoryDeleteButtonPressed(row.index);
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
