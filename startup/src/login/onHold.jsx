import React from "react";

import Button from 'react-bootstrap/Button';
import { Memo } from './memo';

export function onHold(props) {
    const [email, setEmail] = React.useState(props.userName);
    const [password, setPassword] = React.useState(props.password);
    const [accessError, setAccessError] = React.useState(null);

    // These two funcitons will be updated once the DB is setup
    async function loginAccount() {
        localStorage.setItem('email', email);
        props.onLogin(email);
    }

    async function createAcount() {
        localStorage.setItem('email', email);
        props.onLogin(email);
    }

    return (
        <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form method="post" action="home.html">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Email</span>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="email@example.com"
                                    required
                                    className="form-control" 
                                    value = {email}
                                    onChange={(x) => setEmail(x.target.value)}/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Password</span>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    placeholder="********"
                                    required
                                    className="form-control"
                                    value = {password}
                                    onChange={(x) => setPassword(x.target.value)}/>
                            </div>

                            <div>
                                <button 
                                    value="login" 
                                    name="submit" 
                                    type="submit" 
                                    className="btn btn-primary mx-1">
                                    Submit
                                </button>
                                <button 
                                    value="create" 
                                    name="create" 
                                    type="submit" 
                                    className="btn btn-secondary mx-1">
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
    )
}