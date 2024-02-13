import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfimDialoague = (props: any) => {
  return (
    <Modal show={true} size="sm" backdrop="static" centered>
      <Modal.Body>{props.msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.handleClick(false)}>
          Disagree
        </Button>
        <Button variant="primary" onClick={() => props.handleClick(true)}>
          Agree
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfimDialoague;
