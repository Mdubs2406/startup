import React from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ErrorDisplay(props) {
  return (
    <Modal show={!!props.msg} centered onHide={props.dismiss}>
      <Modal.Body>{props.msg}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.dismiss}>Dismiss</Button>
      </Modal.Footer>
    </Modal>
  );
}