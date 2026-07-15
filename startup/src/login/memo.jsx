import React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Memo(message, dismiss) {
    return (
        <Modal show={message} centered>
            <Modal.Body>{props.message}</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={dismiss}>Dismiss</Button>
            </Modal.Footer>
        </Modal>
    );
}