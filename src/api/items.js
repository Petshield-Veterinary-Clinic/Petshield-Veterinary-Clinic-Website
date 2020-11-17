import axios from "./axios";

export const getItemsWithSearchTerm = async (searchTerm) => {
    const response = await axios.get(`/items/search/${searchTerm}`);
    if (response.data.data) {
        return response.data.data
    } else {
        throw Error(response.data.error)
    }
}