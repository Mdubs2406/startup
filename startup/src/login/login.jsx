import React from 'react';
import { access } from './acces';
import { onHold } from './onHold';
import { userPortal } from './userPortal';

export function Login() {
    return (
        <main className="py-3 text-center">
                <h1 className="display-5 text-center">
                    Welcome Back
                </h1>
                <p className="lead text-center">
                    Sign in to continue spreading good.
                </p>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form method="post" action="/home">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Email</span>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="email@example.com"
                                    // required
                                    className="form-control" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Password</span>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    placeholder="********"
                                    // required
                                    className="form-control"/>
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

                {/* API placeholder. Random Inspirational Quote */}
                <div id="inspiration-quote" className="card border-light text-center mt-3">
                    <div className="card-body">
                        <h4 className="card-title">
                            "You don't have to great to start, but you have to start to be great."
                        </h4>
                        <p className="card-text quote-source">
                            Zig Ziglar
                        </p>
                    </div>
                </div>
            </main>
    );
}