import axios from "axios";
const API = axios.create({baseURL: import.meta.env.VITE_AXIOS_KEY})

export const userChats = (id) => API.get(`/chat/${id}`)

export const getUser = (id) => API.get(`/chat/getUser/${id}`)

export const getChatId = (obj) =>API.post('/chat/getChatId',obj)