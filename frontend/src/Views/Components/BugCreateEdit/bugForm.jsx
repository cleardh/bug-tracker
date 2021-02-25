import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BugModel from '../../../Models/BugModel';
import { createBugs, updateBugs } from '../../../Controllers/Redux/bugSlice';

import './bugForm.css';

export default (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const defaultValue = props.title === 'Edit bug' ? new BugModel(props.bug) : new BugModel({ ...props.bug, priority: 1 });
    const [bugObject, setBugObject] = useState(defaultValue);
    
    const inputChanged = (e) => {
        setBugObject({
            ...bugObject,
            [e.target.name]: e.target.value
        });
    }

    const submitForm = (e) => {
        e.preventDefault();
        
        props.title === 'Edit bug' ? dispatch(updateBugs(bugObject)) : dispatch(createBugs(bugObject));
        setBugObject({
            name: '',
            details: '',
            steps: '',
            version: '',
            assigned: 'Dongha Kang',
            priority: 1
        });
        props.title === 'Edit bug' ? props.close() : history.push('/');
    }

    return (
        <div className='bug-create'>
            {props.title === 'Edit bug' && <button className='close-btn' onClick={props.close}>Close</button>}
            <h1>{props.title}</h1>
            <form onSubmit={submitForm}>
                <label>Name: </label>
                <input type='text' name='name' placeholder='Bug name' required onChange={inputChanged} value={bugObject.name} />
                <label>Details: </label>
                <textarea name='details' placeholder='Detailed description on the bug' required onChange={inputChanged} value={bugObject.details}></textarea>
                <label>Steps: </label>
                <textarea name='steps' placeholder='Steps to recreate the bug' required onChange={inputChanged} value={bugObject.steps}></textarea>
                <label>Priority: </label>
                <select name='priority' required onChange={inputChanged} value={bugObject.priority}>
                    <option value='1'>High</option>
                    <option value='2'>Medium</option>
                    <option value='3'>Low</option>
                </select>
                <label>Assigned: </label>
                <select name='assigned' required onChange={inputChanged} value={bugObject.assigned}>
                    <option value='Dongha Kang'>Dongha Kang</option>
                    <option value='Test User'>Test User</option>
                </select>
                <label>Version: </label>
                <input type='text' name='version' placeholder='Application version' required onChange={inputChanged} value={bugObject.version} />
                <button type='submit'>{props.title}</button>
            </form>
        </div>
    )
}
