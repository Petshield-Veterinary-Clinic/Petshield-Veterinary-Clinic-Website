import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { drawerWidth } from "../consts";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../assets/house.svg";
import AllClientsIcon from "../assets/all_clients.svg";
import AllItemsIcon from "../assets/all_items.svg";
import AppointmentsIcon from "../assets/appointments.svg";
import ClientsIcon from "../assets/clients.svg";
import DashboardIcon from "../assets/dashboard.svg";
import InventoryIcon from "../assets/inventory.svg";
import ItemTransactionIcon from "../assets/item_transactions.svg";
import PetQueueIcon from "../assets/pet_queue.svg";
import PaymentsIcon from "../assets/payments.svg";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../features/drawer/drawerSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#343434",
  },

  nested: {
    paddingLeft: `${theme.spacing(4)}`,
  },
  drawerIcon: {
    width: "34px",
    height: "34px",
    fill: `${theme.palette.primary.main} !important`,
  },
}));

export const CustomDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.drawer);
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
          path: "/home/dashboard",
        },
        {
          label: "Pet Queue",
          icon: PetQueueIcon,
          path: "/home/pet-queues",
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
          path: "/clients/all-clients",
        },
        {
          label: "Payments",
          icon: PaymentsIcon,
          path: "/clients/payments",
        },
        {
          label: "Appointments",
          icon: AppointmentsIcon,
          path: "/clients/appointments",
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
          path: "/inventory/items",
        },
        {
          label: "Item Transactions",
          icon: ItemTransactionIcon,
          path: "/inventory/sales",
        },
      ],
    },
  ];

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menuItems.map((item) => {
          return (
            <React.Fragment key={item.label}>
              <ListItem key={item.label} button onClick={item.handleOnClick}>
                <ListItemIcon>
                  <ReactSVG
                    key={item.label}
                    src={item.icon}
                    beforeInjection={(svg) => {
                      svg.classList.add(classes.drawerIcon);
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={item.label}></ListItemText>
                {expandedItems[item.type] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={expandedItems[item.type]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div">
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
                          <ReactSVG
                            src={subItem.icon}
                            key={subItem.label}
                            beforeInjection={(svg) => {
                              svg.classList.add(classes.drawerIcon);
                            }}
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
    </>
  );

  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  const renderContent = () => {
    return (
      <>
        <Hidden smUp implementation="css">
          <Drawer
            className={classes.drawer}
            variant="temporary"
            anchor="left"
            open={isOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </>
    );
  };

  return renderContent();
};
