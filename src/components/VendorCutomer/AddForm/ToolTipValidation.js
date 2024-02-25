import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { Overlay, Tooltip } from "react-bootstrap";
const ToolTipValidation = ({ validMessage, invalidMessage, isValid, target }) => {
    return (_jsx(Overlay, { target: target, show: validMessage !== "", placement: "bottom", children: (props) => (_jsx(Tooltip, { id: "overlay-example", ...props, children: isValid ? (_jsxs("div", { className: "d-flex align-items-center gap-2", children: [_jsx(FaCheckCircle, { className: "text-green-600 text-lg", style: { color: "green" } }), _jsx("p", { children: validMessage })] })) : (_jsxs("div", { className: "d-flex align-items-center", children: [_jsx(AiFillCloseCircle, { className: "text-red-600 text-lg", style: { color: "red" } }), _jsx("p", { children: invalidMessage })] })) })) }));
};
export default ToolTipValidation;
