import { createMuiTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { ThemeConsumer } from "styled-components";

export const drawerWidth = 240;
export const LOCAL_API_BASE_URL = "http://localhost:8000";

// THEMES

export const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#424242",
    },
    secondary: {
      main: green[400],
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
    text: {
      primary: green[400],
    },
  },
  overrides: {
    MuiButton: {
      outlined: {
        borderColor: green[400],
      },
      contained: {
        backgroundColor: green[400],
        color: "#FFFFFF",
      },
    },
    MuiSelect: {
      icon: {
        color: green[400],
      },
    },

    MuiDialogContentText: {
      root: {
        color: green[400],
      },
    },
    MuiDialogTitle: {
      root: {
        color: green[400],
      },
    },
    MuiOutlinedInput: {
      root: {
        borderColor: green[400],
        "&.MuiFormLabel": {
          color: "white",
        },
      },
      notchedOutline: {
        borderColor: `${green[400]} !important`,
      },
    },
    MuiFormLabel: {
      root: {
        color: `${green[400]} !important`,
      },
    },
    MuiTableCell: {
      root: {
        textAlign: "center",
        padding: "1em",
      },
    },
  },
});
