import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { ModalButton, AddButton, OrderDetailPopover } from "./OrderPropertyStyledComponents";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import Pagination from "../../utils/PaginationComponent";
import MiscellaneousServices from "../../../services/miscellaneous-services";
import { TextField, TextArea, SelectBox } from "../../utils/InputGroup";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext } from "../../../App";
import { isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitle, TableTitleRow } from "../OrderStyledComponents";
const MiscellaneousTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [miscellaneousItems, setMiscellaneousItems] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedMiscellaneous, setSelectedMiscellaneous] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [icons, setIcons] = useState({
        typeSortIcon: "",
        firstSortIcon: "",
        secondSortIcon: "",
        recordedSortIcon: "",
        volinstSortIcon: "",
        pageSortIcon: "",
    });
    const { orderId } = useParams();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    useEffect(() => {
        getMiscellaneous();
    }, []);
    useEffect(() => {
        getMiscellaneous();
    }, [currPage, totalPage, pageSize, sortColumn, sortDirection]);
    const getMiscellaneous = () => {
        updateLoadingMessage("Fetching miscellaneous...");
        updateLoading(true);
        MiscellaneousServices.getSize(orderId)
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
                        message: "Could not fetch miscellaneous table size! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch miscellaneous table size! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
        MiscellaneousServices.getAll(orderId, currPage, pageSize, sortColumn, sortDirection)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setMiscellaneousItems(JSON.parse(response.data.body));
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch miscellaneous items! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch miscellaneous items! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch miscellaneous items! Please try again.",
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
                        message: "Could not fetch miscellaneous items! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch miscellaneous items! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
    };
    const save = () => {
        var okay = true;
        updateLoadingMessage("Saving miscellaneous...");
        updateLoading(true);
        const type = document.getElementById("type");
        const firstParty = document.getElementById("firstParty");
        const secondParty = document.getElementById("secondParty");
        const recordedDate = document.getElementById("recordedDate");
        const volinst = document.getElementById("volinst");
        const page = document.getElementById("page");
        const comments = document.getElementById("comments");
        const book = document.getElementById("book");
        var typeError = document.getElementById("typeError");
        var volinstError = document.getElementById("volinstError");
        var pageError = document.getElementById("pageError");
        const firstPartyError = document.getElementById("firstPartyError");
        const secondPartyError = document.getElementById("secondPartyError");
        const bookError = document.getElementById("bookError");
        if (isNoOptionSelected(type, typeError))
            okay = false;
        if (isMaxLengthExceeded(volinst, volinstError, 100))
            okay = false;
        if (isMaxLengthExceeded(page, pageError, 100))
            okay = false;
        if (isMaxLengthExceeded(book, bookError, 100))
            okay = false;
        if (isMaxLengthExceeded(firstParty, firstPartyError, 1000))
            okay = false;
        if (isMaxLengthExceeded(secondParty, secondPartyError, 1000))
            okay = false;
        if (okay) {
            MiscellaneousServices.save({
                id: selectedMiscellaneous?.id ? selectedMiscellaneous.id : null,
                orderId: orderId,
                type: type.value == "-select-" ? "" : type.value,
                firstParty: firstParty.value,
                secondParty: secondParty.value,
                recordedDate: recordedDate?.value,
                volinst: volinst?.value,
                page: page?.value,
                book: book.value,
                comments: comments?.value,
            })
                .then((response) => {
                if (response.data.statusCode == 200) {
                    getMiscellaneous();
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Miscellaneous " + (selectedMiscellaneous?.id ? "editted " : "added ") + "successfully",
                        },
                        ...messages,
                    ]);
                    setShowModal(false);
                    updateLoading(false);
                }
                else if (response.data.statusCode == 400) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save miscellaneous! Please try again.",
                        },
                        ...messages,
                    ]);
                    updateLoading(false);
                    let errors = JSON.parse(response.data.body);
                    for (let i in errors) {
                        if (errors.at(i).startsWith("type")) {
                            typeError.innerText = errors.at(i).substr(6);
                        }
                        else if (errors.at(i).startsWith("firstParty")) {
                            firstPartyError.innerText = errors.at(i).substr(12);
                        }
                        else if (errors.at(i).startsWith("secondParty")) {
                            secondPartyError.innerText = errors.at(i).substr(13);
                        }
                        else if (errors.at(i).startsWith("volinst")) {
                            volinstError.innerText = errors.at(i).substr(9);
                        }
                        else if (errors.at(i).startsWith("page")) {
                            pageError.innerText = errors.at(i).substr(6);
                        }
                    }
                }
                else if (response.data.statusCode == 501) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save miscellaneous! Please try again.",
                        },
                        ...messages,
                    ]);
                    updateLoading(false);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save miscellaneous! Please try again.",
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
                            message: "Could not save miscellaneous! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save miscellaneous! Please try again.",
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
        updateLoadingMessage("Deleting miscellaneous...");
        updateLoading(true);
        MiscellaneousServices.deleteItem(id)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setCurrPage(1);
                getMiscellaneous();
                updateMessages([
                    {
                        title: "Success !!",
                        message: "Miscellaneous deleted successfully",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete miscellaneous! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete miscellaneous! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete miscellaneous! Please try again.",
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
                        message: "Could not delete miscellaneous! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete miscellaneous! Please try again.",
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
    return (_jsxs(Table, { className: "table mt-5 mb-5", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsxs(TableTitleBar, { children: [_jsxs(TableTitle, { children: ["Miscellaneous\u00A0\u00A0", _jsx(OverlayTrigger, { show: showOrder, rootClose: true, placement: "bottom", overlay: _jsxs(Popover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                                setShowOrder(false);
                                            }, id: "popover-basic", children: [_jsx(Popover.Header, { as: "h3", children: "Order" }), _jsx(Popover.Body, { children: OrderInfo })] }), children: _jsxs(OrderDetailPopover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                                setShowOrder(false);
                                            }, children: ["(Order Id: ", orderId, " \u00A0\u00A0\u00A0\u00A0Property Address: 1902 Glendell Road, Harrisburg, PA, 17112 Dauphin)"] }) })] }), _jsx(AddButton, { onClick: () => {
                                    setSelectedMiscellaneous(null);
                                    setShowModal(true);
                                }, children: "+" })] }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-2", onClick: () => handleSort("exception_type", "typeSortIcon"), children: _jsxs("b", { children: ["Type\u00A0", _jsx("i", { id: "sortIcon", className: icons["typeSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("first_party", "firstSortIcon"), children: _jsxs("b", { children: ["First Party\u00A0", _jsx("i", { id: "sortIcon", className: icons["firstSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("second_party", "secondSortIcon"), children: _jsxs("b", { children: ["Second Party\u00A0", _jsx("i", { id: "sortIcon", className: icons["secondSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("recorded_date", "recordedSortIcon"), children: _jsxs("b", { children: ["Recorded Date\u00A0", _jsx("i", { id: "sortIcon", className: icons["recordedSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("volinst", "volinstSortIcon"), children: _jsxs("b", { children: ["Vol/Inst#\u00A0", _jsx("i", { id: "sortIcon", className: icons["volinstSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("page", "pageSortIcon"), children: _jsxs("b", { children: ["Page\u00A0", _jsx("i", { id: "sortIcon", className: icons["pageSortIcon"] })] }) }), _jsx("div", { className: "col-1", children: _jsx("b", { children: "Action" }) })] }), miscellaneousItems.length == 0 && _jsx(TableRow, { className: "d-flex justify-content-center", children: "No items..." }), miscellaneousItems.map((item, idx) => (_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-2", children: item.type }), _jsx("div", { className: "col-2", children: item.firstParty }), _jsx("div", { className: "col-2", children: item.secondParty }), _jsx("div", { className: "col-2", children: item.recordedDate }), _jsx("div", { className: "col-2", children: item.volinst }), _jsx("div", { className: "col-1", children: item.page }), _jsxs("div", { className: "col-1", children: [_jsx("i", { className: "bi bi-pencil-square", onClick: () => {
                                                setSelectedMiscellaneous(item);
                                                setShowModal(true);
                                            } }), _jsx("i", { className: "bi bi-trash-fill", onClick: () => {
                                                setSelectedMiscellaneous(item);
                                                setShowDeleteConfirmation(true);
                                            } })] })] }, "miscellaneous" + item.id))), _jsx(Pagination, { totalPage: totalPage, data: miscellaneousItems, pageSize: pageSize, setPageSize: setPageSize, currPage: currPage, setCurrPage: setCurrPage })] }) }), _jsxs(Modal, { show: showDeleteConfirmation, backdrop: "static", centered: true, onHide: () => setShowDeleteConfirmation(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Confirm Delete?" }) }), _jsx(Modal.Body, { children: _jsx("h5", { children: "Are you sure you want to delete this item?" }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowDeleteConfirmation(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => deleteItem(selectedMiscellaneous?.id ? selectedMiscellaneous?.id : 0), children: "Confirm" })] })] }), _jsxs(Modal, { show: showModal, size: "lg", backdrop: "static", centered: true, onHide: () => setShowModal(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: selectedMiscellaneous?.id ? "Edit Miscellaneous" : "Add Miscellaneous" }) }), _jsx(Modal.Body, { children: _jsx("div", { className: "container-fluid card p-2", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6 required-field", children: [_jsx(SelectBox, { id: "type", label: "Type", defaultValue: selectedMiscellaneous?.type, options: [
                                                    "Divorce",
                                                    "Outsales",
                                                    "Oil & Gas leases",
                                                    "Lease agreements",
                                                    "Easements",
                                                    "Restrictions",
                                                    "Right of way",
                                                    "Assignment of oil and gas lease",
                                                    "UCC1",
                                                    "Power of Attorney",
                                                    "Others",
                                                ] }), _jsx(ErrorMessage, { id: "typeError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "firstParty", label: "First Party", type: "text", defaultValue: selectedMiscellaneous?.firstParty, maxLength: 1000 }), _jsx(ErrorMessage, { id: "firstPartyError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-6", children: [_jsx(TextField, { id: "secondParty", label: "Second Party", type: "text", defaultValue: selectedMiscellaneous?.secondParty, maxLength: 1000 }), _jsx(ErrorMessage, { id: "secondPartyError" })] }), _jsx("div", { className: "col-md-6 col-lg-3 col-sm-6", children: _jsx(TextField, { id: "recordedDate", label: "Recorded Date", type: "date", defaultValue: selectedMiscellaneous?.recordedDate }) }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-12", children: [_jsx(TextField, { id: "volinst", label: "Vol/Inst#", type: "text", defaultValue: selectedMiscellaneous?.volinst, maxLength: 100 }), _jsx(ErrorMessage, { id: "volinstError" })] }), _jsxs("div", { className: "col-md-6 col-lg-3 col-sm-12", children: [_jsx(TextField, { id: "page", label: "Page", type: "text", defaultValue: selectedMiscellaneous?.page, maxLength: 100 }), _jsx(ErrorMessage, { id: "pageError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "book", label: "Book", type: "text", defaultValue: selectedMiscellaneous?.book, maxLength: 100 }), _jsx(ErrorMessage, { id: "bookError" })] }), _jsx("div", { className: "col-md-12 col-lg-12 col-sm-12", children: _jsx(TextArea, { id: "comments", label: "Comments", defaultValue: selectedMiscellaneous?.comments, maxLength: 4000 }) })] }) }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowModal(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => save(), children: "Save" })] })] })] }));
};
export default MiscellaneousTable;
