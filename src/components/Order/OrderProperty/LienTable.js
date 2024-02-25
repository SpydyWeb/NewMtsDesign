import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useContext } from "react";
import { ModalButton, AddButton, OrderDetailPopover } from "./OrderPropertyStyledComponents";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import Pagination from "../../utils/PaginationComponent";
import LiensServices from "../../../services/liens-services";
import { TextField, ToggleButton, TextArea } from "../../utils/InputGroup";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext } from "../../../App";
import { isEmpty, isMaxLengthExceeded } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitle, TableTitleRow } from "../OrderStyledComponents";
const LienTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [liens, setLiens] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedLien, setSelectedLien] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [icons, setIcons] = useState({
        plaintiffSortIcon: "",
        defendantSortIcon: "",
        uccSortIcon: "",
        recordedSortIcon: "",
        lienAmountSortIcon: "",
        caseSortIcon: "",
        docketSortIcon: "",
        volinstSortIcon: "",
        pageSortIcon: "",
    });
    const { orderId } = useParams();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    useEffect(() => {
        getLiens();
    }, []);
    useEffect(() => {
        getLiens();
    }, [currPage, totalPage, pageSize, sortColumn, sortDirection]);
    const getLiens = () => {
        updateLoadingMessage("Fetching liens...");
        updateLoading(true);
        LiensServices.getSize(orderId)
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
                        message: "Could not fetch lien table size! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch lien table size! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
        LiensServices.getAll(orderId, currPage, pageSize, sortColumn, sortDirection)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setLiens(JSON.parse(response.data.body));
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch liens! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch liens! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch liens! Please try again.",
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
                        message: "Could not fetch liens! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch liens! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
    };
    const save = () => {
        var okay = true;
        updateLoadingMessage("Saving lien...");
        updateLoading(true);
        const plaintiff = document.getElementById("plaintiff");
        const defendant = document.getElementById("defendant");
        const lienType = document.getElementById("lienType");
        const dob = document.getElementById("dob");
        const ucc = document.getElementById("ucc");
        const ssn = document.getElementById("ssn");
        const caseNumber = document.getElementById("caseNumber");
        const date = document.getElementById("date");
        const recordedDate = document.getElementById("recordedDate");
        const lienAmount = document.getElementById("lienAmount");
        const volinst = document.getElementById("volinst");
        const page = document.getElementById("page");
        const searchedNames = document.getElementById("searchedNames");
        const comments = document.getElementById("comments");
        const book = document.getElementById("book");
        var plaintiffError = document.getElementById("plaintiffError");
        var defendantError = document.getElementById("defendantError");
        var caseNumberError = document.getElementById("caseNumberError");
        var ssnError = document.getElementById("ssnError");
        var volinstError = document.getElementById("volinstError");
        var pageError = document.getElementById("pageError");
        var lienAmountError = document.getElementById("lienAmountError");
        const bookError = document.getElementById("bookError");
        if (isEmpty(plaintiff, plaintiffError))
            okay = false;
        if (isEmpty(defendant, defendantError))
            okay = false;
        if (isMaxLengthExceeded(ssn, ssnError, 100))
            okay = false;
        if (isMaxLengthExceeded(caseNumber, caseNumberError, 100))
            okay = false;
        if (isMaxLengthExceeded(volinst, volinstError, 100))
            okay = false;
        if (isMaxLengthExceeded(page, pageError, 100))
            okay = false;
        if (isMaxLengthExceeded(book, bookError, 100))
            okay = false;
        if (isMaxLengthExceeded(lienAmount, lienAmountError, 12))
            okay = false;
        if (okay) {
            LiensServices.save({
                id: selectedLien?.id ? selectedLien.id : null,
                orderId: orderId,
                plaintiff: plaintiff.value,
                defendant: defendant.value,
                lienType: lienType.value,
                dob: dob.value,
                ucc: ucc.checked,
                ssn: ssn.value,
                caseNumber: caseNumber.value,
                date: date.value,
                recordedDate: recordedDate.value,
                lienAmount: lienAmount.value,
                volinst: volinst.value,
                page: page.value,
                book: book.value,
                searchedNames: searchedNames.value,
                comments: comments.value,
            })
                .then((response) => {
                if (response.data.statusCode == 200) {
                    getLiens();
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Lien " + (selectedLien?.id ? "editted " : "added ") + "successfully",
                        },
                        ...messages,
                    ]);
                    setShowModal(false);
                }
                else if (response.data.statusCode == 400) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save lien! Please try again.",
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
                        else if (errors.at(i).startsWith("plaintiff")) {
                            plaintiffError.innerText = errors.at(i).substr(11);
                        }
                        else if (errors.at(i).startsWith("defendant")) {
                            defendantError.innerText = errors.at(i).substr(11);
                        }
                        else if (errors.at(i).startsWith("caseNumber")) {
                            caseNumberError.innerText = errors.at(i).substr(12);
                        }
                        else if (errors.at(i).startsWith("ssn")) {
                            ssnError.innerText = errors.at(i).substr(5);
                        }
                        else if (errors.at(i).startsWith("lienAmount")) {
                            lienAmountError.innerText = errors.at(i).substr(12);
                        }
                    }
                }
                else if (response.data.statusCode == 501) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save lien! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save lien! Please try again.",
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
                            message: "Could not save lien! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save lien! Please try again.",
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
        updateLoadingMessage("Deleting lien...");
        updateLoading(true);
        LiensServices.deleteItem(id)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setCurrPage(1);
                getLiens();
                updateMessages([{ title: "Success !!", message: "Lien deleted successfully" }, ...messages]);
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete lien! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete lien! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete lien! Please try again.",
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
                        message: "Could not delete lien! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete lien! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
        setShowDeleteConfirmation(false);
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
    return (_jsxs(Table, { className: "table mt-5 mb-5", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsxs(TableTitleBar, { children: [_jsxs(TableTitle, { children: ["Liens\u00A0\u00A0", _jsx(OverlayTrigger, { show: showOrder, rootClose: true, placement: "bottom", overlay: _jsxs(Popover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                                setShowOrder(false);
                                            }, id: "popover-basic", children: [_jsx(Popover.Header, { as: "h3", children: "Order" }), _jsx(Popover.Body, { children: OrderInfo })] }), children: _jsxs(OrderDetailPopover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                                setShowOrder(false);
                                            }, children: ["(Order Id: ", orderId, " \u00A0\u00A0\u00A0\u00A0Property Address: 1902 Glendell Road, Harrisburg, PA, 17112 Dauphin)"] }) })] }), _jsx(AddButton, { onClick: () => {
                                    setSelectedLien(null);
                                    setShowModal(true);
                                }, children: "+" })] }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-2", onClick: () => handleSort("plaintiff", "plaintiffSortIcon"), children: _jsxs("b", { children: ["Plaintiff\u00A0", _jsx("i", { id: "sortIcon", className: icons["plaintiffSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("defendant", "defendantSortIcon"), children: _jsxs("b", { children: ["Defendant\u00A0", _jsx("i", { id: "sortIcon", className: icons["defendantSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("ucc", "uccSortIcon"), children: _jsxs("b", { children: ["UCC\u00A0", _jsx("i", { id: "sortIcon", className: icons["uccSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("recorded_date", "recordedSortIcon"), children: _jsxs("b", { children: ["Recorded Date\u00A0", _jsx("i", { id: "sortIcon", className: icons["recordedSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("lien_amount", "lienAmountSortIcon"), children: _jsxs("b", { children: ["Lien Amount\u00A0", _jsx("i", { id: "sortIcon", className: icons["lienAmountSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("docket_number", "caseSortIcon"), children: _jsxs("b", { children: ["Docket/Case#\u00A0", _jsx("i", { id: "sortIcon", className: icons["caseSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("dated_date", "docketSortIcon"), children: _jsxs("b", { children: ["Docket Date\u00A0", _jsx("i", { id: "sortIcon", className: icons["docketSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("volinst", "volinstSortIcon"), children: _jsxs("b", { children: ["Vol/Inst#\u00A0", _jsx("i", { id: "sortIcon", className: icons["volinstSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("page", "pageSortIcon"), children: _jsxs("b", { children: ["Page\u00A0", _jsx("i", { id: "sortIcon", className: icons["pageSortIcon"] })] }) }), _jsx("div", { className: "col-1", children: _jsx("b", { children: "Action" }) })] }), liens.length == 0 && _jsx(TableRow, { className: "d-flex justify-content-center", children: "No items..." }), liens.map((item, idx) => (_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-2", children: item.plaintiff }), _jsx("div", { className: "col-2", children: item.defendant }), _jsx("div", { className: "col-1", children: item.ucc ? "true" : "false" }), _jsx("div", { className: "col-1", children: item.recordedDate }), _jsx("div", { className: "col-1", children: item.lienAmount ? "$" + item.lienAmount : "" }), _jsx("div", { className: "col-1", children: item.caseNumber }), _jsx("div", { className: "col-1", children: item.date }), _jsx("div", { className: "col-1", children: item.volinst }), _jsx("div", { className: "col-1", children: item.page }), _jsxs("div", { className: "col-1", children: [_jsx("i", { className: "bi bi-pencil-square", onClick: () => {
                                                setSelectedLien(item);
                                                setShowModal(true);
                                            } }), _jsx("i", { className: "bi bi-trash-fill", onClick: () => {
                                                setSelectedLien(item);
                                                setShowDeleteConfirmation(true);
                                            } })] })] }, "lien" + item.id))), _jsx(Pagination, { totalPage: totalPage, data: liens, pageSize: pageSize, setPageSize: setPageSize, currPage: currPage, setCurrPage: setCurrPage })] }) }), _jsxs(Modal, { show: showDeleteConfirmation, backdrop: "static", centered: true, onHide: () => setShowDeleteConfirmation(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Confirm Delete?" }) }), _jsx(Modal.Body, { children: _jsx("h5", { children: "Are you sure you want to delete this item?" }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowDeleteConfirmation(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => deleteItem(selectedLien?.id ? selectedLien?.id : 0), children: "Confirm" })] })] }), _jsxs(Modal, { show: showModal, size: "lg", backdrop: "static", centered: true, onHide: () => setShowModal(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: selectedLien?.id ? "Edit Lien" : "Add Lien" }) }), _jsx(Modal.Body, { children: _jsx("div", { className: "container-fluid card p-2", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsx(TextField, { id: "plaintiff", label: "Plaintiff/Debtor", type: "text", defaultValue: selectedLien?.plaintiff, required: true }), _jsx(ErrorMessage, { id: "plaintiffError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsx(TextField, { id: "defendant", label: "Defendant/Holder", type: "text", defaultValue: selectedLien?.defendant, required: true }), _jsx(ErrorMessage, { id: "defendantError" })] }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "lienType", label: "Lien Type", type: "text", defaultValue: selectedLien?.lienType }) }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "lienAmount", label: "Lien Amount", type: "number", defaultValue: selectedLien?.lienAmount, maxLength: 12 }), _jsx(ErrorMessage, { id: "lienAmountError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "volinst", label: "Vol/Inst#", type: "text", defaultValue: selectedLien?.volinst, maxLength: 100 }), _jsx(ErrorMessage, { id: "volinstError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "page", label: "Page", type: "text", defaultValue: selectedLien?.page, maxLength: 100 }), _jsx(ErrorMessage, { id: "pageError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "ssn", label: "SSN", type: "text", defaultValue: selectedLien?.ssn, maxLength: 100 }), _jsx(ErrorMessage, { id: "ssnError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "caseNumber", label: "Docket/Case Number", type: "text", defaultValue: selectedLien?.caseNumber, maxLength: 100 }), _jsx(ErrorMessage, { id: "caseNumberError" })] }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "dob", label: "DOB", type: "date", defaultValue: selectedLien?.dob }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6 mt-sm-3", children: _jsx(ToggleButton, { id: "ucc", label: "UCC", defaultChecked: selectedLien?.ucc }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "date", label: "Date", type: "date", defaultValue: selectedLien?.date }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "recordedDate", label: "Recorded Date", type: "date", defaultValue: selectedLien?.recordedDate }) }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "book", label: "Book", type: "text", defaultValue: selectedLien?.book, maxLength: 100 }), _jsx(ErrorMessage, { id: "bookError" })] }), _jsx("div", { className: "col-md-12 col-lg-12 col-sm-12", children: _jsx(TextArea, { id: "searchedNames", label: "Searched Names", defaultValue: selectedLien?.searchedNames, maxLength: 4000 }) }), _jsx("div", { className: "col-md-12 col-lg-12 col-sm-12", children: _jsx(TextArea, { id: "comments", label: "Comments", defaultValue: selectedLien?.comments, maxLength: 4000 }) })] }) }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowModal(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => save(), children: "Save" })] })] })] }));
};
export default LienTable;
