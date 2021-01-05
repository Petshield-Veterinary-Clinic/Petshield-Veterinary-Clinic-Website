import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

export const darkTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1e88e5",
      },
      secondary: {
        main: "#26a69a",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "#1D1D1D",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#1D1D1D",
          },
        },
      },
    },
  })
);
