import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputContainer, TableTitle, TableTitleRow } from "../OrderStyledComponents";
import { ErrorMessage, Table, TableRow, TableTitleBar, AddRowButton, DeleteRowButton } from "../OrderStyledComponents";
import "../Order.css";
import { useEffect } from "react";
import { ControlledTextField } from "../../utils/InputGroup";
import { isEmpty, isMaxLengthExceeded, isNotEmail, isNotLengthOrEmpty } from "../../../utils/validations";
const Contacts = (props) => {
    useEffect(() => {
        if (props.contacts.length == 0) {
            let temp = props.contacts;
            temp.push({ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "" });
            props.updateContacts(temp);
        }
    }, []);
    const handleCollapse = () => {
        const section = document.getElementById("contactsSection");
        if (section.classList.contains("displaySection")) {
            let okay = true;
            for (let i = 0; i < props.contacts.length; i++) {
                const contactFirstName = document.getElementById("contactFirstName" + i);
                const contactMiddleName = document.getElementById("contactMiddleName" + i);
                const contactLastName = document.getElementById("contactLastName" + i);
                const contactPhone = document.getElementById("contactPhone" + i);
                const contactEmail = document.getElementById("contactEmail" + i);
                const contactFirstNameError = document.getElementById("contactFirstNameError" + i);
                const contactMiddleNameError = document.getElementById("contactMiddleNameError" + i);
                const contactLastNameError = document.getElementById("contactLastNameError" + i);
                const contactPhoneError = document.getElementById("contactPhoneError" + i);
                const contactEmailError = document.getElementById("contactEmailError" + i);
                if (isEmpty(contactFirstName, contactFirstNameError))
                    okay = false;
                else if (isMaxLengthExceeded(contactFirstName, contactFirstNameError, 50))
                    okay = false;
                if (isMaxLengthExceeded(contactMiddleName, contactMiddleNameError, 50))
                    okay = false;
                if (isEmpty(contactLastName, contactLastNameError))
                    okay = false;
                else if (isMaxLengthExceeded(contactLastName, contactLastNameError, 50))
                    okay = false;
                if (isMaxLengthExceeded(contactPhone, contactPhoneError, 10))
                    okay = false;
                else if (isNotLengthOrEmpty(contactPhone, contactPhoneError, 10))
                    okay = false;
                if (isEmpty(contactEmail, contactEmailError))
                    okay = false;
                else if (isMaxLengthExceeded(contactEmail, contactEmailError, 50))
                    okay = false;
                else if (isNotEmail(contactEmail, contactEmailError))
                    okay = false;
            }
            if (okay) {
                section.classList.remove("displaySection");
                section.classList.add("hideSection");
            }
        }
        else {
            section.classList.add("displaySection");
            section.classList.remove("hideSection");
        }
    };
    return (_jsxs(Table, { className: "table mt-3 px-0" + "contacts" + props.contacts.length, children: [_jsx("div", { className: "d-grid pointer", onClick: () => handleCollapse(), children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "Contacts" }) }) }) }), _jsx("div", { id: "contactsSection", className: "displaySection", children: props.contacts.map((item, idx) => (_jsxs("div", { className: "container-fluid card border-0 mt-2", children: [props.contacts.length > 1 && (_jsx(DeleteRowButton, { onClick: () => {
                                let temp = props.contacts;
                                temp.splice(idx, 1);
                                props.updateContacts(temp);
                            }, children: "X" })), _jsxs(TableRow, { className: "row pt-0", children: [_jsxs(InputContainer, { width: "18%", className: "required-field px-1", children: [_jsx(ControlledTextField, { id: "contactFirstName" + idx, type: "text", label: (idx == 0 ? "Primary " : "") + "First Name", defaultValue: item?.FirstName, maxLength: 50, changeHandler: (e) => {
                                                const errorDiv = document.getElementById("contactFirstNameError" + idx);
                                                errorDiv.innerText = "";
                                                if (e.target.value.length >= 50)
                                                    errorDiv.innerText = "Max character limit reached (50)";
                                                else if (e.target.value.length == 0)
                                                    errorDiv.innerText = "This field is required!";
                                                item.FirstName = e.target.value;
                                            } }), _jsx(ErrorMessage, { id: "contactFirstNameError" + idx })] }), _jsxs(InputContainer, { width: "18%", className: "px-1", children: [_jsx(ControlledTextField, { id: "contactMiddleName" + idx, type: "text", label: (idx == 0 ? "Primary " : "") + "Middle Name", defaultValue: item?.MiddleName, maxLength: 50, changeHandler: (e) => {
                                                const errorDiv = document.getElementById("contactMiddleNameError" + idx);
                                                errorDiv.innerText = "";
                                                if (e.target.value.length >= 50)
                                                    errorDiv.innerText = "Max character limit reached (50)";
                                                item.MiddleName = e.target.value;
                                            } }), _jsx(ErrorMessage, { id: "contactMiddleNameError" + idx })] }), _jsxs(InputContainer, { width: "18%", className: "required-field px-1", children: [_jsx(ControlledTextField, { id: "contactLastName" + idx, type: "text", label: (idx == 0 ? "Primary " : "") + "Last Name", defaultValue: item?.LastName, maxLength: 50, changeHandler: (e) => {
                                                const errorDiv = document.getElementById("contactLastNameError" + idx);
                                                errorDiv.innerText = "";
                                                if (e.target.value.length >= 50)
                                                    errorDiv.innerText = "Max character limit reached (50)";
                                                else if (e.target.value.length == 0)
                                                    errorDiv.innerText = "This field is required!";
                                                item.LastName = e.target.value;
                                            } }), _jsx(ErrorMessage, { id: "contactLastNameError" + idx })] }), _jsxs(InputContainer, { width: "28%", className: "required-field px-1 ", children: [_jsx(ControlledTextField, { type: "text", id: "contactEmail" + idx, label: (idx == 0 ? "Primary " : "") + "Email", defaultValue: item?.Email, maxLength: 50, changeHandler: (e) => {
                                                const errorDiv = document.getElementById("contactEmailError" + idx);
                                                errorDiv.innerText = "";
                                                if (e.target.value.length >= 50)
                                                    errorDiv.innerText = "Max character limit reached (50)";
                                                else if (e.target.value.length == 0)
                                                    errorDiv.innerText = "This field is required!";
                                                item.Email = e.target.value;
                                            } }), _jsx(ErrorMessage, { id: "contactEmailError" + idx })] }), _jsxs(InputContainer, { width: "18%", className: "ps-1 pe-3", children: [_jsx(ControlledTextField, { type: "text", id: "contactPhone" + idx, label: (idx == 0 ? "Primary " : "") + "Phone", defaultValue: item?.Phone, maxLength: 10, changeHandler: (e) => {
                                                const errorDiv = document.getElementById("contactPhoneError" + idx);
                                                errorDiv.innerText = "";
                                                // if (e.target.value.length >= 10) errorDiv.innerText = "Max character limit reached (10)";
                                                item.Phone = e.target.value;
                                            } }), _jsx(ErrorMessage, { id: "contactPhoneError" + idx })] }), idx == props.contacts.length - 1 && (_jsx(AddRowButton, { className: "addBtn", onClick: () => {
                                        if (props.contacts.length < 5) {
                                            let temp = props.contacts;
                                            temp.push({ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "" });
                                            props.updateContacts(temp);
                                        }
                                    }, children: "+" }))] })] }, "contact" + idx))) })] }, "contacts" + props.contacts.length));
};
export default Contacts;
