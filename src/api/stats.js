import axios from "./axios";

export const getItemSalesStats = async (
  branchName,
  salesDate,
  salesDateCateg
) => {
  const response = await axios.get(
    `/stats/${branchName}/item-sales?salesDate=${salesDate}&salesDateCateg=${salesDateCateg}`
  );
  console.log(response);
  if (response.data.data) {
    return response.data.data;
  } else {
    throw Error(response.data.error);
  }
};
