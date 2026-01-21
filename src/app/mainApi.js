

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const base = '/api'; // still fine for image paths

// const getBaseUrl = () => {
//   // In development, use relative URLs for proxy (if available)
//   // In production or if proxy fails, use the full backend URL
//   return import.meta.env.DEV ? "/api" : "https://nepalstore.onrender.com/api";
// };

// export const mainApi = createApi({
//   reducerPath: 'mainApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://nepalstore.onrender.com/api",
//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['User', 'Products', 'Orders'],
//   endpoints: (builder) => ({
    
//     // =============== AUTH ===============
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

//     // =============== USER ===============
//     getProfile: builder.query({
//       query: () => '/users/profile',
//       providesTags: ['User'],
//     }),

//     // =============== PRODUCTS ===============
//     getProducts: builder.query({
//       queryFn: async (params = {}, { getState }) => {
//         try {
//           const token = localStorage.getItem("token");
//           const headers = {};
          
//           if (token) {
//             headers.Authorization = `Bearer ${token}`;
//           }

//           // Build URL with query params
//           const queryString = new URLSearchParams(params).toString();
//           const url = `https://nepalstore.onrender.com/api/products${queryString ? '?' + queryString : ''}`;

//           console.log('Fetching products from:', url);

//           const response = await fetch(url, {
//             method: 'GET',
//             headers: headers,
//             credentials: 'include',
//           });

//           console.log('Response status:', response.status);

//           if (!response.ok) {
//             const error = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
//             console.error('Fetch error:', error);
//             return { error: error?.message || `HTTP ${response.status}` };
//           }

//           const data = await response.json();
//           console.log('Response data:', data);
          
//           // Transform response - handle multiple formats
//           let transformedData = {
//             products: [],
//             totalPages: 1,
//             total: 0,
//           };

//           if (data?.status === "success" && data?.products) {
//             transformedData = {
//               products: Array.isArray(data.products) ? data.products : [],
//               totalPages: data.totalPages ?? 1,
//               total: data.total ?? 0,
//             };
//           } else if (Array.isArray(data)) {
//             // If response is directly an array
//             transformedData = {
//               products: data,
//               totalPages: 1,
//               total: data.length,
//             };
//           } else if (data?.products) {
//             // If products field exists but no status field
//             transformedData = {
//               products: Array.isArray(data.products) ? data.products : [],
//               totalPages: data.totalPages ?? 1,
//               total: data.total ?? data.products?.length ?? 0,
//             };
//           }

//           console.log('Transformed data:', transformedData);
//           return { data: transformedData };
//         } catch (error) {
//           console.error("Products fetch error:", error);
//           return { error: error?.message || 'Failed to load products' };
//         }
//       },
//       providesTags: ['Products'],
//     }),

//     getProduct: builder.query({
//       queryFn: async (id, { getState }) => {
//         try {
//           const token = localStorage.getItem("token");
//           const headers = {};
          
//           if (token) {
//             headers.Authorization = `Bearer ${token}`;
//           }

//           console.log('Fetching product:', id);

//           const response = await fetch(
//             `https://nepalstore.onrender.com/api/products/${id}`,
//             {
//               method: 'GET',
//               headers: headers,
//               credentials: 'include',
//             }
//           );

//           console.log('Product response status:', response.status);

//           if (!response.ok) {
//             const error = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
//             console.error('Product fetch error:', error);
//             return { error: error?.message || `HTTP ${response.status}` };
//           }

//           const data = await response.json();
//           console.log('Product data:', data);
          
//           // Transform response - handle multiple formats
//           let transformedData = data;
//           if (data?.status === "success" && data.product) {
//             transformedData = data.product;
//           } else if (data?.product) {
//             transformedData = data.product;
//           } else if (data._id) {
//             // Assume it's the product object directly
//             transformedData = data;
//           }

//           console.log('Transformed product:', transformedData);
//           return { data: transformedData };
//         } catch (error) {
//           console.error("Product fetch error:", error);
//           return { error: error?.message || 'Failed to load product' };
//         }
//       },
//       providesTags: (result, error, id) => [{ type: 'Products', id }],
//     }),

