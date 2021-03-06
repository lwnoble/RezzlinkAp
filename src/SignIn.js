import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "./firebase";
import { useUser } from "./userContext";


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState(null);
    const {login} = useUser()

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
         event.preventDefault();
         login({email, password})
    };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

      return (
        <div id="signIn">
          <div id='rezzi' className="formBox">
            <h1>Sign in</h1>
          
            <button
              className="iconButton icon-google color2"
              title="Sign in with Google"
              onClick={() => {
                signInWithGoogle();
              }}
            >
            </button>
            <br/>
            {error !== null && <div className = "">{error}</div>}
            <small>Use your email and password to sign in.</small>
            <form>
              <div className="inputRow">
                <label htmlFor="userEmail" className="block">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value = {email}
                  placeholder="E.g: faruq123@gmail.com"
                  id="userEmail"
                  onChange = {onChangeHandler}
                />
              </div>  
              <div className="inputRow">
                  <label htmlFor="userPassword" className="block">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    value = {password}
                    placeholder="Your Password"
                    id="userPassword"
                    onChange = {onChangeHandler}
                  />
              </div>    
              <button
              className="btn-primary fullwidth color2"
              onClick={signInWithEmailAndPasswordHandler}>
                Sign in
              </button>
            </form>
            <p className="text-center my-3">
              <Link to="passwordReset">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      );
    };
export default SignIn;
