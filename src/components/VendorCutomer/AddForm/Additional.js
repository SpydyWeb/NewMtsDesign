import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import { ErrorMessage, InputContainer, Switch, Table, TableTitle, TableTitleBar, TableTitleRow, UtilityButton, } from "../../order/OrderStyledComponents";
import { TextField } from "../../utils/InputGroup";
import { ApplicationContext } from "../../../App";
import { Getvendorbyid, UpdateVendor } from "../../../servicesapi/Vendorapi";
import { Updatecustomer } from "../../../servicesapi/Customerapi";
import { useDispatch } from "react-redux";
import { setloading } from "../../../store/action/actions";
import { CancelButton, SaveButton } from "../../order/orderProperty/OrderPropertyStyledComponents";
const Additional = (props) => {
    const { formFields, Vendordata, setVendordata, setActiveTab } = props;
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const dispatch = useDispatch();
    let urlD = location.pathname.split("/")[location.pathname.split("/").length - 1];
    useEffect(() => {
        if (isNaN(parseInt(urlD)) === false) {
            dispatch(setloading());
            if (location.pathname.split("/").includes("vendor"))
                Getvendorbyid(urlD).then((res) => {
                    setVendordata(res);
                    dispatch(setloading());
                });
        }
    }, []);
    const onhandleChange = (e, type = "") => {
        const value = type === "switch" ? e.target.checked : e.target.value;
        const { name } = e.target;
        console.log(e);
        props.setVendordata({ ...Vendordata, [name]: value });
    };
    const handleEditSubmit = () => {
        if (location.pathname.split("/").includes("vendor")) {
            UpdateVendor(props.Vendordata).then((res) => {
                if (res.status === 200) {
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Data updated succsessfully",
                        },
                        ...messages,
                    ]);
                    props.setVendordata({
                        ...props.Vendordata,
                        ["assignmentNote"]: props.Vendordata.assignmentNote,
                        new_Assignment: props.Vendordata.new_Assignment,
                        qcRejection: props.Vendordata.qcRejection,
                        dailyReminder: props.Vendordata.dailyReminder,
                        profileReminder: props.Vendordata.profileReminder,
                    });
                    // props.seteditModalOpen((prev) => !prev);
                    // props.setEditData(!props.editData);
                }
                else {
                    res.json().then((res) => updateMessages([
                        {
                            title: "Error !!",
                            message: res,
                        },
                        ...messages,
                    ]));
                }
            });
        }
        else {
            let formValues = {
                "order_Confirmation": Vendordata.order_Confirmation ? Vendordata.order_Confirmation : false,
                "assignment": Vendordata.assignment ? Vendordata.assignment : false,
                "inspection": Vendordata.inspection ? Vendordata.inspection : false,
                "in_QC_Review": Vendordata.in_QC_Review ? Vendordata.in_QC_Review : false,
                "order_ConfirmationNotes": Vendordata.order_ConfirmationNotes,
                "assignmentNotes": Vendordata.assignmentNotes,
                "inspectionNotes": Vendordata.inspectionNotes,
                "in_QC_ReviewNotes": Vendordata.in_QC_ReviewNotes,
                "id": Vendordata.customerId,
            };
            Updatecustomer(formValues).then((res) => {
                if (res.status === 200) {
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Data updated succsessfully",
                        },
                        ...messages,
                    ]);
                    props.setVendorDetail({
                        ...props.vendorDetail,
                        assignment: props.Vendordata.assignment,
                        in_QC_Review: props.Vendordata.in_QC_Review,
                        inspection: props.Vendordata.inspection,
                        order_Confirmation: props.Vendordata.order_Confirmation,
                    });
                    // props.seteditModalOpen((prev) => !prev);
                    // props.setEditData(!props.editData);
                }
                else {
                    res.json().then((res) => updateMessages([
                        {
                            title: "Error !!",
                            message: res,
                        },
                        ...messages,
                    ]));
                }
            });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Table, { className: "table mt-3", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: formFields.tabName }) }) }) }), _jsx("div", { id: "clientFormSection", className: "displaySection", children: _jsx("div", { className: "container-fluid card border-0", children: _jsx("div", { className: "row", children: formFields.formFields.map((item, index) => {
                                    return (_jsxs("div", { className: "d-flex", children: [_jsx(InputContainer, { width: "20%", className: `px-1 d-flex align-items-center`, children: _jsx(Switch, { type: "switch", id: "custom-switch", name: item.Checkname, label: item.Checkedlabel, checked: Vendordata[item.Checkname], onChange: (e) => {
                                                        onhandleChange(e, "switch");
                                                    } }) }, index), _jsxs(InputContainer, { width: "20%", className: `px-1`, children: [_jsx(TextField, { id: item.Textname, name: item.Textname, label: item.Textlabel, type: "text", value: Vendordata[item.Textname], onChange: (e) => {
                                                            onhandleChange(e);
                                                        } }), _jsx(ErrorMessage, { id: "loanIdError" })] }, index)] }, index));
                                }) }) }) })] }), isNaN(parseInt(urlD)) === false ? (_jsx("div", { className: "d-flex justify-content-end", children: _jsx(UtilityButton, { style: { width: "200px", marginTop: "3rem" }, onClick: () => handleEditSubmit(), children: "Save & Update" }) })) : (_jsxs("div", { className: "d-flex justify-content-between mt-5", children: [_jsx(CancelButton, { onClick: () => {
                            setActiveTab((prev) => prev - 1);
                        }, children: "Back" }), _jsx(SaveButton, { onClick: () => {
                            setActiveTab((prev) => prev + 1);
                        }, className: "float-end", children: "Next" })] }))] }));
};
export default Additional;
