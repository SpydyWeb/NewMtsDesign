import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { Overlay, Tooltip } from "react-bootstrap";
const ToolTipValidation = ({
  validMessage,
  invalidMessage,
  isValid,
  target
}: {
  validMessage: string;
  invalidMessage: string;
  isValid: boolean;
  target:any
}) => {
  return (
    <Overlay target={target} show={validMessage!==""} placement="bottom">
      {(props) => (
        <Tooltip id="overlay-example" {...props}>
          {isValid ? (
            <div className="d-flex align-items-center gap-2">
              <FaCheckCircle
                className="text-green-600 text-lg"
                style={{ color: "green" }}
              />
              <p>{validMessage}</p>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <AiFillCloseCircle
                className="text-red-600 text-lg"
                style={{ color: "red" }}
              />
              <p>{invalidMessage}</p>
            </div>
          )}
        </Tooltip>
      )}
    </Overlay>
  );
};

export default ToolTipValidation;
