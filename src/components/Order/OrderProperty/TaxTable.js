import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { AddButton, ModalButton, OrderDetailPopover, SearchContainer, SearchIcon, StatusIconContainer } from "./OrderPropertyStyledComponents";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import Pagination from "../../utils/PaginationComponent";
import TaxServices from "../../../services/tax-services";
import LocationServices from "../../../services/location-services";
import { TextField, TextArea, DisabledTextField, SelectBox } from "../../utils/InputGroup";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext } from "../../../App";
import paymentServices from "../../../services/payment-services";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitle, TableTitleRow } from "../OrderStyledComponents";
import PaymentTable from "./PaymentTable";
const TaxTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentVersion, setPaymentVersion] = useState(0);
    const [taxes, setTaxes] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedTax, setSelectedTax] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [icons, setIcons] = useState({
        parcelSortIcon: "",
        landSortIcon: "",
        buildingSortIcon: "",
        totalSortIcon: "",
        addressSortIcon: "",
    });
    const { orderId } = useParams();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    useEffect(() => {
        getTaxes();
    }, []);
    useEffect(() => {
        getTaxes();
    }, [currPage, totalPage, pageSize, sortColumn, sortDirection]);
    const getTaxes = () => {
        updateLoadingMessage("Fetching taxes...");
        updateLoading(true);
        TaxServices.getSize(orderId)
            .then((response) => {
            setTotalPage(Math.ceil(JSON.parse(response.data.body).size / pageSize));
        })
            .catch((e) => {
            console.log("caught an exception: " + e);
            updateLoading(false);
            if (e.message == "Network Error") {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch tax table size! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch tax table size! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
        TaxServices.getAll(orderId, currPage, pageSize, sortColumn, sortDirection)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setTaxes(JSON.parse(response.data.body));
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch taxes! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch taxes! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch taxes! Please try again.",
                    },
                    ...messages,
                ]);
            }
            updateLoading(false);
        })
            .catch((e) => {
            console.log("caught an exception: " + e);
            updateLoading(false);
            if (e.message == "Network Error") {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch taxes! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch taxes! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
    };
    const save = () => {
        var okay = true;
        updateLoadingMessage("Saving tax...");
        updateLoading(true);
        const parcelId = document.getElementById("parcelId");
        const land = document.getElementById("land");
        const building = document.getElementById("building");
        const total = document.getElementById("total");
        const lotDescription = document.getElementById("lotDescription");
        const landDescription = document.getElementById("landDescription");
        const buildingDescription = document.getElementById("buildingDescription");
        const assessmentAddress1 = document.getElementById("assessmentAddress1");
        const assessmentAddress2 = document.getElementById("assessmentAddress2");
        const zip = document.getElementById("zip");
        const city = document.getElementById("city");
        const state = document.getElementById("state");
        const county = document.getElementById("county");
        const comments = document.getElementById("comments");
        var parcelIdError = document.getElementById("parcelIdError");
        const assessmentAddress1Error = document.getElementById("assessmentAddress1Error");
        const assessmentAddress2Error = document.getElementById("assessmentAddress2Error");
        const zipError = document.getElementById("zipError");
        const cityError = document.getElementById("cityError");
        const stateError = document.getElementById("stateError");
        const countyError = document.getElementById("countyError");
        const landError = document.getElementById("landError");
        const buildingError = document.getElementById("buildingError");
        const totalError = document.getElementById("totalError");
        if (isEmpty(parcelId, parcelIdError))
            okay = false;
        else if (isMaxLengthExceeded(parcelId, parcelIdError, 200))
            okay = false;
        if (isMaxLengthExceeded(assessmentAddress1, assessmentAddress1Error, 100))
            okay = false;
        if (isMaxLengthExceeded(assessmentAddress2, assessmentAddress2Error, 100))
            okay = false;
        if (isMaxLengthExceeded(zip, zipError, 5))
            okay = false;
        if (isMaxLengthExceeded(city, cityError, 100))
            okay = false;
        if (isMaxLengthExceeded(state, stateError, 2))
            okay = false;
        if (isMaxLengthExceeded(county, countyError, 100))
            okay = false;
        if (isMaxLengthExceeded(land, landError, 12))
            okay = false;
        if (isMaxLengthExceeded(building, buildingError, 12))
            okay = false;
        if (isMaxLengthExceeded(total, totalError, 12))
            okay = false;
        if (okay) {
            TaxServices.save({
                id: selectedTax?.id ? selectedTax.id : null,
                orderId: orderId,
                parcelId: parcelId.value,
                land: land.value,
                building: building.value,
                total: total.value,
                lotDescription: lotDescription.value,
                landDescription: landDescription.value,
                buildingDescription: buildingDescription.value,
                assessmentAddress1: assessmentAddress1.value,
                assessmentAddress2: assessmentAddress2.value,
                zip: zip.value,
                city: city.value,
                state: state.value,
                county: county.value,
                comments: comments.value,
            })
                .then((response) => {
                if (response.data.statusCode == 200) {
                    getTaxes();
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Tax " + (selectedTax?.id ? "editted " : "added ") + "successfully",
                        },
                        ...messages,
                    ]);
                    setShowModal(false);
                }
                else if (response.data.statusCode == 400) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save tax! Please try again.",
                        },
                        ...messages,
                    ]);
                    let errors = JSON.parse(response.data.body);
                    for (let i in errors) {
                        if (errors.at(i).startsWith("parcelId")) {
                            parcelIdError.innerText = errors.at(i).substr(10);
                        }
                        else if (errors.at(i).startsWith("assessmentAddress1")) {
                            assessmentAddress1Error.innerText = errors.at(i).substr(20);
                        }
                        else if (errors.at(i).startsWith("assessmentAddress2")) {
                            assessmentAddress2Error.innerText = errors.at(i).substr(20);
                        }
                        else if (errors.at(i).startsWith("zip")) {
                            zipError.innerText = errors.at(i).substr(5);
                        }
                        else if (errors.at(i).startsWith("city")) {
                            cityError.innerText = errors.at(i).substr(6);
                        }
                        else if (errors.at(i).startsWith("state")) {
                            stateError.innerText = errors.at(i).substr(7);
                        }
                        else if (errors.at(i).startsWith("county")) {
                            countyError.innerText = errors.at(i).substr(8);
                        }
                        else if (errors.at(i).startsWith("land")) {
                            landError.innerText = errors.at(i).substr(6);
                        }
                        else if (errors.at(i).startsWith("building")) {
                            buildingError.innerText = errors.at(i).substr(10);
                        }
                        else if (errors.at(i).startsWith("total")) {
                            totalError.innerText = errors.at(i).substr(7);
                        }
                    }
                }
                else if (response.data.statusCode == 501) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save tax! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save tax! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                updateLoading(false);
            })
                .catch((e) => {
                console.log("caught an exception: " + e);
                updateLoading(false);
                if (e.message == "Network Error") {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save tax! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save tax! Please try again.",
                        },
                        ...messages,
                    ]);
                }
            });
        }
        else {
            updateLoading(false);
        }
    };
    const deleteItem = (id) => {
        updateLoadingMessage("Deleting tax...");
        updateLoading(true);
        TaxServices.deleteItem(id)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setCurrPage(1);
                updateLoading(false);
                updateMessages([{ title: "Success !!", message: "Tax deleted successfully" }, ...messages]);
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete tax! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete tax! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete tax! Please try again.",
                    },
                    ...messages,
                ]);
            }
            getTaxes();
        })
            .catch((e) => {
            console.log("caught an exception: " + e);
            updateLoading(false);
            if (e.message == "Network Error") {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete tax! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete tax! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
        setShowDeleteConfirmation(false);
    };
    const handleAccordian = (idx) => {
        var icon = document.getElementById("accordian" + idx);
        var paymentDiv = document.getElementById("payment" + idx);
        if (icon.className == "bi bi-caret-right-fill") {
            icon.className = "bi bi-caret-down-fill";
            paymentDiv.className = "d-block";
        }
        else {
            icon.className = "bi bi-caret-right-fill";
            paymentDiv.className = "d-none";
        }
    };
    const autofillLocation = () => {
        const zip = document.getElementById("zip");
        const zipError = document.getElementById("zipError");
        zipError.innerText = "";
        const city = document.getElementById("city");
        const state = document.getElementById("state");
        const county = document.getElementById("county");
        city.disabled = false;
        state.disabled = false;
        county.disabled = false;
        LocationServices.getCityandState(zip?.value)
            .then((response) => {
            if (response.data["places"].length > 0) {
                city.value = response.data["places"].at(0)["place name"];
                state.value = response.data["places"].at(0)["state abbreviation"];
            }
            else {
                zipError.innerText = "Some error occured! Try again or enter manually!";
            }
        })
            .catch((e) => {
            console.log("caught an exception: " + e);
            zipError.innerText = "Some error occured! Try again or enter manually!";
        });
        LocationServices.getCounty(zip?.value)
            .then((response) => {
            if (response.data.status) {
                county.value = response.data.data.county.at(0);
            }
            else {
                zipError.innerText = "Some error occured! Try again or enter manually!";
            }
        })
            .catch((e) => {
            console.log("caught an exception: " + e);
            zipError.innerText = "Some error occured! Try again or enter manually!";
        });
    };
    const getAssessmentAddress = (assessmentAddress1, assessmentAddress2, zip, city, state, county) => {
        let address = assessmentAddress1 +
            (assessmentAddress1 ? ", " : "") +
            assessmentAddress2 +
            (assessmentAddress2 ? ", " : "") +
            zip +
            (zip ? ", " : "") +
            city +
            (city ? ", " : "") +
            state +
            (state ? ", " : "") +
            county;
        if (address.length > 0 && address.charAt(address.length - 2) == ",")
            address = address.substring(0, address.length - 2);
        return address;
    };
    const handleSort = (column, iconId) => {
        setCurrPage(1);
        setSortColumn(column);
        let temp = icons;
        for (let k in icons) {
            if (k != iconId)
                temp[k] = "";
        }
        icons[iconId] = icons[iconId] == "bi bi-arrow-down" ? "bi bi-arrow-up" : "bi bi-arrow-down";
        setIcons(icons);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };
    const savePayment = () => {
        var okay = true;
        updateLoadingMessage("Saving payment...");
        updateLoading(true);
        const taxType = document.getElementById("taxType");
        const taxPeriod = document.getElementById("taxPeriod");
        const taxYear = document.getElementById("taxYear");
        const amount = document.getElementById("amount");
        const date = document.getElementById("date");
        const status = document.getElementById("status");
        const discountDate = document.getElementById("discountDate");
        const discountAmount = document.getElementById("discountAmount");
        const faceDate = document.getElementById("faceDate");
        const faceAmount = document.getElementById("faceAmount");
        const penaltyDate = document.getElementById("penaltyDate");
        const penaltyAmount = document.getElementById("penaltyAmount");
        const dueDate = document.getElementById("dueDate");
        const comments = document.getElementById("comments");
        var taxTypeError = document.getElementById("taxTypeError");
        var taxPeriodError = document.getElementById("taxPeriodError");
        const taxYearError = document.getElementById("taxYearError");
        const amountError = document.getElementById("amountError");
        const statusError = document.getElementById("statusError");
        const discountAmountError = document.getElementById("discountAmountError");
        const faceAmountError = document.getElementById("faceAmountError");
        const penaltyAmountError = document.getElementById("penaltyAmountError");
        if (isNoOptionSelected(taxType, taxTypeError))
            okay = false;
        if (isEmpty(taxPeriod, taxPeriodError))
            okay = false;
        else if (isMaxLengthExceeded(taxPeriod, taxPeriodError, 100))
            okay = false;
        if (isMaxLengthExceeded(taxYear, taxYearError, 255))
            okay = false;
        if (isMaxLengthExceeded(status, statusError, 255))
            okay = false;
        if (isMaxLengthExceeded(amount, amountError, 12))
            okay = false;
        if (isMaxLengthExceeded(discountAmount, discountAmountError, 12))
            okay = false;
        if (isMaxLengthExceeded(faceAmount, faceAmountError, 12))
            okay = false;
        if (isMaxLengthExceeded(penaltyAmount, penaltyAmountError, 12))
            okay = false;
        if (okay) {
            paymentServices
                .save({
                id: null,
                taxId: selectedTax?.id,
                taxType: taxType.value == "-select-" ? "" : taxType.value,
                taxPeriod: taxPeriod.value,
                taxYear: taxYear.value,
                amount: amount.value,
                date: date.value,
                status: status.value == "-select-" ? "" : status.value,
                discountDate: discountDate.value,
                discountAmount: discountAmount.value,
                faceDate: faceDate.value,
                faceAmount: faceAmount.value,
                penaltyDate: penaltyDate.value,
                penaltyAmount: penaltyAmount.value,
                dueDate: dueDate.value,
                comments: comments.value,
            })
                .then((response) => {
                if (response.data.statusCode == 200) {
                    getTaxes();
                    setPaymentVersion(paymentVersion + 1);
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Payment added successfully",
                        },
                        ...messages,
                    ]);
                    setShowPaymentModal(false);
                }
                else if (response.data.statusCode == 400) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save payment! Please try again.",
                        },
                        ...messages,
                    ]);
                    let errors = JSON.parse(response.data.body);
                    for (let i in errors) {
                        if (errors.at(i).startsWith("taxType")) {
                            taxTypeError.innerText = errors.at(i).substr(9);
                        }
                        else if (errors.at(i).startsWith("taxPeriod")) {
                            taxPeriodError.innerText = errors.at(i).substr(11);
                        }
                        else if (errors.at(i).startsWith("taxYear")) {
                            taxYearError.innerText = errors.at(i).substr(9);
                        }
                        else if (errors.at(i).startsWith("amount")) {
                            amountError.innerText = errors.at(i).substr(8);
                        }
                        else if (errors.at(i).startsWith("status")) {
                            statusError.innerText = errors.at(i).substr(8);
                        }
                        else if (errors.at(i).startsWith("discountAmount")) {
                            discountAmountError.innerText = errors.at(i).substr(16);
                        }
                        else if (errors.at(i).startsWith("faceAmount")) {
                            faceAmountError.innerText = errors.at(i).substr(12);
                        }
                        else if (errors.at(i).startsWith("penaltyAmount")) {
                            penaltyAmountError.innerText = errors.at(i).substr(15);
                        }
                    }
                }
                else if (response.data.statusCode == 501) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save payment! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save payment! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                updateLoading(false);
            })
                .catch((e) => {
                console.log("caught an exception: " + e);
                updateLoading(false);
                if (e.message == "Network Error") {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save payment! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save payment! Please try again.",
                        },
                        ...messages,
                    ]);
                }
            });
        }
        else {
            updateLoading(false);
        }
    };
    return (_jsxs(Table, { className: "table mt-5 mb-5", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsxs(TableTitleBar, { children: [_jsxs(TableTitle, { children: ["Taxes\u00A0\u00A0", _jsx(OverlayTrigger, { show: showOrder, rootClose: true, placement: "bottom", overlay: _jsxs(Popover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                                setShowOrder(false);
                                            }, id: "popover-basic", children: [_jsx(Popover.Header, { as: "h3", children: "Order" }), _jsx(Popover.Body, { children: OrderInfo })] }), children: _jsxs(OrderDetailPopover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                                setShowOrder(false);
                                            }, children: ["(Order Id: ", orderId, " \u00A0\u00A0\u00A0\u00A0Property Address: 1902 Glendell Road, Harrisburg, PA, 17112 Dauphin)"] }) })] }), _jsx(AddButton, { onClick: () => {
                                    setSelectedTax(null);
                                    setShowModal(true);
                                }, children: "+" })] }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-2", onClick: () => handleSort("parcel", "parcelSortIcon"), children: _jsxs("b", { children: ["Parcel\u00A0", _jsx("i", { id: "sortIcon", className: icons["parcelSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("land", "landSortIcon"), children: _jsxs("b", { children: ["Land\u00A0", _jsx("i", { id: "sortIcon", className: icons["landSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("building", "buildingSortIcon"), children: _jsxs("b", { children: ["Building\u00A0", _jsx("i", { id: "sortIcon", className: icons["buildingSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("total", "totalSortIcon"), children: _jsxs("b", { children: ["Total\u00A0", _jsx("i", { id: "sortIcon", className: icons["totalSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("aaddress_line1", "addressSortIcon"), children: _jsxs("b", { children: ["Assessment\u00A0 Address", _jsx("i", { id: "sortIcon", className: icons["addressSortIcon"] })] }) }), _jsx("div", { className: "col-1", children: _jsx("b", { children: "Payment" }) }), _jsx("div", { className: "col-1", children: _jsx("b", { children: "Action" }) })] }), taxes.length == 0 && _jsx(TableRow, { className: "d-flex justify-content-center", children: "No items..." }), taxes.map((item, idx) => (_jsxs(TableRow, { className: "row", children: [_jsxs("div", { className: "col-2", children: [_jsx("i", { id: "accordian" + idx, onClick: () => handleAccordian(idx), className: "bi bi-caret-right-fill" }), item.parcelId] }), _jsx("div", { className: "col-2", children: item.land ? "$" + item.land : "" }), _jsx("div", { className: "col-2", children: item.building ? "$" + item.building : "" }), _jsx("div", { className: "col-2", children: item.total ? "$" + item.total : "" }), _jsx("div", { className: "col-2", children: getAssessmentAddress(item.assessmentAddress1, item.assessmentAddress2, item.zip, item.city, item.state, item.county) }), _jsx(StatusIconContainer, { className: "col-1 status_icon_font_size", children: _jsx("i", { id: "payment" + item.id }) }), _jsxs("div", { className: "col-1", children: [_jsx("i", { className: "bi bi-pencil-square", onClick: () => {
                                                setSelectedTax(item);
                                                setShowModal(true);
                                            } }), _jsx("i", { className: "bi bi-trash-fill", onClick: () => {
                                                setSelectedTax(item);
                                                setShowDeleteConfirmation(true);
                                            } }), _jsx("i", { className: "bi bi-clipboard-plus", onClick: () => {
                                                setSelectedTax(item);
                                                setShowPaymentModal(true);
                                            } })] }), _jsx("div", { id: "payment" + idx, className: "d-none", children: _jsx(PaymentTable, { taxId: item.id ? item.id : 0 }, "tax" + item.id + " " + paymentVersion) })] }, "tax" + item.id))), _jsx(Pagination, { totalPage: totalPage, data: taxes, pageSize: pageSize, setPageSize: setPageSize, currPage: currPage, setCurrPage: setCurrPage })] }) }), _jsxs(Modal, { show: showPaymentModal, size: "lg", backdrop: "static", centered: true, onHide: () => setShowPaymentModal(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Add Payment" }) }), _jsx(Modal.Body, { children: _jsx("div", { className: "container-fluid card p-2", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6 required-field", children: [_jsx(SelectBox, { id: "taxType", label: "Tax Type", defaultValue: "", options: [
                                                    "Fire",
                                                    "Town",
                                                    "County/Township",
                                                    "County/Borough",
                                                    "County/City",
                                                    "Municipality",
                                                    "Combined",
                                                    "Borough",
                                                    "City",
                                                    "County",
                                                    "Parish",
                                                    "Real Estate",
                                                    "Sanitation",
                                                    "School",
                                                    "Special Assessment",
                                                    "Township",
                                                    "Village",
                                                    "Water and Sewer",
                                                    "Other",
                                                ] }), _jsx(ErrorMessage, { id: "taxTypeError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6 required-field", children: [_jsx(TextField, { id: "taxPeriod", label: "Tax Period", type: "text", defaultValue: "", required: true, maxLength: 100 }), _jsx(ErrorMessage, { id: "taxPeriodError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "taxYear", label: "Tax Year", type: "text", defaultValue: "", maxLength: 255 }), _jsx(ErrorMessage, { id: "taxYearError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "amount", label: "Amount", type: "number", defaultValue: "", maxLength: 12 }), _jsx(ErrorMessage, { id: "amountError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6", children: _jsx(TextField, { id: "date", label: "Date", type: "date", defaultValue: "" }) }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(SelectBox, { id: "status", label: "Status", defaultValue: "", options: ["Due", "Paid", "Delinquent", "Tax Exempt", "Not Available"] }), _jsx(ErrorMessage, { id: "statusError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6", children: _jsx(TextField, { id: "discountDate", label: "Discount Date", type: "date", defaultValue: "" }) }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "discountAmount", label: "Discount Amount", type: "number", defaultValue: "", maxLength: 12 }), _jsx(ErrorMessage, { id: "discountAmountError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6", children: _jsx(TextField, { id: "faceDate", label: "Face Date", type: "date", defaultValue: "" }) }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "faceAmount", label: "Face Amount", type: "number", defaultValue: "", maxLength: 12 }), _jsx(ErrorMessage, { id: "faceAmountError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6", children: _jsx(TextField, { id: "penaltyDate", label: "Penalty Date", type: "date", defaultValue: "" }) }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "penaltyAmount", label: "Penalty Amount", type: "number", defaultValue: "", maxLength: 12 }), _jsx(ErrorMessage, { id: "penaltyAmountError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6", children: _jsx(TextField, { id: "dueDate", label: "Due Date", type: "date", defaultValue: "" }) }), _jsx("div", { className: "col-md-12 col-lg-12 col-sm-12", children: _jsx(TextArea, { id: "comments", label: "Comments", defaultValue: "", maxLength: 4000 }) })] }) }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowPaymentModal(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => savePayment(), children: "Save" })] })] }), _jsxs(Modal, { show: showDeleteConfirmation, backdrop: "static", centered: true, onHide: () => setShowDeleteConfirmation(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Confirm Delete?" }) }), _jsx(Modal.Body, { children: _jsx("h5", { children: "Are you sure you want to delete this item?" }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowDeleteConfirmation(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => deleteItem(selectedTax?.id ? selectedTax?.id : 0), children: "Confirm" })] })] }), _jsxs(Modal, { show: showModal, size: "lg", backdrop: "static", centered: true, onHide: () => setShowModal(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: selectedTax?.id ? "Edit Tax" : "Add Tax" }) }), _jsx(Modal.Body, { children: _jsxs("div", { className: "container-fluid card p-2", children: [_jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field mt-3", children: [_jsx(TextField, { id: "parcelId", label: "Parcel Id/Assessment Id", type: "text", defaultValue: selectedTax?.parcelId, required: true, maxLength: 200 }), _jsx(ErrorMessage, { id: "parcelIdError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 mt-3", children: [_jsx(TextField, { id: "land", label: "Land", type: "number", defaultValue: selectedTax?.land, maxLength: 12 }), _jsx(ErrorMessage, { id: "landError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 mt-3", children: [_jsx(TextField, { id: "building", label: "Building", type: "number", defaultValue: selectedTax?.building, maxLength: 12 }), _jsx(ErrorMessage, { id: "buildingError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 mt-3", children: [_jsx(TextField, { id: "total", label: "Total", type: "number", defaultValue: selectedTax?.total, maxLength: 12 }), _jsx(ErrorMessage, { id: "totalError" })] }), _jsx("div", { className: "col-lg-6 col-md-6 col-sm-12 mt-3", children: _jsx(TextArea, { id: "lotDescription", label: "Lot Description", defaultValue: selectedTax?.lotDescription }) }), _jsx("div", { className: "col-lg-6 col-md-6 col-sm-12 mt-3", children: _jsx(TextArea, { id: "landDescription", label: "Land Description", defaultValue: selectedTax?.landDescription }) }), _jsx("div", { className: "col-md-6 col-lg-6 col-sm-12 mt-3", children: _jsx(TextArea, { id: "buildingDescription", label: "Building Description", defaultValue: selectedTax?.buildingDescription }) })] }), _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-md-6 col-lg-6 col-sm-12 mt-3", children: [_jsx(TextArea, { id: "assessmentAddress1", label: "Assessment Address 1", defaultValue: selectedTax?.assessmentAddress1, maxLength: 100 }), _jsx(ErrorMessage, { id: "assessmentAddress1Error" })] }), _jsxs("div", { className: "col-md-6 col-lg-6 col-sm-12 mt-3", children: [_jsx(TextArea, { id: "assessmentAddress2", label: "Address 2", defaultValue: selectedTax?.assessmentAddress2, maxLength: 100 }), _jsx(ErrorMessage, { id: "assessmentAddress2Error" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6 mt-3", children: [_jsxs(SearchContainer, { className: "form-floating", children: [_jsx("input", { type: "text", className: "form-control w-100", id: "zip", placeholder: "Zip", defaultValue: selectedTax?.zip, maxLength: 5, onChange: (e) => {
                                                                const errorDiv = document.getElementById("zipError");
                                                                errorDiv.innerText = "";
                                                                if (e.target.value.length >= 5)
                                                                    errorDiv.innerText = "Max character limit reached (5)";
                                                            } }), _jsx("label", { htmlFor: "zip", children: "Zip" }), _jsx(SearchIcon, { className: "bi bi-search search-icon", onClick: () => {
                                                                autofillLocation();
                                                            } })] }), _jsx(ErrorMessage, { id: "zipError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6 mt-3", children: [_jsx(DisabledTextField, { id: "city", label: "City", type: "text", defaultValue: selectedTax?.city, maxLength: 100 }), _jsx(ErrorMessage, { id: "cityError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6 mt-3", children: [_jsx(DisabledTextField, { id: "state", label: "State", type: "text", defaultValue: selectedTax?.state, maxLength: 2 }), _jsx(ErrorMessage, { id: "stateError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6 mt-3", children: [_jsx(DisabledTextField, { id: "county", label: "County", type: "text", defaultValue: selectedTax?.county, maxLength: 100 }), _jsx(ErrorMessage, { id: "countyError" })] }), _jsx("div", { className: "col-md-12 col-lg-12 col-sm-12 mt-3", children: _jsx(TextArea, { id: "comments", label: "Comments", defaultValue: selectedTax?.comments, maxLength: 4000 }) })] })] }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowModal(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => save(), children: "Save" })] })] })] }));
};
export default TaxTable;
