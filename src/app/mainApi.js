// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// //

// export const base = 'https://rtk-query-oc7w.onrender.com';

// export const mainApi = createApi({
//     reducerPath:'mainApi',
//     baseQuery:fetchBaseQuery({ baseUrl: 'https://rtk-query-oc7w.onrender.com/api' }),
//     tagTypes: ['Products'],
//     endpoints:() => ({})
// });


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const base = 'https://rtk-query-oc7w.onrender.com';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rtk-query-oc7w.onrender.com/api',
    credentials: 'include', // <--- important for cross-origin login
  }),
  tagTypes: ['Products', 'User'],
  endpoints: () => ({}),
});
