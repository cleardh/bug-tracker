import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const slice = createSlice({
    name: 'auth',
    initialState: {
        admin: false,
        loggedIn: false
    },
    reducers: {
        signIn: (state, action) => {
            axios.post('/auth', action.payload, { 'Content-Type': 'application/json' }).then(res => {
                console.log(res);
            })
            state.loggedIn = true;
            state.admin = true;
        },
        signOut: (state) => {
            state.loggedIn = false;
            state.admin = false;
        },
        createUser: (state, action) => {

        }
    }
})

export default slice.reducer;

export const { signIn, signOut, createUser } = slice.actions