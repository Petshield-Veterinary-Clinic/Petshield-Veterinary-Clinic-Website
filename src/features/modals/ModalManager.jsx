import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  LoadingModal,
  ErrorModal,
  SuccessModal,
} from "../../components/modals";
import { InventoryAddItemModal } from "../inventory/inventoryModals";

const modalComponents = {
  ADD_ITEM_MODAL: InventoryAddItemModal,
  LOADING_MODAL: LoadingModal,
  ERROR_MODAL: ErrorModal,
  SUCCESS_MODAL: SuccessModal,
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
