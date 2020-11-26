import React from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "../../features/modals/modalSlice";

import { logout } from "../../features/auth/authSlice";
import ConfirmationModal from "./ConfirmationModal";
import history from "../../app/history";

export const LogoutModal = ({ isVisible, title, message }) => {
  const dispatch = useDispatch();

  const handlePositivePressed = () => {
    dispatch(logout());
    history.replace("/auth/login");
    dispatch(hideModal());
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

export default LogoutModal;
