import axios from "axios";
const API = axios.create({baseURL: import.meta.env.VITE_AXIOS_KEY})

export const getSearchUser = (id) => API.post("/searchPage/getSearchUser",id)