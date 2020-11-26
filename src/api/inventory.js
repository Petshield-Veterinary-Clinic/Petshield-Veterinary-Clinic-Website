import axios from "./axios";

export const getItemsWithSearchTerm = async (searchTerm) => {
  const response = await axios.get(`/items/search/${searchTerm}`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const getItems = async () => {
  const response = await axios.get(`/items`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const addItem = async (item) => {
  const parsedItem = {
    ...item,
    price: Number(item.price),
    incentive: Number(item.incentive),
  };
  const response = await axios.post(`/items`, parsedItem);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const modifyItem = async (item) => {
  const parsedItem = {
    ...item,
    price: Number(item.price),
    incentive: Number(item.incentive),
    discount: Number(item.discount),
  };
  const response = await axios.patch(`/items/${item.ID}`, parsedItem);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const discountItem = async (item) => {
  const parsedItem = {
    ...item,
    price: Number(item.price),
    incentive: Number(item.incentive),
    discount: Number(item.discount),
  };
  const response = await axios.patch(`/items/${item.ID}`, parsedItem);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const getItemSales = async () => {
  const response = await axios.get(`/item-sales`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};
