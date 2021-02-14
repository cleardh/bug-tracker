import { createSlice } from "@reduxjs/toolkit";
import { retrieveBugs } from "../bugController";

const slice = createSlice({
    name: 'bugs',
    initialState: [],
    reducers: {
        getBugs: (state) => retrieveBugs(),
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
    }
});

export default slice.reducer;

export const { getBugs, createBugs, deleteBugs, updateBugs, markComplete } = slice.actions;