import React from "react";
import { useSelector } from "react-redux";
import {
  LoadingModal,
  ErrorModal,
  SuccessModal,
} from "../../components/modals";

const modalComponents = {
  LOADING_MODAL: LoadingModal,
  ERROR_MODAL: ErrorModal,
  SUCCESS_MODAL: SuccessModal,
};

const InfoModalManager = () => {
  const { modalProps, modalType } = useSelector((state) => state.infoModals);

  if (!modalType) {
    return null;
  }

  const Modal = modalComponents[modalType];
  return <Modal isVisible={modalType !== ""} {...modalProps} />;
};

export default InfoModalManager;
