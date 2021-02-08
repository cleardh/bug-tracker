import React, { useState } from 'react';
import ViewSection from './Components/bugViewSection';
import BugModel from '../../../Models/BugModel';
import { useDispatch } from 'react-redux';
import { markComplete } from '../../../Controllers/Redux/bugSlice';
import EditPanel from '../EditDelete/editPanel';
import EditForm from '../BugCreateEdit/bugForm';

import './bugView.css';

export default (props) => {
    const dispatch = useDispatch();
    const bug = new BugModel(props.bug);
    const [disPlayEdit, setDisplayEdit] = useState(false);
    
    const editClicked = () => {
        setDisplayEdit(!disPlayEdit);
    }
    
    const deleteClicked = () => {

    }

    return (
        <>
            <div className='bug-view'>
                <EditPanel editClicked={editClicked} deleteClicked={deleteClicked} />
                <button className='close-btn' onClick={props.clicked}>Close</button>
                <h1>{bug.name}</h1>
                <ViewSection title='Details' info={bug.details} />
                <ViewSection title='Steps' info={bug.steps} />
                <ViewSection title='Priority' info={bug.priority} />
                <ViewSection title='Creator' info={bug.creator} />
                <ViewSection title='App Version' info={bug.version} />
                <ViewSection title='Time Created' info={bug.time} />
                <button onClick={() => dispatch(markComplete())}>Mark Complete</button>
            </div>
            {disPlayEdit && <EditForm title='Edit bug' bug={bug} close={editClicked} />}
        </>
    )
}
