import React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function Memo({ show, message, dismiss }) {
    return (
        <Modal show={show} centered>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={dismiss}>Dismiss</Button>
            </Modal.Footer>
        </Modal>
    );
}