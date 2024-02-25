import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useMemo, useState } from "react";
import { CenterContainer, FloatingButton, Table, TableRow, TableTitle, TableTitleBar, TableTitleRow, } from "../order/OrderStyledComponents";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommunicationdata, deleteLicencedata, deletestatedata, getCommunicationdata, getLicencedata, getStatedata, } from "../../store/action/vendorAction";
import { deleteaccessroledata, deleteroledata, getaccessroledata, getalluserdata, getroledata, } from "../../store/action/userAction";
import { HeadingName } from "./columnField";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "../Navigation/Pagination/Pagination";
import ConfimDialoague from "../Common/ConfimDialoague";
import { ApplicationContext } from "../../App";
let PageSize = 10;
const ViewTable = () => {
    const dispatch = useDispatch();
    const { VendorData, customization, UserRoleData } = useSelector((state) => state);
    const history = useNavigate();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalData, settotalData] = useState(0);
    const [open, setopen] = useState("");
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
        let data = location.pathname.split("/").includes("licencetype")
            ? VendorData.licenceTypeData
            : location.pathname.split("/").includes("state")
                ? VendorData.stateData
                : location.pathname.split("/").includes("role")
                    ? UserRoleData.RoleData
                    : location.pathname.split("/").includes("accessrole")
                        ? UserRoleData.AccessRoleData
                        : location.pathname.split("/").includes("user")
                            ? UserRoleData.UserData
                            : VendorData.communicationTypeData;
        settotalData(data.length);
        return data.slice(firstPageIndex, lastPageIndex);
    };
    const currentTableData = useMemo(() => {
        return renderTableData();
    }, [location.pathname, currentPage, customization.isLoading]);
    const [heading, SetHeading] = useState([]);
    useEffect(() => {
        if (location.pathname.split("/").includes("licencetype"))
            dispatch(getLicencedata());
        else if (location.pathname.split("/").includes("communicationtype"))
            dispatch(getCommunicationdata());
        else if (location.pathname.split("/").includes("state"))
            dispatch(getStatedata());
        else if (location.pathname.split("/").includes("role"))
            dispatch(getroledata());
        else if (location.pathname.split("/").includes("accessrole"))
            dispatch(getaccessroledata());
        else if (location.pathname.split("/").includes("user"))
            dispatch(getalluserdata());
        SetHeading(...HeadingName.filter((id) => id.id === location.pathname.split("/")[1]));
    }, [location.pathname]);
    const handleEditData = (id) => {
        if (location.pathname.split("/").includes("licencetype"))
            id = id?.id;
        else if (location.pathname.split("/").includes("state"))
            id = id?.state_id;
        else if (location.pathname.split("/").includes("role"))
            id = id?.id;
        else if (location.pathname.split("/").includes("accessrole"))
            id = id?.id;
        else
            id = id?.com_id;
        if (id !== "") {
            let data = "";
            if (location.pathname.split("/").includes("licencetype")) {
                for (let i = 0; i < VendorData.licenceTypeData.length; i++) {
                    if (VendorData.licenceTypeData[i].Licence_id === id) {
                        data = VendorData.licenceTypeData[i];
                        break;
                    }
                }
            }
            else if (location.pathname.split("/").includes("state")) {
                for (let i = 0; i < VendorData.stateData.length; i++) {
                    if (VendorData.stateData[i].state_id === id) {
                        data = VendorData.stateData[i];
                        break;
                    }
                }
            }
            else if (location.pathname.split("/").includes("role")) {
                for (let i = 0; i < UserRoleData.RoleData.length; i++) {
                    if (UserRoleData.RoleData[i].id === id) {
                        data = UserRoleData.RoleData[i];
                        break;
                    }
                }
            }
            else if (location.pathname.split("/").includes("accessrole")) {
                for (let i = 0; i < UserRoleData.AccessRoleData.length; i++) {
                    if (UserRoleData.AccessRoleData[i].id === id) {
                        data = UserRoleData.AccessRoleData[i];
                        break;
                    }
                }
            }
            else {
                for (let i = 0; i < VendorData.communicationTypeData.length; i++) {
                    if (VendorData.communicationTypeData[i].com_id === id) {
                        data = VendorData.communicationTypeData[i];
                        break;
                    }
                }
            }
            heading?.formfield?.map((ele) => {
                heading.initialValue[ele.name] = data[ele.name];
            });
            history(`/${heading.id}/add/${id}`, { state: { formData: data } });
        }
        else {
            heading?.formfield?.map((ele) => {
                heading.initialValue[ele.name] = "";
            });
        }
        let formtype = location.pathname.split("/")[2];
        // dispatch(setDialogueview(formtype));
    };
    const renderRow = (data) => {
        if (data.length > 0)
            return data.map((val, i) => {
                return (_jsx(TableRow, { className: "row", children: heading?.TableColumn?.length > 0 ? (Object.keys(heading?.TableColumn).map((Pkey) => Object.keys(val).map((key, index) => heading?.TableColumn[Pkey].id === key ? (_jsx("div", { className: `col${index === 0 ? "-1" : ""}`, children: val[key] })) : Object.keys(heading.TableColumn).length - 1 === index &&
                        heading.TableColumn[Pkey].id === "Action" ? (_jsxs("div", { className: "col", children: [_jsx(FaRegEdit, { role: "button", size: 20, onClick: () => handleEditData(val) }), _jsx(MdDeleteOutline, { role: "button", size: 20, onClick: () => handleConfirmBox(val) })] })) : (_jsx(_Fragment, {}))))) : (_jsx(_Fragment, {})) }, i));
            });
    };
    const handleConfirmBox = (id) => {
        if (location.pathname.split("/").includes("licencetype"))
            id = id?.id;
        else if (location.pathname.split("/").includes("state"))
            id = id?.state_id;
        else if (location.pathname.split("/").includes("role"))
            id = id?.name;
        else if (location.pathname.split("/").includes("accessrole"))
            id = id?.subrole;
        else
            id = id?.com_id;
        setopen(id);
    };
    const handleConfirmDialogue = (type) => {
        if (type) {
            if (heading.id === "licencetype")
                dispatch(deleteLicencedata(open));
            else if (heading.id === "communicationtype")
                dispatch(deleteCommunicationdata(open));
            else if (heading.id === "role")
                dispatch(deleteroledata(open));
            else if (heading.id === "accessrole")
                dispatch(deleteaccessroledata(open));
            else
                dispatch(deletestatedata(open));
        }
        setopen("");
        renderTableData();
    };
    return (_jsxs(CenterContainer, { children: [_jsxs(Table, { className: "table mb-5 mt-4", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: heading?.label }) }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsx(TableRow, { className: "row", children: heading?.TableColumn?.length > 0 ? (heading?.TableColumn?.map((val, i) => {
                                        return (_jsx("div", { className: `col${i === 0 ? "-1" : ""}`, children: _jsx("b", { children: val.label }) }, i));
                                    })) : (_jsx(_Fragment, {})) }), currentTableData?.length == 0 && (_jsx(TableRow, { className: "d-flex justify-content-center", children: "No items..." })), renderRow(currentTableData), _jsx(Pagination, { className: "pagination-bar", currentPage: currentPage, totalCount: totalData, pageSize: PageSize, onPageChange: (page) => setCurrentPage(page) })] }) })] }), open !== "" ? (_jsx(ConfimDialoague, { handleClick: (type) => handleConfirmDialogue(type), msg: "Do you really want to delete ?" })) : (_jsx(_Fragment, {})), heading.id === "state" ? ("") : (_jsx(FloatingButton, { title: `Add ${heading?.label}`, onClick: () => {
                    history(`/${heading.id}/add`);
                }, children: "+" }))] }));
};
export default ViewTable;
