import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ItemCategoriesTableContainer from "./ItemCategoriesTable/ItemCategoriesTableContainer";
import { fetchItemCategories } from "../../itemCategory/itemCategorySlice";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      padding: theme.spacing(3),

      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#121212",
      paddingTop: "83px",

      [theme.breakpoints.up("sm")]: {
        height: "100vh",
      },
    },

    loadingIndicator: {
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
});

const ItemCategories = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isLoading, categories, error } = useSelector(
    (state) => state.itemCategories
  );

  useEffect(() => {
    dispatch(fetchItemCategories());
  }, [dispatch]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={classes.loadingIndicator}>
          <CircularProgress color="secondary" />
        </div>
      );
    }
    if (error) {
      return <div>An Error has occured!</div>;
    }
    return <ItemCategoriesTableContainer categories={categories} />;
  };

  return <div className={classes.root}>{renderContent()}</div>;
};

export default ItemCategories;
