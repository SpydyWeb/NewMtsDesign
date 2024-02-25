import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { AddRowButton, DeleteRowButton, ErrorMessage, InputContainer, Table, TableRow, TableTitle, TableTitleBar, TableTitleRow, UtilityButton, } from "../../order/OrderStyledComponents";
import { TextField } from "../../utils/InputGroup";
import { ApplicationContext } from "../../../App";
import { AddVendorLicences, DeleteVendorLicences, UpdateVendorLicences, } from "../../../servicesapi/Vendorapi";
import { CancelButton, SaveButton } from "../../order/orderProperty/OrderPropertyStyledComponents";
const Licence = (props) => {
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    let urlD = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const { formFields, Vendordata, allstate, licenceType, setActiveTab } = props;
    const handleAddClick = () => {
        let status = false;
        if (props?.edit)
            props.licences.map((ele) => {
                if (ele.firstName === "" ||
                    ele.lastName === "" ||
                    ele.licenceNo === "" ||
                    ele.licenceType === "" ||
                    ele.address === "" ||
                    ele.expiry_Date === "" ||
                    ele.issueDate === "") {
                    status = true;
                }
            });
        else
            Vendordata.licences.map((ele) => {
                if (ele.firstName === "" ||
                    ele.lastName === "" ||
                    ele.licenceNo === "" ||
                    ele.licenceType === "" ||
                    ele.address === "" ||
                    ele.expiry_Date === "" ||
                    ele.issueDate === "") {
                    status = true;
                }
            });
        if (status)
            updateMessages([
                {
                    title: "Error !!",
                    message: "Please fill all the mandatory fields",
                },
                ...messages,
            ]);
        else if (props?.edit)
            props.setLicence([
                ...props.licences,
                {
                    firstName: "",
                    lastName: "",
                    licenceNo: "",
                    licenceType: "",
                    status: "",
                    address: "",
                    expiry_Date: "",
                    issueDate: "",
                    disciplinaryAction: "",
                    note: "",
                },
            ]);
        else
            props.setVendordata({
                ...Vendordata,
                ["licences"]: [
                    ...Vendordata.licences,
                    {
                        firstName: "",
                        lastName: "",
                        licenceNo: "",
                        licenceType: "",
                        status: "",
                        address: "",
                        expiry_Date: "",
                        issueDate: "",
                        disciplinaryAction: "",
                        note: "",
                    },
                ],
            });
    };
    const handlechangeLicense = (e, i) => {
        const { name, value } = e.target;
        const data = [...Vendordata?.licences];
        var q = new Date();
        var date = new Date(q.getFullYear(), q.getMonth(), q.getDate());
        if (name === "issueDate") {
            if (new Date(value) < date) {
                data[i][name] = value;
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Issue date should be less than from today",
                    },
                    ...messages,
                ]);
            }
        }
        else
            data[i][name] = value;
        props.setVendordata({ ...Vendordata, ["licences"]: data });
    };
    const handleEditSubmit = () => {
        let status = false;
        Vendordata.licences.map((ele) => {
            if (ele.firstName === "" ||
                ele.lastName === "" ||
                ele.licenceNo === "" ||
                ele.licenceType === "" ||
                ele.address === "" ||
                ele.expiry_Date === "" ||
                ele.issueDate === "" ||
                ele.state === "") {
                status = true;
            }
        });
        if (status)
            updateMessages([
                {
                    title: "Error !!",
                    message: "Please fill all the mandatory fields",
                },
                ...messages,
            ]);
        else {
            let apistatus = false;
            console.log(Vendordata);
            Vendordata.licences.map((ele) => {
                if (ele.id !== undefined) {
                    UpdateVendorLicences([ele], urlD).then((res) => {
                        if (res.status === 200) {
                            updateMessages([
                                {
                                    title: "Success !!",
                                    message: "Licence updated succsessfully",
                                },
                                ...messages,
                            ]);
                            apistatus = true;
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
                    delete ele.updateDate;
                    delete ele.isDeleted;
                    delete ele.createdDate;
                    AddVendorLicences(ele, urlD).then((res) => {
                        if (res.status === 200) {
                            updateMessages([
                                {
                                    title: "Error !!",
                                    message: "Licence updated succsessfully",
                                },
                                ...messages,
                            ]);
                            apistatus = true;
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
            });
            if (apistatus) {
                // toast.success("Licence updated succsessfully");
                props.setVendordata({
                    ...props.Vendordata,
                    ["licences"]: props.licences,
                });
                props.seteditModalOpen((prev) => !prev);
            }
        }
    };
    const handleRemoveClick = (index) => {
        const list = props.licences;
        list.splice(index - 1, 1);
        props.setVendordata({ ...props.Vendordata, ['licences']: list });
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Table, { className: "table mt-3 px-0", children: [_jsx("div", { className: "d-grid pointer", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: formFields.tabName }) }) }) }), _jsx("div", { id: "contactsSection", className: "displaySection", children: Vendordata?.licences?.length > 0 ? (Vendordata.licences.map((val, idx) => {
                            return (_jsxs("div", { className: "container-fluid card border-0 mt-2 ml-2", children: [Vendordata.licences.length > 1 && (_jsx(DeleteRowButton, { onClick: () => {
                                            if (val.id !== undefined) {
                                                DeleteVendorLicences(val.id).then((res) => {
                                                    if (res.status === 200)
                                                        updateMessages([
                                                            {
                                                                title: "Error !!",
                                                                message: 'Data has been deleted successfully',
                                                            },
                                                            ...messages,
                                                        ]);
                                                });
                                            }
                                            handleRemoveClick(idx);
                                        }, children: "X" })), _jsx(TableRow, { className: "row pt-0", children: formFields.formFields.map((item) => {
                                            return (_jsxs(_Fragment, { children: [item.type === "select" ? (_jsxs(InputContainer, { width: item.width, className: `px-1 ${item.require ? "required-field" : ""}`, children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "clientId", name: item.name, title: item.label, value: val[item.name], defaultValue: "-select-", required: true, onChange: (e) => {
                                                                            handlechangeLicense(e, idx);
                                                                            //   onhandleChange(
                                                                            //     e,
                                                                            //     val?.isParent ? val?.isParent : "",
                                                                            //     idx
                                                                            //   );
                                                                        }, children: [_jsx("option", { defaultChecked: true, disabled: true, value: "", children: "-select-" }), item.name === "state"
                                                                                ? allstate.map((items, i) => (_jsx("option", { value: items.name, children: items.name }, i)))
                                                                                : item.name === "status"
                                                                                    ? ["Active", "Inactive"].map((items, i) => (_jsx("option", { value: items, children: items }, i)))
                                                                                    : licenceType.map((items, i) => (_jsx("option", { value: items.name, children: items.name }, i)))] }), _jsx("label", { htmlFor: "clientId", children: item.label })] }), _jsx(ErrorMessage, { id: "clientIdError" })] }, idx)) : (_jsxs(InputContainer, { width: item.width, className: `px-1 ${item.require ? "required-field" : ""}`, children: [_jsx(TextField, { id: item.name, name: item.name, label: item.label, type: item.type, value: val[item.name], required: true, onChange: (e) => {
                                                                    handlechangeLicense(e, idx);
                                                                    // onhandleChange(
                                                                    //   e,
                                                                    //   val?.isParent ? val?.isParent : "",
                                                                    //   idx
                                                                    // );
                                                                } }), _jsx(ErrorMessage, { id: "loanIdError" })] }, idx)), idx == props.Vendordata.licences.length - 1 && (_jsx(AddRowButton, { className: "addBtn shadow-1", onClick: () => {
                                                            handleAddClick();
                                                        }, children: "+" }))] }));
                                        }) })] }, "contact"));
                        })) : (_jsx(_Fragment, {})) })] }, "contacts"), isNaN(parseInt(urlD)) === false ? (_jsx("div", { className: "d-flex justify-content-end", children: _jsx(UtilityButton, { style: { width: "200px", marginTop: "3rem" }, onClick: () => {
                        handleEditSubmit();
                    }, children: "Save & Update" }) })) : (_jsxs("div", { className: "d-flex justify-content-between mt-5", children: [_jsx(CancelButton, { onClick: () => { setActiveTab((prev) => prev - 1); }, children: "Back" }), _jsx(SaveButton, { onClick: () => setActiveTab((prev) => prev + 1), className: "float-end", children: "Next" })] }))] }));
};
export default Licence;
