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
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    }
);

export const markComplete = createAsyncThunk(
    'bugs/markComplete',
    async (bug) => {
        const res = await axios.put('/bugs', { ...bug, completed: true }, {
            headers: { 'Content-Type': 'application/json'}
        });
        return res.data;
    }
);

export const markPending = createAsyncThunk(
    'bugs/markPending',
    async (bug) => {
        const res = await axios.put('/bugs', { ...bug, completed: false }, {
            headers: { 'Content-Type': 'application/json'}
        });
        return res.data;
    }
);

export const updateBugs = createAsyncThunk(
    'bugs/updateBugs',
    async (bug) => {
        const res = await axios.put('/bugs', bug, {
            headers: { 'Content-Type': 'application/json' }
        });
        return res.data;
    }
);

export const deleteBugs = createAsyncThunk(
    'bugs/deleteBugs',
    async (id) => {
        const res = await axios.delete(`/bugs/${id}`);
        return res.data;
    }
);

const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {},
    extraReducers: {
        [getBugs.fulfilled]: (state, action) => {
            const sorted = action.payload.sort((a, b) => { return a.priority - b.priority; })
            return sorted;
        },
        [createBugs.fulfilled]: (state, action) => {
            return [...state, action.payload];
        },
        [markComplete.fulfilled]: (state, action) => {
            return state.map(bug => bug._id === action.payload._id ? action.payload : bug);
        },
        [markPending.fulfilled]: (state, action) => {
            return state.map(bug => bug._id === action.payload._id ? action.payload : bug);
        },
        [updateBugs.fulfilled]: (state, action) => {
            return state.map(bug => bug._id === action.payload._id ? action.payload : bug);
        },
        [deleteBugs.fulfilled]: (state, action) => {
            return state.filter(bug => bug._id !== action.payload._id);
        }
    }
});

export default slice.reducer;