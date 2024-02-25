import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PageNumberContainer, PageSizeContainer, PaginationContainer } from "./UtilStyledComponents";
import "./utils.css";
const Pagination = (props) => {
    return (_jsxs(PaginationContainer, { className: "row pagination-bar", length: props.data.length, children: [_jsxs(PageSizeContainer, { className: "col-sm-6", children: ["Records per page:", _jsxs("select", { id: "pageSize", defaultValue: props.pageSize, onChange: () => {
                            let val = document.getElementById("pageSize").value;
                            props.setCurrPage(1);
                            document.getElementById("paginationNo").value = "1";
                            props.setPageSize(parseInt(String(val)));
                        }, children: [_jsx("option", { value: "10", children: "10" }), _jsx("option", { value: "25", children: "25" }), _jsx("option", { value: "50", children: "50" }), _jsx("option", { value: "100", children: "100" })] })] }), _jsxs(PageNumberContainer, { className: "col-sm-6", children: ["Page", _jsx("input", { id: "paginationNo", type: "number", min: 1, max: props.totalPage, width: 1, defaultValue: props.currPage, onChange: () => {
                            let val = document.getElementById("paginationNo").value;
                            if (val >= 1 && val <= props.totalPage) {
                                props.setCurrPage(parseInt(String(val)));
                            }
                        } }), "of ", props.totalPage, "\u00A0"] })] }));
};
export default Pagination;
