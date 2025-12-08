import { mainApi } from "@/app/mainApi";


const productApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET'
      }),
      providesTags: ['Products']
    }),

    getProducts: builder.query({
      query: (query) => ({
        url: '/products',
        method: 'GET',
        params:query
      }),
      providesTags: ['Products']
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        headers: {
          Authorization: data.token
        },
        body: data.body
      }),
      invalidatesTags: ['Products']
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: 'PATCH',
        headers: {
          Authorization: data.token
        },
        body: data.body
      }),
      invalidatesTags: ['Products']
    }),

    removeProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: 'DELETE',
        headers: {
          Authorization: data.token
        },
      }),
      invalidatesTags: ['Products']
    }),


  })
});


export const { useGetProductsQuery, useCreateProductMutation, useRemoveProductMutation, useGetProductQuery, useUpdateProductMutation } = productApi;