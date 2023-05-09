import { createSlice } from "@reduxjs/toolkit";
// const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
  user: null,
  search:null,
  check:null,
  notification:0
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setSearch: (state, action) =>{
      state.search = action.payload.search
    },
    setCheck:(state, action) =>{
      state.check = action.payload.check
    },
    setNotification:(state,action) =>{
      state.notification = action.payload.notification
    }
  },
});

export const { setLogin,setSearch,setCheck,setNotification } =
  authSlice.actions;
export default authSlice.reducer;