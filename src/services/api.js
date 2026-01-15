import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

// Default axios instance for existing thunks and legacy code that
// call `import api from '../../services/api'` and use `api.post(...)`.
const axiosClient = axios.create({});
axiosClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) config.headers = { ...(config.headers || {}), Authorization: `Bearer ${token}` };
    } catch (e) {
      // ignore localStorage errors in SSR or restricted environments
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["User", "Product", "Order"],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // User
    getUser: builder.query({
      query: () => "users",
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Products
    getProducts: builder.query({
      query: (params) => ({ url: "products", params }),
      providesTags: ["Product"],
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Orders
    getOrders: builder.query({
      query: () => "orders",
      providesTags: ["Order"],
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `orders/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  // Auth
  useLoginMutation,
  useSignupMutation,
  // User
  useGetUserQuery,
  useUpdateUserMutation,
  // Products
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  // Orders
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = apiSlice;
















// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: '/api',
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['User', 'Product', 'Order'],
//   endpoints: (builder) => ({
//     // Auth
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: 'auth/login',
//         method: 'POST',
//         body: credentials,
//       }),
//       invalidatesTags: ['User'],
//     }),
//     signup: builder.mutation({
//       query: (data) => ({
//         url: 'auth/signup',
//         method: 'POST',
//         body: data,
//       }),
//       invalidatesTags: ['User'],
//     }),

//     // Products
//     getProducts: builder.query({
//       query: () => 'products',
//       providesTags: ['Product'],
//     }),
//     addProduct: builder.mutation({
//       query: (product) => ({
//         url: 'products',
//         method: 'POST',
//         body: product,
//       }),
//       invalidatesTags: ['Product'],
//     }),

//     // Orders
//     createOrder: builder.mutation({
//       query: (order) => ({
//         url: 'orders',
//         method: 'POST',
//         body: order,
//       }),
//       invalidatesTags: ['Order'],
//     }),
//     getOrders: builder.query({
//       query: () => 'orders',
//       providesTags: ['Order'],
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useSignupMutation,
//   useGetProductsQuery,
//   useAddProductMutation,
//   useCreateOrderMutation,
//   useGetOrdersQuery,
// } = apiSlice;
















