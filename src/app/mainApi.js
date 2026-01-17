
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const mainApi = createApi({
//   reducerPath: 'mainApi',
//   baseQuery: fetchBaseQuery({
//   baseUrl: 'http://192.168.1.78:5000/api',
//   credentials: 'include',

//   prepareHeaders: (headers) => {
//     // Read token directly from localStorage
//     const token = localStorage.getItem("token");
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// }),

//   tagTypes: ['Products', 'Orders', 'User'],

//   endpoints: (builder) => ({
//     // ====================
//     // PRODUCTS
//     // ====================
//     getProducts: builder.query({
//       query: () => '/products',
//       providesTags: ['Products'],
//     }),
//     getProduct: builder.query({
//       query: (id) => `/products/${id}`,
//     }),

//     // ====================
//     // ORDERS
//     // ====================
//     getOrders: builder.query({
//       query: () => '/orders',
//       providesTags: ['Orders'],
//     }),
//     getOrder: builder.query({
//       query: (id) => `/orders/${id}`,
//     }),
//     createOrder: builder.mutation({
//       query: (order) => ({
//         url: '/orders',
//         method: 'POST',
//         body: order,
//       }),
//       invalidatesTags: ['Orders'],
//     }),
//     updateOrder: builder.mutation({
//       query: ({ id, updates }) => ({
//         url: `/orders/${id}`,
//         method: 'PATCH',
//         body: updates,
//       }),
//       invalidatesTags: ['Orders'],
//     }),
//     deleteOrder: builder.mutation({
//       query: (id) => ({
//         url: `/orders/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Orders'],
//     }),

//     // ====================
//     // OPTIONAL: USER PROFILE
//     // ====================
//     getProfile: builder.query({
//       query: () => '/users/profile',
//       providesTags: ['User'],
//     }),
//   }),
// });

// // Hooks
// export const {
//   useGetProductsQuery,
//   useGetProductQuery,
//   useGetOrdersQuery,
//   useGetOrderQuery,
//   useCreateOrderMutation,
//   useUpdateOrderMutation,
//   useDeleteOrderMutation,
//   useGetProfileQuery,
// } = mainApi;

















// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const mainApi = createApi({
//   reducerPath: 'mainApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://192.168.1.78:5000/api',
//     credentials: 'include',
//     prepareHeaders: (headers) => {
//       // Read token directly from localStorage
//       const token = localStorage.getItem("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),

//   tagTypes: ['Products', 'Orders', 'User'],

//   endpoints: (builder) => ({
//     // ====================
//     // PRODUCTS
//     // ====================
//     getProducts: builder.query({
//       query: () => '/products',
//       providesTags: ['Products'],
//     }),
//     getProduct: builder.query({
//       query: (id) => `/products/${id}`,
//     }),

//     // ====================
//     // ORDERS
//     // ====================
//     getOrders: builder.query({
//       query: () => '/orders',
//       providesTags: ['Orders'],
//     }),
//     getOrder: builder.query({
//       query: (id) => `/orders/${id}`,
//     }),
//     createOrder: builder.mutation({
//       query: (order) => ({
//         url: '/orders',
//         method: 'POST',
//         body: order,
//       }),
//       invalidatesTags: ['Orders'],
//     }),
//     updateOrder: builder.mutation({
//       query: ({ id, updates }) => ({
//         url: `/orders/${id}`,
//         method: 'PATCH',
//         body: updates,
//       }),
//       invalidatesTags: ['Orders'],
//     }),
//     deleteOrder: builder.mutation({
//       query: (id) => ({
//         url: `/orders/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Orders'],
//     }),

//     // ====================
//     // USER PROFILE
//     // ====================
//     getProfile: builder.query({
//       query: () => '/users/profile',
//       providesTags: ['User'],
//     }),

//     // ====================
//     // AUTH (SIGNUP / LOGIN)
//     // ====================
//     registerUser: builder.mutation({
//       query: (user) => ({
//         url: '/auth/register',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (user) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//   }),
// });

// // ====================
// // EXPORT HOOKS
// // ====================
// export const {
//   useGetProductsQuery,
//   useGetProductQuery,
//   useGetOrdersQuery,
//   useGetOrderQuery,
//   useCreateOrderMutation,
//   useUpdateOrderMutation,
//   useDeleteOrderMutation,
//   useGetProfileQuery,
//   useRegisterUserMutation, // <--- added
//   useLoginUserMutation,    // <--- added
// } = mainApi;











// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const mainApi = createApi({
//   reducerPath: 'mainApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://192.168.1.78:5000/api',
//     credentials: 'omit', // ✔ since we use JWT not cookies
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),

//   tagTypes: ['Products', 'Orders', 'User'],

//   endpoints: (builder) => ({
//     // ====================
//     // PRODUCTS
//     // ====================
//     getProducts: builder.query({
//       query: () => '/products',
//       providesTags: ['Products'],
//     }),
//     getProduct: builder.query({
//       query: (id) => `/products/${id}`,
//     }),

//     // ====================
//     // ORDERS
//     // ====================
//     getOrders: builder.query({
//       query: () => '/orders',
//       providesTags: ['Orders'],
//     }),
//     getOrder: builder.query({
//       query: (id) => `/orders/${id}`,
//     }),
//     createOrder: builder.mutation({
//       query: (order) => ({
//         url: '/orders',
//         method: 'POST',
//         body: order,
//       }),
//       invalidatesTags: ['Orders'],
//     }),
//     updateOrder: builder.mutation({
//       query: ({ id, updates }) => ({
//         url: `/orders/${id}`,
//         method: 'PATCH',
//         body: updates,
//       }),
//       invalidatesTags: ['Orders'],
//     }),
//     deleteOrder: builder.mutation({
//       query: (id) => ({
//         url: `/orders/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Orders'],
//     }),

//     // ====================
//     // USER PROFILE
//     // ====================
//     getProfile: builder.query({
//       query: () => '/users/profile',
//       providesTags: ['User'],
//     }),

//     // ====================
//     // AUTH (SIGNUP / LOGIN)
//     // ====================
//     registerUser: builder.mutation({
//       query: (user) => ({
//         url: '/auth/register',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (user) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductQuery,
//   useGetOrdersQuery,
//   useGetOrderQuery,
//   useCreateOrderMutation,
//   useUpdateOrderMutation,
//   useDeleteOrderMutation,
//   useGetProfileQuery,
//   useRegisterUserMutation,
//   useLoginUserMutation,
// } = mainApi;














// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const mainApi = createApi({
//   reducerPath: "mainApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000/api", // match your backend
//     credentials: "include",
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) headers.set("Authorization", `Bearer ${token}`);
//       return headers;
//     },
//   }),
//   tagTypes: ["User", "Products", "Orders"],
//   endpoints: (builder) => ({
//     // Auth
//     registerUser: builder.mutation({
//       query: (user) => ({
//         url: "/auth/register", // must match backend route
//         method: "POST",
//         body: user,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (user) => ({
//         url: "/auth/login", // must match backend route
//         method: "POST",
//         body: user,
//       }),
//     }),

