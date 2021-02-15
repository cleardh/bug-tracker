import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'user',
    initialState: [{}],
    reducers: {
        getUsers: (state) => {
            // state.push({ name: 'Dongha Kang' });
            // state.push({ name: 'test' });
        },
    }
});

export default slice.reducer;

export const { getUsers } = slice.actions;