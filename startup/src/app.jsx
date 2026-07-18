import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { SignIn } from './signIn/signIn';
import { Home } from './home/home';
import { Journal } from './journal/journal';
import { Community } from './community/community';
import { Access } from './signIn/access';
import { Memo } from './memo';

function App() {
    const [userEmail, setUserEmail] = React.useState(localStorage.getItem('email') || '');
    const [password, setPassword] = React.useState(localStorage.getItem('Password') || '');
    const currentAccessState = userEmail ? Access.Granted : Access.Hold;
    const [accessState, updateAccess] = React.useState(currentAccessState);

    const [comPosts, setComPosts] = React.useState(() => {
        return JSON.parse(localStorage.getItem("comPosts")) || [];
    });
    React.useEffect(() => {
        localStorage.setItem("comPosts", JSON.stringify(comPosts));
    }, [comPosts]);

    const [memo, setMemo] = React.useState({
        show: false,
        message: ''
    });

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

                    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                        <ul className="navbar-nav flex-row flex-wrap mx-auto">
                            <li className="nav-item px-4">
                                <NavLink className="nav-link" to="">Sign In</NavLink>
                            </li>
                            {accessState === Access.Granted && (
                                <li className="nav-item px-4">
                                <NavLink className="nav-link" to="home">Home</NavLink>
                            </li>)}
                            {accessState ==  Access.Granted && (<li className="nav-item px-4">
                                <NavLink className="nav-link" to="community">Community</NavLink>
                            </li>)}
                            {accessState === Access.Granted && (<li className="nav-item px-4">
                                <NavLink className="nav-link" to="journal">My Journal</NavLink>
                            </li>)}
                        </ul>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<SignIn 
                        email={userEmail} 
                        password={password} 
                        access={accessState} 
                        setAccess={(userEmail, accessState) => {
                            updateAccess(accessState);
                            setUserEmail(userEmail);
                        }}
                    />} exact />
                    <Route path='/home' element={<Home 
                        comPosts={comPosts}
                    />} />
                    <Route path='/journal' element={<Journal />} />
                    <Route path='/community' element={<Community 
                        comPosts={comPosts}
                        setComPosts={setComPosts}
                    />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="container-fluid text-center text-muted py-2 border-top mt-2">
                    <span>
                        Matthew Wellman
                    </span>
                    <a className="nav-link" href="https://github.com/Mdubs2406">[GitHub]</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid text-center">404: Return to sender. Address unknown.</main>;
}

export default App;