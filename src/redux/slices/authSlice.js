import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const login = createAsyncThunk('auth/login', async ({ username, password }) => {
  const res = await api.post('/api/auth/login', { username, password });
  localStorage.setItem('token', res.data.token);
  return res.data.user;
});

export const signup = createAsyncThunk('auth/signup', async ({ username, password }) => {
  const res = await api.post('/api/auth/signup', { username, password });
  localStorage.setItem('token', res.data.token);
  return res.data.user;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => { state.user = action.payload; })
      .addCase(signup.fulfilled, (state, action) => { state.user = action.payload; })
      .addCase(logout.fulfilled, (state) => { state.user = null; });
  },
});

export default authSlice.reducer;