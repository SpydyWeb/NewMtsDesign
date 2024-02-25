import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Tabs, TabLinkList, TabLink, TabLinkContent, } from "./StepperStyledComponents";
import { FaWpforms } from "react-icons/fa";
const tabsCutomerName = [
    {
        label: "Profile",
        isEdit: true,
    },
    {
        label: "Communication",
        isEdit: true,
    },
    {
        label: "Product",
        isEdit: true,
    },
    {
        label: "Additional",
        isEdit: true,
    },
    {
        label: "Customer Integration",
        isEdit: true,
    },
    {
        label: "File Upload",
        isEdit: true,
    },
    {
        label: "User Registration",
        isEdit: false,
    },
];
const tabsVendorName = [
    {
        label: "Profile",
        isEdit: true,
    },
    {
        label: "Communication",
        isEdit: true,
    },
    {
        label: "Product",
        isEdit: true,
    },
    {
        label: "Additional",
        isEdit: true,
    },
    {
        label: "Licence",
        isEdit: true,
    },
    {
        label: "File Upload",
        isEdit: true,
    },
    {
        label: "User Registration",
        isEdit: false,
    },
];
const TabContainer = (props) => {
    const [tabs, setTabs] = useState(location.pathname.split("/").includes("vendor")
        ? tabsVendorName
        : tabsCutomerName);
    let urlD = location.pathname.split("/")[location.pathname.split("/").length - 1];
    return (_jsx(Tabs, { children: _jsx(TabLinkList, { children: (tabs.map((val, i) => {
                return ((isNaN(parseInt(urlD)) === false && val?.isEdit === true) ||
                    isNaN(parseInt(urlD)) === true ?
                    _jsx(TabLink, { active: props.activeTab === i, onClick: () => props.setActiveTab(i), children: _jsxs(TabLinkContent, { children: [_jsx(FaWpforms, {}), "\u00A0", val.label] }) }, i) : _jsx(_Fragment, {}));
            })) }) }));
};
export default TabContainer;
