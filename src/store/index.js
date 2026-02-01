import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

export default store;
