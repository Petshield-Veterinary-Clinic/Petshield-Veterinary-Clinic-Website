import React from "react";
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
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../assets/house.svg";
import AgreementFormIcon from "../assets/agreement_form.svg";
import AllClientsIcon from "../assets/all_clients.svg";
import AllItemsIcon from "../assets/all_items.svg";
import AppointmentsIcon from "../assets/appointments.svg";
import ClientsIcon from "../assets/clients.svg";
import DashboardIcon from "../assets/dashboard.svg";
import InventoryIcon from "../assets/inventory.svg";
import ItemTransactionIcon from "../assets/item_transactions.svg";
import PetQueueIcon from "../assets/pet_queue.svg";
import PaymentsIcon from "../assets/payments.svg";

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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const CustomDrawer = () => {
  const classes = useStyles();
  const [expandedItems, setExpandedItems] = useState({
    home: false,
    clients: false,
    inventory: false,
  });

  const menuItems = [
    {
      label: "Home",
      type: "home",
      handleOnClick: () =>
        setExpandedItems({ ...expandedItems, home: !expandedItems.home }),
      icon: HomeIcon,
      subItems: [
        {
          label: "Dashboard",
          icon: DashboardIcon,
          path: " ",
        },
        {
          label: "Pet Queue",
          icon: PetQueueIcon,
          path: " ",
        },
      ],
    },
    {
      label: "Clients",
      type: "clients",
      handleOnClick: () =>
        setExpandedItems({ ...expandedItems, clients: !expandedItems.clients }),
      icon: ClientsIcon,
      subItems: [
        {
          label: "All Clients",
          icon: AllClientsIcon,
          path: " ",
        },
        {
          label: "Payments",
          icon: PaymentsIcon,
          path: " ",
        },
        {
          label: "Appointments",
          icon: AppointmentsIcon,
          path: " ",
        },
        {
          label: "Agreement Form",
          icon: AgreementFormIcon,
          path: " ",
        },
      ],
    },
    {
      label: "Inventory",
      type: "inventory",
      handleOnClick: () =>
        setExpandedItems({
          ...expandedItems,
          inventory: !expandedItems.inventory,
        }),
      icon: InventoryIcon,
      subItems: [
        {
          label: "All Items",
          icon: AllItemsIcon,
          path: "/inventory/all-items",
        },
        {
          label: "Item Transactions",
          icon: ItemTransactionIcon,
          path: "/inventory/item-transactions",
        },
      ],
    },
  ];

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
        {menuItems.map((item) => {
          return (
            <React.Fragment key={item.label}>
              <ListItem key={item.label} button onClick={item.handleOnClick}>
                <ListItemIcon>
                  <img src={item.icon} height="35px" alt={item.label} />
                </ListItemIcon>
                <ListItemText primary={item.label}></ListItemText>
                {expandedItems[item.type] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={expandedItems[item.type]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => {
                    return (
                      <ListItem
                        key={subItem.label}
                        button
                        component={Link}
                        to={subItem.path}
                        className={classes.nested}
                      >
                        <ListItemIcon>
                          <img
                            src={subItem.icon}
                            height="35px"
                            alt={subItem.label}
                          />
                        </ListItemIcon>
                        <ListItemText primary={subItem.label}></ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};
