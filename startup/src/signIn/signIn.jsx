import React from 'react';
import { Hold } from './Hold';
import { UserPortal } from './userPortal';
import { Access } from './access';

export function SignIn({email, password, access, setAccess}) {
    return (
        <main className="py-3 text-center">
            <div>
                {access === Access.Unknown && <h1>Preparing to do good . . .</h1>}
                {access === Access.Granted && <UserPortal email={email} onSignOut={() => 
                    setAccess(email, Access.Hold)} 
                />}
                {access === Access.Hold && 
                    <Hold email={email} password={password} onSignIn={(userEmail) => 
                        setAccess(userEmail, Access.Granted)} 
                />}
            </div>
        </main>
    );
}