import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const createUser = createAsyncThunk(
    'auth/createUser',
    async ({ username, password }) => {
        const res = await axios.post('/auth/user', { username, password }, {
            'Content-Type': 'application/json'
        });
        return res.data;
    }
)

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (loginData) => {
        const res = await axios.post('/auth', loginData, {
            'Content-Type': 'application/json'
        });
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
    reducers: {},
    extraReducers: {
        [createUser.fulfilled]: (state, action) => {
            const { username, password, role } = action.payload;
            if (username && password) {
                state.loggedIn = true;
            }
            if (role) {
                state.admin = true;
            }
        },
        [signIn.fulfilled]: (state, action) => {
            state.loggedIn = action.payload !== null;
            state.admin = action.payload.role === 'admin';
        },
        [signOut.fulfilled]: (state, action) => {
            state.loggedIn = action.payload;
        },
        [persistAuthState.fulfilled]: (state, action) => {
            state.loggedIn = action.payload !== null;
            state.admin = action.payload.role === 'admin'
        }
    }
})

export default slice.reducer;