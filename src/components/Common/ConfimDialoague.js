import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Modal } from "react-bootstrap";
const ConfimDialoague = (props) => {
    return (_jsxs(Modal, { show: true, size: "sm", backdrop: "static", centered: true, children: [_jsx(Modal.Body, { children: props.msg }), _jsxs(Modal.Footer, { children: [_jsx(Button, { variant: "secondary", onClick: () => props.handleClick(false), children: "Disagree" }), _jsx(Button, { variant: "primary", onClick: () => props.handleClick(true), children: "Agree" })] })] }));
};
export default ConfimDialoague;
