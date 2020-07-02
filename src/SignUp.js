import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { auth, signInWithGoogle, generateUserDocument } from "./firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div id="signUp" class="formBox text center">
      <h1>Sign up</h1>
      <button
        onClick={() => {
          try {
            signInWithGoogle();
          } catch (error) {
            console.error("Error signing in with Google", error);
          }
        }}
        className="iconButton icon-google color2" 
        title= "Sign In with Google"
      >
        
      </button>
      <div className='errorBox'>
        {error !== null && (
          <div className="errorBox">
            {error}
          </div>
        )}
      </div>
      <small>Use your email to register.</small>  
      <form className="">
        <div className="inputRow">
          <label htmlFor="fullName" className="block">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={displayName}
            placeholder="Jane Doe"
            id="displayName"
            onChange={onChangeHandler}
          />
        </div> 
        <div className="inputRow">
          <label htmlFor="userEmail" className="block">
            Email
          </label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={onChangeHandler}
          />
        </div> 
        <div className="inputRow"> 
          <label htmlFor="userPassword" className="block">
            Password
          </label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={onChangeHandler}
          />
        </div>  
        <p className="legal">By clicking sign up you agree to our terms and policies.</p>
        <button
          className="btn-primary color2 fullwidth"
          onClick={createUserWithEmailAndPasswordHandler}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
