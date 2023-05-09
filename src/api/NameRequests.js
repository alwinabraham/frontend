import axios from "axios";
const API = axios.create({baseURL: import.meta.env.VITE_AXIOS_KEY}) 

export const getNameUser = (id) => API.post("/getName", id)

export const getImage = (id) => API.post('/getImage',id)