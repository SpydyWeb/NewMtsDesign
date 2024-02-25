import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import "./pagination.css";
const Pagination = (props) => {
    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className, } = props;
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
    const onNext = () => {
        onPageChange(currentPage + 1);
    };
    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };
    let lastPage = paginationRange[paginationRange.length - 1];
    return (_jsxs("ul", { className: classnames("pagination-container d-flex justify-content-end", { [className]: className }), children: [_jsx("li", { className: classnames("pagination-item", {
                    disabled: currentPage === 1,
                }), onClick: onPrevious, children: _jsx("div", { className: "arrow left" }) }), paginationRange.map((pageNumber) => {
                if (pageNumber === DOTS) {
                    return _jsx("li", { className: "pagination-item dots", children: "\u2026" });
                }
                return (_jsx("li", { className: classnames("pagination-item", {
                        selected: pageNumber === currentPage,
                    }), onClick: () => onPageChange(pageNumber), children: pageNumber }));
            }), _jsx("li", { className: classnames("pagination-item", {
                    disabled: currentPage === lastPage,
                }), onClick: onNext, children: _jsx("div", { className: "arrow right" }) })] }));
};
export default Pagination;
