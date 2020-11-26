import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  LoadingModal,
  ErrorModal,
  SuccessModal,
  LogoutModal,
} from "../../components/modals";
import { ConfirmationModal } from "../../components/modals/ConfirmationModal";

import {
  InventoryAddItemModal,
  InventoryDiscountItemModal,
  InventoryManageItemModal,
  InventoryModifyItemModal,
} from "../inventory/inventoryModals";

const modalComponents = {
  ADD_ITEM_MODAL: InventoryAddItemModal,
  MANAGE_ITEM_MODAL: InventoryManageItemModal,
  MODIFY_ITEM_MODAL: InventoryModifyItemModal,
  DISCOUNT_ITEM_MODAL: InventoryDiscountItemModal,
  LOADING_MODAL: LoadingModal,
  ERROR_MODAL: ErrorModal,
  SUCCESS_MODAL: SuccessModal,
  LOGOUT_MODAL: LogoutModal,
};

const ModalManager = () => {
  const { modalProps, modalType } = useSelector((state) => state.modals);

  if (!modalType) {
    return null;
  }

  const Modal = modalComponents[modalType];
  return <Modal isVisible={modalType !== ""} {...modalProps} />;
};

export default ModalManager;
