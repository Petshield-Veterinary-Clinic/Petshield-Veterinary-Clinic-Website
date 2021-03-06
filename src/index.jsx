import { CssBaseline, StylesProvider, ThemeProvider } from "@material-ui/core";
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
    document.getElementById("root")
  );
};

render();
