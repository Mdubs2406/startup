import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function UserPortal(props) {
    const nav = useNavigate();

    function signOut() {
        localStorage.removeItem('email');
        props.onSignOut();
    }

    return (
        <>
        <div className="card mx-2">
            <div className="card-header">Hello, {props.email}. We hope you having a wonderful day!</div>
            <div className="card-body">
                <Button variant="primary" className="mx-2" onClick={() => nav('/home')}>
                    Explore
                </Button>
                <Button variant="secondary" className="mx-2" onClick={() => signOut()}>
                    Sign Out
                </Button>
            </div>
        </div>
        </>
    );
}