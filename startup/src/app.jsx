import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Journal } from './journal/journal';
import { Community } from './community/community';

export default function App() {
    return (
        <BrowserRouter>
            <div className="body">
                <div id="top-banner">
                    <img 
                        src="./public/floral_header.png" 
                        className="img-fluid w-100"
                        alt="Floral banner" />
                </div>
                <div className="container">
                    <header>
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
                                    <NavLink className="nav-link" to="">Login</NavLink>
                                </li>
                                <li className="nav-item px-4">
                                    <a className="nav-link" href="home.html">Home</a>
                                </li>
                                <li className="nav-item px-4">
                                    <a className="nav-link" href="community.html">Community</a>
                                </li>
                                <li className="nav-item px-4">
                                    <a className="nav-link" href="journal.html">My Journal</a>
                                </li>
                            </ul>
                        </nav>
                    </header>

                    <main>App components go here</main>

                    <footer className="text-center text-muted py-2 border-top mt-2">
                    <span>
                        Matthew Wellman
                    </span>
                    <a className="nav-link" href="https://github.com/Mdubs2406">[GitHub]</a>
                </footer>
                </div>
            </div>
        </BrowserRouter>
    );
}