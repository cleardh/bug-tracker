import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
// import { retrieveBugs } from "../bugController";

export const getBugs = createAsyncThunk(
    'bugs/getBugs',
    async () => {
        const res = await axios.get('/bugs');
        return res.data;
    }
)

export const createBugs = createAsyncThunk(
    'bugs/createBugs',
    async (newBug) => {
        const res = await axios.post('/bugs', newBug, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }
);

const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        deleteBugs: (state, action) => {
            return state.filter(bug => bug._id !== action.payload);
        },
        updateBugs: (state, action) => {
            return state.map(bug => bug._id === action.payload._id ? { ...bug, ...action.payload } : bug);
        },
        markComplete: (state, action) => {
            return state.map(bug => bug._id === action.payload ? { ...bug, completed: true } : bug);
        }
    },
    extraReducers: {
        [getBugs.fulfilled]: (state, action) => {
            const sorted = action.payload.sort((a, b) => { return a.priority - b.priority; })
            return sorted;
        },
        [createBugs.fulfilled]: (state, action) => {
            return [...state, action.payload];
        },
    }
});

export default slice.reducer;

export const { deleteBugs, updateBugs, markComplete } = slice.actions;