
// // redux/slices/productSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../services/api';

// // Async thunk to fetch products
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (filters = {}) => {
//     const params = new URLSearchParams(filters);
//     const res = await api.get(`/api/products?${params.toString()}`);
//     console.log("API response:", res.data); // 👀 check shape
//     return res.data;
//   }
// );

// export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id) => {
//   const res = await api.get(`/api/products/${id}`);
//   return res.data;
// });

// export const addProduct = createAsyncThunk('products/addProduct', async (data) => {
//   const res = await api.post('/api/products', data);
//   return res.data;
// });

// export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, data }) => {
//   const res = await api.put(`/api/products/${id}`, data);
//   return res.data;
// });

// export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
//   await api.delete(`/api/products/${id}`);
//   return id;
// });

// const initialState = {
//   list: [],        // ✅ always an array
//   current: null,
//   isLoading: false,
//   error: null,
// };

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         // ✅ handle both shapes safely
//         state.list = Array.isArray(action.payload)
//           ? action.payload
//           : action.payload.products || [];
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(fetchProduct.fulfilled, (state, action) => {
//         state.current = action.payload;
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         const index = state.list.findIndex(p => p._id === action.payload._id);
//         if (index !== -1) state.list[index] = action.payload;
//       })
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.list = state.list.filter(p => p._id !== action.payload);
//       });
//   },
// });

// export default productSlice.reducer;








































// // redux/slices/productSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../services/api';

// // Base URL for images
// const BASE_URL = "http://192.168.1.78:5000/";

// // --------------------
// // Async Thunks
// // --------------------

// // Fetch all products with optional filters
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (filters = {}, { rejectWithValue }) => {
//     try {
//       const params = new URLSearchParams(filters).toString();
//       const res = await api.get(`/products${params ? '?' + params : ''}`);
//       // Backend may return { products: [...] } or [...] → normalize
//       return Array.isArray(res.data) ? res.data : res.data.products || [];
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Fetch single product
// export const fetchProduct = createAsyncThunk(
//   'products/fetchProduct',
//   async (id, { rejectWithValue }) => {
//     try {
//       const res = await api.get(`/products/${id}`);
//       return res.data.product || res.data; // normalize
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Add new product (requires JWT auth)
// export const addProduct = createAsyncThunk(
//   'products/addProduct',
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await api.post('/products', data, {
//         headers: { 'Content-Type': 'multipart/form-data' } // for images
//       });
//       return res.data.product || res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Update product
// export const updateProduct = createAsyncThunk(
//   'products/updateProduct',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const res = await api.put(`/products/${id}`, data, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       return res.data.product || res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Delete product
// export const deleteProduct = createAsyncThunk(
//   'products/deleteProduct',
//   async (id, { rejectWithValue }) => {
//     try {
//       await api.delete(`/products/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // --------------------
// // Slice
// // --------------------
// const initialState = {
//   list: [],        // all products
//   current: null,   // selected product
//   isLoading: false,
//   error: null,
// };

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     clearCurrent: (state) => { state.current = null; },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch products
//       .addCase(fetchProducts.pending, (state) => { state.isLoading = true; state.error = null; })
//       .addCase(fetchProducts.fulfilled, (state, action) => { 
//         state.isLoading = false; 
//         // normalize image URLs
//         state.list = action.payload.map(p => ({
//           ...p,
//           image: p.image ? `${BASE_URL}${p.image}` : null
//         }));
//       })
//       .addCase(fetchProducts.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

//       // Fetch single product
//       .addCase(fetchProduct.pending, (state) => { state.isLoading = true; state.error = null; })
//       .addCase(fetchProduct.fulfilled, (state, action) => { 
//         state.isLoading = false; 
//         state.current = { 
//           ...action.payload, 
//           image: action.payload.image ? `${BASE_URL}${action.payload.image}` : null 
//         };
//       })
//       .addCase(fetchProduct.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })

//       // Add product
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.list.push({ ...action.payload, image: action.payload.image ? `${BASE_URL}${action.payload.image}` : null });
//       })

//       // Update product
//       .addCase(updateProduct.fulfilled, (state, action) => {
//         const index = state.list.findIndex(p => p._id === action.payload._id);
//         if (index !== -1) state.list[index] = { ...action.payload, image: action.payload.image ? `${BASE_URL}${action.payload.image}` : null };
//       })

//       // Delete product
//       .addCase(deleteProduct.fulfilled, (state, action) => {
//         state.list = state.list.filter(p => p._id !== action.payload);
//       });
//   }
// });

// export const { clearCurrent } = productSlice.actions;
// export default productSlice.reducer;








































import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Base URL for images - use relative path, proxy will handle backend URL
const BASE_URL = window.location.origin;

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      const products = Array.isArray(data) ? data : data.products || [];
      return products.map((p) => ({
        ...p,
        image: p.image ? `${BASE_URL}${p.image}` : null,
      }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  list: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
