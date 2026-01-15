// import { configureStore } from "@reduxjs/toolkit";
// import { mainApi } from "./mainApi";
// import { userSlice } from "@/user/userSlice";
// import { cartSlice } from "@/features/carts/cartSlice";




// export const store = configureStore({
//     reducer:{
//         [mainApi.reducerPath]:mainApi.reducer,
//         [userSlice.name]: userSlice.reducer,
//         [cartSlice.name]: cartSlice.reducer
//         },
//     middleware:(getDefaultMiddleware) => 
//         getDefaultMiddleware().concat(mainApi.middleware),
// });

















import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./mainApi";


export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});