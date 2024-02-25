import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { AddButton, AdditionalTableTitle, AdditionalTableTitleRow, ModalButton } from "./OrderPropertyStyledComponents";
import { Modal } from "react-bootstrap";
import paymentServices from "../../../services/payment-services";
import { TextField, TextArea, SelectBox } from "../../utils/InputGroup";
import { ApplicationContext } from "../../../App";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar } from "../OrderStyledComponents";
const PaymentTable = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [icons, setIcons] = useState({
        typeSortIcon: "",
        periodSortIcon: "",
        yearSortIcon: "",
        amountSortIcon: "",
        dateSortIcon: "",
        statusSortIcon: "",
    });
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    useEffect(() => {
        getPayments();
    }, []);
    useEffect(() => {
        getPayments();
    }, [sortColumn, sortDirection]);
    const getPayments = () => {
        updateLoadingMessage("Fetching payments...");
        updateLoading(true);
        paymentServices
            .getAll(props.taxId, sortColumn, sortDirection)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setPayments(JSON.parse(response.data.body));
                document.getElementById("payment" + props.taxId).className = JSON.parse(response.data.body).length > 0 ? "bi bi-check2" : "bi bi-x";
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch payments! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch payments! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch payments! Please try again.",
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
                        message: "Could not fetch payments! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch payments! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
    };
    const save = () => {
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
                id: selectedPayment?.id ? selectedPayment.id : null,
                taxId: props.taxId,
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
                    getPayments();
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Payment " + (selectedPayment?.id ? "editted " : "added ") + "successfully",
                        },
                        ...messages,
                    ]);
                    setShowModal(false);
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
    const deleteItem = (id) => {
        updateLoadingMessage("Deleting payment...");
        updateLoading(true);
        paymentServices
            .deleteItem(id)
            .then((response) => {
            if (response.data.statusCode == 200) {
                getPayments();
                updateMessages([{ title: "Success !!", message: "Payment deleted successfully" }, ...messages]);
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete payment! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete payment! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete payment! Please try again.",
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
                        message: "Could not delete payment! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete payment! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
        setShowDeleteConfirmation(false);
    };
    const handleSort = (column, iconId) => {
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
    return (_jsxs(Table, { className: "table mt-2 mb-3 px-0", children: [_jsx("div", { className: "d-grid", children: _jsx(AdditionalTableTitleRow, { children: _jsxs(TableTitleBar, { children: [_jsx(AdditionalTableTitle, { children: "Payment Details" }), _jsx(AddButton, { onClick: () => {
                                    setSelectedPayment(null);
                                    setShowModal(true);
                                }, children: "+" })] }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-2", onClick: () => handleSort("tax_type", "typeSortIcon"), children: _jsxs("b", { children: ["Type\u00A0", _jsx("i", { id: "sortIcon", className: icons["typeSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("tax_period", "periodSortIcon"), children: _jsxs("b", { children: ["Period\u00A0", _jsx("i", { id: "sortIcon", className: icons["periodSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("tax_year", "yearSortIcon"), children: _jsxs("b", { children: ["Year\u00A0", _jsx("i", { id: "sortIcon", className: icons["yearSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("tax_amount", "amountSortIcon"), children: _jsxs("b", { children: ["Amount\u00A0", _jsx("i", { id: "sortIcon", className: icons["amountSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("date", "dateSortIcon"), children: _jsxs("b", { children: ["Date\u00A0", _jsx("i", { id: "sortIcon", className: icons["dateSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("status", "statusSortIcon"), children: _jsxs("b", { children: ["Status\u00A0", _jsx("i", { id: "sortIcon", className: icons["statusSortIcon"] })] }) }), _jsx("div", { className: "col-1", children: _jsx("b", { children: "Action" }) })] }), payments.length == 0 && _jsx(TableRow, { className: "d-flex justify-content-center", children: "No items..." }), payments.map((item, idx) => (_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-2", children: item.taxType }), _jsx("div", { className: "col-2", children: item.taxPeriod }), _jsx("div", { className: "col-2", children: item.taxYear }), _jsx("div", { className: "col-2", children: item.amount ? "$" + item.amount : "" }), _jsx("div", { className: "col-1", children: item.date }), _jsx("div", { className: "col-2", children: item.status }), _jsxs("div", { className: "col-1", children: [_jsx("i", { className: "bi bi-pencil-square", onClick: () => {
                                                setSelectedPayment(item);
                                                setShowModal(true);
                                            } }), _jsx("i", { className: "bi bi-trash-fill", onClick: () => {
                                                setSelectedPayment(item);
                                                setShowDeleteConfirmation(true);
                                            } })] })] }, "tax" + props.taxId + "payment" + item.id)))] }) }), _jsxs(Modal, { show: showDeleteConfirmation, backdrop: "static", centered: true, onHide: () => setShowDeleteConfirmation(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Confirm Delete?" }) }), _jsx(Modal.Body, { children: _jsx("h5", { children: "Are you sure you want to delete this item?" }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowDeleteConfirmation(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => deleteItem(selectedPayment?.id ? selectedPayment?.id : 0), children: "Confirm" })] })] }), _jsxs(Modal, { show: showModal, size: "lg", backdrop: "static", centered: true, onHide: () => setShowModal(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: selectedPayment?.id ? "Edit Payment" : "Add Payment" }) }), _jsx(Modal.Body, { children: _jsx("div", { className: "container-fluid card p-2", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6 required-field", children: [_jsx(SelectBox, { id: "taxType", label: "Tax Type", defaultValue: selectedPayment?.taxType, options: [
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
                                                ] }), _jsx(ErrorMessage, { id: "taxTypeError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6 required-field", children: [_jsx(TextField, { id: "taxPeriod", label: "Tax Period", type: "text", defaultValue: selectedPayment?.taxPeriod, required: true, maxLength: 100 }), _jsx(ErrorMessage, { id: "taxPeriodError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "taxYear", label: "Tax Year", type: "text", defaultValue: selectedPayment?.taxYear, maxLength: 255 }), _jsx(ErrorMessage, { id: "taxYearError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "amount", label: "Amount", type: "number", defaultValue: selectedPayment?.amount, maxLength: 12 }), _jsx(ErrorMessage, { id: "amountError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6", children: _jsx(TextField, { id: "date", label: "Date", type: "date", defaultValue: selectedPayment?.date }) }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(SelectBox, { id: "status", label: "Status", defaultValue: selectedPayment?.status, options: ["Due", "Paid", "Delinquent", "Tax Exempt", "Not Available"] }), _jsx(ErrorMessage, { id: "statusError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6", children: _jsx(TextField, { id: "discountDate", label: "Discount Date", type: "date", defaultValue: selectedPayment?.discountDate }) }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "discountAmount", label: "Discount Amount", type: "number", defaultValue: selectedPayment?.discountAmount, maxLength: 12 }), _jsx(ErrorMessage, { id: "discountAmountError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6", children: _jsx(TextField, { id: "faceDate", label: "Face Date", type: "date", defaultValue: selectedPayment?.faceDate }) }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "faceAmount", label: "Face Amount", type: "number", defaultValue: selectedPayment?.faceAmount, maxLength: 12 }), _jsx(ErrorMessage, { id: "faceAmountError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6", children: _jsx(TextField, { id: "penaltyDate", label: "Penalty Date", type: "date", defaultValue: selectedPayment?.penaltyDate }) }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "penaltyAmount", label: "Penalty Amount", type: "number", defaultValue: selectedPayment?.penaltyAmount, maxLength: 12 }), _jsx(ErrorMessage, { id: "penaltyAmountError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6", children: _jsx(TextField, { id: "dueDate", label: "Due Date", type: "date", defaultValue: selectedPayment?.dueDate }) }), _jsx("div", { className: "col-md-12 col-lg-12 col-sm-12", children: _jsx(TextArea, { id: "comments", label: "Comments", defaultValue: selectedPayment?.comments, maxLength: 4000 }) })] }) }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowModal(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => save(), children: "Save" })] })] })] }));
};
export default PaymentTable;
