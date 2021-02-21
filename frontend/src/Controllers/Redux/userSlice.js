import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createUser } from './authSlice';

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async () => {
        const res = await axios.get('/auth');
        return res.data;
    }
);

const slice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {},
    extraReducers: {
        [createUser.fulfilled]: (state, action) => {
            return [...state, action.payload];
        },
        [getUsers.fulfilled]: (state, action) => {
            return action.payload;
        }
    }
});

export default slice.reducer;