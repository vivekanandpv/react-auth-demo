import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    auth: null,
  },
  reducers: {
    recordLogin: (auth, action) => {
      auth.auth = action.payload;
      auth.loggedIn = true;
    },
    recordLogout: (auth) => {
      auth.loggedIn = false;
      auth.auth = null;
    },
  },
});
