import React from "react";

import Button from 'react-bootstrap/Button';

export function Hold(props) {
    const [email, setEmail] = React.useState(props.email);
    const [password, setPassword] = React.useState(props.password);
    const [loading, setLoading] = React.useState(false);
    const [accessError, setAccessError] = React.useState(null);
    const [quote, setQuote] = React.useState('A wise man once said, it is a good day to do something good.');
    const [quoteSource, setQuoteSource] = React.useState('Someone, probably');

    React.useEffect(() => {
        fetch('https://zenquotes.io/api/random')
            .then((res) => res.json())
            .then((quoteData) => {
                setQuote(quoteData[0].q);
                setQuoteSource(quoteData[0].a);
        }).catch(() => {
            // Will display default states
        });
    }, []);

    function signInAccount() {
        requestUserAccess(`/api/users/signin`);
    }

    function createAccount() {
        requestUserAccess(`/api/users/create`);
    }

    async function requestUserAccess(endpoint) {
        setLoading(true);

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=UTF-8'},
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                localStorage.setItem('email', email);
                props.onSignIn(email);
            } else {
                const err = await res.json();
                setAccessError(err.msg || 'Login failed.');
            }
        } catch (err) {
            setAccessError('Unable to connect to the server.');
        } finally {
            setLoading(false);
        }
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
                            onClick={signInAccount}
                            disabled={loading || !email || !password}>
                            Submit
                        </Button>
                        <Button 
                            value="create" 
                            name="create" 
                            type="submit" 
                            className="mx-1"
                            variant="secondary"
                            onClick={createAccount}
                            disabled={loading || !email || !password}>
                            Create Account
                        </Button>
                    </div>
                </div>
            </div>
            {/* API placeholder. Random Inspirational Quote */}
            <div id="inspiration-quote" className="card border-light text-center mt-3">
                <div className="card-body">
                    <h4 className="card-title">{quote}</h4>
                    <p className="card-text quote-source">{quoteSource}</p>
                </div>
            </div>
        </>
    )
}