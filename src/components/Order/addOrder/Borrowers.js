import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { InputContainer, TableTitle, TableTitleRow } from "../OrderStyledComponents";
import { ErrorMessage, Table, TableRow, TableTitleBar, AddRowButton, DeleteRowButton } from "../OrderStyledComponents";
import "../Order.css";
import { useEffect } from "react";
import { ControlledTextField } from "../../utils/InputGroup";
import { isEmpty, isMaxLengthExceeded, isNotEmail, isNotLengthOrEmpty } from "../../../utils/validations";
const Borrowers = (props) => {
    useEffect(() => {
        if (props.borrowers.length == 0) {
            let temp = props.borrowers;
            temp.push({ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "", IndCorp: "I", Last4SSN: 0 });
            props.updateBorrowers(temp);
        }
    }, []);
    const handleCollapse = () => {
        const section = document.getElementById("borrowersSection");
        if (section.classList.contains("displaySection")) {
            let okay = true;
            for (let i = 0; i < props.borrowers.length; i++) {
                const borrowerType = document.getElementById("borrowerType" + i);
                const borrowerFirstName = document.getElementById("borrowerFirstName" + i);
                const borrowerMiddleName = document.getElementById("borrowerMiddleName" + i);
                const borrowerLastName = document.getElementById("borrowerLastName" + i);
                const borrowerPhone = document.getElementById("borrowerPhone" + i);
                const borrowerEmail = document.getElementById("borrowerEmail" + i);
                const borrowerSocialSecurityNumber = document.getElementById("borrowerSocialSecurityNumber" + i);
                const borrowerFirstNameError = document.getElementById("borrowerFirstNameError" + i);
                const borrowerMiddleNameError = document.getElementById("borrowerMiddleNameError" + i);
                const borrowerLastNameError = document.getElementById("borrowerLastNameError" + i);
                const borrowerPhoneError = document.getElementById("borrowerPhoneError" + i);
                const borrowerEmailError = document.getElementById("borrowerEmailError" + i);
                const borrowerSocialSecurityNumberError = document.getElementById("borrowerSocialSecurityNumberError" + i);
                if (borrowerType.value == "I") {
                    if (isEmpty(borrowerFirstName, borrowerFirstNameError))
                        okay = false;
                    else if (isMaxLengthExceeded(borrowerFirstName, borrowerFirstNameError, 50))
                        okay = false;
                    if (isMaxLengthExceeded(borrowerMiddleName, borrowerMiddleNameError, 50))
                        okay = false;
                }
                if (isEmpty(borrowerLastName, borrowerLastNameError))
                    okay = false;
                else if (isMaxLengthExceeded(borrowerLastName, borrowerLastNameError, 50))
                    okay = false;
                if (isMaxLengthExceeded(borrowerSocialSecurityNumber, borrowerSocialSecurityNumberError, 4))
                    okay = false;
                else if (isNotLengthOrEmpty(borrowerSocialSecurityNumber, borrowerSocialSecurityNumberError, 4))
                    okay = false;
                if (isEmpty(borrowerEmail, borrowerEmailError))
                    okay = false;
                else if (isMaxLengthExceeded(borrowerEmail, borrowerEmailError, 50))
                    okay = false;
                else if (isNotEmail(borrowerEmail, borrowerEmailError))
                    okay = false;
                if (isMaxLengthExceeded(borrowerPhone, borrowerPhoneError, 10))
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
    return (_jsxs(Table, { className: "table mt-3", children: [_jsx("div", { className: "d-grid pointer", onClick: () => handleCollapse(), children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "Borrowers" }) }) }) }), _jsx("div", { id: "borrowersSection", className: "displaySection", children: props.borrowers.map((item, idx) => (_jsxs("div", { className: "container-fluid card border-0 mt-2", children: [props.borrowers.length > 1 && (_jsx(DeleteRowButton, { onClick: () => {
                                let temp = props.borrowers;
                                temp.splice(idx, 1);
                                props.updateBorrowers(temp);
                            }, children: "X" })), _jsxs(TableRow, { className: "row pt-0", children: [_jsx(InputContainer, { width: "18%", className: "px-1", children: _jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "borrowerType" + idx, defaultValue: item?.IndCorp, onChange: (e) => {
                                                    item.IndCorp = e.target.value;
                                                    props.updateBorrowers(props.borrowers);
                                                }, title: (idx == 0 ? "Primary " : "") + "Borrower Type", children: [_jsx("option", { value: "I", children: "Individual" }, "Individual"), _jsx("option", { value: "C", children: "Corporation" }, "Corporation")] }), _jsx("label", { htmlFor: "borrowerType" + idx, children: (idx == 0 ? "Primary " : "") + "Borrower Type" })] }) }), item.IndCorp == "I" && (_jsxs(_Fragment, { children: [_jsxs(InputContainer, { width: "18%", className: "px-1 required-field ", children: [_jsx(ControlledTextField, { type: "text", id: "borrowerFirstName" + idx, label: (idx == 0 ? "Primary " : "") + "First Name", defaultValue: item?.FirstName, maxLength: 50, changeHandler: (e) => {
                                                        const errorDiv = document.getElementById("borrowerFirstNameError" + idx);
                                                        errorDiv.innerText = "";
                                                        if (e.target.value.length >= 50)
                                                            errorDiv.innerText = "Max character limit reached (50)";
                                                        else if (e.target.value.length == 0)
                                                            errorDiv.innerText = "This field is required!";
                                                        item.FirstName = e.target.value;
                                                    } }), _jsx(ErrorMessage, { id: "borrowerFirstNameError" + idx })] }), _jsxs(InputContainer, { width: "18%", className: "px-1", children: [_jsx(ControlledTextField, { type: "text", id: "borrowerMiddleName" + idx, label: (idx == 0 ? "Primary " : "") + "Middle Name", defaultValue: item?.MiddleName, maxLength: 50, changeHandler: (e) => {
                                                        const errorDiv = document.getElementById("borrowerMiddleNameError" + idx);
                                                        errorDiv.innerText = "";
                                                        if (e.target.value.length >= 50)
                                                            errorDiv.innerText = "Max character limit reached (50)";
                                                        item.MiddleName = e.target.value;
                                                    } }), _jsx(ErrorMessage, { id: "borrowerMiddleNameError" + idx })] })] })), _jsxs(InputContainer, { width: "18%", className: "px-1 required-field ", children: [_jsx(ControlledTextField, { type: "text", id: "borrowerLastName" + idx, label: (idx == 0 ? "Primary " : "") + (item.IndCorp == "I" ? "Last Name" : "Name"), defaultValue: item?.LastName, maxLength: 50, changeHandler: (e) => {
                                                const errorDiv = document.getElementById("borrowerLastNameError" + idx);
                                                errorDiv.innerText = "";
                                                if (e.target.value.length >= 50)
                                                    errorDiv.innerText = "Max character limit reached (50)";
                                                else if (e.target.value.length == 0)
                                                    errorDiv.innerText = "This field is required!";
                                                item.LastName = e.target.value;
                                            } }), _jsx(ErrorMessage, { id: "borrowerLastNameError" + idx })] }), _jsxs(InputContainer, { width: "28%", className: item.IndCorp == "I" ? "ps-1 pe-3 required-field" : "px-1 required-field", children: [_jsx(ControlledTextField, { type: "text", id: "borrowerEmail" + idx, label: (idx == 0 ? "Primary " : "") + "Email", defaultValue: item?.Email, maxLength: 50, changeHandler: (e) => {
                                                const errorDiv = document.getElementById("borrowerEmailError" + idx);
                                                errorDiv.innerText = "";
                                                if (e.target.value.length >= 50)
                                                    errorDiv.innerText = "Max character limit reached (50)";
                                                else if (e.target.value.length == 0)
                                                    errorDiv.innerText = "This field is required!";
                                                item.Email = e.target.value;
                                            } }), _jsx(ErrorMessage, { id: "borrowerEmailError" + idx })] }), _jsxs(InputContainer, { width: "18%", className: "px-1 ", children: [_jsx(ControlledTextField, { type: "text", id: "borrowerPhone" + idx, label: (idx == 0 ? "Primary " : "") + "Phone", defaultValue: item?.Phone, maxLength: 10, changeHandler: (e) => {
                                                const errorDiv = document.getElementById("borrowerPhoneError" + idx);
                                                errorDiv.innerText = "";
                                                if (e.target.value.length >= 10)
                                                    errorDiv.innerText = "Max character limit reached (10)";
                                                item.Phone = e.target.value;
                                            } }), _jsx(ErrorMessage, { id: "borrowerPhoneError" + idx })] }), _jsxs(InputContainer, { width: "18%", className: (item.IndCorp == "I" ? "px-1" : "ps-1 pe-3"), children: [_jsx(ControlledTextField, { type: "tel", id: "borrowerSocialSecurityNumber" + idx, label: (idx == 0 ? "Primary " : "") + "Social Security Number (Last 4 digit)", defaultValue: item?.Last4SSN, maxLength: 4, changeHandler: (e) => {
                                                const errorDiv = document.getElementById("borrowerSocialSecurityNumberError" + idx);
                                                errorDiv.innerText = "";
                                                // if (e.target.value.length >= 4) errorDiv.innerText = "Max character limit reached (4)";
                                                item.Last4SSN = e.target.value;
                                            } }), _jsx(ErrorMessage, { id: "borrowerSocialSecurityNumberError" + idx })] }), idx == props.borrowers.length - 1 && (_jsx(AddRowButton, { className: "addBtn", onClick: () => {
                                        if (props.borrowers.length < 5) {
                                            let temp = props.borrowers;
                                            temp.push({ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "", IndCorp: "I", Last4SSN: 0 });
                                            props.updateBorrowers(temp);
                                        }
                                    }, children: "+" }))] })] }, "borrower" + item.IndCorp + idx))) })] }, "borrowers" + props.borrowers.length));
};
export default Borrowers;
