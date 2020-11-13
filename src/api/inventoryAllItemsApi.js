import axios from "./axios";


export const getInventoryAllItems = async () => {
    const response = await axios.get(`/items`);
    if (response.data.data) {
        return response.data.data
    } else {
        throw Error(response.data.error)
    }
}