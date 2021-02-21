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

const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        createBugs: (state, action) => {
            // state.push(action.payload);
            const { name, details, steps, version, assigned, priority } = action.payload;
            const newBug = {
                _id: Math.floor(Math.random() * 100000000),
                name,
                details,
                steps,
                version,
                priority,
                assigned,
                creator: 'test',
                time: new Date().toISOString().slice(11, 16),
            }
            return [ ...state, newBug];
        },
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
        }
    }
});

export default slice.reducer;

export const { createBugs, deleteBugs, updateBugs, markComplete } = slice.actions;