//     addProduct: builder.mutation({
//       query: (formData) => ({
//         url: '/products',
//         method: 'POST',
//         body: formData,
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     updateProduct: builder.mutation({
//       query: ({ id, formData }) => ({
//         url: `/products/${id}`,
//         method: 'PATCH',
//         body: formData,
//       }),
//       invalidatesTags: (result, error, { id }) => [
//         'Products',
//         { type: 'Products', id },
//       ],
//     }),

//     deleteProduct: builder.mutation({
//       query: (id) => ({
//         url: `/products/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     // =============== ORDERS ===============
//     getOrders: builder.query({
//       query: () => '/orders',
//       transformResponse: (response) => {
//         if (response?.status === "success") {
//           return Array.isArray(response.orders)
//             ? response.orders
//             : Array.isArray(response.data)
//               ? response.data
//               : [];
//         }
//         return Array.isArray(response) ? response : [];
//       },
//       providesTags: ['Orders'],
//     }),

//     getOrder: builder.query({
//       query: (id) => `/orders/${id}`,
//       transformResponse: (response) => {
//         if (response?.status === "success" && response.order) {
//           return response.order;
//         }
//         return response.order || response;
//       },
//       providesTags: (result, error, id) => [{ type: 'Orders', id }],
//     }),

//     createOrder: builder.mutation({
//       query: (order) => ({
//         url: '/orders',
//         method: 'POST',
//         body: order,
//       }),
//       invalidatesTags: ['Orders'],
//     }),

//     cancelOrder: builder.mutation({
//       query: (id) => ({
//         url: `/orders/${id}/cancel`,
//         method: 'PATCH',
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
//   useGetOrderQuery,
//   useCreateOrderMutation,
//   useCancelOrderMutation,
// } = mainApi;




























// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // ────────────────────────────────────────────────
// // Choose base URL depending on the environment
// // (works in both Vite dev server and production build)
// // ────────────────────────────────────────────────
// const isDevelopment = import.meta.env.DEV; // true when running `npm run dev`

// const API_BASE_URL = isDevelopment
//   ? 'http://localhost:5000/api'
//   : 'https://nepalstore.onrender.com/api';

// export const mainApi = createApi({
//   reducerPath: 'mainApi',

//   baseQuery: fetchBaseQuery({
//     baseUrl: API_BASE_URL,
//     credentials: 'include',
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),

//   tagTypes: ['User', 'Products', 'Orders'],

//   endpoints: (builder) => ({
//     // ──────────────── AUTH ────────────────
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

//     // ──────────────── USER ────────────────
//     getProfile: builder.query({
//       query: () => '/users/profile',
//       providesTags: ['User'],
//     }),

//     // ──────────────── PRODUCTS ────────────────
//     getProducts: builder.query({
//       query: (params = {}) => ({
//         url: '/products',
//         method: 'GET',
//         params,
//       }),
//       transformResponse: (response) => {
//         if (response?.status === "success") {
//           return {
//             products: response.products ?? [],
//             totalPages: response.totalPages ?? 1,
//             total: response.total ?? 0,
//           };
//         }
//         return { products: [], totalPages: 1, total: 0 };
//       },
//       providesTags: ['Products'],
//     }),

//     getProduct: builder.query({
//       query: (id) => `/products/${id}`,
//       transformResponse: (response) => response?.product ?? response,
//       providesTags: (result, error, id) => [{ type: 'Products', id }],
//     }),

//     addProduct: builder.mutation({
//       query: (formData) => ({
//         url: '/products',
//         method: 'POST',
//         body: formData,
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     updateProduct: builder.mutation({
//       query: ({ id, formData }) => ({
//         url: `/products/${id}`,
//         method: 'PATCH',
//         body: formData,
//       }),
//       invalidatesTags: (result, error, { id }) => [
//         'Products',
//         { type: 'Products', id },
//       ],
//     }),

//     deleteProduct: builder.mutation({
//       query: (id) => ({
//         url: `/products/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Products'],
//     }),

//     // ──────────────── ORDERS ────────────────
//     getOrders: builder.query({
//       query: () => '/orders',
//       providesTags: ['Orders'],
//     }),

//     getOrder: builder.query({
//       query: (id) => `/orders/${id}`,
//       providesTags: (result, error, id) => [{ type: 'Orders', id }],
//     }),

//     createOrder: builder.mutation({
//       query: (order) => ({
//         url: '/orders',
//         method: 'POST',
//         body: order,
//       }),
//       invalidatesTags: ['Orders'],
//     }),

//     cancelOrder: builder.mutation({
//       query: (id) => ({
//         url: `/orders/${id}/cancel`,
//         method: 'PATCH',
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
//   useGetOrderQuery,
//   useCreateOrderMutation,
//   useCancelOrderMutation,
// } = mainApi;


































































































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























