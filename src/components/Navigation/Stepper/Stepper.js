import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabLinkList, TabLink, TabLinkContent } from "./StepperStyledComponents";
import { MdOutlineDiversity2 } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { GiPayMoney, GiShakingHands } from "react-icons/gi";
import { FaWpforms } from "react-icons/fa";
import DownloadReportButton from "../../utils/ReportDownloadButton";
const TabContainer = (props) => {
    return (_jsx(Tabs, { children: _jsxs(TabLinkList, { children: [_jsx(TabLink, { active: props.activeTab === 0, onClick: () => props.setActiveTab(0), children: _jsxs(TabLinkContent, { children: [_jsx(FaWpforms, {}), "\u00A0Basic"] }) }), _jsx(TabLink, { active: props.activeTab === 1, onClick: () => props.setActiveTab(1), children: _jsxs(TabLinkContent, { children: [_jsx(GiShakingHands, {}), "\u00A0Deeds"] }) }), _jsx(TabLink, { active: props.activeTab === 2, onClick: () => props.setActiveTab(2), children: _jsxs(TabLinkContent, { children: [_jsx(GiPayMoney, {}), "\u00A0Mortgage"] }) }), _jsx(TabLink, { active: props.activeTab === 3, onClick: () => props.setActiveTab(3), children: _jsxs(TabLinkContent, { children: [_jsx(MdOutlineSecurity, {}), "\u00A0Liens"] }) }), _jsx(TabLink, { active: props.activeTab === 4, onClick: () => props.setActiveTab(4), children: _jsxs(TabLinkContent, { children: [_jsx("i", { className: "bi bi-cash-coin" }), "\u00A0Taxes"] }) }), _jsx(TabLink, { active: props.activeTab === 5, onClick: () => props.setActiveTab(5), children: _jsxs(TabLinkContent, { children: [_jsx(MdOutlineDiversity2, {}), "\u00A0Miscellaneous"] }) }), _jsx(DownloadReportButton, {})] }) }));
};
export default TabContainer;
