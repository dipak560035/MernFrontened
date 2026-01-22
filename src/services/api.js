import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Product", "Auth", "Cart"],
  endpoints: (builder) => ({
    // placeholder endpoints
    login: builder.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
      invalidatesTags: ["Auth"],
    }),
    products: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),
    productById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (_res, _err, id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useProductsQuery,
  useProductByIdQuery,
} = api;
