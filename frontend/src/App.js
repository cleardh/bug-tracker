import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Login from './Views/Pages/Login/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './Views/Sidebar/sidebar';
import { persistAuthState } from './Controllers/Redux/authSlice';

import DashboardPage from './Views/Pages/Dashboard/dashboard';
import ViewBugPage from './Views/Pages/viewBugs';
import CreateBug from './Views/Components/BugCreateEdit/bugForm';
import { getUsers } from './Controllers/Redux/userSlice';

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  useEffect(() => {
    dispatch(persistAuthState());
  }, []);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Router>
      {!auth.loggedIn ? <Login /> : 
        <>
          <Sidebar />
          <Switch>
            <Route exact path='/'><DashboardPage /></Route>
            <Route path='/viewbugs'><ViewBugPage /></Route>
            <Route path='/createbugs'>
              <div className='page-container'>
                <CreateBug title='Create Bug' />
              </div>
            </Route>
          </Switch>
        </>
      }
    </Router>
  );
}

export default App;
