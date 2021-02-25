import React from 'react';
import { useSelector } from 'react-redux'
import './editPanel.css';

export default (props) => {
    const { auth } = useSelector(state => state);
    return (
        <div className='edit-panel'>
            <button onClick={props.editClicked}>Edit</button>
            {auth.admin && <button onClick={props.deleteClicked}>Delete</button>}
        </div>
    )
}
