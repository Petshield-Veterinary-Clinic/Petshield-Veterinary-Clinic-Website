import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

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
      MuiMenu: {
        styleOverrides: {
          padding: "1em",
        },
      },
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
      MuiTableCell: {
        styleOverrides: {
          root: {
            textAlign: "center",
          },
        },
      },
    },
  }),
  {
    disableAlign: true,
  }
);
