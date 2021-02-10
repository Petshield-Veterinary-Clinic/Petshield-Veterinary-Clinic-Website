import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { Typography, ButtonBase } from "@material-ui/core";
import { showModal } from "../../features/modals/modalSlice";
import { currencyFormatter } from "../../utils/formatter";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "150px",
      alignItems: "center",
      padding: "1em",
      backgroundColor: "#1D1D1D",
      overflow: "hidden",
      "&::before": {
        content: '" "',
        position: "absolute",
        backgroundColor: theme.palette.primary.main,
        height: "8px",
        width: "50%",
        top: "-3px",
        borderRadius: "20px",
      },
    },
  };
});

export const SalesCard = ({ title, value, dailySales }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSalesCardPressed = () => {
    if (dailySales && Object.keys(dailySales).length !== 0) {
      if (String(title).includes("Net Sales")) {
        dispatch(
          showModal({
            modalType: "NET_SALES_BREAKDOWN_MODAL",
            modalProps: {
              title,
              dailySales,
            },
          })
        );
      } else {
        dispatch(
          showModal({
            modalType: "SALES_BREAKDOWN_MODAL",
            modalProps: {
              title,
              dailySales,
            },
          })
        );
      }
    }
  };

  return (
    <ButtonBase
      className={classes.root}
      elevation={0}
      onClick={onSalesCardPressed}
    >
      <Typography style={{ fontWeight: "bold" }} align="center">
        {title}
      </Typography>
      <Typography>{currencyFormatter(value)}</Typography>
    </ButtonBase>
  );
};
