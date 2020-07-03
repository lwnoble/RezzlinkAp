import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Components/Loader'
import { auth } from "./firebase";

const UserContext = React.createContext()

function AuthProvider (props) {
  const [user, setUser] = useState(null)
  const [authDetermined, setAuthDetermined] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {

    const validJWT = getCookie('csrfToken')
    if (validJWT) {
        then(() => { setAuthDetermined(true) })
        .catch(error => { console.log(error) })
    } else {
      setAuthDetermined(true)
    }
  }, [])

  if (!authDetermined) return <Loader size={60}/>

  const logIn = form => {
    setFetching(true)
    setError(false)

    try{
        const {user} = auth.signInWithEmailAndPasswordHandler ({email, password});
        ;
      }
      catch(error){
        setError('Error Signing up with email and password');
      }
    try{
    }   
    catch(error){ 
        setError(error.response.data.reason) 
    }
    finally{() => { setFetching(false) }
  }

  const signUp = form => {
    setFetching(true)
    setError(false)
    try{
        const {user} = auth.createUserWithEmailAndPasswordHandler  ({email, password});
      }
      catch(error){
        setError('Error Signing up with email and password');
      }
      try{}
      catch(error)
        { setError(error.response.data.reason) 
      }  
      finally{() => { setFetching(false) }
  }

  const logOut = () => {
    firebase.auth().signOut().then(function() {
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
