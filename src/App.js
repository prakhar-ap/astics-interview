import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// components
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Dashboard from './pages/dashboard';

// route
import PrivateRoute from './components/common/private-routing/PrivateRoute';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
};
  
export default App;
