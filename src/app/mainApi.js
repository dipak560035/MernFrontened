


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const base = '/api'; // still fine for image paths

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nepalstore.onrender.com/api",
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
  query: (params = {}) => ({
    url: '/products',
    method: 'GET',
    params,
  }),
  transformResponse: (response) => {
    if (response?.status === "success") {
      return {
        products: response.products ?? [],
        totalPages: response.totalPages ?? 1,
        total: response.total ?? 0,
      };
    }
    return {
      products: [],
      totalPages: 1,
      total: 0,
    };
  },
  providesTags: ['Products'],
}),

    // getProducts: builder.query({
    //   query: () => '/products',
    //   transformResponse: (response) => {
    //     if (response?.status === "success" && Array.isArray(response.products)) {
    //       return response.products;
    //     }
    //     return response.products || response;
    //   },
    //   providesTags: ['Products'],
    // }),

    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      transformResponse: (response) => {
        if (response?.status === "success" && response.product) {
          return response.product;
        }
        return response.product || response;
      },
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),

    addProduct: builder.mutation({
      query: (formData) => ({
        url: '/products',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
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
        if (response?.status === "success") {
          return Array.isArray(response.orders)
            ? response.orders
            : Array.isArray(response.data)
              ? response.data
              : [];
        }
        return Array.isArray(response) ? response : [];
      },
      providesTags: ['Orders'],
    }),

    getOrder: builder.query({
      query: (id) => `/orders/${id}`,
      transformResponse: (response) => {
        if (response?.status === "success" && response.order) {
          return response.order;
        }
        return response.order || response;
      },
      providesTags: (result, error, id) => [{ type: 'Orders', id }],
    }),

    createOrder: builder.mutation({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Orders'],
    }),

    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: 'PATCH',
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
  useGetOrderQuery,
  useCreateOrderMutation,
  useCancelOrderMutation,
} = mainApi;























