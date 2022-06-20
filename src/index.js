import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import { StyledEngineProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeWrapper } from './themes/ThemeWrapper'
import { Home, About, Login, Account, Setup, Privacy, Upload, Terms, Contact } from './Views'
import { auth } from './service/firebase'
import { GenericLoader } from './Components';
import themes from './themes/themes';
import { PropProvider } from './propContext';

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    let stickyValue = window.localStorage.getItem(key);
    if (stickyValue === "undefined") stickyValue = null;
    return stickyValue !== null
      ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}


const FF = () => {
  const [loggedIn, setLoggedIn] = useStickyState(false, "loggedIn");
  const [user, setUser] = useStickyState(null, "user");
  const [signingOut, setSigningOut] = useState(false);
  const [theme, setTheme] = useStickyState(themes[0], "theme");

  function setUsername() {
    if (user !== null) {
      let body = {
        id: user.id
      } 
      setTimeout(() => {
      fetch('http://localhost:5001/user/get', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {"Content-type": "application/json; charset=UTF-8",}
        })
        .then(response => response.json())
        .then(data => {
          let userLoc = data.data.user
          setUser(userLoc)
        })
        .catch(err => console.log(err));
      }, 2000);
    }
  }

  useEffect(() => {
    console.log("authenticating")
    if (user === undefined) {
      setUser(null)
    }
    auth.onAuthStateChanged(authUser => {
      if (authUser !== null) {
        let body = {
          id: authUser.uid,
        }
        setTimeout(() => {
          fetch('http://localhost:5001/user/get', {
          method: "POST",
          body: JSON.stringify(body),
          headers: {"Content-type": "application/json; charset=UTF-8",}
          })
          .then(response => response.json())
          .then(data => {
            let userLoc = data.data.user
            setUser(userLoc);
            setLoggedIn(true);
          })
          .catch(err => console.log(err));
        console.log("logged in!")} , 1000);
      } else {
        setUser(null)
        setLoggedIn(false)
        console.log("not authenticated")
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function LogOut() {
    setUser(null)
    setLoggedIn(false)
    setSigningOut(true)
  }

  let account, upload;

  if (loggedIn && user.setup)
    account = <Account logOut={LogOut}/>
  else if (loggedIn && !user.setup) 
    account = <Setup setUsername={setUsername}/>
  else account = <Login/>

  if (loggedIn && user.setup && user.isAdmin) upload = <Upload/>
  else upload = <Navigate to="/" />

  return (
    <PropProvider value={{theme: theme, setTheme: setTheme, user: user, setUser: setUser}}>
      <ThemeWrapper>
        <CssBaseline/>
        <GenericLoader loading={signingOut}>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/account" element={account}/>
              <Route path="/privacy" element={<Privacy/>} />
              <Route path="/terms" element={<Terms/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/upload" element={upload} />
            </Routes>
          </Router>
        </GenericLoader>
      </ThemeWrapper>
    </PropProvider>
  )
}


ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <FF />
  </StyledEngineProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();