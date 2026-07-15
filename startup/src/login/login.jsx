import React from 'react';
import { onHold } from './onHold';
import { userPortal } from './userPortal';
import { Access } from './access';

export function Login({email, password, access, updateAccess}) {
    return (
        <main className="py-3 text-center">
            <div>
                {access === access.unkown && <h1>Preparing to do good . . .</h1>}
                {access === access.onHold && 
                    <onHold email={email} password={password} onSignIn={(userEmail) => 
                        updateAccess(userEmail, Access.Granted)} 
                />}
                {access === access.Granted && <userPortal email={email} onSignOut={() => 
                    updateAccess(email, Access.onHold)} 
                />}
            </div>
        </main>
    );
}