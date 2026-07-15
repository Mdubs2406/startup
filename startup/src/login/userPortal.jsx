import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function userPortal(props) {
    const nav = useNavigate();

    function signOut() {
        localStorage.removeItem('email');
        props.onSignOut();
    }

    return (
        <div className="card">
            <div>Hello, {props.email}. We hope you having a wonderful day!</div>
            <Button variant='primary' onClick={() => nav('/home')}>
                Explore
            </Button>
            <Button variant='secondary' conClick={() => signOut()}>
                Sign Out
            </Button>
        </div>
    );
}