//     // Products
//     getProducts: builder.query({
//       query: () => "/products",
//       providesTags: ["Products"],
//     }),
//     getProduct: builder.query({
//       query: (id) => `/products/${id}`,
//       providesTags: ["Products"],
//     }),

//     // Orders
//     getOrders: builder.query({
//       query: () => "/orders",
//       providesTags: ["Orders"],
//     }),
//     createOrder: builder.mutation({
//       query: (order) => ({
//         url: "/orders",
//         method: "POST",
//         body: order,
//       }),
//       invalidatesTags: ["Orders"],
//     }),

//     // User profile
//     getProfile: builder.query({
//       query: () => "/users/profile",
//       providesTags: ["User"],
//     }),
//   }),
// });

// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useGetProductsQuery,
//   useGetProductQuery,
//   useGetOrdersQuery,
//   useCreateOrderMutation,
//   useGetProfileQuery,
// } = mainApi;












// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const mainApi = createApi({
//   reducerPath: 'mainApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api', // match backend
//     credentials: 'include',
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) headers.set("Authorization", `Bearer ${token}`);
//       return headers;
//     },
//   }),
//   tagTypes: ['User', 'Products', 'Orders'],
//   endpoints: (builder) => ({
//     // AUTH
//     registerUser: builder.mutation({
//       query: (user) => ({
//         url: '/auth/signup',   // ✅ matches backend
//         method: 'POST',
//         body: user,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (user) => ({
//         url: '/auth/login',    // ✅ matches backend
//         method: 'POST',
//         body: user,
//       }),
//     }),

