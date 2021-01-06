import React from "react";
import { useDispatch } from "react-redux";
import { addItemSale } from "../inventorySales/inventorySalesSlice";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { hideModal } from "../../modals/modalSlice";

export const InventoryAddItemSaleConfirmationModal = ({
  isVisible,
  title,
  message,
  itemDetails,
}) => {
  const dispatch = useDispatch();

  const handleNegativePressed = () => {
    dispatch(hideModal());
  };
  const handlePositivePressed = () => {
    dispatch(addItemSale(itemDetails.itemId, itemDetails.quantity));
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
