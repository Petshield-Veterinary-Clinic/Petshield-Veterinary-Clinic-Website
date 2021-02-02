import React from "react";
import { Switch, Route } from "react-router-dom";

import ItemCategories from "./ItemCategories/ItemCategories";

const AdminPage = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/item-categories`} component={ItemCategories} />
    </Switch>
  );
};

export default AdminPage;
