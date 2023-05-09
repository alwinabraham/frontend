import { configureStore } from "@reduxjs/toolkit"
import authReducer from './userData'

export default configureStore({
  reducer:{
    user: authReducer
  }
})