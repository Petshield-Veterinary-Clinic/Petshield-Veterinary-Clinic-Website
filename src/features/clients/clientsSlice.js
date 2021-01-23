import { createSlice } from "@reduxjs/toolkit";
import { config } from "../../consts";
import {
  addClient as apiAddClient,
  addClientPayment as apiAddClientPayment,
  fetchClientPaymentHistory as apiFetchClientPaymentHistory,
  updateClient as apiUpdateClient,
  addAppointment as apiAddAppointment,
  updateAppointment as apiUpdateAppointment,
  fetchClientAppointments as apiFetchClientAppointments,
  removeAppointment as apiRemoveAppointment,
} from "../../api/clients";
import { showInfoModal, hideInfoModal } from "../modals/infoModalSlice";

const initialState = {
  clients: {},
  paymentHistory: [],
  appointments: [],
  clientAppointments: [],
  clientPayments: {},
  isClientsLoading: false,
  isPaymentsLoading: false,
  isAppointmentsLoading: false,
  isClientSearchingLoading: false,
  error: null,
};

const handleOnFailure = (state, action) => {
  state.error = action.payload;
};

const clientsSlice = createSlice({
  name: "clientsSlice",
  initialState,
  reducers: {
    fetchClientsStart(state) {
      state.isClientsLoading = true;
    },
    fetchClientsSuccess(state, action) {
      state.isClientsLoading = false;
      let newClients = {};
      action.payload.forEach((client) => {
        newClients[client.ID] = client;
      });
      state.clients = newClients;
    },
    fetchClientsError: handleOnFailure,
    addClientStart(state) {
      state.isClientsLoading = true;
    },
    addClientSuccess(state) {
      state.isClientsLoading = false;
      state.error = null;
    },
    addClientError: handleOnFailure,
    updateClientStart(state) {
      state.error = null;
    },
    updateClientSuccess(state, action) {
      state.clients[action.payload.ID] = action.payload;
      state.error = null;
    },
    updateClientsError: handleOnFailure,
    addClientPaymentStart() {},
    addClientPaymentSuccess(state, action) {
      state.paymentHistory = [action.payload, ...state.paymentHistory];
      state.error = false;
    },
    addClientPaymentError: handleOnFailure,
    fetchClientPaymentHistoryStart(state) {
      state.isPaymentsLoading = true;
    },
    fetchClientPaymentHistorySuccess(state, action) {
      state.isPaymentsLoading = false;
      state.paymentHistory = action.payload;
      state.error = false;
    },
    fetchClientPaymentHistoryError: handleOnFailure,
    fetchAllClientPaymentsStart(state) {
      state.isPaymentsLoading = true;
    },
    fetchAllClientPaymentsSuccess(state, action) {
      state.isPaymentsLoading = false;
      state.clientPayments = action.payload;
      state.error = null;
    },
    fetchAllClientPaymentsError: handleOnFailure,
    addAppointmentStart(state) {
      state.isAppointmentsLoading = true;
      state.error = null;
    },
    addAppointmentSuccess(state, action) {},
    addAppointmentError: handleOnFailure,
    updateAppointmentStart(state) {},
    updateAppointmentSuccess(state, action) {
      state.appointments = [...action.payload];
      state.error = null;
    },
    updateAppointmentError: handleOnFailure,
    removeAppointmentStart() {},
    removeAppointmentSuccess(state, action) {
      state.appointments = action.payload;
    },
    removeAppointmentError: handleOnFailure,
    fetchAppointmentsStart(state) {
      state.isAppointmentsLoading = true;
      state.error = null;
    },
    fetchAppointmentsSuccess(state, action) {
      state.isAppointmentsLoading = false;
      state.appointments = action.payload;
      state.error = null;
    },
    fetchAppointmentsError: handleOnFailure,
    fetchClientAppointmentsStart(state) {
      state.isAppointmentsLoading = true;
      state.error = null;
    },
    fetchClientAppointmentsSuccess(state, action) {
      state.isAppointmentsLoading = false;
      state.clientAppointments = action.payload;
      state.error = null;
    },
    fetchClientAppointmentsError: handleOnFailure,
  },
});

export const {
  fetchClientsSuccess,
  fetchClientsError,
  fetchClientsStart,
  addClientStart,
  addClientError,
  addClientSuccess,
  updateClientStart,
  updateClientSuccess,
  updateClientError,
  addClientPaymentStart,
  addClientPaymentSuccess,
  addClientPaymentError,
  fetchClientPaymentHistoryStart,
  fetchClientPaymentHistorySuccess,
  fetchClientPaymentHistoryError,
  fetchAllClientPaymentsStart,
  fetchAllClientPaymentsSuccess,
  fetchAllClientPaymentsError,
  addAppointmentStart,
  addAppointmentSuccess,
  addAppointmentError,

  fetchAppointmentsError,
  fetchAppointmentsStart,
  fetchAppointmentsSuccess,
  fetchClientAppointmentsError,
  fetchClientAppointmentsStart,
  fetchClientAppointmentsSuccess,
  updateAppointmentError,
  updateAppointmentStart,
  updateAppointmentSuccess,
  removeAppointmentError,
  removeAppointmentSuccess,
  removeAppointmentStart,
} = clientsSlice.actions;

export default clientsSlice.reducer;

