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
                                <Button 
                                    value="login" 
                                    name="submit" 
                                    type="submit" 
                                    className="mx-1"
                                    variant="primary"
                                    onClick={() => loginAccount()}
                                    disabled={!email || !password}>
                                    Submit
                                </Button>
                                <Button 
                                    value="create" 
                                    name="create" 
                                    type="submit" 
                                    className="mx-1"
                                    variant="secondary"
                                    onClick={() => createAcount()}
                                    disabled={!email || !password}>
                                    Create Account
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
    )
}