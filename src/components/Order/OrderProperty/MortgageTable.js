import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useContext } from "react";
import { AddButton, ModalButton, OrderDetailPopover, StatusIconContainer } from "./OrderPropertyStyledComponents";
import { TextField, ToggleButton, TextArea } from "../../utils/InputGroup";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import AssignmentTable from "./AssignmentTable";
import Pagination from "../../utils/PaginationComponent";
import MortgageServices from "../../../services/mortgage-services";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext } from "../../../App";
import assignmentServices from "../../../services/assignment-services";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitleRow, TableTitle } from "../OrderStyledComponents";
const MortgageTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [showAssignmentModal, setShowAssignmentModal] = useState(false);
    const [mortagages, setMortgages] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedMortgage, setSelectedMortgage] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [assignmentVersion, setAssignmentVersion] = useState(0);
    const [icons, setIcons] = useState({
        mortgageeSortIcon: "",
        mortgagorSortIcon: "",
        dateSortIcon: "",
        recordedSortIcon: "",
        amountSortIcon: "",
        volinstSortIcon: "",
        pageSortIcon: "",
        additionalSortIcon: "",
    });
    const { orderId } = useParams();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    useEffect(() => {
        getMortgages();
    }, []);
    useEffect(() => {
        getMortgages();
    }, [currPage, totalPage, pageSize, sortColumn, sortDirection]);
    const getMortgages = () => {
        updateLoadingMessage("Fetching mortgages...");
        updateLoading(true);
        MortgageServices.getSize(orderId)
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
                        message: "Could not fetch mortgage table size! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch mortgage table size! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
        MortgageServices.getAll(orderId, currPage, pageSize, sortColumn, sortDirection)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setMortgages(JSON.parse(response.data.body));
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch mortgages! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch mortgages! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch mortgages! Please try again.",
                    },
                    ...messages,
                ]);
            }
            updateLoading(false);
        })
            .catch((e) => {
            console.log("caught an exception: " + JSON.stringify(e));
            updateLoading(false);
            if (e.message == "Network Error") {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch mortgages! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch mortgages! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
    };
    const save = () => {
        var okay = true;
        updateLoadingMessage("Saving mortgage...");
        updateLoading(true);
        const mortgagee = document.getElementById("mortgagee");
        const mortgagor = document.getElementById("mortgagor");
        const mortgageDate = document.getElementById("mortgageDate");
        const recordedDate = document.getElementById("recordedDate");
        const mortgageAmount = document.getElementById("mortgageAmount");
        const volinst = document.getElementById("volinst");
        const page = document.getElementById("page");
        const mortgagePosition = document.getElementById("mortgagePosition");
        const isOpenEnded = document.getElementById("isOpenEnded");
        const comments = document.getElementById("comments");
        const book = document.getElementById("book");
        const mortgageeError = document.getElementById("mortgageeError");
        const mortgagorError = document.getElementById("mortgagorError");
        const recordedDateError = document.getElementById("recordedDateError");
        const volinstError = document.getElementById("volinstError");
        const pageError = document.getElementById("pageError");
        const mortgagePositionError = document.getElementById("mortgagePositionError");
        const mortgageAmountError = document.getElementById("mortgageAmountError");
        const bookError = document.getElementById("bookError");
        if (isEmpty(mortgagee, mortgageeError))
            okay = false;
        if (isEmpty(mortgagor, mortgagorError))
            okay = false;
        if (isEmpty(recordedDate, recordedDateError))
            okay = false;
        if (isEmpty(volinst, volinstError))
            okay = false;
        else if (isMaxLengthExceeded(volinst, volinstError, 100))
            okay = false;
        if (isMaxLengthExceeded(page, pageError, 100))
            okay = false;
        if (isMaxLengthExceeded(book, bookError, 100))
            okay = false;
        if (isMaxLengthExceeded(mortgagePosition, mortgagePositionError, 100))
            okay = false;
        if (isMaxLengthExceeded(mortgageAmount, mortgageAmountError, 12))
            okay = false;
        if (okay) {
            MortgageServices.save({
                id: selectedMortgage?.id ? selectedMortgage.id : null,
                orderId: orderId,
                mortgagee: mortgagee.value,
                mortgagor: mortgagor.value,
                mortgageDate: mortgageDate?.value,
                recordedDate: recordedDate.value,
                mortgageAmount: mortgageAmount.value,
                volinst: volinst.value,
                page: page.value,
                book: book.value,
                mortgagePosition: mortgagePosition.value,
                isOpenEnded: isOpenEnded.checked,
                comments: comments.value,
            })
                .then((response) => {
                if (response.data.statusCode == 200) {
                    getMortgages();
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Mortgage " + (selectedMortgage?.id ? "editted " : "added ") + "successfully",
                        },
                        ...messages,
                    ]);
                    setShowModal(false);
                }
                else if (response.data.statusCode == 400) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save mortgage! Please try again.",
                        },
                        ...messages,
                    ]);
                    let errors = JSON.parse(response.data.body);
                    for (let i in errors) {
                        if (errors.at(i).startsWith("volinst")) {
                            volinstError.innerText = errors.at(i).substr(9);
                        }
                        else if (errors.at(i).startsWith("page")) {
                            pageError.innerText = errors.at(i).substr(6);
                        }
                        else if (errors.at(i).startsWith("mortgagee")) {
                            mortgageeError.innerText = errors.at(i).substr(11);
                        }
                        else if (errors.at(i).startsWith("mortgagor")) {
                            mortgagorError.innerText = errors.at(i).substr(11);
                        }
                        else if (errors.at(i).startsWith("recordedDate")) {
                            recordedDateError.innerText = errors.at(i).substr(14);
                        }
                        else if (errors.at(i).startsWith("mortgagePosition")) {
                            mortgagePositionError.innerText = errors.at(i).substr(18);
                        }
                        else if (errors.at(i).startsWith("mortgageAmount")) {
                            mortgageAmountError.innerText = errors.at(i).substr(16);
                        }
                    }
                }
                else if (response.data.statusCode == 501) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save mortgage! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save mortgage! Please try again.",
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
                            message: "Could not save mortgage! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save mortgage! Please try again.",
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
        updateLoadingMessage("Deleting mortgage...");
        updateLoading(true);
        MortgageServices.deleteItem(id)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setCurrPage(1);
                getMortgages();
                updateMessages([{ title: "Success !!", message: "Mortgage deleted successfully" }, ...messages]);
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete mortgage! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete mortgage! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete mortgage! Please try again.",
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
                        message: "Could not delete mortgage! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete mortgage! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
        setShowDeleteConfirmation(false);
    };
    const handleAccordian = (idx) => {
        var icon = document.getElementById("accordian" + idx);
        var paymentDiv = document.getElementById("assignment" + idx);
        if (icon.className == "bi bi-caret-right-fill") {
            icon.className = "bi bi-caret-down-fill";
            paymentDiv.className = "d-block";
        }
        else {
            icon.className = "bi bi-caret-right-fill";
            paymentDiv.className = "d-none";
        }
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
    const saveAssignment = () => {
        var okay = true;
        updateLoadingMessage("Saving assignment...");
        updateLoading(true);
        const fillingType = document.getElementById("fillingType");
        const assignTo = document.getElementById("assignTo");
        const assignFrom = document.getElementById("assignFrom");
        const recordedDate = document.getElementById("recordedDate");
        const datedDate = document.getElementById("datedDate");
        const volinst = document.getElementById("volinst");
        const page = document.getElementById("page");
        const comments = document.getElementById("comments");
        const newMaturityAmount = document.getElementById("newMaturityAmount");
        const newMaturityDate = document.getElementById("newMaturityDate");
        const book = document.getElementById("book");
        var fillingTypeError = document.getElementById("fillingTypeError");
        const volinstError = document.getElementById("volinstError");
        const pageError = document.getElementById("pageError");
        const newMaturityAmountError = document.getElementById("newMaturityAmountError");
        const newMaturityDateError = document.getElementById("newMaturityDateError");
        const bookError = document.getElementById("bookError");
        if (isNoOptionSelected(fillingType, fillingTypeError))
            okay = false;
        if (fillingType.value == "Modification") {
            if (isEmpty(newMaturityAmount, newMaturityAmountError))
                okay = false;
            else if (isMaxLengthExceeded(newMaturityAmount, newMaturityAmountError, 12))
                okay = false;
            if (isEmpty(newMaturityDate, newMaturityDateError))
                okay = false;
        }
        if (isMaxLengthExceeded(volinst, volinstError, 100))
            okay = false;
        if (isMaxLengthExceeded(page, pageError, 100))
            okay = false;
        if (isMaxLengthExceeded(book, bookError, 100))
            okay = false;
        if (okay) {
            assignmentServices
                .save({
                id: null,
                mortgageId: selectedMortgage?.id,
                fillingType: fillingType?.value == "-select-" ? "" : fillingType.value,
                assignTo: assignTo.value,
                assignFrom: assignFrom.value,
                datedDate: datedDate?.value,
                recordedDate: recordedDate?.value,
                volinst: volinst?.value,
                page: page?.value,
                book: book.value,
                newMaturityAmount: newMaturityAmount?.value,
                newMaturityDate: newMaturityDate?.value,
                comments: comments?.value,
            })
                .then((response) => {
                if (response.data.statusCode == 200) {
                    getMortgages();
                    setAssignmentVersion(assignmentVersion + 1);
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Assignment added successfully",
                        },
                        ...messages,
                    ]);
                    setShowAssignmentModal(false);
                }
                else if (response.data.statusCode == 400) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save assignment! Please try again.",
                        },
                        ...messages,
                    ]);
                    let errors = JSON.parse(response.data.body);
                    for (let i in errors) {
                        if (errors.at(i).startsWith("volinst")) {
                            volinstError.innerText = errors.at(i).substr(9);
                        }
                        else if (errors.at(i).startsWith("page")) {
                            pageError.innerText = errors.at(i).substr(6);
                        }
                        else if (errors.at(i).startsWith("fillingType")) {
                            fillingTypeError.innerText = errors.at(i).substr(13);
                        }
                    }
                }
                else if (response.data.statusCode == 501) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save assignment! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save assignment! Please try again.",
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
                            message: "Could not save assignment! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save assignment! Please try again.",
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
    return (_jsxs(Table, { className: "table mt-5 mb-5", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsxs(TableTitleBar, { children: [_jsxs(TableTitle, { children: ["Mortgages\u00A0\u00A0", _jsx(OverlayTrigger, { show: showOrder, rootClose: true, placement: "bottom", overlay: _jsxs(Popover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                                setShowOrder(false);
                                            }, id: "popover-basic", children: [_jsx(Popover.Header, { as: "h3", children: "Order" }), _jsx(Popover.Body, { children: OrderInfo })] }), children: _jsxs(OrderDetailPopover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                                setShowOrder(false);
                                            }, children: ["(Order Id: ", orderId, " \u00A0\u00A0\u00A0\u00A0Property Address: 1902 Glendell Road, Harrisburg, PA, 17112 Dauphin)"] }) })] }), _jsx(AddButton, { onClick: () => {
                                    setSelectedMortgage(null);
                                    setShowModal(true);
                                }, children: "+" })] }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-2", onClick: () => handleSort("mortgagee", "mortgageeSortIcon"), children: _jsxs("b", { children: ["Mortgagee\u00A0", _jsx("i", { id: "sortIcon", className: icons["mortgageeSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("mortgagor", "mortgagorSortIcon"), children: _jsxs("b", { children: ["Mortgagor\u00A0", _jsx("i", { id: "sortIcon", className: icons["mortgagorSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("mortgage_date", "dateSortIcon"), children: _jsxs("b", { children: ["Mortgage Date\u00A0", _jsx("i", { id: "sortIcon", className: icons["dateSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("recorded_date", "recordedSortIcon"), children: _jsxs("b", { children: ["Recorded Date\u00A0", _jsx("i", { id: "sortIcon", className: icons["recordedSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("mortgage_amount", "amountSortIcon"), children: _jsxs("b", { children: ["Mortgage Amount\u00A0", _jsx("i", { id: "sortIcon", className: icons["amountSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("volinst", "volinstSortIcon"), children: _jsxs("b", { children: ["Vol/Inst#\u00A0", _jsx("i", { id: "sortIcon", className: icons["volinstSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("page", "pageSortIcon"), children: _jsxs("b", { children: ["Page\u00A0", _jsx("i", { id: "sortIcon", className: icons["pageSortIcon"] })] }) }), _jsx("div", { className: "col-1", children: _jsx("b", { children: "Add'l Filling" }) }), _jsx("div", { className: "col-1", children: _jsx("b", { children: "Action" }) })] }), mortagages.length == 0 && _jsx(TableRow, { className: "d-flex justify-content-center", children: "No items..." }), mortagages.map((item, idx) => (_jsxs(TableRow, { className: "row", children: [_jsxs("div", { className: "col-2", children: [_jsx("i", { id: "accordian" + idx, onClick: () => handleAccordian(idx), className: "bi bi-caret-right-fill" }), item.mortgagee] }), _jsx("div", { className: "col-2", children: item.mortgagor }), _jsx("div", { className: "col-1", children: item.mortgageDate }), _jsx("div", { className: "col-1", children: item.recordedDate }), _jsx("div", { className: "col-2", children: item.mortgageAmount ? "$" + item.mortgageAmount : "" }), _jsx("div", { className: "col-1", children: item.volinst }), _jsx("div", { className: "col-1", children: item.page }), _jsx(StatusIconContainer, { className: "col-1", children: _jsx("i", { id: "additionalFillings" + item.id }) }), _jsxs("div", { className: "col-1", children: [_jsx("i", { className: "bi bi-pencil-square", onClick: () => {
                                                setSelectedMortgage(item);
                                                setShowModal(true);
                                            } }), _jsx("i", { className: "bi bi-trash-fill", onClick: () => {
                                                setSelectedMortgage(item);
                                                setShowDeleteConfirmation(true);
                                            } }), _jsx("i", { className: "bi bi-clipboard-plus", onClick: () => {
                                                setSelectedMortgage(item);
                                                setShowAssignmentModal(true);
                                            } })] }), _jsx("div", { id: "assignment" + idx, className: "d-none", children: _jsx(AssignmentTable, { mortgageId: item.id ? item.id : 0 }, "mortgage" + item.id + " " + assignmentVersion) })] }, "mortagage" + item.id))), _jsx(Pagination, { totalPage: totalPage, data: mortagages, pageSize: pageSize, setPageSize: setPageSize, currPage: currPage, setCurrPage: setCurrPage })] }) }), _jsxs(Modal, { show: showAssignmentModal, size: "lg", backdrop: "static", centered: true, onHide: () => setShowAssignmentModal(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Add Assignment" }) }), _jsx(Modal.Body, { children: _jsx("div", { className: "container-fluid card p-2", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsxs("div", { className: "form-floating", children: [_jsxs("select", { className: "form-select", id: "fillingType", onChange: () => {
                                                            if (document.getElementById("fillingType").value == "Modification") {
                                                                document.getElementById("newMaturityAmountContainer").classList.remove("d-none");
                                                                document.getElementById("newMaturityDateContainer").classList.remove("d-none");
                                                            }
                                                            else {
                                                                document.getElementById("newMaturityAmountContainer").classList.add("d-none");
                                                                document.getElementById("newMaturityDateContainer").classList.add("d-none");
                                                            }
                                                        }, children: [_jsx("option", { defaultChecked: true, children: "-select-" }), _jsx("option", { children: "Amendment" }, "Amendment"), _jsx("option", { children: "Modification" }, "Modification"), _jsx("option", { children: "Consolidation" }, "Consolidation"), _jsx("option", { children: "Re-recorded" }, "Re-recorded"), _jsx("option", { children: "Subordination" }, "Subordination"), _jsx("option", { children: "Assignment of leases & rents" }, "Assignment of leases & rents"), _jsx("option", { children: "Partial release" }, "Partial release"), _jsx("option", { children: "Adjustable rate rider" }, "Adjustable rate rider"), _jsx("option", { children: "Other" }, "Other")] }), _jsx("label", { htmlFor: "fillingType", children: "Filling Type" })] }), _jsx(ErrorMessage, { id: "fillingTypeError" })] }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "recordedDate", label: "Recorded Date", type: "date", defaultValue: "" }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "assignTo", label: "Assign to", type: "text", defaultValue: "" }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "assignFrom", label: "Assign from", type: "text", defaultValue: "" }) }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "volinst", label: "Vol/Inst#", type: "text", defaultValue: "", maxLength: 100 }), _jsx(ErrorMessage, { id: "volinstError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "page", label: "Page", type: "text", defaultValue: "", maxLength: 100 }), _jsx(ErrorMessage, { id: "pageError" })] }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "datedDate", label: "Dated Date", type: "date", defaultValue: "" }) }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "book", label: "Book", type: "text", defaultValue: "", maxLength: 100 }), _jsx(ErrorMessage, { id: "bookError" })] }), _jsxs("div", { id: "newMaturityAmountContainer", className: "col-lg-3 col-md-6 col-sm-6 required-field d-none", children: [_jsx(TextField, { id: "newMaturityAmount", label: "New Maturity Amount", type: "number", defaultValue: "", required: true, maxLength: 12 }), _jsx(ErrorMessage, { id: "newMaturityAmountError" })] }), _jsxs("div", { id: "newMaturityDateContainer", className: "col-lg-3 col-md-6 col-sm-6 required-field d-none", children: [_jsx(TextField, { id: "newMaturityDate", label: "New Maturity Date", type: "date", defaultValue: "", required: true }), _jsx(ErrorMessage, { id: "newMaturityDateError" })] }), _jsx("div", { className: "col-md-12 col-lg-12 col-sm-12", children: _jsx(TextArea, { id: "comments", label: "Comments", defaultValue: "", maxLength: 4000 }) })] }) }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowAssignmentModal(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => saveAssignment(), children: "Save" })] })] }), _jsxs(Modal, { show: showDeleteConfirmation, backdrop: "static", centered: true, onHide: () => setShowDeleteConfirmation(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Confirm Delete?" }) }), _jsx(Modal.Body, { children: _jsx("h5", { children: "Are you sure you want to delete this item?" }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowDeleteConfirmation(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => deleteItem(selectedMortgage?.id ? selectedMortgage?.id : 0), children: "Confirm" })] })] }), _jsxs(Modal, { show: showModal, size: "lg", backdrop: "static", centered: true, onHide: () => setShowModal(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: selectedMortgage?.id ? "Edit Mortgage" : "Add Mortgage" }) }), _jsx(Modal.Body, { children: _jsx("div", { className: "container-fluid card p-2", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsx(TextField, { id: "mortgagee", label: "Mortgagee", type: "text", defaultValue: selectedMortgage?.mortgagee, required: true }), _jsx(ErrorMessage, { id: "mortgageeError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsx(TextField, { id: "mortgagor", label: "Mortgagor", type: "text", defaultValue: selectedMortgage?.mortgagor, required: true }), _jsx(ErrorMessage, { id: "mortgagorError" })] }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "mortgageDate", label: "Mortgage Date", type: "date", defaultValue: selectedMortgage?.mortgageDate }) }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsx(TextField, { id: "recordedDate", label: "Recorded Date", type: "date", defaultValue: selectedMortgage?.recordedDate, required: true }), _jsx(ErrorMessage, { id: "recordedDateError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6 mt-sm-3", children: _jsx(ToggleButton, { id: "isOpenEnded", label: "Open Ended", defaultChecked: selectedMortgage?.isOpenEnded }) }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "mortgageAmount", label: "Mortgage Amount", type: "number", defaultValue: selectedMortgage?.mortgageAmount, maxLength: 12 }), _jsx(ErrorMessage, { id: "mortgageAmountError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsx(TextField, { id: "volinst", label: "Vol/Inst#", type: "text", defaultValue: selectedMortgage?.volinst, required: true, maxLength: 100 }), _jsx(ErrorMessage, { id: "volinstError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "page", label: "Page", type: "text", defaultValue: selectedMortgage?.page, maxLength: 100 }), _jsx(ErrorMessage, { id: "pageError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "mortgagePosition", label: "Mortgage Position", type: "text", defaultValue: selectedMortgage?.mortgagePosition, maxLength: 100 }), _jsx(ErrorMessage, { id: "mortgagePositionError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "book", label: "Book", type: "text", defaultValue: selectedMortgage?.book, maxLength: 100 }), _jsx(ErrorMessage, { id: "bookError" })] }), _jsx("div", { className: "col-md-12 col-lg-12 col-sm-12", children: _jsx(TextArea, { id: "comments", label: "Comments", defaultValue: selectedMortgage?.comments, maxLength: 4000 }) })] }) }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowModal(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => save(), children: "Save" })] })] })] }));
};
export default MortgageTable;
