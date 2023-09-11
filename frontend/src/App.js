import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Nav';
import SignupPage from './pages/SignUp/SignUp';
import LoginPage from './pages/LoginIn/LoginIn';


const App = () => {
  return (
    <Router>
       <Navbar />



      <Switch>
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        
      </Switch>
    </Router>
  );
};

export default App;
