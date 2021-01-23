import axios from "./axios";

export const addClient = async (client, branchName) => {
  const response = await axios.post(`/clients/${branchName}`, client);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const updateClient = async (client) => {
  const response = await axios.patch(`/clients/${client.ID}`, client);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const addClientPayment = async (
  clientId,
  itemId,
  quantity,
  salesDate,
  salesDateCateg
) => {
  const response = await axios.post(
    `/clients/${clientId}/payments/${itemId}/${quantity}?salesDate=${salesDate}&salesDateCateg=${salesDateCateg}`
  );
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const fetchClientPaymentHistory = async (clientId) => {
  const response = await axios.get(`/clients/${clientId}/payments`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const fetchAllClientPayments = async ({
  branchName,
  salesDate,
  salesDateCateg,
}) => {
  const response = await axios.get(
    `/clients/${branchName}/all-payments?salesDate=${salesDate}&salesDateCateg=${salesDateCateg}`
  );
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const fetchClientAppointments = async ({ clientId }) => {
  const response = await axios.get(`/clients/${clientId}/appointments`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const removeAppointment = async ({ appointmentId, branchName }) => {
  const response = await axios.delete(
    `/clients/${branchName}/appointments/${appointmentId}`
  );
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const addAppointment = async ({ clientId, appointment }) => {
  const response = await axios.post(
    `/clients/${clientId}/appointments`,
    appointment
  );
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const updateAppointment = async ({ branchName, appointment }) => {
  const response = await axios.patch(
    `/clients/${branchName}/appointments/${appointment.ID}`,
    appointment
  );
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};