export const fetchClients = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  const token = localStorage.getItem("token");
  try {
    dispatch(fetchClientsStart());

    const ws = new WebSocket(
      `${config.WS_BASE_URL}/clients/${user.branchName}?jwt=${token}`
    );

    ws.onmessage = (e) => {
      const response = JSON.parse(e.data);

      dispatch(fetchClientsSuccess(response.data));
    };
  } catch (error) {
    dispatch(fetchClientsError(error.message));
  }
};

export const addClient = (client) => async (dispatch, getState) => {
  const { user } = getState().auth;
  try {
    dispatch(addClientStart());
    dispatch(
      showInfoModal({
        modalType: "LOADING_MODAL",
        modalProps: {},
      })
    );
    const newClient = await apiAddClient(client, user.branchName);
    dispatch(addClientSuccess(newClient));
    dispatch(hideInfoModal());
  } catch (error) {
    dispatch(addClientError(error.message));
  }
};

export const updateClient = (client) => async (dispatch) => {
  try {
    dispatch(updateClientStart());
    dispatch(
      showInfoModal({
        modalType: "LOADING_MODAL",
        modalProps: {},
      })
    );
    const updatedClient = await apiUpdateClient(client);
    dispatch(updateClientSuccess(updatedClient));
    dispatch(hideInfoModal());
  } catch (error) {
    dispatch(updateClientError(error.message));
  }
};
export const addClientPayment = (clientId, itemId, quantity) => async (
  dispatch,
  getState
) => {
  const { metadata } = getState().clients.clientPayments;
  try {
    dispatch(addClientPaymentStart());
    dispatch(
      showInfoModal({
        modalType: "LOADING_MODAL",
        modalProps: {},
      })
    );
    const newPayment = await apiAddClientPayment(
      clientId,
      itemId,
      quantity,
      metadata.salesDate,
      metadata.salesDateCateg
    );
    dispatch(hideInfoModal());
    dispatch(addClientPaymentSuccess(newPayment));
  } catch (error) {
    dispatch(addClientPaymentError(error.message));
  }
};

export const fetchClientPaymentHistory = (clientId) => async (dispatch) => {
  try {
    dispatch(fetchClientPaymentHistoryStart());

    const clientPayments = await apiFetchClientPaymentHistory(clientId);
    dispatch(fetchClientPaymentHistorySuccess(clientPayments));
  } catch (error) {
    dispatch(fetchClientPaymentHistoryError(error.message));
  }
};

export const fetchAllClientPayments = ({ salesDate, salesDateCateg }) => async (
  dispatch,
  getState
) => {
  const { user } = getState().auth;
  const token = localStorage.getItem("token");
  try {
    dispatch(fetchAllClientPaymentsStart());
    const ws = new WebSocket(
      `${config.WS_BASE_URL}/clients/${user.branchName}/all-payments?jwt=${token}&salesDate=${salesDate}&salesDateCateg=${salesDateCateg}`
    );

    ws.onmessage = (e) => {
      const response = JSON.parse(e.data);

      dispatch(fetchAllClientPaymentsSuccess(response.data));
    };
  } catch (error) {
    dispatch(fetchAllClientPaymentsError(error.message));
  }
};

export const addAppointment = ({ clientId, appointment }) => async (
  dispatch
) => {
  try {
    dispatch(addAppointmentStart());
    dispatch(
      showInfoModal({
        modalType: "LOADING_MODAL",
        modalProps: {},
      })
    );
    const newAppointment = await apiAddAppointment({ clientId, appointment });
    dispatch(hideInfoModal());
    dispatch(addAppointmentSuccess(newAppointment));
  } catch (error) {
    dispatch(addAppointmentError(error.message));
  }
};

export const removeAppointment = ({ appointmentId }) => async (
  dispatch,
  getState
) => {
  const { user } = getState().auth;
  try {
    dispatch(removeAppointmentStart());
    dispatch(
      showInfoModal({
        modalType: "LOADING_MODAL",
        modalProps: {},
      })
    );
    const appointments = await apiRemoveAppointment({
      appointmentId,
      branchName: user.branchName,
    });
    dispatch(hideInfoModal());
    dispatch(removeAppointmentSuccess(appointments));
  } catch (error) {
    dispatch(removeAppointmentError(error.message));
  }
};

export const updateAppointment = ({ appointment }) => async (
  dispatch,
  getState
) => {
  const { user } = getState().auth;
  try {
    dispatch(updateAppointmentStart());
    dispatch(
      showInfoModal({
        modalType: "LOADING_MODAL",
        modalProps: {},
      })
    );
    const newAppointments = await apiUpdateAppointment({
      branchName: user.branchName,
      appointment,
    });
    dispatch(hideInfoModal());
    dispatch(updateAppointmentSuccess(newAppointments));
  } catch (error) {
    dispatch(updateAppointmentError(error.message));
  }
};

export const fetchAppointments = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  const token = localStorage.getItem("token");
  try {
    dispatch(fetchAppointmentsStart());
    const ws = new WebSocket(
      `${config.WS_BASE_URL}/clients/${user.branchName}/appointments?jwt=${token}`
    );

    ws.onmessage = (e) => {
      const response = JSON.parse(e.data);

      dispatch(fetchAppointmentsSuccess(response.data));
    };
  } catch (error) {
    dispatch(fetchAppointmentsError(error.message));
  }
};
export const fetchClientAppointments = ({ clientId }) => async (dispatch) => {
  try {
    dispatch(fetchClientAppointmentsStart());
    const result = await apiFetchClientAppointments({ clientId });
    dispatch(fetchClientAppointmentsSuccess(result));
  } catch (error) {
    dispatch(fetchClientAppointmentsError(error.message));
  }
};
