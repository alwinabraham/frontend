import axios from "axios";
const API = axios.create({baseURL: import.meta.env.VITE_AXIOS_KEY})

export const getMessages = (id) => API.get(`/message/${id}`)

export const addMessage = (data) => API.post('/message', data)