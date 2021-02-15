import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (loginData) => {
        const res = await axios.post('/auth', loginData, { 'Content-Type': 'application/json' });
        return res.data
    }
);

const slice = createSlice({
    name: 'auth',
    initialState: {
        admin: false,
        loggedIn: false
    },
    reducers: {
        signOut: (state) => {
            state.loggedIn = false;
            state.admin = false;
        },
        createUser: (state, action) => {

        }
    },
    extraReducers: {
        [signIn.fulfilled]: (state, action) => {
            console.log(action);
            state.loggedIn = action.payload;
        }
    }
})

export default slice.reducer;

export const { signOut, createUser } = slice.actions;