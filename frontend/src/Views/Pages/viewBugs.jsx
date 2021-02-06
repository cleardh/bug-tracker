import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getBugs } from "../../Controllers/Redux/bugSlice";
import BugCard from '../Components/BugCard/bugCard';
import BugView from '../Components/BugView/bugView';

export default () => {
    const [displayBug, setDisplayBug] = useState({
        name: '',
        isDisplayed: false
    })
    const dispatch = useDispatch();
    const { bugs } = useSelector(state => state);

    useEffect(() => {
        dispatch(getBugs());
    }, [bugs.length < 1]);

    const bugClicked = (name) => {
        setDisplayBug({
            name,
            isDisplayed: !displayBug.isDisplayed
        })
    }

    return (
        <div className='page-container'>
            {bugs.map((bug, key) => (
                <BugCard key={key} bug={bug} clicked={bugClicked} />
            ))}
            {displayBug.isDisplayed && <BugView bug={bugs.filter(bug => bug.name === displayBug.name)[0]} clicked={bugClicked} />}
        </div>
    )
};
