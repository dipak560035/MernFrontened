// src/app/mainApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const base = '/api'; // for image path usage if needed

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
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
      transformResponse: (response) => {
        // handle { status, products } or direct array
        if (response?.status === "success" && Array.isArray(response.products)) {
          return response.products;
        }
        return response.products || response;
      },
      providesTags: ['Products'],
    }),

    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      transformResponse: (response) => {
        // Backend example: { status:"success", product:{...} }
        if (response?.status === "success" && response.product) {
          return response.product;
        }
        return response.product || response;
      },
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
//     getProduct: builder.query({
//   query: (id) => `/products/${id}`,
//   transformResponse: (response) => {
//     // Your API returns product object directly
//     return response; 
//   },
//   providesTags: (result, error, id) => [{ type: 'Products', id }],
// }),


    addProduct: builder.mutation({
      query: (formData) => ({
        url: '/products',
        method: 'POST',
        body: formData, // supports multipart
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: 'PATCH', // matches your backend
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        'Products',
        { type: 'Products', id },
      ],
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
  transformResponse: (response) => {
    // Handle common patterns your backend might return
    if (response?.status === "success") {
      return Array.isArray(response.orders)     ? response.orders     :
             Array.isArray(response.data)       ? response.data       :
             Array.isArray(response)            ? response            : [];
    }
    // If already array or something else
    return Array.isArray(response) ? response : [];
  },
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
