import axios from "./axios";

export const getItemCategories = async () => {
  const response = await axios.get(`/admin/item-categories`);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const addItemCategory = async (itemCategoryDetails) => {
  const response = await axios.post(
    `/admin/item-categories`,
    itemCategoryDetails
  );
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};

export const deleteItemCategory = async (itemCategoryId) => {
  const response = await axios.delete(
    `/admin/item-categories/${itemCategoryId}`
  );

  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};
