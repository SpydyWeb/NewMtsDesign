import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { AdvancedFilterToggle, CenterContainer, FloatingButton, OrderContainer, SearchBar, SearchButton, Table, TableRow, TableTitle, TableTitleBar, TableTitleRow, } from "../order/OrderStyledComponents";
import { Accordion, AccordionContext, Card, Form, InputGroup, useAccordionButton, } from "react-bootstrap";
import { FaAngleDown, FaAngleUp, FaRegEdit, FaSearch } from "react-icons/fa";
import { GetallVendorBySearch, } from "../../servicesapi/Vendorapi";
import { CustomerSearch } from "../../servicesapi/Customerapi";
import AdvanceFilter from "./AdvanceFilter";
import { ApplicationContext } from "../../App";
import { useNavigate } from "react-router-dom";
function CustomToggle({ children, eventKey }) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, () => { });
    const isCurrentEventKey = activeEventKey === eventKey;
    return (_jsx(AdvancedFilterToggle, { type: "button", onClick: decoratedOnClick, children: _jsxs("b", { children: [children, isCurrentEventKey ? _jsx(FaAngleUp, {}) : _jsx(FaAngleDown, {})] }) }));
}
const ViewTable = () => {
    const [allstate, setAllState] = useState([]);
    const [allstatedata, setAllStatedata] = useState([]);
    const history = useNavigate();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const [filterdata, setFilterdata] = useState({
        Id: "",
        Email: "",
        Name: "",
        Status: 0,
        Contact: "",
        Licence: "",
        State: "",
        Product: "",
    });
    const [isDataload, setisDataload] = useState(false);
    const columns = [
        {
            field: "Action",
            headerName: "Action",
        },
        {
            headerName: "Status",
            field: "status",
        },
        { headerName: "ID", field: "vendorid" },
        { headerName: "Name", field: "name" },
        { headerName: "Email", field: "email", minWidth: 300, flex: 1 },
        { headerName: "Contact", field: "contact", minWidth: 300, flex: 1 },
    ];
    const Customercolumns = [
        {
            field: "Action",
            headerName: "Action",
        },
        { headerName: "ID", field: "vendorid", minWidth: 150, flex: 1 },
        { headerName: "Name", field: "name", minWidth: 150, flex: 1 },
        { headerName: "Email", field: "email", minWidth: 300, flex: 1 },
        // { headerName: 'State', field: 'state', minWidth: 150, flex: 1 },
        { headerName: "Contact", field: "contact", minWidth: 300, flex: 1 },
        // { headerName: 'Product', field: 'product', minWidth: 150, flex: 1 }
    ];
    useEffect(() => {
        setAllStatedata([]);
        setFilterdata({
            Id: "",
            Email: "",
            Name: "",
            Status: 0,
            Contact: "",
            Licence: "",
            State: "",
            Product: "",
        });
    }, [location.pathname]);
    const handleSearch = () => {
        updateLoadingMessage("Fetching Vendor Data...");
        updateLoading(true);
        let data = {};
        if (filterdata.Id !== "")
            data.id = filterdata.Id;
        if (filterdata.Name !== "")
            data.name = filterdata.Name;
        if (filterdata.Email !== "")
            data.email = filterdata.Email;
        if (filterdata.Contact !== "")
            data.contact = filterdata.Contact;
        if (filterdata.Licence !== "")
            data.licence = filterdata.Licence;
        if (filterdata.State !== "")
            data.state = filterdata.State;
        if (filterdata.Product !== "")
            data.product = filterdata.Product;
        if (location.pathname.split("/").includes("viewvendor")) {
            data.status = filterdata.Status;
            GetallVendorBySearch(data).then((res) => {
                let data = [];
                console.log(res);
                if (res.length === 0)
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "No data found!!",
                        },
                        ...messages,
                    ]);
                res.map((ele) => data.push({
                    id: ele.id,
                    vendorid: ele.vendorid,
                    name: ele.name,
                    email: ele.email,
                    state: ele.address.split(",")[3],
                    contact: ele.contact1.split(",")[4] === ""
                        ? ele.contact1.split(",")[3]
                        : ele.contact1.split(",")[3] +
                            " ," +
                            ele.contact1.split(",")[4],
                    licenceType: ele.licence.licenceType,
                    product: ele.product.name,
                    status: ele.status,
                }));
                updateLoading(false);
                setAllStatedata(data);
            });
        }
        else {
            CustomerSearch(data).then((res) => {
                console.log(res);
                if (res.data.length === 0)
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "No data found!!",
                        },
                        ...messages,
                    ]);
                let data = [];
                res.data.map((ele) => data.push({
                    id: ele.id,
                    vendorid: ele.customerId,
                    name: ele.name,
                    email: ele.email,
                    state: ele.address.split(",")[3],
                    contact: ele.contact1.split(",")[4] === ""
                        ? ele.contact1.split(",")[3]
                        : ele.contact1.split(",")[3] +
                            " ," +
                            ele.contact1.split(",")[4],
                    product: ele.product.name,
                }));
                setAllStatedata(data);
                updateLoading(false);
            });
        }
    };
    const handleFilterChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (value === "clear")
            setFilterdata({ ...filterdata, [name]: "" });
        else
            setFilterdata({ ...filterdata, [name]: value });
    };
    const renderColumn = (data) => {
        return data.map((ele, i) => {
            return (_jsx("div", { className: `col${ele.field === "status" || ele.field === "Action" ? "-1" : ""}`, children: _jsx("b", { children: ele.headerName }) }, i));
        });
    };
    const renderStatusCell = (status) => {
        return status === 0 ? (_jsx("span", { style: {
                border: "2px solid black",
                padding: "3px 6px",
                borderRadius: "5px",
                color: "black",
            }, children: "New" })) : status === 1 ? (_jsx("span", { style: {
                border: "2px solid orange",
                padding: "3px 6px",
                borderRadius: "5px",
                color: "orange",
            }, children: "Updated" })) : status === 2 ? (_jsx("span", { style: {
                border: "2px solid green",
                padding: "3px 6px",
                borderRadius: "5px",
                color: "green",
            }, children: "Verified" })) : (_jsx("span", { style: {
                border: "2px solid red",
                padding: "3px 6px",
                borderRadius: "5px",
                color: "red",
            }, children: "InActive" }));
    };
    const handleEditData = (val) => {
        console.log(val);
        history(`/${location.pathname.split("/").includes("viewvendor")
            ? `vendor`
            : "customer"}/edit/${val.id}`, { state: val });
    };
    const renderRows = (data, columns) => {
        let fields = [];
        columns.map((ele) => {
            fields.push(ele.field);
        });
        return data.map((item, idx) => (_jsx(TableRow, { className: "row", children: fields.map((val, i) => {
                return i === 0 ? (_jsxs("div", { className: `col-1`, children: [" ", _jsx(FaRegEdit, { role: "button", size: 20, onClick: () => handleEditData(item) })] }, i)) : (_jsx("div", { className: `col${val === "status" || val === "Action" ? "-1" : ""}`, children: val === "status" ? renderStatusCell(item[val]) : item[val] }, i));
            }) }, "order" + idx)));
    };
    return (_jsxs(OrderContainer, { className: "mt-3", children: [_jsx(CenterContainer, { className: "mb-5", children: _jsx(Accordion, { defaultActiveKey: "", className: "w-100", children: _jsxs(Card, { children: [_jsxs(SearchBar, { children: [_jsxs(InputGroup, { className: "mb-1 w-50", children: [_jsx(Form.Control, { id: "globalSearch", placeholder: "Search", "aria-label": "Search", name: "Name", onChange: (e) => handleFilterChange(e), value: filterdata.Name, "aria-describedby": "filter-search" }), _jsx(SearchButton, { id: "filter-search", onClick: () => handleSearch(), children: _jsx(FaSearch, {}) })] }), _jsx(CustomToggle, { eventKey: "0", children: "Advanced Filter" })] }), _jsx(Accordion.Collapse, { eventKey: "0", children: _jsx(AdvanceFilter, { filterdata: filterdata, handleFilterChange: handleFilterChange, allstate: allstate, handleSearch: handleSearch }) })] }) }) }), isDataload === false && allstatedata?.length > 0 && (_jsx(CenterContainer, { children: _jsxs(Table, { className: "table mb-5", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: location.pathname.split("/").includes("viewvendor")
                                            ? "Vendor"
                                            : "Customer" }) }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsx(TableRow, { className: "row", children: renderColumn(location.pathname.split("/").includes("viewvendor")
                                            ? columns
                                            : Customercolumns) }), allstatedata.length == 0 && (_jsx(TableRow, { className: "d-flex justify-content-center", children: "No items..." })), allstatedata.length > 0 ? (renderRows(allstatedata, location.pathname.split("/").includes("viewvendor")
                                        ? columns
                                        : Customercolumns)) : (_jsx(_Fragment, {}))] }) })] }) })), _jsx(FloatingButton, { title: "Add order", onClick: () => {
                    history(`/${location.pathname.split("/").includes("viewvendor")
                        ? "vendor"
                        : "customer"}/create`);
                }, children: "+" })] }));
};
export default ViewTable;
