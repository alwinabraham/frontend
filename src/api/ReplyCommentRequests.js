import axios from "axios";
const API = axios.create({baseURL: import.meta.env.VITE_AXIOS_KEY})

export const createReplyComment = (obj) =>API.post('/replyComment/', obj)

export const getReplyComment = (id) =>API.get(`/replyComment/${id}`)