import React from "react";
import { useSelector } from "react-redux";
import {
  LoadingModal,
  ErrorModal,
  SuccessModal,
  LogoutModal,
  SalesBreakdownModal,
  NetSalesBreakdownModal,
} from "../../components/modals";
import {
  AddClientModal,
  ClientTransactionsModal,
  VeterinarianNoteModal,
  AddAppointmentModal,
  ClientAppointmentsModal,
} from "../clients/clientsModals";

import {
  InventoryAddItemModal,
  InventoryDiscountItemModal,
  InventoryManageItemModal,
  InventoryModifyItemModal,
  InventoryAddItemSaleConfirmationModal,
  InventoryDeleteItemSaleConfirmationModal,
} from "../inventory/inventoryModals";

const modalComponents = {
  ADD_ITEM_MODAL: InventoryAddItemModal,
  ADD_SALE_CONFIRMATION_MODAL: InventoryAddItemSaleConfirmationModal,
  DELETE_SALE_CONFIRMATION_MODAL: InventoryDeleteItemSaleConfirmationModal,
  MANAGE_ITEM_MODAL: InventoryManageItemModal,
  MODIFY_ITEM_MODAL: InventoryModifyItemModal,
  DISCOUNT_ITEM_MODAL: InventoryDiscountItemModal,
  LOADING_MODAL: LoadingModal,
  ERROR_MODAL: ErrorModal,
  SUCCESS_MODAL: SuccessModal,
  LOGOUT_MODAL: LogoutModal,
  ADD_CLIENT_MODAL: AddClientModal,
  ADD_APPOINTMENT_MODAL: AddAppointmentModal,
  CLIENT_TRANSACTIONS_MODAL: ClientTransactionsModal,
  CLIENT_APPOINTMENTS_MODAL: ClientAppointmentsModal,
  CLIENT_VETERINARIAN_NOTE_MODAL: VeterinarianNoteModal,
  SALES_BREAKDOWN_MODAL: SalesBreakdownModal,
  NET_SALES_BREAKDOWN_MODAL: NetSalesBreakdownModal,
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
