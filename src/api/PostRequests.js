import axios from "axios";
const API = axios.create({baseURL: import.meta.env.VITE_AXIOS_KEY}) 

export const getPosts = (id) => API.post("/getPosts", id)
export const deletePost = (id) => API.post("/post/deletePost", id)
export const updatePost = (data) => API.post("/post/updatePost", data)
export const reportPost = (data) => API.post("/post/reportPost", data)
export const likePost = (obj) => API.post("/likePost", obj)
export const commentCount = (id) =>API.post("/comment/commentCount", id)
export const sharedPost = (id) => API.post("/post/sharedPost",id)