import React from "react";

import Button from 'react-bootstrap/Button';
import { Memo } from './memo';

export function onHold(props) {
    const [email, setEmail] = React.useState(props.userName);
    const [password, setPassword] = React.useState(props.password);
    const [accessError, setAccessError] = React.useState(null);

    
}