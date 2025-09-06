import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    hydrateUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { userLoggedIn, userLoggedOut, hydrateUser } = authSlice.actions;

export default authSlice.reducer;
