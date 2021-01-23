import React from "react";
import { Switch, Route } from "react-router-dom";
import InventoryItems from "./inventoryItems/InventoryItems";
import InventorySales from "./inventorySales/InventorySales";

const InventoryPage = ({ match, ...restProps }) => {
  return (
    <Switch>
      <Route path={`${match.url}/items`} component={InventoryItems} />
      <Route path={`${match.url}/sales`} component={InventorySales} />
    </Switch>
  );
};

export default InventoryPage;
