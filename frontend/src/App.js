import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Views/Pages/Login/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './Views/Sidebar/sidebar';

import DashboardPage from './Views/Pages/Dashboard/dashboard';
import ViewBugPage from './Views/Pages/viewBugs';
import CreateBug from './Views/Components/BugCreateEdit/bugForm';

function App() {
  const { auth } = useSelector(state => state)
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
