import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../Controllers/Redux/authSlice";
import './sidebar.css';

export default () => {
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(signOut());
    }

    const { auth } = useSelector(state => state);

    const setBackground = (e) => {
        e.target.parentNode.parentNode.childNodes.forEach(node => {
            node.removeAttribute('style');
        });
        e.target.parentNode.setAttribute('style', 'background: #f17105');
    }

    return (
        <div className='sidebar'>
            <Link className='nav-link' to='/'><h1 className='brand'>Bug-Tracker</h1></Link>
            <ul>
                <li><Link onClick={setBackground} to='/' className='nav-link'>Dashboard</Link></li>
                <li><Link onClick={setBackground} to='/viewbugs' className='nav-link'>View Bugs</Link></li>
                {auth.admin && <li><Link onClick={setBackground} to='/createbugs' className='nav-link'>Create Bug</Link></li>}
            </ul>
            <button className='nav-link logout' onClick={logOut}>Logout</button>
        </div>
    )
}
