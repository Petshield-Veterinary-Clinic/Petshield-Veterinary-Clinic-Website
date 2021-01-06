import React from "react";
import { useDispatch, useSelector } from "react-redux";

import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { hideModal } from "../../modals/modalSlice";
import { deleteItemSale } from "../inventorySales/inventorySalesSlice";

export const InventoryDeleteItemSaleConfirmationModal = ({
  isVisible,
  title,
  message,
  itemIndex,
}) => {
  const dispatch = useDispatch();
  const { itemSales } = useSelector((state) => state.inventorySales);

  const handlePositivePressed = () => {
    dispatch(deleteItemSale(itemSales[itemIndex].ID));
  };
  const handleNegativePressed = () => {
    dispatch(hideModal());
  };

  return (
    <ConfirmationModal
      isVisible={isVisible}
      title={title}
      message={message}
      handleNegativePressed={handleNegativePressed}
      handlePositivePressed={handlePositivePressed}
    />
  );
};
