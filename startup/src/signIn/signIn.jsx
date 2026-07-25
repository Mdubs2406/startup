import React from 'react';
import { Unauthenticated } from './hold';
import { UserPortal } from './userPortal';
import { Access } from './access';

export function SignIn({ email, access, setAccess }) {
  return (
    <main className="py-3 text-center">
      <div>
        {access === Access.Unknown && <h1>Preparing to do good . . .</h1>}
        {access === Access.Granted && <UserPortal email={email} onSignOut={() =>
          setAccess(email, Access.onHold)}
        />}
        {access === Access.Pending &&
          <Unauthenticated email={email} onSignIn={(userEmail) =>
            setAccess(userEmail, Access.Granted)}
          />}
      </div>
    </main>
  );
}