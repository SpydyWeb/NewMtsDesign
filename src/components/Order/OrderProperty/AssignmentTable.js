import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { AdditionalTableTitle, AdditionalTableTitleRow, ModalButton, AddButton } from "./OrderPropertyStyledComponents";
import { Modal } from "react-bootstrap";
import assignmentServices from "../../../services/assignment-services";
import { TextField, TextArea } from "../../utils/InputGroup";
import { ApplicationContext } from "../../../App";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar } from "../OrderStyledComponents";
const AssignmentTable = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [icons, setIcons] = useState({
        typeSortIcon: "",
        fromSortIcon: "",
        toSortIcon: "",
        datedSortIcon: "",
        recordedSortIcon: "",
        volinstSortIcon: "",
        pageSortIcon: "",
    });
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    useEffect(() => {
        getAssignments();
    }, []);
    useEffect(() => {
        getAssignments();
    }, [sortColumn, sortDirection]);
    const getAssignments = () => {
        updateLoadingMessage("Fetching assignments...");
        updateLoading(true);
        assignmentServices
            .getAll(props.mortgageId, sortColumn, sortDirection)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setAssignments(JSON.parse(response.data.body));
                document.getElementById("additionalFillings" + props.mortgageId).className = JSON.parse(response.data.body).length > 0 ? "bi bi-check2" : "bi bi-x";
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch assignments! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch assignments! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch assignments! Please try again.",
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
                        message: "Could not fetch assignments! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch assignments! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
    };
    const save = () => {
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
                id: selectedAssignment?.id ? selectedAssignment.id : null,
                mortgageId: props.mortgageId,
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
                    getAssignments();
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Assignment " + (selectedAssignment?.id ? "editted " : "added ") + "successfully",
                        },
                        ...messages,
                    ]);
                    setShowModal(false);
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
    const deleteItem = (id) => {
        updateLoadingMessage("Deleting assignment...");
        updateLoading(true);
        assignmentServices
            .deleteItem(id)
            .then((response) => {
            if (response.data.statusCode == 200) {
                getAssignments();
                updateMessages([{ title: "Success !!", message: "Assignment deleted successfully" }, ...messages]);
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete assignment! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete assignment! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete assignment! Please try again.",
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
                        message: "Could not delete assignment! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete assignment! Please try again.",
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
    return (_jsxs(Table, { className: "table mt-2 mb-3", children: [_jsx("div", { className: "d-grid", children: _jsx(AdditionalTableTitleRow, { children: _jsxs(TableTitleBar, { children: [_jsx(AdditionalTableTitle, { children: "Assignment" }), _jsx(AddButton, { onClick: () => {
                                    setSelectedAssignment(null);
                                    setShowModal(true);
                                }, children: "+" })] }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-2", onClick: () => handleSort("filling_type", "typeSortIcon"), children: _jsxs("b", { children: ["Type\u00A0", _jsx("i", { id: "sortIcon", className: icons["typeSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("assigned_from", "fromSortIcon"), children: _jsxs("b", { children: ["Assigned From\u00A0", _jsx("i", { id: "sortIcon", className: icons["fromSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("assigned_to", "toSortIcon"), children: _jsxs("b", { children: ["Assigned To\u00A0", _jsx("i", { id: "sortIcon", className: icons["toSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("dated_date", "datedSortIcon"), children: _jsxs("b", { children: ["Dated Date\u00A0", _jsx("i", { id: "sortIcon", className: icons["datedSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("recorded_date", "recordedSortIcon"), children: _jsxs("b", { children: ["Recorded Date\u00A0", _jsx("i", { id: "sortIcon", className: icons["recordedSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("volinst", "volinstSortIcon"), children: _jsxs("b", { children: ["Vol/Inst#\u00A0", _jsx("i", { id: "sortIcon", className: icons["volinstSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("page", "pageSortIcon"), children: _jsxs("b", { children: ["Page\u00A0", _jsx("i", { id: "sortIcon", className: icons["pageSortIcon"] })] }) }), _jsx("div", { className: "col-1", children: _jsx("b", { children: "Action" }) })] }), assignments.length == 0 && _jsx(TableRow, { className: "d-flex justify-content-center", children: "No items..." }), assignments.map((item, idx) => (_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-2", children: item.fillingType }), _jsx("div", { className: "col-2", children: item.assignFrom }), _jsx("div", { className: "col-2", children: item.assignTo }), _jsx("div", { className: "col-1", children: item.datedDate }), _jsx("div", { className: "col-1", children: item.recordedDate }), _jsx("div", { className: "col-2", children: item.volinst }), _jsx("div", { className: "col-1", children: item.page }), _jsxs("div", { className: "col-1", children: [_jsx("i", { className: "bi bi-pencil-square", onClick: () => {
                                                setSelectedAssignment(item);
                                                setShowModal(true);
                                            } }), _jsx("i", { className: "bi bi-trash-fill", onClick: () => {
                                                setSelectedAssignment(item);
                                                setShowDeleteConfirmation(true);
                                            } })] })] }, "mortgage" + props.mortgageId + "assignment" + item.id)))] }) }), _jsxs(Modal, { show: showDeleteConfirmation, backdrop: "static", centered: true, onHide: () => setShowDeleteConfirmation(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Confirm Delete?" }) }), _jsx(Modal.Body, { children: _jsx("h5", { children: "Are you sure you want to delete this item?" }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowDeleteConfirmation(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => deleteItem(selectedAssignment?.id ? selectedAssignment?.id : 0), children: "Confirm" })] })] }), _jsxs(Modal, { show: showModal, size: "lg", backdrop: "static", centered: true, onHide: () => setShowModal(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: selectedAssignment?.id ? "Edit Assignment" : "Add Assignment" }) }), _jsx(Modal.Body, { children: _jsx("div", { className: "container-fluid card p-2", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsxs("div", { className: "form-floating", children: [_jsxs("select", { className: "form-select", id: "fillingType", defaultValue: selectedAssignment?.fillingType, onChange: () => {
                                                            if (document.getElementById("fillingType").value == "Modification") {
                                                                document.getElementById("newMaturityAmountContainer").classList.remove("d-none");
                                                                document.getElementById("newMaturityDateContainer").classList.remove("d-none");
                                                            }
                                                            else {
                                                                document.getElementById("newMaturityAmountContainer").classList.add("d-none");
                                                                document.getElementById("newMaturityDateContainer").classList.add("d-none");
                                                            }
                                                        }, children: [_jsx("option", { defaultChecked: true, children: "-select-" }), _jsx("option", { children: "Amendment" }, "Amendment"), _jsx("option", { children: "Modification" }, "Modification"), _jsx("option", { children: "Consolidation" }, "Consolidation"), _jsx("option", { children: "Re-recorded" }, "Re-recorded"), _jsx("option", { children: "Subordination" }, "Subordination"), _jsx("option", { children: "Assignment of leases & rents" }, "Assignment of leases & rents"), _jsx("option", { children: "Partial release" }, "Partial release"), _jsx("option", { children: "Adjustable rate rider" }, "Adjustable rate rider"), _jsx("option", { children: "Other" }, "Other")] }), _jsx("label", { htmlFor: "fillingType", children: "Filling Type" })] }), _jsx(ErrorMessage, { id: "fillingTypeError" })] }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "recordedDate", label: "Recorded Date", type: "date", defaultValue: selectedAssignment?.recordedDate }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "assignTo", label: "Assign to", type: "text", defaultValue: selectedAssignment?.assignTo }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "assignFrom", label: "Assign from", type: "text", defaultValue: selectedAssignment?.assignFrom }) }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "volinst", label: "Vol/Inst#", type: "text", defaultValue: selectedAssignment?.volinst, maxLength: 100 }), _jsx(ErrorMessage, { id: "volinstError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "page", label: "Page", type: "text", defaultValue: selectedAssignment?.page, maxLength: 100 }), _jsx(ErrorMessage, { id: "pageError" })] }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "datedDate", label: "Dated Date", type: "date", defaultValue: selectedAssignment?.datedDate }) }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "book", label: "Book", type: "text", defaultValue: selectedAssignment?.book, maxLength: 100 }), _jsx(ErrorMessage, { id: "bookError" })] }), _jsxs("div", { id: "newMaturityAmountContainer", className: "col-lg-3 col-md-6 col-sm-6 required-field " + (selectedAssignment?.fillingType == "Modification" ? "" : "d-none"), children: [_jsx(TextField, { id: "newMaturityAmount", label: "New Maturity Amount", type: "number", defaultValue: selectedAssignment?.newMaturityAmount, required: true, maxLength: 12 }), _jsx(ErrorMessage, { id: "newMaturityAmountError" })] }), _jsxs("div", { id: "newMaturityDateContainer", className: "col-lg-3 col-md-6 col-sm-6 required-field " + (selectedAssignment?.fillingType == "Modification" ? "" : "d-none"), children: [_jsx(TextField, { id: "newMaturityDate", label: "New Maturity Date", type: "date", defaultValue: selectedAssignment?.newMaturityDate, required: true }), _jsx(ErrorMessage, { id: "newMaturityDateError" })] }), _jsx("div", { className: "col-md-12 col-lg-12 col-sm-12", children: _jsx(TextArea, { id: "comments", label: "Comments", defaultValue: selectedAssignment?.comments, maxLength: 4000 }) })] }) }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowModal(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => save(), children: "Save" })] })] })] }));
};
export default AssignmentTable;
