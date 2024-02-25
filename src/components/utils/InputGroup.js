import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Switch } from "./UtilStyledComponents";
import "./utils.css";
export const TextField = (props) => {
    return (_jsxs("div", { className: "form-floating mt-1", children: [_jsx("input", { type: props.type, className: "form-control", id: props.id, name: props.name, placeholder: props.label, value: props.value, title: props.label, pattern: props.pattern, maxLength: props.maxLength, onChange: props.onChange, onBlur: props.onBlur }), _jsx("label", { htmlFor: props.id, children: props.label })] }));
};
export const DisabledTextField = (props) => {
    return (_jsxs("div", { className: "form-floating mt-1", children: [_jsx("input", { disabled: true, type: props.type, className: "form-control", id: props.id, placeholder: props.label, value: props.value, title: props.label, maxLength: props.maxLength, onChange: (e) => {
                    const errorDiv = document.getElementById(props.id + "Error");
                    errorDiv.innerText = "";
                    if (props.maxLength && e.target.value.length >= props.maxLength)
                        errorDiv.innerText = "Max character limit reached (" + props.maxLength + ")";
                    else if (props.required && e.target.value.length == 0)
                        errorDiv.innerText = "This field is required!";
                } }), _jsx("label", { htmlFor: props.id, children: props.label })] }));
};
export const SelectBox = (props) => {
    return (_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: props.id, defaultValue: props.defaultValue, title: props.label, children: [_jsx("option", { defaultChecked: true, children: "-select-" }), props.options.map((item, idx) => (_jsx("option", { children: item }, item)))] }), _jsx("label", { htmlFor: props.id, children: props.label })] }));
};
export const ToggleButton = (props) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "form-check form-switch mt-1", children: [_jsxs("label", { children: ["\u00A0", props.label] }), _jsx(Switch, { className: "form-check-input pointer", type: "checkbox", id: props.id, defaultChecked: props.defaultChecked })] }) }));
};
export const TextArea = (props) => {
    return (_jsxs("div", { className: "form-floating mt-1", children: [_jsx("textarea", { className: "form-control", placeholder: props.label, id: props.id, defaultValue: props.defaultValue, title: props.label, maxLength: props.maxLength, onChange: (e) => {
                    const errorDiv = document.getElementById(props.id + "Error");
                    errorDiv.innerText = "";
                    if (props.maxLength && e.target.value.length >= props.maxLength)
                        errorDiv.innerText = "Max character limit reached (" + props.maxLength + ")";
                } }), _jsx("label", { htmlFor: props.id, children: props.label })] }));
};
export const FileInput = (props) => {
    return (_jsx("div", { className: "mt-3", children: _jsx("input", { className: "form-control", type: "file", id: props.id, disabled: props.disabled }) }));
};
export const ControlledTextField = (props) => {
    return (_jsxs("div", { className: "form-floating mt-1", children: [_jsx("input", { type: props.type, className: "form-control", id: props.id, placeholder: props.label, pattern: props.pattern, defaultValue: props.defaultValue, maxLength: props.maxLength, onChange: props.changeHandler, title: props.label }), _jsx("label", { htmlFor: props.id, children: props.label })] }));
};
export const ControlledSelectBox = (props) => {
    return (_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: props.id, defaultValue: props.defaultValue, onChange: props.changeHandler, title: props.label, children: [_jsx("option", { defaultChecked: true, children: "-select-" }, "0"), props.options.map((item, idx) => (_jsx("option", { children: item }, item)))] }), _jsx("label", { htmlFor: props.id, children: props.label })] }));
};
export const ControlledToggleButton = (props) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "form-check form-switch mt-1", children: [_jsxs("label", { children: ["\u00A0", props.label] }), _jsx(Switch, { className: "form-check-input pointer", type: "checkbox", id: props.id, defaultChecked: props.defaultChecked, onChange: props.changeHandler })] }) }));
};
export const ControlledTextArea = (props) => {
    return (_jsxs("div", { className: "form-floating mt-1", children: [_jsx("textarea", { className: "form-control", placeholder: props.label, id: props.id, defaultValue: props.defaultValue, maxLength: props.maxLength, onChange: props.changeHandler }), _jsx("label", { htmlFor: props.id, children: props.label })] }));
};
export const ControlledFileInput = (props) => {
    return (_jsx("div", { className: "mt-3", children: _jsx("input", { className: "form-control", type: "file", id: props.id, onChange: props.changeHandler }) }));
};
