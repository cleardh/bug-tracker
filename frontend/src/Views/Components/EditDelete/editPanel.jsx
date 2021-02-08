import React from 'react';
import './editPanel.css';

export default (props) => {
    return (
        <div className='edit-panel'>
            <button onClick={props.editClicked}>Edit</button>
            <button onClick={props.deleteClicked}>Delete</button>
        </div>
    )
}
