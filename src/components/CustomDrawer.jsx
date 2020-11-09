import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { drawerWidth } from "../consts";
import { HomeOutlined, ExpandLess, ExpandMore } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export const CustomDrawer = () => {
  const classes = useStyles();
  const [expandedItems, setExpandedItems] = useState({
    homeItem: false,
    clientsItem: false,
    inventoryItem: false,
  });

  const handleItemClick = (type) => {
    switch (type) {
      case "home":
        setExpandedItems({
          ...expandedItems,
          homeItem: !expandedItems.homeItem,
        });
        break;
      case "clients":
        setExpandedItems({
          ...expandedItems,
          clientsItem: !expandedItems.clientsItem,
        });
        break;
      case "inventory":
        setExpandedItems({
          ...expandedItems,
          inventoryItem: !expandedItems.inventoryItem,
        });
        break;
    }
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={() => handleItemClick("home")}>
          <ListItemIcon>
            <HomeOutlined />
          </ListItemIcon>
          <ListItemText primary="Home" />
          {expandedItems.homeItem ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </List>
    </Drawer>
  );
};
