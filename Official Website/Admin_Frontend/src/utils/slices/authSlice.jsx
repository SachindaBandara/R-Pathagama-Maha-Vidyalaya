import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      const { token, username } = response.data; // Adjust based on your API response
      Cookies.set('token', token, { path: '/' });
      return { token, username };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Signup failed');
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      Cookies.remove('token', { path: '/' });
      return {};
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

// Async thunk to check auth status on app load
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    const token = Cookies.get('token');
    if (!token) {
      return rejectWithValue('No token found');
    }
    // try {
    //   // Optional: Add an endpoint to verify token if your backend supports it
    //   const response = await axios.get(`${API_URL}/auth/verify`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   return { token, username: response.data.username };
    // } catch (error) {
    //   Cookies.remove('token', { path: '/' });
    //   return rejectWithValue('Invalid token');
    // }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: null,
    username: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.username = action.payload.username;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.token = null;
        state.username = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.username = action.payload.username;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.token = null;
        state.username = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;