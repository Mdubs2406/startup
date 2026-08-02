import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { SignIn } from './signIn/signIn';
import { Home } from './home/home';
import { Journal } from './journal/journal';
import { Community } from './community/community';
import { Access } from './signIn/access';
import { PostNotification } from './notification/postNotification';
import { addWebSocketHandler, removeWebSocketHandler, connectWebSocket, closeWebSocket } from './websocket/websocket';

function App() {
  const [userEmail, setUserEmail] = React.useState(localStorage.getItem('email') || '');
  const currentAccessState = userEmail ? Access.Granted : Access.Pending;
  const [accessState, updateAccess] = React.useState(currentAccessState);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    function handleWebSocketEvent(event) {
        if (event.type === 'NEW_COMMUNITY_POST' && event.data.author !== userEmail) {
          setShow(true);
        }
      }

    addWebSocketHandler(handleWebSocketEvent);

    return () => {
      removeWebSocketHandler(handleWebSocketEvent);
    }
  }, [userEmail]);

  React.useEffect(() => {
    if (!show) {
      return;
    }
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <BrowserRouter>
      <div className="body">
        <div id="top-banner">
          <img
            src="/floral_header.png"
            className="img-fluid w-100"
            alt="Floral banner" />
        </div>

        <header className="container-fluid">
          <div id="title-block" className="text-center py-1">
            <h1 className="display-3">
              Ripple Effect
            </h1>
            <p className="lead">
              Small acts. Big Ripples.
            </p>
          </div>

          {accessState === Access.Granted && (
            <div className='mx-2 px-1 my-2 border d-inline-block'>User : {userEmail.split('@')[0]}</div>
          )}

          <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <ul className="navbar-nav flex-row flex-wrap mx-auto">
              <li className="nav-item px-4">
                <NavLink className="nav-link" to='/'>{accessState === Access.Granted ? 'User Portal' : 'Sign In'}</NavLink>
              </li>
              {accessState === Access.Granted && (
                <li className="nav-item px-4">
                  <NavLink className="nav-link" to='home'>Home</NavLink>
                </li>)}
              {accessState === Access.Granted && (<li className="nav-item px-4">
                <NavLink className="nav-link" to='community'>Community</NavLink>
              </li>)}
              {accessState === Access.Granted && (<li className="nav-item px-4">
                <NavLink className="nav-link" to='journal'>My Journal</NavLink>
              </li>)}
            </ul>
          </nav>
          {accessState === Access.Granted && <PostNotification show={show} />}
        </header>

        <Routes>
          <Route path='/' element={<SignIn
            email={userEmail}
            access={accessState}
            setAccess={(userEmail, accessState) => {
              updateAccess(accessState);
              setUserEmail(userEmail);
            }}
          />} exact />
          <Route 
            path='/home' 
            element={
              accessState === Access.Granted
                ? <Home />
                : <Navigate to='/' />              
              } 
          />
          <Route 
            path='/journal' 
            element={
              accessState === Access.Granted
              ? <Journal />
              : <Navigate to='/' />
            } 
          />
          <Route 
            path='/community' 
            element={
              accessState === Access.Granted
              ? <Community />
              : <Navigate to='/' />
            } 
          />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="container-fluid text-center text-muted py-2 border-top mt-2">
          <span>
            Matthew Wellman
          </span>
          <a 
            className="nav-link" 
            href="https://github.com/Mdubs2406"
            target="_blank"
            rel="noopener noreferrer"
          >| GitHub |</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid text-center">404: Return to sender. Address unknown.</main>;
}

export default App;