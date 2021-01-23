import { List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { ClientCard } from "./ClientCard";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      minHeight: "100%",
      overflowY: "auto",
      overflowX: "hidden",
      padding: `0 ${theme.spacing(2)}`,
      paddingBottom: theme.spacing(5), // This is added in order to have space in the end of the list.
    },
  };
});
export const ClientsAllClientsList = ({ clients }) => {
  const classes = useStyles();

  const renderContent = () => {
    return Object.keys(clients).map((key) => (
      <ClientCard key={clients[key].ID} client={clients[key]} index={key} />
    ));
  };

  return <List className={classes.root}>{renderContent()}</List>;
};
