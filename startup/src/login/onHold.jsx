import React from "react";

import Button from 'react-bootstrap/Button';
import { Memo } from './memo';

export function onHold(props) {
    const [email, setEmail] = React.useState(props.userName);
    const [password, setPassword] = React.useState(props.password);
    const [accessError, setAccessError] = React.useState(null);

    // These two funcitons will be updated once the DB is setup
    async function loginAccount() {
        localStorage.setItem('email', email);
        props.onLogin(email);
    }

    async function createAcount() {
        localStorage.setItem('email', email);
        props.onLogin(email);
    }
}