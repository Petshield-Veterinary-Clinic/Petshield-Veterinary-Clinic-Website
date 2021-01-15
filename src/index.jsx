<<<<<<< HEAD
import { CssBaseline, StylesProvider, ThemeProvider } from "@material-ui/core";

=======
import { CssBaseline, ThemeProvider } from "@material-ui/core";
>>>>>>> c9e2022ac00805885e01c24e726810f10b18c09e
import { LocalizationProvider } from "@material-ui/lab";
import AdapterMoment from "@material-ui/lab/AdapterMoment";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app/App";
import store from "./app/store";
import { darkTheme } from "./consts";

const render = () => {
  ReactDOM.render(
<<<<<<< HEAD
    <StylesProvider injectFirst>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CssBaseline />
          <Provider store={store}>
            <App />
          </Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </StylesProvider>,
=======
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>,
>>>>>>> c9e2022ac00805885e01c24e726810f10b18c09e
    document.getElementById("root")
  );
};

render();
