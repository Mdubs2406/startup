import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { ErrorDisplay } from "./errorDisplay";

export function UserPortal(props) {
    const nav = useNavigate();
    const [accessError, setAccessError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    async function signOut() {
        setAccessError(null);
        setLoading(true);

        try {
            const res = await fetch('/api/users/signout', {
                method: 'DELETE',
            });

            if (!res.ok) {
                setAccessError('Unable to sign out.');
                return;
            }

            localStorage.removeItem('email');
            props.onSignOut();
        } catch {
            setAccessError('Unable to connect to the server.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <div className="card mx-2">
            <div className="card-header">Hello, {props.email}. We hope you are having a wonderful day!</div>
            <div className="card-body">
                <Button variant="primary" className="mx-2" onClick={() => nav('/home')}>
                    Explore
                </Button>
                <Button variant="secondary" className="mx-2" onClick={signOut} disabled={loading}>
                    Sign Out
                </Button>
            </div>
        </div>

        <ErrorDisplay msg={accessError} dismiss={() => setAccessError(null)} />
        </>
    );
}