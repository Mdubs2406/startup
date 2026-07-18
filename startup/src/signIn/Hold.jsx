import React from "react";

import Button from 'react-bootstrap/Button';

export function Hold(props) {
    const [email, setEmail] = React.useState(props.email);
    const [password, setPassword] = React.useState(props.password);

    const [accessError, setAccessError] = React.useState(null);
    const [qoute, setQoute] = React.useState('A wise man once said...');
    const [quoteSource, setQuoteSource] = React.useState('Someone, probably');

    // Later, this will be updated to request a qoute from and API
    React.useEffect(() => {
        setQoute("You don't have to great to start, but you have to start to be great.");
        setQuoteSource("Zig Ziglar");
    }, []);

    // These two funcitons will be updated once the DB is setup
    async function signInAccount() {
        localStorage.setItem('email', email);
        props.onSignIn(email);
    }

    async function createAccount() {
        localStorage.setItem('email', email);
        props.onSignIn(email);
    }

    return (
        <>
            <h1 className="display-5 text-center">
                Welcome Back
            </h1>
            <p className="lead text-center"> 
                Sign in to continue spreading good.
            </p>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Email</span>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="email@example.com"
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
                            onClick={() => signInAccount()}
                            disabled={!email || !password}>
                            Submit
                        </Button>
                        <Button 
                            value="create" 
                            name="create" 
                            type="submit" 
                            className="mx-1"
                            variant="secondary"
                            onClick={() => createAccount()}
                            disabled={!email || !password}>
                            Create Account
                        </Button>
                    </div>
                </div>
            </div>
            {/* API placeholder. Random Inspirational Quote */}
            <div id="inspiration-quote" className="card border-light text-center mt-3">
                <div className="card-body">
                    <h4 className="card-title">{qoute}</h4>
                    <p className="card-text quote-source">{quoteSource}</p>
                </div>
            </div>
        </>
    )
}