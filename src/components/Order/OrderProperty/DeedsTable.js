import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { ModalButton, AddButton, OrderDetailPopover } from "./OrderPropertyStyledComponents";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import Pagination from "../../utils/PaginationComponent";
import DeedsServices from "../../../services/deeds-services";
import { TextField, ToggleButton, TextArea } from "../../utils/InputGroup";
import deedsServices from "../../../services/deeds-services";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext } from "../../../App";
import { isMaxLengthExceeded, isEmpty } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitle, TableTitleRow } from "../OrderStyledComponents";
const DeedsTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deeds, setDeeds] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedDeed, setSelectedDeed] = useState(null);
    const [showOrder, setShowOrder] = useState(false);
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [icons, setIcons] = useState({
        granteeSortIcon: "",
        grantorSortIcon: "",
        priorSortIcon: "",
        deedSortIcon: "",
        recordedSortIcon: "",
        considerationSortIcon: "",
        volinstSortIcon: "",
        pageSortIcon: "",
    });
    const { orderId } = useParams();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    useEffect(() => {
        getDeeds();
    }, []);
    useEffect(() => {
        getDeeds();
    }, [currPage, totalPage, pageSize, sortColumn, sortDirection]);
    const getDeeds = () => {
        updateLoadingMessage("Fetching deeds...");
        updateLoading(true);
        deedsServices
            .getSize(orderId)
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
                        message: "Could not fetch deed table size! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch deed table size! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
        deedsServices
            .getAll(orderId, currPage, pageSize, sortColumn, sortDirection)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setDeeds(JSON.parse(response.data.body));
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch deeds! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch deeds! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch deeds! Please try again.",
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
                        message: "Could not fetch deeds! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch deeds! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
    };
    const save = () => {
        var okay = true;
        updateLoadingMessage("Saving deed...");
        updateLoading(true);
        const grantee = document.getElementById("grantee");
        const granteeVesting = document.getElementById("granteeVesting");
        const granteeLegalName = document.getElementById("granteeLegalName");
        const isGranteeDeceased = document.getElementById("isGranteeDeceased");
        const granteeDeceasedName = document.getElementById("granteeDeceasedName");
        const granteeDeceasedDate = document.getElementById("granteeDeceasedDate");
        const grantor = document.getElementById("grantor");
        const grantorVesting = document.getElementById("grantorVesting");
        const grantorLegalName = document.getElementById("grantorLegalName");
        const isGrantorDeceased = document.getElementById("isGrantorDeceased");
        const grantorDeceasedName = document.getElementById("grantorDeceasedName");
        const grantorDeceasedDate = document.getElementById("grantorDeceasedDate");
        const deedDate = document.getElementById("deedDate");
        const recordedDate = document.getElementById("recordedDate");
        const deedType = document.getElementById("deedType");
        const hasPriorDeed = document.getElementById("hasPriorDeed");
        const considerationAmount = document.getElementById("considerationAmount");
        const volinst = document.getElementById("volInst");
        const page = document.getElementById("page");
        const comments = document.getElementById("comments");
        const other = document.getElementById("other");
        const book = document.getElementById("book");
        var granteeError = document.getElementById("granteeError");
        var grantorError = document.getElementById("grantorError");
        var deedDateError = document.getElementById("deedDateError");
        var recordedDateError = document.getElementById("recordedDateError");
        var volInstError = document.getElementById("volInstError");
        var pageError = document.getElementById("pageError");
        var considerationAmountError = document.getElementById("considerationAmountError");
        var otherError = document.getElementById("otherError");
        const bookError = document.getElementById("bookError");
        if (isEmpty(grantee, granteeError))
            okay = false;
        if (isEmpty(grantor, grantorError))
            okay = false;
        if (isEmpty(deedDate, deedDateError))
            okay = false;
        if (isEmpty(recordedDate, recordedDateError))
            okay = false;
        if (isEmpty(volinst, volInstError))
            okay = false;
        else if (isMaxLengthExceeded(volinst, volInstError, 100))
            okay = false;
        if (isMaxLengthExceeded(page, pageError, 100))
            okay = false;
        if (isMaxLengthExceeded(book, bookError, 100))
            okay = false;
        if (isMaxLengthExceeded(considerationAmount, considerationAmountError, 12))
            okay = false;
        if (deedType.value == "Other") {
            if (isEmpty(other, otherError))
                okay = false;
            else if (isMaxLengthExceeded(other, otherError, 100))
                okay = false;
        }
        if (okay) {
            DeedsServices.save({
                id: selectedDeed?.id ? selectedDeed.id : null,
                orderId: orderId,
                grantee: grantee?.value,
                granteeVesting: granteeVesting?.value,
                granteeLegalName: granteeLegalName?.value,
                isGranteeDeceased: isGranteeDeceased?.checked,
                granteeDeceasedName: granteeDeceasedName?.value,
                granteeDeceasedDate: granteeDeceasedDate?.value,
                grantor: grantor?.value,
                grantorVesting: grantorVesting?.value,
                grantorLegalName: grantorLegalName?.value,
                isGrantorDeceased: isGrantorDeceased?.checked,
                grantorDeceasedName: grantorDeceasedName?.value,
                grantorDeceasedDate: grantorDeceasedDate?.value,
                deedDate: deedDate?.value,
                recordedDate: recordedDate?.value,
                deedType: deedType?.value == "-select-" ? "" : deedType.value == "Other" ? other?.value : deedType.value,
                hasPriorDeed: hasPriorDeed?.checked,
                considerationAmount: considerationAmount?.value,
                volinst: volinst?.value,
                page: page?.value,
                book: book.value,
                comments: comments?.value,
            })
                .then((response) => {
                if (response.data.statusCode == 200) {
                    getDeeds();
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Deed " + (selectedDeed?.id ? "editted " : "added ") + "successfully",
                        },
                        ...messages,
                    ]);
                    setShowModal(false);
                }
                else if (response.data.statusCode == 400) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save deed! Please try again.",
                        },
                        ...messages,
                    ]);
                    let errors = JSON.parse(response.data.body);
                    for (let i in errors) {
                        if (errors.at(i).startsWith("grantee")) {
                            granteeError.innerText = errors.at(i).substr(9);
                        }
                        else if (errors.at(i).startsWith("grantor")) {
                            grantorError.innerText = errors.at(i).substr(9);
                        }
                        else if (errors.at(i).startsWith("deedDate")) {
                            deedDateError.innerText = errors.at(i).substr(10);
                        }
                        else if (errors.at(i).startsWith("recordedDate")) {
                            recordedDateError.innerText = errors.at(i).substr(14);
                        }
                        else if (errors.at(i).startsWith("volinst")) {
                            volInstError.innerText = errors.at(i).substr(9);
                        }
                        else if (errors.at(i).startsWith("page")) {
                            pageError.innerText = errors.at(i).substr(6);
                        }
                        else if (errors.at(i).startsWith("considerationAmount")) {
                            considerationAmountError.innerText = errors.at(i).substr(21);
                        }
                    }
                }
                else if (response.data.statusCode == 501) {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save deed! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save deed! Please try again.",
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
                            message: "Could not save deed! Please try again.",
                        },
                        ...messages,
                    ]);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save deed! Please try again.",
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
        setCurrPage(1);
        updateLoadingMessage("Deleting deed...");
        updateLoading(true);
        DeedsServices.deleteItem(id)
            .then((response) => {
            if (response.data.statusCode == 200) {
                setCurrPage(1);
                getDeeds();
                updateMessages([{ title: "Success !!", message: "Deed deleted successfully" }, ...messages]);
            }
            else if (response.data.statusCode == 400) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete deed! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else if (response.data.statusCode == 501) {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete deed! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete deed! Please try again.",
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
                        message: "Could not delete deed! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not delete deed! Please try again.",
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
    const findDeedType = (deedType) => {
        if ([
            "",
            "-select-",
            "Affidavit of Death",
            "Bargain and Sale Deed",
            "Certificate of Title",
            "Corrective Deed",
            "Deed",
            "Deed in Lieu",
            "Deed of Distribution",
            "Divorce Decree",
            "Easement",
            "Executors Deed",
            "Foreclosure Deed",
            "Gift Deed",
            "Grant Deed",
            "In-Sale",
            "Indenture",
            "Interspousal Transfer Deed",
            "Lease",
            "Land Contract",
            "Out-Sale",
            "Quit Claim Deed",
            "Re-Recorded Deed",
            "Sheriffs Deed",
            "Substitute Trustees Deed",
            "Survivorship Deed",
            "Transfer on Death Deed",
            "Trustee Deed",
            "Warranty Deed",
            "Will",
        ].includes(deedType))
            return true;
        return false;
    };
    return (_jsxs(Table, { className: "table mt-5 mb-5", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsxs(TableTitleBar, { children: [_jsxs(TableTitle, { children: ["Deeds\u00A0\u00A0", _jsx(OverlayTrigger, { show: showOrder, rootClose: true, placement: "bottom", overlay: _jsxs(Popover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                                setShowOrder(false);
                                            }, id: "popover-basic", children: [_jsx(Popover.Header, { as: "h3", children: "Order" }), _jsx(Popover.Body, { children: OrderInfo })] }), children: _jsxs(OrderDetailPopover, { onMouseEnter: () => setShowOrder(true), onMouseLeave: () => {
                                                setShowOrder(false);
                                            }, children: ["(Order Id: ", orderId, " \u00A0\u00A0\u00A0\u00A0Property Address: 1902 Glendell Road, Harrisburg, PA, 17112 Dauphin)"] }) })] }), _jsx(AddButton, { onClick: () => {
                                    setSelectedDeed(null);
                                    setShowModal(true);
                                }, children: "+" })] }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-2", onClick: () => handleSort("grantee", "granteeSortIcon"), children: _jsxs("b", { children: ["Grantee Information\u00A0", _jsx("i", { id: "sortIcon", className: icons["granteeSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("grantor", "grantorSortIcon"), children: _jsxs("b", { children: ["Grantor Information\u00A0", _jsx("i", { id: "sortIcon", className: icons["grantorSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("is_prior", "priorSortIcon"), children: _jsxs("b", { children: ["Prior\u00A0", _jsx("i", { id: "sortIcon", className: icons["priorSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("deed_date", "deedSortIcon"), children: _jsxs("b", { children: ["Deed Date\u00A0", _jsx("i", { id: "sortIcon", className: icons["deedSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("recorded_date", "recordedSortIcon"), children: _jsxs("b", { children: ["Recorded Date\u00A0", _jsx("i", { id: "sortIcon", className: icons["recordedSortIcon"] })] }) }), _jsx("div", { className: "col-2", onClick: () => handleSort("consideration_amount", "considerationSortIcon"), children: _jsxs("b", { children: ["Consideration Amount\u00A0", _jsx("i", { id: "sortIcon", className: icons["considerationSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("volinst", "volinstSortIcon"), children: _jsxs("b", { children: ["Vol/Inst#\u00A0", _jsx("i", { id: "sortIcon", className: icons["volinstSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("page", "pageSortIcon"), children: _jsxs("b", { children: ["Page\u00A0", _jsx("i", { id: "sortIcon", className: icons["pageSortIcon"] })] }) }), _jsx("div", { className: "col-1", children: _jsx("b", { children: "Action" }) })] }), deeds.length == 0 && _jsx(TableRow, { className: "d-flex justify-content-center", children: "No items..." }), deeds.map((item, idx) => (_jsxs(TableRow, { className: "row", children: [_jsxs("div", { className: "col-2", children: [_jsx("b", { children: "Grantee: " }), item.grantee, _jsx("br", {}), _jsx("b", { children: "Vesting: " }), item.granteeVesting] }), _jsxs("div", { className: "col-2", children: [_jsx("b", { children: "Grantor: " }), item.grantor, _jsx("br", {}), _jsx("b", { children: "Vesting: " }), item.grantorVesting] }), _jsx("div", { className: "col-1", children: item.hasPriorDeed }), _jsx("div", { className: "col-1", children: item.deedDate }), _jsx("div", { className: "col-1", children: item.recordedDate }), _jsx("div", { className: "col-2", children: item.considerationAmount ? "$" + item.considerationAmount : "" }), _jsx("div", { className: "col-1", children: item.volinst }), _jsx("div", { className: "col-1", children: item.page }), _jsxs("div", { className: "col-1", children: [_jsx("i", { className: "bi bi-pencil-square", onClick: () => {
                                                setSelectedDeed(item);
                                                setShowModal(true);
                                            } }), _jsx("i", { className: "bi bi-trash-fill", onClick: () => {
                                                setSelectedDeed(item);
                                                setShowDeleteConfirmation(true);
                                            } })] })] }, "deed" + item.id))), _jsx(Pagination, { totalPage: totalPage, data: deeds, pageSize: pageSize, setPageSize: setPageSize, currPage: currPage, setCurrPage: setCurrPage })] }) }), _jsxs(Modal, { show: showDeleteConfirmation, backdrop: "static", centered: true, onHide: () => setShowDeleteConfirmation(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Confirm Delete?" }) }), _jsx(Modal.Body, { children: _jsx("h5", { children: "Are you sure you want to delete this item?" }) }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowDeleteConfirmation(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => deleteItem(selectedDeed?.id ? selectedDeed?.id : 0), children: "Confirm" })] })] }), _jsxs(Modal, { show: showModal, size: "lg", backdrop: "static", centered: true, onHide: () => setShowModal(false), children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: selectedDeed?.id ? "Edit Deed" : "Add Deed" }) }), _jsxs(Modal.Body, { children: [_jsx("div", { className: "container-fluid card p-2", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsx(TextField, { id: "grantee", label: "Grantee", type: "text", defaultValue: selectedDeed?.grantee, required: true }), _jsx(ErrorMessage, { id: "granteeError" })] }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "granteeVesting", label: "Grantee Vesting", type: "text", defaultValue: selectedDeed?.granteeVesting }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "granteeLegalName", label: "Name on Legal Desc.", type: "text", defaultValue: selectedDeed?.granteeLegalName }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6 mt-sm-3", children: _jsx(ToggleButton, { id: "isGranteeDeceased", label: "Deceased", defaultChecked: selectedDeed?.isGranteeDeceased }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "granteeDeceasedName", label: "Deceased Name", type: "text", defaultValue: selectedDeed?.granteeDeceasedName }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "granteeDeceasedDate", label: "Deceased Date", type: "date", defaultValue: selectedDeed?.granteeDeceasedDate }) })] }) }), _jsx("div", { className: "container-fluid card p-2 mt-3", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsx(TextField, { id: "grantor", label: "Grantor", type: "text", defaultValue: selectedDeed?.grantor, required: true }), _jsx(ErrorMessage, { id: "grantorError" })] }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "grantorVesting", label: "Grantor Vesting", type: "text", defaultValue: selectedDeed?.grantorVesting }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "grantorLegalName", label: "Name on Legal Desc.", type: "text", defaultValue: selectedDeed?.grantorLegalName }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6 mt-sm-3", children: _jsx(ToggleButton, { id: "isGrantorDeceased", label: "Deceased", defaultChecked: selectedDeed?.isGrantorDeceased }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "grantorDeceasedName", label: "Deceased Name", type: "text", defaultValue: selectedDeed?.grantorDeceasedName }) }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsx(TextField, { id: "grantorDeceasedDate", label: "Deceased Date", type: "date", defaultValue: selectedDeed?.grantorDeceasedDate }) })] }) }), _jsx("div", { className: "container-fluid card p-2 mt-3", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsx(TextField, { id: "deedDate", label: "Deed Date", type: "date", defaultValue: selectedDeed?.deedDate, required: true }), _jsx(ErrorMessage, { id: "deedDateError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsx(TextField, { id: "recordedDate", label: "Recorded Date", type: "date", defaultValue: selectedDeed?.recordedDate, required: true }), _jsx(ErrorMessage, { id: "recordedDateError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6 required-field", children: [_jsx(TextField, { id: "volInst", label: "Vol/Inst#", type: "text", defaultValue: selectedDeed?.volinst, required: true, maxLength: 100 }), _jsx(ErrorMessage, { id: "volInstError" })] }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6 mt-sm-3", children: _jsx(ToggleButton, { id: "hasPriorDeed", label: "Prior Deed", defaultChecked: selectedDeed?.hasPriorDeed }) }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "considerationAmount", label: "Consideration Amount", type: "number", defaultValue: selectedDeed?.considerationAmount, maxLength: 12 }), _jsx(ErrorMessage, { id: "considerationAmountError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "page", label: "Page", type: "text", defaultValue: selectedDeed?.page, maxLength: 100 }), _jsx(ErrorMessage, { id: "pageError" })] }), _jsx("div", { className: "col-lg-3 col-md-6 col-sm-6", children: _jsxs("div", { className: "form-floating", children: [_jsxs("select", { className: "form-select", id: "deedType", defaultValue: findDeedType(selectedDeed?.deedType ? selectedDeed.deedType : "") ? selectedDeed?.deedType : "Other", onChange: () => {
                                                            if (document.getElementById("deedType").value == "Other") {
                                                                document.getElementById("otherContainer").style.display = "";
                                                            }
                                                            else {
                                                                document.getElementById("otherContainer").style.display = "none";
                                                            }
                                                        }, children: [_jsx("option", { defaultChecked: true, children: "-select-" }), _jsx("option", { children: "Affidavit of Death" }, "Affidavit of Death"), _jsx("option", { children: "Bargain and Sale Deed" }, "Bargain and Sale Deed"), _jsx("option", { children: "Certificate of Title" }, "Certificate of Title"), _jsx("option", { children: "Corrective Deed" }, "Corrective Deed"), _jsx("option", { children: "Deed" }, "Deed"), _jsx("option", { children: "Deed in Lieu" }, "Deed in Lieu"), _jsx("option", { children: "Deed of Distribution" }, "Deed of Distribution"), _jsx("option", { children: "Divorce Decree" }, "Divorce Decree"), _jsx("option", { children: "Easement" }, "Easement"), _jsx("option", { children: "Executors Deed" }, "Executors Deed"), _jsx("option", { children: "Foreclosure Deed" }, "Foreclosure Deed"), _jsx("option", { children: "Gift Deed" }, "Gift Deed"), _jsx("option", { children: "Grant Deed" }, "Grant Deed"), _jsx("option", { children: "In-Sale" }, "In-Sale"), _jsx("option", { children: "Indenture" }, "Indenture"), _jsx("option", { children: "Interspousal Transfer Deed" }, "Interspousal Transfer Deed"), _jsx("option", { children: "Lease" }, "Lease"), _jsx("option", { children: "Land Contract" }, "Land Contract"), _jsx("option", { children: "Other" }, "Other"), _jsx("option", { children: "Out-Sale" }, "Out-Sale"), _jsx("option", { children: "Quit Claim Deed" }, "Quit Claim Deed"), _jsx("option", { children: "Re-Recorded Deed" }, "Re-Recorded Deed"), _jsx("option", { children: "Sheriffs Deed" }, "Sheriffs Deed"), _jsx("option", { children: "Substitute Trustees Deed" }, "Substitute Trustees Deed"), _jsx("option", { children: "Survivorship Deed" }, "Survivorship Deed"), _jsx("option", { children: "Transfer on Death Deed" }, "Transfer on Death Deed"), _jsx("option", { children: "Trustee Deed" }, "Trustee Deed"), _jsx("option", { children: "Warranty Deed" }, "Warranty Deed"), _jsx("option", { children: "Will" }, "Will")] }), _jsx("label", { htmlFor: "deedType", children: "Deed Type" })] }) }), _jsxs("div", { id: "otherContainer", className: "col-lg-3 col-md-6 col-sm-6 required-field", style: {
                                                display: findDeedType(selectedDeed?.deedType ? selectedDeed.deedType : "") ? "none" : "",
                                            }, children: [_jsxs("div", { className: "form-floating", children: [_jsx("input", { type: "text", className: "form-control", id: "other", placeholder: "Other", defaultValue: findDeedType(selectedDeed?.deedType ? selectedDeed.deedType : "") ? "" : selectedDeed?.deedType }), _jsx("label", { htmlFor: "other", children: "Other" })] }), _jsx(ErrorMessage, { id: "otherError" })] }), _jsxs("div", { className: "col-lg-3 col-md-6 col-sm-6", children: [_jsx(TextField, { id: "book", label: "Book", type: "text", defaultValue: selectedDeed?.book, maxLength: 100 }), _jsx(ErrorMessage, { id: "bookError" })] }), _jsx("div", { className: "col-md-12 col-lg-12 col-sm-12 ", children: _jsx(TextArea, { id: "comments", label: "Comments", defaultValue: selectedDeed?.comments, maxLength: 4000 }) })] }) })] }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => setShowModal(false), children: "Cancel" }), _jsx(ModalButton, { onClick: () => save(), children: "Save" })] })] })] }));
};
export default DeedsTable;
