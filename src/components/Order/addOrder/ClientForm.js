import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { ErrorMessage, InputContainer, Table, TableTitleBar } from "../OrderStyledComponents";
import { TableTitle, TableTitleRow } from "../OrderStyledComponents";
import "../Order.css";
import { TextArea, TextField } from "../../utils/InputGroup";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import orderServices from "../../../services/order-services";
const ClientForm = () => {
    const [clientOptions, setClientOptions] = useState([]);
    useEffect(() => {
        orderServices.getData("GetClientList").then((response) => {
            if (response.data.statusCode == 200 && response.data.body.Status)
                setClientOptions(response.data.body.Data);
        });
    }, []);
    const handleCollapse = () => {
        const section = document.getElementById("clientFormSection");
        if (section.classList.contains("displaySection")) {
            let okay = true;
            const clientId = document.getElementById("clientId");
            const loanId = document.getElementById("loanId");
            const additionalInstruction = document.getElementById("additionalInstruction");
            const clientReferenceNumber = document.getElementById("clientReferenceNumber");
            const clientIdError = document.getElementById("clientIdError");
            const loanIdError = document.getElementById("loanIdError");
            const clientReferenceNumberError = document.getElementById("clientReferenceNumberError");
            const additionalInstructionError = document.getElementById("additionalInstructionError");
            if (isNoOptionSelected(clientId, clientIdError))
                okay = false;
            if (isEmpty(loanId, loanIdError))
                okay = false;
            else if (isMaxLengthExceeded(loanId, loanIdError, 20))
                okay = false;
            if (isMaxLengthExceeded(clientReferenceNumber, clientReferenceNumberError, 100))
                okay = false;
            if (isMaxLengthExceeded(additionalInstruction, additionalInstructionError, 4000))
                okay = false;
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
    return (_jsxs(Table, { className: "table mt-3", children: [_jsx("div", { className: "d-grid pointer", onClick: () => handleCollapse(), children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "Client/Customer" }) }) }) }), _jsx("div", { id: "clientFormSection", className: "displaySection", children: _jsx("div", { className: "container-fluid card border-0", children: _jsxs("div", { className: "row", children: [_jsxs(InputContainer, { width: "20%", className: "required-field px-1", children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "clientId", defaultValue: "-select-", title: "Client Id/ Client Name", children: [_jsx("option", { defaultChecked: true, disabled: true, children: "-select-" }), clientOptions.map((item) => (_jsx("option", { value: item.keyid, children: item.keyvalue }, item.keyid)))] }), _jsx("label", { htmlFor: "clientId", children: "Client Id/ Client Name" })] }), _jsx(ErrorMessage, { id: "clientIdError" })] }), _jsxs(InputContainer, { width: "14%", className: "required-field px-1", children: [_jsx(TextField, { id: "loanId", label: "Loan Id/ Number", type: "text", defaultValue: "", required: true, maxLength: 20 }), _jsx(ErrorMessage, { id: "loanIdError" })] }), _jsxs(InputContainer, { width: "20%", className: "px-1", children: [_jsx(TextField, { id: "clientReferenceNumber", label: "Client Reference Number", type: "text", defaultValue: "", maxLength: 100 }), _jsx(ErrorMessage, { id: "clientReferenceNumberError" })] }), _jsxs(InputContainer, { width: "46%", className: "px-1", children: [_jsx(TextArea, { id: "additionalInstruction", label: " Instructions/ Note", defaultValue: "", maxLength: 4000 }), _jsx(ErrorMessage, { id: "additionalInstructionError" })] })] }) }) })] }));
};
export default ClientForm;
