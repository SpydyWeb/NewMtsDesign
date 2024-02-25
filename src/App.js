import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/HomeComp/Home";
import Orders from "./components/order/Order";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import SideBar from "./components/navigation/sidebar/SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import { createContext, useState } from "react";
import Toasts from "./components/utils/ToastContainer";
import LoadingOverlay from "react-loading-overlay-ts";
import ReactLoading from "react-loading";
import OrderProperty from "./components/order/orderProperty/OrderProperty";
import AddOrder from "./components/order/addOrder/AddOrder";
import Confirmation from "./components/order/addOrder/ConfirmationPage";
import ScrollToTop from "./components/utils/ScrollToTop";
import Login from "./components/Authenticate/Login";
import ViewTable from "./components/VendorMaster/ViewTable";
import CommonForm from "./components/VendorMaster/CommonForm";
import ViewTableData from "./components/VendorCutomer/ViewTableData";
import StepperForm from "./components/VendorCutomer/AddForm/StepperForm";
import ViewVendorProduct from "./components/VendorMaster/ViewVendorProduct";
import AddVendorProduct from "./components/VendorMaster/AddVendorProduct";
import AddRoleDefination from "./components/VendorMaster/addRoleDefination";
import Viewaccessrole from "./components/VendorMaster/Viewaccessrole";
export const ApplicationContext = createContext(null);
function App() {
    const [alertMessages, setAlertMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const location = useLocation();
    const updateAlertMessages = (messages) => {
        if (messages.length > 3)
            messages.pop();
        setAlertMessages(messages);
    };
    const updateLoading = (l) => {
        setLoading(l);
    };
    const updateLoadingMessage = (message) => {
        setLoadingMessage(message);
    };
    return (_jsx(LoadingOverlay, { className: "w-100 overflow-x-hidden", active: loading, spinner: _jsxs(_Fragment, { children: [_jsx(ReactLoading, { type: "bars", className: "mx-auto" }), _jsx("br", {})] }), text: loadingMessage, children: _jsx(ApplicationContext.Provider, { value: {
                messages: alertMessages,
                updateMessages: updateAlertMessages,
                loading: loading,
                updateLoading: updateLoading,
                loadingMessage: loadingMessage,
                updateLoadingMessage: updateLoadingMessage,
            }, children: _jsx(ProSidebarProvider, { children: _jsx(ScrollToTop, { children: _jsxs("div", { className: "App", children: [location.pathname === "/" || location.pathname === "/createuser" ? _jsx(_Fragment, {}) : _jsx(SideBar, {}), _jsxs("main", { id: "main", children: [_jsx(Toasts, { messages: alertMessages, setMessages: setAlertMessages }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", Component: Login }), _jsx(Route, { path: "/dashboard", Component: Home }), _jsx(Route, { path: "/orders/property/:orderId", Component: OrderProperty }), _jsx(Route, { path: "/orders/edit/:orderId", Component: AddOrder }), _jsx(Route, { path: "/orders/add", Component: AddOrder }), _jsx(Route, { path: "/orders/confirmation", Component: Confirmation }), _jsx(Route, { path: "/orders", Component: Orders }), _jsx(Route, { path: "/licencetype", Component: ViewTable }), _jsx(Route, { path: "/communicationtype", Component: ViewTable }), _jsx(Route, { path: "/state", Component: ViewTable }), _jsx(Route, { path: "/role", Component: ViewTable }), _jsx(Route, { path: "/user", Component: ViewTable }), _jsx(Route, { path: "/accessrole", Component: ViewTable }), _jsx(Route, { path: "/user/add", Component: CommonForm }), _jsx(Route, { path: "/createuser", Component: CommonForm }), _jsx(Route, { path: "/accessrole/add", Component: CommonForm }), _jsx(Route, { path: "/licencetype/add", Component: CommonForm }), _jsx(Route, { path: "/accessrole/add/:id", Component: CommonForm }), _jsx(Route, { path: "/licencetype/add/:id", Component: CommonForm }), _jsx(Route, { path: "/communicationtype/add", Component: CommonForm }), _jsx(Route, { path: "/communicationtype/add/:id", Component: CommonForm }), _jsx(Route, { path: "/state/add", Component: CommonForm }), _jsx(Route, { path: "/role/add", Component: CommonForm }), _jsx(Route, { path: "/state/add/:id", Component: CommonForm }), _jsx(Route, { path: "/role/add/:id", Component: CommonForm }), _jsx(Route, { path: "/viewvendor", Component: ViewTableData }), _jsx(Route, { path: "/vendor/create", Component: StepperForm }), _jsx(Route, { path: "/vendor/edit/:id", Component: StepperForm }), _jsx(Route, { path: "/customer/create", Component: StepperForm }), _jsx(Route, { path: "/customer/edit/:id", Component: StepperForm }), _jsx(Route, { path: "/customer", Component: ViewTableData }), _jsx(Route, { path: "/viewvendorproduct", Component: ViewVendorProduct }), _jsx(Route, { path: "/viewvendorproduct/add", Component: AddVendorProduct }), _jsx(Route, { path: "/accessroledefinition", Component: AddRoleDefination }), _jsx(Route, { path: "/viewaccessrole", Component: Viewaccessrole })] })] })] }) }) }) }) }));
}
export default App;
