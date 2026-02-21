import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:4001",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Product", "Auth", "Cart", "Order"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({ url: "/auth/profile", method: "PUT", body }),
      invalidatesTags: ["Auth"],
    }),
    // forgotPassword: builder.mutation({
    //   query: (body) => ({ url: "/forgot-password", method: "POST", body }),
    // }),
    // resetPassword: builder.mutation({
    //   query: ({ token, password }) => ({
    //     url: `/reset-password/${token}`,
    //     method: "POST",
    //     body: { password },
    //   }),
    // }),
    forgotPassword: builder.mutation({
  query: (body) => ({ url: "/auth/forgot-password", method: "POST", body }),
}),
resetPassword: builder.mutation({
  query: ({ token, password }) => ({
    url: `/auth/reset-password/${token}`,
    method: "POST",
    body: { password },
  }),
}),
    me: builder.query({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
    // products: builder.query({
    //   query: (params) => ({
    //     url: "/products",
    //     params,
    //   }),
    //   providesTags: ["Product"],
    // }),
    products: builder.query({
      query: (params) => ({
        url: "/products",
        params,
      }),
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ _id }) => ({ type: "Product", id: _id })), { type: "Product", id: "LIST" }]
          : [{ type: "Product", id: "LIST" }],
    }),

    productById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (_res, _err, id) => [{ type: "Product", id }],
    }),
    createReview: builder.mutation({
  query: ({ id, body }) => ({
    url: `/products/${id}/reviews`,
    method: "POST",
    body,
  }),
  invalidatesTags: (_res, _err, { id }) => [
    { type: "Product", id },
    { type: "Product", id: "LIST" },
  ],
}),

    cart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (body) => ({ url: "/cart/add", method: "POST", body }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation({
      query: (body) => ({ url: "/cart/update", method: "PUT", body }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: builder.mutation({
      query: (productId) => ({ url: `/cart/remove/${productId}`, method: "DELETE" }),
      invalidatesTags: ["Cart"],
    }),
    clearCartRemote: builder.mutation({
      query: () => ({ url: "/cart/clear", method: "DELETE" }),
      invalidatesTags: ["Cart"],
    }),
    createOrder: builder.mutation({
      query: (body) => ({ url: "/orders", method: "POST", body }),
      invalidatesTags: ["Order", "Cart"],
    }),
  
    cancelOrder: builder.mutation({
  query: (id) => ({
    url: `/orders/${id}/cancel`,
    method: "PATCH",
  }),

  invalidatesTags: (_res, _err, id) => [
    { type: "Order", id },
    { type: "Order", id: "LIST" },
  ],
}),
    // adminAllOrders: builder.query({
    //   query: () => "/orders/admin/all",
    //   providesTags: ["Order"],
    // }),
    orders: builder.query({
  query: () => "/orders",
  providesTags: (result) =>
    result?.data
      ? [
          ...result.data.map(({ _id }) => ({ type: "Order", id: _id })),
          { type: "Order", id: "LIST" },
        ]
      : [{ type: "Order", id: "LIST" }],
}),

orderById: builder.query({
  query: (id) => `/orders/${id}`,
  providesTags: (_res, _err, id) => [{ type: "Order", id }],
}),

adminAllOrders: builder.query({
  query: () => "/orders/admin/all",
  providesTags: (result) =>
    result?.data
      ? [
          ...result.data.map(({ _id }) => ({ type: "Order", id: _id })),
          { type: "Order", id: "LIST" },
        ]
      : [{ type: "Order", id: "LIST" }],
}),
    // adminUpdateOrderStatus: builder.mutation({
    //   query: ({ id, status }) => ({
    //     url: `/orders/admin/${id}`,
    //     method: "PUT",
    //     body: { status },
    //   }),
    //   invalidatesTags: (_res, _err, { id }) => [{ type: "Order", id }, "Order"],
    // }),
    adminUpdateOrderStatus: builder.mutation({
  query: ({ id, status }) => ({
    url: `/orders/admin/${id}`,
    method: "PUT",
    body: { status },
  }),
  invalidatesTags: (_res, _err, { id }) => [
    { type: "Order", id },
    { type: "Order", id: "LIST" },
  ],
}),
    adminCreateProduct: builder.mutation({
      query: (body) => ({ url: "/products", method: "POST", body }),
      invalidatesTags: ["Product"],
    }),
   
adminUpdateProduct: builder.mutation({
  query: ({ id, formData, body }) => {
    // Accept either FormData (when uploading new images) or a plain JSON body
    // Use POST (backend routes accept POST as an alias for update)
    const payload = formData ?? body;
    return {
      url: `/products/${id}`,
      method: "POST",
      body: payload,
    };
  },
  invalidatesTags: (_res, _err, { id }) => [
    { type: "Product", id },
    { type: "Product", id: "LIST" },
  ],
}),


    adminDeleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
   useMeQuery,
  useProductsQuery,
  useProductByIdQuery,
  useCreateReviewMutation,
  useCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartRemoteMutation,
  useCreateOrderMutation,
  useOrdersQuery,
  useOrderByIdQuery,
  useCancelOrderMutation,
  useAdminAllOrdersQuery,
  useAdminUpdateOrderStatusMutation,
  useAdminCreateProductMutation,
  useAdminUpdateProductMutation,
  useAdminDeleteProductMutation,
} = api;
