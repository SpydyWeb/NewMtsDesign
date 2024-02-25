import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useContext } from "react";
import basicServices from "../../../services/basic-services";
import { OrderDetailPopover, SaveButton } from "./OrderPropertyStyledComponents";
import { TextField, ToggleButton, TextArea } from "../../utils/InputGroup";
import { OverlayTrigger, Popover } from "react-bootstrap";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext } from "../../../App";
import { isEmpty, isMaxLengthExceeded } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitleRow, TableTitle } from "../OrderStyledComponents";
const BasicInfo = (props) => {
    const [basicDetails, setBasicDetails] = useState(null);
    const [showOrder, setShowOrder] = useState(false);
    const { orderId } = useParams();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    useEffect(() => {
        updateLoadingMessage("Fetching data...");
        updateLoading(true);
        getBasic();
    }, []);
    const getBasic = () => {
        basicServices
            .getDetails(orderId)
            .then((response) => {
            //ToDo:: check if the array is empty, if yes we cannot set details
            if (response.data.statusCode == 200) {
                if (JSON.parse(response.data.body).length > 0)
                    setBasicDetails(JSON.parse(response.data.body).at(JSON.parse(response.data.body).length - 1));
                updateLoading(false);
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch data! Please try again.",
                    },
                    ...messages,
                ]);
                updateLoading(false);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch data! Please try again.",
                    },
                    ...messages,
                ]);
                updateLoading(false);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch data! Please try again.",
                    },
                    ...messages,
                ]);
                updateLoading(false);
            }
        })
            .catch((e) => {
            console.log("error while retrieving basic details: " + e);
            updateLoading(false);
            if (e.message == "Network Error") {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch data! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch data! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
    };
    const save = () => {
        updateLoadingMessage("Saving...");
        updateLoading(true);
        var okay = true;
        const searchDate = document.getElementById("searchDate");
        const effectiveDate = document.getElementById("effectiveDate");
        const searchStartDate = document.getElementById("searchStartDate");
        const isFullLegal = document.getElementById("isFullLegal");
        const parcelId = document.getElementById("parcelId");
        const township = document.getElementById("township");
        const noOfLiens = document.getElementById("noOfLiens");
        const liensTotalAmount = document.getElementById("liensTotalAmount");
        const comments = document.getElementById("comments");
        const legalDescription = document.getElementById("legalDescription");
        const searchDateError = document.getElementById("searchDateError");
        const effectiveDateError = document.getElementById("effectiveDateError");
        const parcelIdError = document.getElementById("parcelIdError");
        const townshipError = document.getElementById("townshipError");
        const liensTotalAmountError = document.getElementById("liensTotalAmountError");
        if (isEmpty(searchDate, searchDateError))
            okay = false;
        if (isEmpty(effectiveDate, effectiveDateError))
            okay = false;
        if (isMaxLengthExceeded(parcelId, parcelIdError, 100))
            okay = false;
        if (isMaxLengthExceeded(township, townshipError, 100))
            okay = false;
        if (isMaxLengthExceeded(liensTotalAmount, liensTotalAmountError, 12))
            okay = false;
        if (okay) {
            basicServices
                .saveDetails({
                id: basicDetails?.id,
                orderId: orderId,
                searchDate: searchDate.value,
                effectiveDate: effectiveDate.value,
                searchStartDate: searchStartDate.value,
                isFullLegal: isFullLegal.checked,
                parcelId: parcelId.value,
                township: township.value,
                noOfLiens: noOfLiens.value,
                liensTotalAmount: liensTotalAmount.value,
                comments: comments.value,
                legalDescription: legalDescription.value,
            })
                .then((response) => {
                if (response.data.statusCode == 200) {
                    getBasic();
                    updateMessages([{ title: "Success !!", message: "Basic saved successfully" }, ...messages]);
                }
                else if (response.data.statusCode == 400) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save data! Please try again.",
                        },
                        ...messages,
                    ]);
                    updateLoading(false);
                    let errors = JSON.parse(response.data.body);
                    for (let i in errors) {
                        if (errors.at(i).startsWith("searchDate")) {
                            searchDateError.innerText = errors.at(i).substr(12);
                        }
                        else if (errors.at(i).startsWith("effectiveDate")) {
                            effectiveDateError.innerText = errors.at(i).substr(15);
                        }
                        else if (errors.at(i).startsWith("parcelId")) {
                            parcelIdError.innerText = errors.at(i).substr(10);
                        }
                        else if (errors.at(i).startsWith("township")) {
                            townshipError.innerText = errors.at(i).substr(10);
                        }
                        else if (errors.at(i).startsWith("liensTotalAmount")) {
                            liensTotalAmountError.innerText = errors.at(i).substr(18);
                        }
                    }
                }
                else if (response.data.statusCode == 501) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save data! Please try again.",
                        },
                        ...messages,
                    ]);
                    updateLoading(false);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save data! Please try again.",
                        },
                        ...messages,
                    ]);
                    updateLoading(false);
                }
            })
                .catch((e) => {
                console.log("caught an exception: " + e);
                updateLoading(false);
                if (e.message == "Network Error") {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save data! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save data! Please try again.",
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
    return (_jsxs(Table, { className: "table mt-5 mb-5", children: [_jsx("div", { children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsxs(TableTitle, { children: ["Basic\u00A0\u00A0", _jsx(OverlayTrigger, { show: showOrder, rootClose: true, placement: "bottom", overlay: _jsxs(Popover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                            setShowOrder(false);
                                        }, id: "popover-basic", children: [_jsx(Popover.Header, { as: "h3", children: "Order" }), _jsx(Popover.Body, { children: OrderInfo })] }), children: _jsxs(OrderDetailPopover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                            setShowOrder(false);
                                        }, children: ["(Order Id: ", orderId, " \u00A0\u00A0\u00A0\u00A0Property Address: 1902 Glendell Road, Harrisburg, PA, 17112 Dauphin)"] }) })] }) }) }) }), _jsx("div", { children: _jsxs("div", { className: "container-fluid card", children: [_jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-3 required-field mt-3", children: [_jsx(TextField, { id: "searchDate", label: "Search Date", type: "date", defaultValue: basicDetails?.searchDate, required: true }), _jsx(ErrorMessage, { id: "searchDateError" })] }), _jsxs("div", { className: "col-3 required-field mt-3", children: [_jsx(TextField, { id: "effectiveDate", label: "Effective Date", type: "date", defaultValue: basicDetails?.effectiveDate, required: true }), _jsx(ErrorMessage, { id: "effectiveDateError" })] }), _jsx("div", { className: "col-3 mt-3", children: _jsx(TextField, { id: "searchStartDate", label: "Search Start Date", type: "date", defaultValue: basicDetails?.searchStartDate }) }), _jsx("div", { className: "col-3 my-auto", children: _jsx(ToggleButton, { id: "isFullLegal", label: "Full Legal", defaultChecked: basicDetails?.isFullLegal }) }), _jsxs("div", { className: "col-3 mt-3", children: [_jsx(TextField, { id: "parcelId", label: "Parcel Id", type: "text", defaultValue: basicDetails?.parcelId, maxLength: 100 }), _jsx(ErrorMessage, { id: "parcelIdError" })] }), _jsxs("div", { className: "col-3 mt-3", children: [_jsx(TextField, { id: "township", label: "Township", type: "text", defaultValue: basicDetails?.township, maxLength: 100 }), _jsx(ErrorMessage, { id: "townshipError" })] }), _jsx("div", { className: "col-3 mt-3", children: _jsx(TextField, { id: "noOfLiens", label: "No of Liens", type: "number", defaultValue: basicDetails?.noOfLiens }) }), _jsxs("div", { className: "col-3 mt-3", children: [_jsx(TextField, { id: "liensTotalAmount", label: "Liens Total Amount", type: "number", defaultValue: basicDetails?.liensTotalAmount, maxLength: 12 }), _jsx(ErrorMessage, { id: "liensTotalAmountError" })] })] }), _jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-lg-12 col-md-12", children: _jsx(TextArea, { id: "comments", label: "Comments", defaultValue: basicDetails?.comments, maxLength: 4000 }) }), _jsx("div", { className: "col-lg-12 col-md-12 mt-3", children: _jsx(TextArea, { id: "legalDescription", label: "Legal Description", defaultValue: basicDetails?.legalDescription, maxLength: 4000 }) })] }), _jsx(TableRow, { children: _jsx(SaveButton, { className: "float-end", onClick: () => save(), children: "Save" }) })] }) })] }));
};
export default BasicInfo;
