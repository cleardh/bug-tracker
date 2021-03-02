import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Reducers
import authReducer from './Controllers/Redux/authSlice';
import bugReducer from './Controllers/Redux/bugSlice';
import userReducer from './Controllers/Redux/userSlice';

export default ({ children }) => {
    // Redux configuration
    const reducer = combineReducers({
        auth: authReducer,
        bugs: bugReducer,
        user: userReducer
    });
    
    const store = configureStore({
        reducer
    });

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}