import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app/App";
import store from "./app/store";
import { darkTheme } from "./consts";

const render = () => {
  ReactDOM.render(
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>,
    document.getElementById("root")
  );
};

render();
