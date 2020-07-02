import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { auth } from "./firebase";
import SignInUp from "./SignInUp";
import Builder from "./Builder";
import PersonalInfo from "./PersonalInfo";
import ProfileImage from "./ProfileImage";
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [user, setUser] = useState({
    user: null,
    status: 'active',
    rezz: null,
    profile: '',
  });

  function callAuth () {
    auth.onAuthStateChanged(user => {
      setUser(user)
      console.log(user)
    })
  }

  const page = {
    signinup: '/signinup',
    home: '/home',
    personalInfo: '/personalinfo',
    profileImage: '/profileimage',
    builder: '/builder',
  }


  return (

    <Router>
      <Switch>
        <Route exact path='/'>
          {user ? <Redirect to={page.home}/> : <Redirect to={page.signinup} />}
        </Route>
        <Route path={page.signinup}>
          {!user ? <SignInUp /> :  <Redirect to={page.home} />}
        </Route>
        <Route path={page.home}>
          {user ? <Home user={user} /> : <Redirect to={page.signinup}  />}
        </Route>
        <Route path={page.personalInfo}>
          {(user && user.status === 'onboarding') ? <PersonalInfo/> : <Redirect to={page.profileImage}  />}
        </Route>
        <Route path={page.profileImage}>
          {user ? <ProfileImage/> :  <Redirect to={page.signinup}  />}
        </Route>
        <Route path={page.builder}>
          {user ? <Builder /> :  <Redirect to={page.signinup}  />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
