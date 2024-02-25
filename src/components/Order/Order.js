import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { AdvancedFilterToggle, CenterContainer, OrderContainer, SearchBar, SearchButton, UtilityButton, Table, TableRow, TableTitleBar, TableTitleRow, TableTitle, InputContainer, ErrorMessage, FloatingButton, } from "./OrderStyledComponents";
import { SearchContainer, SearchIcon } from "./orderProperty/OrderPropertyStyledComponents";
import Pagination from "../utils/PaginationComponent";
import { Products } from "../../utils/form-types";
import { useNavigate } from "react-router-dom";
import { Accordion, Card, useAccordionButton, Form, InputGroup, AccordionContext } from "react-bootstrap";
import { FaSearch, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { ControlledSelectBox, SelectBox, TextField } from "../utils/InputGroup";
import "./Order.css";
import orderServices from "../../services/order-services";
import { ApplicationContext } from "../../App";
import locationServices from "../../services/location-services";
import Multiselect from "multiselect-react-dropdown";
function CustomToggle({ children, eventKey }) {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, () => { });
    const isCurrentEventKey = activeEventKey === eventKey;
    return (_jsx(AdvancedFilterToggle, { type: "button", onClick: decoratedOnClick, children: _jsxs("b", { children: [children, isCurrentEventKey ? _jsx(FaAngleUp, {}) : _jsx(FaAngleDown, {})] }) }));
}
const Orders = () => {
    const [clientOptions, setClientOptions] = useState([]);
    const [productOptions, setProductOptions] = useState();
    const [optionRender, setOptionRender] = useState(0);
    const [productsPlaceholder, setProductsPlaceholder] = useState("Products: none selected");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [orders, setOrders] = useState([]);
    const [orderPage, setOrderPage] = useState();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const [icons, setIcons] = useState({
        orderIdSortIcon: "",
        clientIdSortIcon: "",
        clientReferenceNumberSortIcon: "",
        loanIdSortIcon: "",
        propertyAddressIcon: "",
    });
    const history = useNavigate();
    useEffect(() => {
        orderServices.getData("GetClientList").then((response) => {
            if (response.data.statusCode == 200 && response.data.body.Status)
                setClientOptions(response.data.body.Data);
        });
        orderServices.getData("GetProductList").then((response) => {
            let temp = new Map();
            Object.values(Products).forEach((productType) => {
                temp.set(productType, response.data.body.Data.filter((item) => {
                    return item.productgroup == productType;
                }));
            });
            setProductOptions(temp);
        });
    }, []);
    useEffect(() => {
        setOrderPage(orders?.slice((currPage - 1) * pageSize, currPage * pageSize));
    }, [currPage, totalPage, pageSize, orders]);
    const autofillLocation = () => {
        const zip = document.getElementById("zip");
        const zipError = document.getElementById("zipError");
        zipError.innerText = "";
        const city = document.getElementById("city");
        const state = document.getElementById("state");
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
    };
    const getOptions = () => {
        let options = [];
        let products = productOptions?.get(document.getElementById("selectProductGroup").value);
        if (!products)
            products = [];
        if (products.length) {
            options.push({ label: "Select All", value: 0 });
        }
        for (let i = 0; i < products.length; i++) {
            options.push({ label: products[i].keyid + ". " + products[i].productname, value: products[i].keyid });
        }
        return options;
    };
    const getOrders = () => {
        updateLoadingMessage("Fetching orders...");
        updateLoading(true);
        const globalSearch = document.getElementById("globalSearch");
        const orderId = document.getElementById("orderId");
        const clientId = document.getElementById("clientId");
        const loanId = document.getElementById("loanId");
        const referenceNumber = document.getElementById("referenceNumber");
        const status = document.getElementById("status");
        const date = document.getElementById("date");
        const orderToDate = document.getElementById("orderToDate");
        const propertyAddress = document.getElementById("propertyAddress");
        const zip = document.getElementById("zip");
        const city = document.getElementById("city");
        const state = document.getElementById("state");
        const selectProductGroup = document.getElementById("selectProductGroup");
        if (globalSearch.value == "" && orderId.value == "" && clientId.value == "-select-" && loanId.value == "" && referenceNumber.value == "" &&
            status.value == "-select-" && date.value == "" && orderToDate.value == "" && propertyAddress.value == "" && zip.value == "" && city.value == "" &&
            state.value == "" && selectProductGroup.value == "-select-") {
            updateMessages([
                {
                    title: "Error !!",
                    message: "No criteria selected for search!! Atleast 1 field is mandatory!",
                },
                ...messages,
            ]);
            updateLoading(false);
            return;
        }
        orderServices
            .getData("OrderSearch", {
            GlobalSearch: globalSearch.value,
            AdvanceSearch: {
                OrderId: parseInt(orderId.value),
                ClientId: parseInt(clientId.value),
                LoanId: loanId.value,
                ClientReferenceNumber: referenceNumber.value,
                OrderStatus: status.value,
                OrderDate: date?.valueAsDate?.getMonth() + "/" + date?.valueAsDate?.getDate() + "/" + date?.valueAsDate?.getFullYear(),
                OrderToDate: orderToDate?.valueAsDate?.getMonth() + "/" + orderToDate?.valueAsDate?.getDate() + "/" + orderToDate?.valueAsDate?.getFullYear(),
                PropertyAddress: propertyAddress.value,
                PropertyZip: parseInt(zip.value),
                PropertyCity: city.value,
                PropertyState: state.value,
                ProductGroup: selectProductGroup.value,
                Product: selectedProducts.map((product) => product.value).filter((p) => p != 0),
            },
        })
            .then((response) => {
            updateLoading(false);
            if (response.data.statusCode == 200) {
                if (response.data.body.Status) {
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Order fetched successfully",
                        },
                        ...messages,
                    ]);
                    setTotalPage(Math.ceil(response.data.body.Data.length / pageSize));
                    setOrders(response.data.body.Data);
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not fetch orders! " + response.data.body.Message,
                        },
                        ...messages,
                    ]);
                }
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch orders! Please try again.",
                    },
                    ...messages,
                ]);
            }
        })
            .catch((e) => {
            console.log("caught an exception: " + e);
            updateLoading(false);
            if (e.message == "Network Error") {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch orders! Please try again.",
                    },
                    ...messages,
                ]);
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not fetch orders! Please try again.",
                    },
                    ...messages,
                ]);
            }
        });
    };
    const handleSort = (column, iconId) => {
        let temp = icons;
        for (let k in icons) {
            if (k != iconId)
                temp[k] = "";
        }
        if (icons[iconId] == "bi bi-arrow-down") {
            if (orders)
                setOrders([].concat(orders).sort((order1, order2) => {
                    let val1 = (column == "propertyAddress" ? getAddress(order1) : order1[column]).toLocaleString();
                    let val2 = (column == "propertyAddress" ? getAddress(order2) : order2[column]).toLocaleString();
                    if (val1 > val2)
                        return -1;
                    if (val1 < val2)
                        return 1;
                    return 0;
                }));
            icons[iconId] = "bi bi-arrow-up";
        }
        else {
            setOrders([].concat(orders).sort((order1, order2) => {
                let val1 = (column == "propertyAddress" ? getAddress(order1) : order1[column]).toLocaleString();
                let val2 = (column == "propertyAddress" ? getAddress(order2) : order2[column]).toLocaleString();
                if (val1 < val2)
                    return -1;
                if (val1 > val2)
                    return 1;
                return 0;
            }));
            icons[iconId] = "bi bi-arrow-down";
        }
        setIcons(icons);
    };
    const getAddress = (order) => {
        let address = order?.propertyaddress + (order?.propertyaddress ? ", " : "") + order?.propertycity + (order?.propertycity ? ", " : "") + order?.propertystate + (order?.propertystate ? ", " : "") + order?.propertyzip;
        if (address.length > 0 && address.charAt(address.length - 2) == ",")
            address = address.substring(0, address.length - 2);
        return address;
    };
    return (_jsxs(OrderContainer, { className: "mt-3", children: [_jsx(CenterContainer, { className: "mb-5", children: _jsx(Accordion, { defaultActiveKey: "", className: "w-100", children: _jsxs(Card, { children: [_jsxs(SearchBar, { children: [_jsxs(InputGroup, { className: "mb-1 w-50", children: [_jsx(Form.Control, { id: "globalSearch", placeholder: "Search", "aria-label": "Search", "aria-describedby": "filter-search" }), _jsx(SearchButton, { id: "filter-search", onClick: () => {
                                                    getOrders();
                                                }, children: _jsx(FaSearch, {}) })] }), _jsx(CustomToggle, { eventKey: "0", children: "Advanced Filter" })] }), _jsx(Accordion.Collapse, { eventKey: "0", children: _jsx(Card.Body, { className: "px-1 py=2", children: _jsx("div", { className: "container-fluid", children: _jsxs("div", { className: "row", children: [_jsx(InputContainer, { width: "14%", className: "px-1", children: _jsx(TextField, { id: "orderId", label: "Order Id", type: "number", defaultValue: "" }) }), _jsxs(InputContainer, { width: "14%", className: "px-1", children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "clientId", defaultValue: "-select-", title: "Client Id", children: [_jsx("option", { defaultChecked: true, disabled: true, children: "-select-" }, 0), clientOptions.map((item, idx) => (_jsx("option", { value: item.keyid, children: item.keyvalue }, "clientId" + idx)))] }), _jsx("label", { htmlFor: "clientId", children: "Client Id" })] }), _jsx(ErrorMessage, { id: "clientIdError" })] }), _jsx(InputContainer, { width: "14%", className: "px-1", children: _jsx(TextField, { id: "loanId", label: "Loan Id", type: "text", defaultValue: "" }) }), _jsx(InputContainer, { width: "18%", className: "px-1", children: _jsx(TextField, { id: "referenceNumber", label: "Reference Number", type: "text", defaultValue: "" }) }), _jsx(InputContainer, { width: "12%", className: "px-1", children: _jsx(SelectBox, { id: "status", label: "Status", defaultValue: "", options: ["New", "InProgress", "Completed", "Cancelled"] }) }), _jsx(InputContainer, { width: "14%", className: "px-1", children: _jsx(TextField, { id: "date", label: "Date", type: "date", defaultValue: "" }) }), _jsx(InputContainer, { width: "14%", className: "px-1", children: _jsx(TextField, { id: "orderToDate", label: "Order To Date", type: "date", defaultValue: "" }) }), _jsx(InputContainer, { width: "26%", className: "px-1", children: _jsx(TextField, { id: "propertyAddress", label: "Property Address", type: "text", defaultValue: "" }) }), _jsxs(InputContainer, { width: "14%", className: "px-1", children: [_jsxs(SearchContainer, { className: "form-floating", children: [_jsx("input", { type: "text", className: "form-control w-100", id: "zip", placeholder: "Zip", defaultValue: "", maxLength: 5, onChange: (e) => {
                                                                        const errorDiv = document.getElementById("zipError");
                                                                        errorDiv.innerText = "";
                                                                        // if (e.target.value.length >= 5) errorDiv.innerText = "Max character limit reached (5)";
                                                                        if (e.target.value.length == 0)
                                                                            errorDiv.innerText = "This field is required!";
                                                                    } }), _jsx("label", { htmlFor: "zip", children: "Zip" }), _jsx(SearchIcon, { className: "bi bi-search search-icon", onClick: () => {
                                                                        autofillLocation();
                                                                    } })] }), _jsx(ErrorMessage, { id: "zipError" })] }), _jsx(InputContainer, { width: "16%", className: "px-1", children: _jsx(TextField, { id: "city", label: "City", type: "text", defaultValue: "" }) }), _jsx(InputContainer, { width: "10%", className: "px-1", children: _jsx(TextField, { id: "state", label: "State", type: "text", defaultValue: "", maxLength: 2 }) }), _jsx(InputContainer, { width: "14%", className: "px-1", children: _jsx(ControlledSelectBox, { id: "selectProductGroup", label: "Product Group", options: Object.values(Products), defaultValue: "-select-", changeHandler: () => {
                                                            setSelectedProducts([]);
                                                            setOptionRender(optionRender + 1);
                                                        } }) }), _jsx(InputContainer, { width: "20%", className: "col-2 px-1 multiselect-container", children: _jsx(Multiselect, { className: "mt-1 mx-1 w-100 h-100", displayValue: "label", hideSelectedList: true, avoidHighlightFirstOption: true, selectedValues: selectedProducts, placeholder: productsPlaceholder, onRemove: (event, curr) => {
                                                            if (curr.value == 0) {
                                                                setProductsPlaceholder("Products: none selected");
                                                                setSelectedProducts([]);
                                                            }
                                                            else {
                                                                setProductsPlaceholder(`Products: ${event.filter((e) => e.value != 0).length} selected`);
                                                                setSelectedProducts(event.filter((e) => e.value != 0));
                                                            }
                                                        }, onSelect: (event, curr) => {
                                                            if (curr.value == 0) {
                                                                setProductsPlaceholder("Products: all selected");
                                                                setSelectedProducts(getOptions());
                                                            }
                                                            else {
                                                                if (event.length == getOptions().length - 1) {
                                                                    event.push({ value: 0, label: "Select All" });
                                                                    setProductsPlaceholder(`Products: all selected`);
                                                                }
                                                                else {
                                                                    setProductsPlaceholder(`Products: ${event.length} selected`);
                                                                }
                                                                setSelectedProducts(event);
                                                            }
                                                        }, options: getOptions(), showCheckbox: true }) }, optionRender), _jsx("div", { className: "col-10" }), _jsx("div", { className: "col-2 mt-2", children: _jsxs(UtilityButton, { onClick: () => {
                                                            getOrders();
                                                        }, children: [_jsx(FaSearch, {}), "\u00A0Search"] }) })] }) }) }) })] }) }) }), orderPage && orderPage?.length > 0 && (_jsx(CenterContainer, { children: _jsxs(Table, { className: "table mb-5", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "Orders" }) }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-1", onClick: () => handleSort("orderid", "orderIdSortIcon"), children: _jsxs("b", { children: ["Order Id\u00A0", _jsx("i", { id: "sortIcon", className: icons["orderIdSortIcon"] })] }) }), _jsx("div", { className: "col-3", onClick: () => handleSort("clientid", "clientIdSortIcon"), children: _jsxs("b", { children: ["Client Id/ Name\u00A0", _jsx("i", { id: "sortIcon", className: icons["clientIdSortIcon"] })] }) }), _jsx("div", { className: "col-3", onClick: () => handleSort("clientreferencenumber", "clientReferenceNumberSortIcon"), children: _jsxs("b", { children: ["Client Reference Number\u00A0", _jsx("i", { id: "sortIcon", className: icons["clientReferenceNumberSortIcon"] })] }) }), _jsx("div", { className: "col-1", onClick: () => handleSort("loanid", "loanIdSortIcon"), children: _jsxs("b", { children: ["Loan id\u00A0", _jsx("i", { id: "sortIcon", className: icons["loanIdSortIcon"] })] }) }), _jsx("div", { className: "col-3", onClick: () => handleSort("propertyAddress", "propertyAddressSortIcon"), children: _jsxs("b", { children: ["Property Address\u00A0", _jsx("i", { id: "sortIcon", className: icons["propertyAddressSortIcon"] })] }) }), _jsx("div", { className: "col-1", children: _jsx("b", { children: "Action" }) })] }), orderPage.length == 0 && _jsx(TableRow, { className: "d-flex justify-content-center", children: "No items..." }), orderPage.map((item, idx) => (_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-1", children: item.orderid }), _jsx("div", { className: "col-3", children: item.clientid }), _jsx("div", { className: "col-3", children: item.clientreferencenumber }), _jsx("div", { className: "col-1", children: item.loanid }), _jsx("div", { className: "col-3", children: getAddress(item) }), _jsxs("div", { className: "col-1", children: [_jsx("i", { className: "bi mx-1 bi-pencil-square pointer", onClick: () => {
                                                            history("/orders/edit/" + item.orderid);
                                                        } }), _jsx("i", { className: "bi mx-1 bi-clipboard-plus pointer", onClick: () => {
                                                            history("/orders/property/" + item.orderid);
                                                        } })] })] }, "order" + idx))), _jsx(Pagination, { totalPage: totalPage, data: orderPage, pageSize: pageSize, setPageSize: setPageSize, currPage: currPage, setCurrPage: setCurrPage })] }) })] }) })), _jsx(FloatingButton, { title: "Add order", onClick: () => {
                    history("/orders/add");
                }, children: "+" })] }));
};
export default Orders;
