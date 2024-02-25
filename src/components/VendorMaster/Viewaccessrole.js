import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { CenterContainer, FloatingButton, Table, TableTitle, TableTitleBar, TableTitleRow, } from "../order/OrderStyledComponents";
import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { Deletemapping, GetMappingsubRole, } from "../../servicesapi/Userroleapi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ApplicationContext } from "../../App";
const Viewaccessrole = () => {
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const history = useNavigate();
    const [expanded, setexpanded] = useState();
    const [accessData, setAccessData] = useState([]);
    const [accessrole, setaccessrole] = useState({
        role: [],
        subroles: [],
    });
    const fetchData = () => {
        GetMappingsubRole().then((res) => {
            setAccessData(res);
        });
    };
    const onDeletehandler = (rolname, subrole) => {
        if (window.confirm("Do you want to delete the access control?")) {
            Deletemapping({
                role: rolname,
                subrole: subrole,
            }).then((res) => {
                if (res.status === 200) {
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "role deleted successfully",
                        },
                        ...messages,
                    ]);
                    fetchData();
                    // setInterval(() => {
                    //     window.location.reload();
                    // }, 1000);
                }
            });
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (_jsxs(CenterContainer, { children: [_jsxs(Table, { className: "table mt-3", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "View Role Defination" }) }) }) }), _jsx("div", { id: "clientFormSection", className: "displaySection", children: _jsx("div", { className: "container-fluid card border-0", children: accessData.length > 0
                                ? accessData.map((val, indx) => {
                                    return (_jsx(Accordion, { defaultActiveKey: expanded, children: _jsxs(Accordion.Item, { eventKey: indx.toString(), children: [_jsx(Accordion.Header, { children: val.name }), _jsx(Accordion.Body, { children: _jsx("div", { className: "accordion-body p-0", children: val.subroles.length > 0
                                                            ? val.subroles.map((subVal) => {
                                                                return (_jsxs("span", { style: { border: '1px solid #818181', borderRadius: '10px', padding: '4px' }, children: [_jsx("span", { style: { marginRight: '5px' }, children: subVal.name }), _jsx(IoMdCloseCircleOutline, { role: "button", onClick: () => onDeletehandler(val.name, subVal.name) })] }));
                                                            })
                                                            : "No Data Found" }) })] }) }));
                                })
                                : "" }) })] }), _jsx(FloatingButton, { title: `Add`, onClick: () => {
                    history(`/accessroledefinition`);
                }, children: "+" })] }));
};
export default Viewaccessrole;
