import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputContainer, UtilityButton, } from "../order/OrderStyledComponents";
import { Card } from "react-bootstrap";
import { TextField } from "../utils/InputGroup";
import { FaSearch } from "react-icons/fa";
import { AdvancedformField } from "./renderUtils";
const AdvanceFilter = (props) => {
    const { filterdata, handleFilterChange, allstate, handleSearch } = props;
    const renderFields = (data) => {
        return data.map((val, i) => {
            return val.type === "text" ? (_jsx(InputContainer, { width: "20%", className: "px-1", children: _jsx(TextField, { label: val.label, name: val.name, value: filterdata[val.name], onChange: (e) => handleFilterChange(e) }) }, i)) : (_jsx(InputContainer, { width: "20%", className: "px-1", children: _jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "clientId", name: val.name, defaultValue: val.name === "State" ? allstate[0]?.name : val.options[0]?.label, title: val.label, children: [_jsx("option", { defaultChecked: true, disabled: true, children: "-select-" }, 0), val.name === "State"
                                    ? allstate.map((item, idx) => (_jsx("option", { value: item.name, children: item.name }, "clientId" + idx)))
                                    : val.options.map((item, idx) => (_jsx("option", { value: item.value, children: item.label }, "clientId" + idx)))] }), _jsx("label", { htmlFor: "clientId", children: val.label })] }) }, i));
        });
    };
    return (_jsx(Card.Body, { className: "px-1 py=2", children: _jsx("div", { className: "container-fluid", children: _jsxs("div", { className: "row", children: [renderFields(location.pathname.split("/").includes("viewvendor")
                        ? AdvancedformField.vendor
                        : AdvancedformField.customer), _jsx("div", { className: "col-10" }), _jsx("div", { className: "col-2 mt-2", children: _jsxs(UtilityButton, { onClick: () => {
                                handleSearch();
                            }, children: [_jsx(FaSearch, {}), "\u00A0Search"] }) })] }) }) }));
};
export default AdvanceFilter;
