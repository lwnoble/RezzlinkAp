import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Components/Loader'

const UserContext = React.createContext()

function AuthProvider (props) {
  const [user, setUser] = useState(null)
  const [authDetermined, setAuthDetermined] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(false)

  function getMe () {
    return API.getMe()
      .then(response => {
        setUser({
          name: response.data.name,
          img: response.data.avatar_url
        })
        setFetching(false)
      })
      .catch(error => { console.log(error) })
  }

  useEffect(() => {
    const validJWT = API.determineJwtState()
    if (validJWT) {
      getMe()
        .then(() => { setAuthDetermined(true) })
        .catch(error => { console.log(error) })
    } else {
      setAuthDetermined(true)
    }
  }, [])

  if (!authDetermined) return <Loader size={60}/>

  const logIn = form => {
    setFetching(true)
    setError(false)
    API.logIn(form)
      .then(getMe)
      .catch(error => { setError(error.response.data.reason) })
      .finally(() => { setFetching(false) })
  }

  const signUp = form => {
    setFetching(true)
    setError(false)
    API.signUp(form)
      .then(getMe)
      .catch(error => { setError(error.response.data.reason) })
      .finally(() => { setFetching(false) })
  }

  const logOut = () => {
    API.logOut().then(() => { setUser(null) })
  }

  return (
    <UserContext.Provider
      value={{ user, fetching, error, logIn, signUp, logOut }} {...props}
    />
  )
}

const useUser = () => useContext(UserContext)
export { AuthProvider, useUser }
