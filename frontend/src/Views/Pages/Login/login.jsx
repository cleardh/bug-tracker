import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signIn } from '../../../Controllers/Redux/authSlice';
import './login.css';

export default () => {
    const dispatch = useDispatch();

    const [formInput, setFormInput] = useState({
        username: '',
        password: ''
    })

    const inputChanged = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        });
    }

    const submit = (e) => {
        e.preventDefault();
        dispatch(signIn(formInput));
    }

    const signup = () => {
        console.log('signing up...');
    }

    return (
        <div className='loginBG'>
            <form className='login-panel'>
                <h1>Bug Tracker</h1>
                <input type='text' name='username' placeholder='Username' onChange={inputChanged} value={formInput.username} />
                <input type='password' name='password' placeholder='Password' onChange={inputChanged} value={formInput.password} />
                <button className='login-button' type='submit' onClick={submit}>Login</button>
                <button className='login-button' type='button' onClick={signup}>Signup</button>
            </form>
        </div>
    )
}