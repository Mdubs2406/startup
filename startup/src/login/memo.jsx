import React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Memo(props) {
    return (
        <Modal {...props} show={props.message} centered>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
                <Button onClick={props.dismiss}>Dismiss</Button>
            </Modal.Footer>
        </Modal>
    );
}