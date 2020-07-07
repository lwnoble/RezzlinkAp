import React, { useContext, useEffect, useState } from 'react'
import Loader from './Loader'
import { auth, generateUserDocument  } from "./firebase";

const UserContext = React.createContext()

function AuthProvider (props) {
  const [user, setUser] = useState(null)
  const [authDetermined, setAuthDetermined] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(false)
  

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      setUser({ user });
      setAuthDetermined(true)  
    })
  }, [])
  
  if (!authDetermined) return <Loader size={60}/>
  
  const logIn = (email, password) => {
    setFetching(true)
    setError(false)
    
    try{
      const {user} = auth.signInWithEmailAndPasswordHandler ({email, password});
      ;
      }
      catch(error)
        { setError('Error Signing in with email and password'); }
      finally{ setFetching(false) }
  }
  
  const signUp = (email, password) => {
    setFetching(true)
    setError(false)

    try{
      const {user} = auth.createUserWithEmailAndPasswordHandler ({email, password});
      ;
      }
      catch(error)
        { setError('Error Signing up with email and password'); }
      finally{ setFetching(false) }
  }
  
  const logOut = () => {
    auth.signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
  
  return (
  <UserContext.Provider
    value={{ user, fetching, error, logIn, signUp, logOut }}
  />
  )
}
  
const useUser = () => useContext(UserContext)
export { AuthProvider, useUser }