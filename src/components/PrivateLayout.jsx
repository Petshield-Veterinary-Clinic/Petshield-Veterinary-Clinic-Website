import React from "react";

import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CustomAppBar } from "./CustomAppBar";
import { CustomDrawer } from "./CustomDrawer";

const PrivateLayout = ({ component: Component, ...restProps }) => {
  // Get Authentication Reducer
  const { user } = useSelector((state) => state.auth);

  if (Object.keys(user).length !== 0) {
    return (
      <Route
        {...restProps}
        render={(props) => (
          <>
            <CustomAppBar />
            <CustomDrawer />
            <Component {...props} />
          </>
        )}
      />
    );
  }
  return (
    <Redirect
      to={{
        pathname: "/auth/login",
      }}
    />
  );
};

export default PrivateLayout;
