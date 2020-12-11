import React from "react";

import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  // Get Authentication Reducer
  const { user } = useSelector((state) => state.auth);

  if (Object.keys(user).length !== 0 && user.constructor === Object) {
    return (
      <Route
        path={props.path}
        exact={props.exact}
        component={props.component}
      />
    );
  }

  return <Redirect to={"/auth/login"} />;
};

export default PrivateRoute;
