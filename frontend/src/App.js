import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Views/Login/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './Views/Sidebar/sidebar';

import ViewBugPage from './Views/Pages/viewBugs';

function App() {
  const { auth } = useSelector(state => state)
  return (
    <Router>
      {!auth.loggedIn ? <Login /> : 
        <>
          <Sidebar />
          <Switch>
            <Route path='/viewbugs' component={ViewBugPage} />
          </Switch>
        </>
      }
    </Router>
  );
}

export default App;
