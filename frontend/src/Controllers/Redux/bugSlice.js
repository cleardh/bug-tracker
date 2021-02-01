import { createSlice } from "@reduxjs/toolkit";
import { retrieveBugs } from "../bugController";

const slice = createSlice({
    name: 'bug',
    initialState: [],
    reducers: {
        getBugs: (state) => retrieveBugs(),
        createBugs: (state, action) => {

        },
        updateBugs: (state, action) => {
            
        },
        markComplete: (state, action) => {
            
        }
    }
});

export default slice.reducer;

export const { getBugs, createBugs, updateBugs, markComplete } = slice.actions;