import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useMemo, useState } from "react";
import { GetVendorProduct } from "../../servicesapi/Vendorapi";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { CenterContainer, FloatingButton, Table, TableRow, TableTitle, TableTitleBar, TableTitleRow, } from "../order/OrderStyledComponents";
import Pagination from "../Navigation/Pagination/Pagination";
import ConfimDialoague from "../Common/ConfimDialoague";
import { setloading } from "../../store/action/actions";
let PageSize = 10;
const ViewVendorProduct = () => {
    const [rowdata, setRowData] = useState([]);
    const [open, setopen] = useState("");
    const history = useNavigate();
    const dispatch = useDispatch();
    const { VendorData, customization, UserRoleData } = useSelector((state) => state);
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalData, settotalData] = useState(0);
    const columnname = [
        { field: "id", headerName: "S. No.", flex: 1 },
        { field: "Categoryname", headerName: "Category Name", flex: 1 },
        { field: "Productname", headerName: "Product Name", flex: 1 },
    ];
    const renderTableData = () => {
        if (customization.isLoading) {
            updateLoadingMessage("Fetching Data...");
            updateLoading(true);
        }
        else {
            updateLoadingMessage("Fetching Data...");
            updateLoading(false);
        }
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        let data = rowdata;
        settotalData(data.length);
        return data.slice(firstPageIndex, lastPageIndex);
    };
    const currentTableData = useMemo(() => {
        return renderTableData();
    }, [currentPage, customization.isLoading, rowdata]);
    const [heading, SetHeading] = useState([]);
    useEffect(() => {
        dispatch(setloading(true));
        GetVendorProduct().then((res) => {
            let count = 0;
            let data = [];
            res.map((ele) => {
                if (ele.subCategory.length > 0) {
                    ele.subCategory.map((val) => {
                        count++;
                        data.push({
                            Categoryname: ele.name,
                            Productname: val.name,
                            id: count,
                        });
                    });
                }
                else {
                    count++;
                    data.push({
                        Categoryname: ele.name,
                        Productname: "",
                        id: count,
                    });
                }
            });
            console.log(data);
            dispatch(setloading(false));
            setRowData(data);
        });
    }, []);
    const renderRow = (data) => {
        if (data.length > 0)
            return data.map((val, i) => {
                return (_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: `col-1`, children: i + 1 }), _jsx("div", { className: `col`, children: val.Categoryname }), _jsx("div", { className: `col`, children: val.Productname })] }, i));
            });
    };
    const handleConfirmDialogue = (type) => {
        // if (type) {
        //   if (heading.id === "licencetype") dispatch(deleteLicencedata(open));
        //   else if (heading.id === "communicationtype")
        //     dispatch(deleteCommunicationdata(open));
        //   else if (heading.id === "role") dispatch(deleteroledata(open));
        //   else if (heading.id === "accessrole")
        //     dispatch(deleteaccessroledata(open));
        //   else dispatch(deletestatedata(open));
        // }
        // setopen("");
        // renderTableData()
    };
    return (_jsxs(CenterContainer, { children: [_jsxs(Table, { className: "table mb-5 mt-4", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "Vendor Product" }) }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsx(TableRow, { className: "row", children: columnname?.length > 0 ? (columnname?.map((val, i) => {
                                        return (_jsx("div", { className: `col${i === 0 ? "-1" : ""}`, children: _jsx("b", { children: val.headerName }) }, i));
                                    })) : (_jsx(_Fragment, {})) }), currentTableData?.length == 0 && (_jsx(TableRow, { className: "d-flex justify-content-center", children: "No items..." })), renderRow(currentTableData), _jsx(Pagination, { className: "pagination-bar", currentPage: currentPage, totalCount: totalData, pageSize: PageSize, onPageChange: (page) => setCurrentPage(page) })] }) })] }), open !== "" ? (_jsx(ConfimDialoague, { handleClick: (type) => handleConfirmDialogue(type), msg: "Do you really want to delete ?" })) : (_jsx(_Fragment, {})), _jsx(FloatingButton, { title: `Add Vendor Product`, onClick: () => {
                    history(`/viewvendorproduct/add`);
                }, children: "+" })] }));
};
export default ViewVendorProduct;