//     // USER
//     getProfile: builder.query({
//       query: () => '/users/profile',
//       providesTags: ['User'],
//     }),

//     // PRODUCTS
//     getProducts: builder.query({
//       query: () => '/products',
//       providesTags: ['Products'],
//     }),
//     getProduct: builder.query({
//       query: (id) => `/products/${id}`,
//     }),

//     // ORDERS
//     getOrders: builder.query({
//       query: () => '/orders',
//       providesTags: ['Orders'],
//     }),
//     createOrder: builder.mutation({
//       query: (order) => ({
//         url: '/orders',
//         method: 'POST',
//         body: order,
//       }),
//       invalidatesTags: ['Orders'],
//     }),
//   }),
// });

// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useGetProfileQuery,
//   useGetProductsQuery,
//   useGetProductQuery,
//   useGetOrdersQuery,
//   useCreateOrderMutation,
// } = mainApi;













// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const mainApi = createApi({
//   reducerPath: 'mainApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api', // your backend
//     credentials: 'include',
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) headers.set("Authorization", `Bearer ${token}`);
//       return headers;
//     },
//   }),
//   tagTypes: ['User', 'Products', 'Orders'],
//   endpoints: (builder) => ({
//     // AUTH
//     registerUser: builder.mutation({
//       query: (user) => ({
//         url: '/auth/signup',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//     loginUser: builder.mutation({
//       query: (user) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body: user,
//       }),
//     }),

//     // USER
//     getProfile: builder.query({
//       query: () => '/users/profile',
//       providesTags: ['User'],
//     }),

//     // PRODUCTS
//     getProducts: builder.query({
//       query: () => '/products',
//       providesTags: ['Products'],
//     }),
//     getProduct: builder.query({
//       query: (id) => `/products/${id}`,
//     }),
//     addProduct: builder.mutation({
//       query: (product) => ({
//         url: '/products',
//         method: 'POST',
//         body: product,
//       }),
//       invalidatesTags: ['Products'],
//     }),
//     // updateProduct: builder.mutation({
//     //   query: ({ id, ...product }) => ({
//     //     url: `/products/${id}`,
//     //     method: 'PATCH',
//     //     body: product,
//     //   }),
//     //   invalidatesTags: ['Products'],
//     // }),

//   updateProduct: builder.mutation({
//       query: ({ id, formData }) => ({
//         url: `/products/${id}`,
//         method: "PATCH",
//         body: formData,
//       }),
//       invalidatesTags: ["Products"],
//     }),



//     deleteProduct: builder.mutation({
//       query: (id) => ({
//         url: `/products/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     // ORDERS
//     getOrders: builder.query({
//       query: () => '/orders',
//       providesTags: ['Orders'],
//     }),
//     createOrder: builder.mutation({
//       query: (order) => ({
//         url: '/orders',
//         method: 'POST',
//         body: order,
//       }),
//       invalidatesTags: ['Orders'],
//     }),
//   }),
// });

// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useGetProfileQuery,
//   useGetProductsQuery,
//   useGetProductQuery,
//   useAddProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
//   useGetOrdersQuery,
//   useCreateOrderMutation,
// } = mainApi;
















// src/services/mainApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base URL for constructing image paths
export const base = '/api';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['User', 'Products', 'Orders'],

  endpoints: (builder) => ({
    // =============== AUTH ===============
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/auth/signup',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: '/auth/login',
        method: 'POST',
        body: user,
      }),
    }),

    // =============== USER ===============
    getProfile: builder.query({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),

    // =============== PRODUCTS ===============
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),

    // getProduct: builder.query({
    //   query: (id) => `/products/${id}`,
    //   providesTags: ['Products'],
    // }),

    getProduct: builder.query({
  query: (id) => `/products/${id}`,
  transformResponse: (response) => response.product, // <── important
  providesTags: ['Products'],
}),


    addProduct: builder.mutation({
      query: (formData) => ({
        url: '/products',
        method: 'POST',
        body: formData, // multipart/form-data auto handled
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: 'PATCH', // important because backend expects PATCH
        body: formData, // supports file upload
      }),
      invalidatesTags: ['Products'],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    // =============== ORDERS ===============
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),

    createOrder: builder.mutation({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
  useCreateOrderMutation,
} = mainApi;

