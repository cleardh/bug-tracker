import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBugs } from '../../../Controllers/Redux/bugSlice';
import Card from '../../Components/Dashboard/card';

export default () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const bugs = useSelector(state => state.bugs);
    let highCount = null;
    let midCount = null;
    let lowCount = null;

    const filterBugs = (priority) => {
        return bugs.filter(bug => bug.priority === priority);
    }

    if (bugs !== undefined) {
        highCount = filterBugs(1);
        midCount = filterBugs(2);
        lowCount = filterBugs(3);
    }

    useEffect(() => {
        dispatch(getBugs());
    }, [bugs === undefined]);

    const redirect = (priority) => {
        history.push({
            pathname: '/viewbugs',
            state: { priority }
        });
    }

    Card.displayName = 'Card';

    return (
        <div className='page-container'>
            <Card priority='1' count={highCount.length} clicked={() => redirect(1)} />
            <Card priority='2' count={midCount.length} clicked={() => redirect(2)} />
            <Card priority='3' count={lowCount.length} clicked={() => redirect(3)} />
        </div>
    )
}
