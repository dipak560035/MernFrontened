import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import { apiSlice } from "@/services/api";
import { mainApi } from "@/app/mainApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, mainApi.middleware),
});

export default store;






