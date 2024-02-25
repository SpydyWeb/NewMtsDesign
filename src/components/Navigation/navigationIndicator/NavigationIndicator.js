import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { NavigationIndicatorSpan } from "../../order/OrderStyledComponents";
const NavigationIndicator = (props) => {
    return (_jsxs("ul", { className: "nav px-2", children: [props.path.map((item, idx) => (_jsxs(_Fragment, { children: [_jsx("li", { className: "nav-item", children: _jsx(Link, { className: "nav-link p-0", to: item.url, children: _jsxs(NavigationIndicatorSpan, { children: [item.icon, _jsx("i", { children: item.name })] }) }) }), _jsx("li", { className: "nav-item px-1", children: _jsx(NavigationIndicatorSpan, { className: "nav-link p-0 fw-bold", children: _jsx("i", { children: "\u00A0>\u00A0" }) }) })] }))), _jsx("li", { className: "nav-item", children: _jsx(Link, { className: "nav-link p-0 active", to: props.curr.url, children: _jsxs(NavigationIndicatorSpan, { children: [props.curr.icon, _jsx("i", { children: props.curr.name })] }) }) })] }));
};
export default NavigationIndicator;
