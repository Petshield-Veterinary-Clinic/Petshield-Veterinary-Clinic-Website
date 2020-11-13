import axios from "axios";
import { LOCAL_API_BASE_URL } from "../consts";


export default axios.create({
    baseURL:LOCAL_API_BASE_URL,
    headers: {
        "Content-Type":"application/json",
    },
})