import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SignInUp from "./SignInUp";
import Builder from "./Builder";
import PersonalInfo from "./PersonalInfo";
import ProfileImage from "./ProfileImage";
import Home from "./Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from "./userContext";



function App() { 
  const page = {
    signinup: '/signinup',
    home: '/home',
    personalInfo: '/personalinfo',
    profileImage: '/profileimage',
    builder: '/builder',
  }

  console.log(useUser)

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
          {user ? <Home /> : <Redirect to={page.signinup}  />}
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
