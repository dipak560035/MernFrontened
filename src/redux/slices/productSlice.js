// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../services/api';

// export const fetchProducts = createAsyncThunk('products/fetchProducts', async (filters = {}) => {
//   const params = new URLSearchParams(filters);
//   const res = await api.get(`/api/products?${params.toString()}`);
//   return res.data;
// });

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

// const productSlice = createSlice({
//   name: 'products',
//   initialState: { list: [], current: null, isLoading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.fulfilled, (state, action) => { state.list = action.payload; })
//       .addCase(fetchProduct.fulfilled, (state, action) => { state.current = action.payload; })
//       .addCase(addProduct.fulfilled, (state, action) => { state.list.push(action.payload); })
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













// redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const res = await api.get(`/api/products?${params.toString()}`);
    console.log("API response:", res.data); // 👀 check shape
    return res.data;
  }
);

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id) => {
  const res = await api.get(`/api/products/${id}`);
  return res.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (data) => {
  const res = await api.post('/api/products', data);
  return res.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, data }) => {
  const res = await api.put(`/api/products/${id}`, data);
  return res.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await api.delete(`/api/products/${id}`);
  return id;
});

const initialState = {
  list: [],        // ✅ always an array
  current: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // ✅ handle both shapes safely
        state.list = Array.isArray(action.payload)
          ? action.payload
          : action.payload.products || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;