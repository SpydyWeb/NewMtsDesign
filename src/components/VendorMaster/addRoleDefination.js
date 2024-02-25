import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { CenterContainer, Table, TableRow, TableTitle, TableTitleBar, TableTitleRow, } from "../order/OrderStyledComponents";
import { useNavigate } from "react-router-dom";
import { CreateMapping, GetRole, GetsubRole, } from "../../servicesapi/Userroleapi";
import { ApplicationContext } from "../../App";
import { CancelButton, SaveButton } from "../order/orderProperty/OrderPropertyStyledComponents";
import { useDispatch } from "react-redux";
import { setloading } from "../../store/action/actions";
const AddRoleDefination = () => {
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const dispatch = useDispatch();
    const [accessRoleData, setAccessroleData] = useState({
        role: [],
        subroles: [],
    });
    const Navigate = useNavigate();
    const [roleid, setRoleid] = useState(false);
    const [allRole, setAllRole] = useState([]);
    const [subrole, setsubrole] = useState([]);
    useEffect(() => {
        dispatch(setloading());
        GetRole().then((res) => {
            dispatch(setloading());
            setAllRole(res);
        });
        dispatch(setloading());
        GetsubRole().then((res) => {
            dispatch(setloading());
            setsubrole(res);
        });
    }, []);
    const onChangehandler = (evt, type) => {
        if (type === "role") {
            if (evt.target.checked) {
                let data = accessRoleData.role;
                data.push(evt.target.name);
                setAccessroleData({
                    ...accessRoleData,
                    role: data,
                });
            }
            else {
                let data = accessRoleData.role;
                data = data.filter((ele) => {
                    return ele !== evt.target.name;
                });
                setAccessroleData({
                    ...accessRoleData,
                    role: data,
                });
            }
        }
        else {
            if (evt.target.checked) {
                let data = accessRoleData.subroles;
                data.push(evt.target.name);
                setAccessroleData({
                    ...accessRoleData,
                    subroles: data,
                });
            }
            else {
                let data = accessRoleData.subroles;
                data = data.filter((ele) => {
                    return ele !== evt.target.name;
                });
                setAccessroleData({
                    ...accessRoleData,
                    subroles: data,
                });
            }
        }
    };
    const onClickhandler = () => {
        if (accessRoleData.role.length === 0 || accessRoleData.role.length === 0) {
            updateMessages([
                {
                    title: "Error !!",
                    message: "Please Select role or access role",
                },
                ...messages,
            ]);
        }
        else {
            CreateMapping(accessRoleData).then((res) => {
                if (res.status === 200) {
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Mapping created successfully",
                        },
                        ...messages,
                    ]);
                    setAccessroleData({ role: [], subroles: [] });
                    setRoleid(false);
                    Navigate("/viewaccessrole");
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Something wrong",
                        },
                        ...messages,
                    ]);
                }
            });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(CenterContainer, { children: _jsxs(Table, { className: "table mt-3", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "Access Role" }) }) }) }), _jsx("div", { id: "clientFormSection", className: "displaySection", children: _jsx("div", { className: "container-fluid card border-0", children: _jsx("div", { className: "d-flex align-items-center", style: { gap: '10px' }, children: allRole.length > 0
                                        ? allRole.map((ele, indx) => {
                                            return (_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("input", { type: "checkbox", Checked: roleid, name: ele.name, onClick: (evt) => onChangehandler(evt, "role") }), " ", _jsx("span", { children: ele.name })] }, indx));
                                        })
                                        : "" }) }) })] }) }), _jsx(CenterContainer, { children: _jsxs(Table, { className: "table mt-3", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "Access Role Defination" }) }) }) }), _jsx("div", { id: "clientFormSection", className: "displaySection", children: _jsx("div", { className: "container-fluid card border-0", children: _jsx("div", { className: "d-flex align-items-center", style: { gap: '10px' }, children: subrole.length > 0
                                        ? subrole.map((ele, indx) => {
                                            return (_jsxs("div", { className: "d-flex align-items-center", children: [_jsx("input", { type: "checkbox", Checked: roleid, name: ele.subrole, onClick: (evt) => onChangehandler(evt, "subrole") }), " ", _jsx("span", { children: ele.subrole })] }, indx));
                                        })
                                        : "" }) }) })] }) }), _jsxs(TableRow, { className: "border-0 mt-4", children: [_jsx(CancelButton, { onClick: () => {
                            //   resetForm();
                            Navigate(`/viewaccessrole`);
                        }, children: "Cancel" }), _jsx(SaveButton, { onClick: onClickhandler, className: "float-end", children: "Save" })] })] }));
};
export default AddRoleDefination;
