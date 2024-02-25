import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import locationServices from "../../../services/location-services";
import { ErrorMessage, InputContainer, Table, TableTitleBar } from "../OrderStyledComponents";
import { TableTitle, TableTitleRow } from "../OrderStyledComponents";
import { SearchContainer, SearchIcon } from "../orderProperty/OrderPropertyStyledComponents";
import "../Order.css";
import { TextField } from "../../utils/InputGroup";
import { isEmpty, isMaxLengthExceeded, isNotLength } from "../../../utils/validations";
const PropertyAddressForm = () => {
    const autofillLocation = () => {
        const zip = document.getElementById("zip");
        const zipError = document.getElementById("zipError");
        zipError.innerText = "";
        const city = document.getElementById("city");
        const state = document.getElementById("state");
        const county = document.getElementById("county");
        locationServices
            .getCityandState(zip?.value)
            .then((response) => {
            if (response.data["places"].length > 0) {
                city.value = response.data["places"].at(0)["place name"];
                state.value = response.data["places"].at(0)["state abbreviation"];
            }
            else {
                city.disabled = false;
                state.disabled = false;
                zipError.innerText = "Couldn't find city and state! Try again or enter manually!";
            }
        })
            .catch((e) => {
            console.log("caught an exception: " + e);
            city.disabled = false;
            state.disabled = false;
            zipError.innerText = "Couldn't find city and state! Try again or enter manually!";
        });
        locationServices
            .getCounty(zip?.value)
            .then((response) => {
            if (response.data.status) {
                county.value = response.data.data.county.at(0);
            }
            else {
                county.disabled = false;
                zipError.innerText = "Couldn't find county! Try again or enter manually!";
            }
        })
            .catch((e) => {
            console.log("caught an exception: " + e);
            county.disabled = false;
            zipError.innerText = "Couldn't find county! Try again or enter manually!";
        });
    };
    const handleCollapse = () => {
        const section = document.getElementById("propertyAddressSection");
        if (section.classList.contains("displaySection")) {
            let okay = true;
            const streetAddress = document.getElementById("streetAddress");
            const suite = document.getElementById("suite");
            const city = document.getElementById("city");
            const state = document.getElementById("state");
            const zip = document.getElementById("zip");
            const county = document.getElementById("county");
            const streetAddressError = document.getElementById("streetAddressError");
            const suiteError = document.getElementById("suiteError");
            const cityError = document.getElementById("cityError");
            const stateError = document.getElementById("stateError");
            const zipError = document.getElementById("zipError");
            const countyError = document.getElementById("countyError");
            if (isEmpty(streetAddress, streetAddressError))
                okay = false;
            else if (isMaxLengthExceeded(streetAddress, streetAddressError, 50))
                okay = false;
            if (isMaxLengthExceeded(suite, suiteError, 10))
                okay = false;
            if (isEmpty(city, cityError))
                okay = false;
            else if (isMaxLengthExceeded(city, cityError, 50))
                okay = false;
            if (isEmpty(state, stateError))
                okay = false;
            else if (isMaxLengthExceeded(state, stateError, 2))
                okay = false;
            else if (isNotLength(state, stateError, 2))
                okay = false;
            if (isEmpty(zip, zipError))
                okay = false;
            else if (isMaxLengthExceeded(zip, zipError, 5))
                okay = false;
            else if (isNotLength(zip, zipError, 5))
                okay = false;
            if (isMaxLengthExceeded(county, countyError, 50))
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
    return (_jsxs(Table, { className: "table mt-4", children: [_jsx("div", { className: "d-grid pointer", onClick: () => handleCollapse(), children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "Property Address" }) }) }) }), _jsx("div", { id: "propertyAddressSection", className: "displaySection", children: _jsx("div", { className: "container-fluid card border-0", children: _jsxs("div", { className: "row", children: [_jsxs(InputContainer, { width: "50%", className: "px-1 required-field", children: [_jsx(TextField, { id: "streetAddress", label: "Street Address", type: "text", defaultValue: "", maxLength: 50, required: true }), _jsx(ErrorMessage, { id: "streetAddressError" })] }), _jsxs(InputContainer, { width: "30%", className: "px-1", children: [_jsx(TextField, { id: "suite", label: "Suite/Unit", type: "text", defaultValue: "", maxLength: 10 }), _jsx(ErrorMessage, { id: "suiteError" })] }), _jsxs(InputContainer, { width: "20%", className: "px-1 required-field", children: [_jsxs(SearchContainer, { className: "form-floating", children: [_jsx("input", { type: "text", className: "form-control w-100", id: "zip", placeholder: "Zip", defaultValue: "", maxLength: 5, onChange: (e) => {
                                                    const errorDiv = document.getElementById("zipError");
                                                    errorDiv.innerText = "";
                                                    // if (e.target.value.length >= 5) errorDiv.innerText = "Max character limit reached (5)";
                                                    if (e.target.value.length == 0)
                                                        errorDiv.innerText = "This field is required!";
                                                }, required: true }), _jsx("label", { htmlFor: "zip", children: "Zip" }), _jsx(SearchIcon, { className: "bi bi-search search-icon", onClick: () => {
                                                    autofillLocation();
                                                } })] }), _jsx(ErrorMessage, { id: "zipError" })] }), _jsxs(InputContainer, { width: "18%", className: "px-1 required-field", children: [_jsx(TextField, { id: "city", label: "City", type: "text", defaultValue: "", maxLength: 50, required: true }), _jsx(ErrorMessage, { id: "cityError" })] }), _jsxs(InputContainer, { width: "14%", className: "px-1 required-field", children: [_jsx(TextField, { id: "state", label: "State", type: "text", defaultValue: "", maxLength: 2, required: true }), _jsx(ErrorMessage, { id: "stateError" })] }), _jsxs(InputContainer, { width: "18%", className: "px-1", children: [_jsx(TextField, { id: "county", label: "County", type: "text", defaultValue: "", maxLength: 50 }), _jsx(ErrorMessage, { id: "countyError" })] }), _jsx(InputContainer, { width: "26%", className: "px-1", children: _jsx(TextField, { id: "parcelNumber", label: "Parcel number", type: "text", defaultValue: "" }) }), _jsx(InputContainer, { width: "24%", className: "px-1", children: _jsx(TextField, { id: "loanAmount", label: "Loan Amount", type: "number", defaultValue: "" }) })] }) }) })] }));
};
export default PropertyAddressForm;
