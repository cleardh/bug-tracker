import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (loginData) => {
        const res = await axios.post('/auth', loginData, { 'Content-Type': 'application/json' });
        return res.data
    }
);

export const persistAuthState = createAsyncThunk(
    'auth/persistAuthState',
    async () => {
        const res = await axios.get('/auth/loggedin');
        return res.data;
    }
);

export const signOut = createAsyncThunk(
    'auth/signout',
    async () => {
        const res = await axios.post('/auth/logout');
        return res.data;
    }
);

const slice = createSlice({
    name: 'auth',
    initialState: {
        admin: false,
        loggedIn: false
    },
    reducers: {
        createUser: (state, action) => {

        }
    },
    extraReducers: {
        [signIn.fulfilled]: (state, action) => {
            state.loggedIn = action.payload;
        },
        [signOut.fulfilled]: (state, action) => {
            state.loggedIn = action.payload;
        },
        [persistAuthState.fulfilled]: (state, action) => {
            state.loggedIn = action.payload;
        }
    }
})

export default slice.reducer;

export const { createUser } = slice.actions;