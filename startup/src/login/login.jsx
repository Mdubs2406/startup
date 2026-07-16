import React from 'react';
import { Hold } from './Hold';
import { userPortal } from './userPortal';
import { Access } from './access';

export function Login({email, password, access, updateAccess}) {
    return (
        <main className="py-3 text-center">
            <div>
                {access === Access.Unkown && <h1>Preparing to do good . . .</h1>}
                {access === Access.Hold && 
                    <onHold email={email} password={password} onSignIn={(userEmail) => 
                        updateAccess(userEmail, Access.Granted)} 
                />}
                {access === Access.Granted && <userPortal email={email} onSignOut={() => 
                    updateAccess(email, Access.Hold)} 
                />}
            </div>
        </main>
    );
}