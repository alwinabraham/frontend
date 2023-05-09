import axios from "axios";
const API = axios.create({baseURL: import.meta.env.VITE_AXIOS_KEY})

export const getNotification = (id) => API.get(`/notification/${id}`)

export const getNotifiCounter = (obj) =>API.post("/notification/getNotifiCounter",obj)