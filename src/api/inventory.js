import axios from "./axios";

export const getItemsWithSearchTerm = async (searchTerm, branchName) => {
  const response = await axios.get(`/items/search/${branchName}/${searchTerm}`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const getItems = async (branchName) => {
  const response = await axios.get(`/items/${branchName}`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const addItem = async (item, branchName) => {
  const parsedItem = {
    ...item,
    price: Number(item.price),
    incentive: Number(item.incentive),
  };
  const response = await axios.post(`/items/${branchName}`, parsedItem);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const modifyItem = async (item, branchName) => {
  const parsedItem = {
    ...item,
    price: Number(item.price),
    incentiveAmount: Number(item.incentiveAmount),
    incentiveRate: Number(item.incentiveRate),
    discount: Number(item.discount),
  };
  const response = await axios.patch(
    `/items/item/${branchName}/${item.ID}`,
    parsedItem
  );
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const deleteItem = async (itemId, branchName) => {
  const response = await axios.delete(`/items/item/${branchName}/${itemId}`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const discountItem = async (item, branchName) => {
  const parsedItem = {
    ...item,
    price: Number(item.price),
    incentive: Number(item.incentive),
    discount: Number(item.discount),
  };
  const response = await axios.patch(
    `/items/item/${branchName}/${item.ID}`,
    parsedItem
  );
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const getItemSales = async (branchName) => {
  const response = await axios.get(`/item-sales/${branchName}`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const addItemSale = async (
  branchName,
  itemId,
  itemQuantity,
  salesDate,
  salesDateCateg
) => {
  const response = await axios.post(
    `/item-sales/${branchName}/${itemId}/${itemQuantity}?salesDate=${salesDate}&salesDateCateg=${salesDateCateg}`
  );
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const deleteItemSale = async (
  branchName,
  itemId,
  salesDate,
  salesDateCateg
) => {
  const response = await axios.delete(
    `/item-sales/${branchName}/${itemId}?salesDate=${salesDate}&salesDateCateg=${salesDateCateg}`
  );
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};
