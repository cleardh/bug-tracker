import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../Controllers/Redux/authSlice';
import './signUp.css';

export default (props) => {
    const containerRef = useRef();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        const containerWidth = containerRef.current.getBoundingClientRect().width;
        const containerHeight = containerRef.current.getBoundingClientRect().height;
        containerRef.current.style.left = `${(window.innerWidth - containerWidth) / 2}px`;
        containerRef.current.style.top = `${(window.innerHeight - containerHeight) / 3}px`;
    }, [window.innerWidth, window.innerHeight])

    const inputChanged = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(createUser(formData));
        setFormData({
            username: '',
            password: ''
        });
    }

    return (
        <div ref={containerRef} className='user-create'>
            <button className='close-btn' onClick={props.close}>Close</button>
            <h1>Sign up</h1>
            <form onSubmit={submitForm}>
                <label>Username: </label>
                <input type='text' name='username' placeholder='Username' required onChange={inputChanged} value={formData.username} />
                <label>Password: </label>
                <input type='password' name='password' placeholder='Password' required onChange={inputChanged} value={formData.password} />
                <button type='submit'>Sign up</button>
            </form>
        </div>
    )
}
