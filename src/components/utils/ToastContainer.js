import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "./utils.css";
import { Header } from "./UtilStyledComponents";
const Toasts = (props) => {
    return (_jsx(ToastContainer, { className: "p-3", position: "top-end", children: props.messages.map((item, idx) => (_jsxs(Toast, { autohide: true, delay: 10000, onClose: () => {
                let temp = props.messages;
                temp = temp.filter((item, i) => {
                    return i != idx;
                });
                props.setMessages(temp);
            }, children: [_jsxs(Header, { message: item.title, children: [_jsx("div", { className: "dot" }), _jsx("strong", { className: "me-auto", children: item.title })] }), _jsx(Toast.Body, { children: item.message })] }, item.message + idx))) }, props.messages.toString()));
};
export default Toasts;
