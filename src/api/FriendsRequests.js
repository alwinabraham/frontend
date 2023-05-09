import axios from "axios";
const API = axios.create({baseURL: import.meta.env.VITE_AXIOS_KEY})

export const getFriends = () => API.post("/friends",)

export const sendFriendRequest = (obj) => API.post("/friends/sendFriendRequest",obj)