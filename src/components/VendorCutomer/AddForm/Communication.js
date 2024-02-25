import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { AddRowButton, DeleteRowButton, ErrorMessage, InputContainer, Table, TableRow, TableTitle, TableTitleBar, TableTitleRow, UtilityButton, } from "../../order/OrderStyledComponents";
import { TextField } from "../../utils/InputGroup";
import { ApplicationContext } from "../../../App";
import { AddCommunicationById, DeleteCommuncationbyVendorid, UpdateVendorcommunications, } from "../../../servicesapi/Vendorapi";
import { UpdateCustomercommunications, addCustomercommunications, } from "../../../servicesapi/Customerapi";
import { CancelButton, SaveButton, } from "../../order/orderProperty/OrderPropertyStyledComponents";
const Communication = (props) => {
    const { formFields, Vendordata, communicationType, communicatioonMethod, productD, setVendordata, setActiveTab } = props;
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    let urlD = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const onhandleChange = (e, type, i) => {
        const { name, value } = e.target;
        const data = [...Vendordata.communication];
        data[i][name] = value;
        let status = false;
        let count = 0;
        if (name === "product_id")
            Vendordata.communication.map((ele) => {
                if (ele.product_id === value)
                    count++;
            });
        if (count > 1)
            status = true;
        if (status)
            updateMessages([
                {
                    title: "Error !!",
                    message: "Product name cannot be same",
                },
                ...messages,
            ]);
        else
            props.setVendordata({ ...Vendordata, [type]: data });
    };
    const handleAddClick = () => {
        let status = false;
        Vendordata.communication.map((ele, i) => {
            if ((ele.type === "" || ele.detail === "") &&
                (ele.productId !== 0 || i === 0)) {
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
            if (props.edit) {
                let data = [...Vendordata.communication];
                data.push({
                    type: "",
                    detail: "",
                    product_id: 0,
                });
                props.setCommunicaion(data);
            }
            else
                props.setVendordata({
                    ...Vendordata,
                    ["communication"]: [
                        ...Vendordata.communication,
                        {
                            type: "",
                            detail: "",
                            product_id: 0,
                            method: "",
                        },
                    ],
                });
        }
    };
    const handleEditSubmit = () => {
        let status = false;
        Vendordata.communication.map((ele, i) => {
            if ((ele.type === "" || ele.detail === "") &&
                (ele.productId !== 0 || i === 0)) {
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
            if (location.pathname.split("/").includes("vendor")) {
                let CreateComData = [];
                let UpdateComData = [];
                Vendordata.communication.map((ele) => {
                    if (ele.id === undefined)
                        CreateComData.push(ele);
                    else
                        UpdateComData.push(ele);
                });
                CreateComData.map((ele) => {
                    AddCommunicationById(ele, urlD);
                });
                UpdateVendorcommunications(UpdateComData, urlD).then((res) => {
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
                            ["communication"]: props.communication,
                        });
                        props.seteditModalOpen((prev) => !prev);
                        props.setEditData(!props.editData);
                    }
                    else {
                        res.json().then((res) => updateMessages([
                            {
                                title: "Errpr !!",
                                message: res,
                            },
                            ...messages,
                        ]));
                    }
                });
            }
            else {
                let CreateComData = [];
                let UpdateComData = [];
                Vendordata.communication.map((ele) => {
                    if (ele.id === undefined)
                        CreateComData.push(ele);
                    else {
                        ele.customerId = urlD;
                        UpdateComData.push(ele);
                    }
                });
                CreateComData.map((ele) => {
                    addCustomercommunications(ele, urlD);
                });
                UpdateCustomercommunications(UpdateComData, urlD).then((res) => {
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
                            ["communication"]: Vendordata.communication,
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
        }
    };
    const handleSubmit = () => {
        let status = false;
        Vendordata.communication.map((ele, i) => {
            if ((ele.type === "" || ele.detail === "") &&
                (ele.productId !== 0 || i === 0)) {
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
        else
            setActiveTab((prev) => prev + 1);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Table, { className: "table mt-3 px-0", children: [_jsx("div", { className: "d-grid pointer", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: formFields.tabName }) }) }) }), _jsx("div", { id: "contactsSection", className: "displaySection", children: Vendordata?.communication?.length > 0 ? (Vendordata?.communication.map((val, idx) => {
                            return (_jsxs("div", { className: "container-fluid card border-0 mt-2", children: [idx !== 0 ? (_jsx(DeleteRowButton, { onClick: () => {
                                            DeleteCommuncationbyVendorid(val.id).then((res) => { });
                                            let temp = Vendordata.communication;
                                            temp.splice(idx, 1);
                                            setVendordata({ ...Vendordata, communication: temp });
                                        }, children: "X" })) : (_jsx(_Fragment, {})), _jsx(TableRow, { className: "row pt-0", children: formFields.formFields.map((item) => {
                                            return (_jsxs(_Fragment, { children: [idx === 0 && item.name === "product_id" ? (_jsx(_Fragment, {})) : item.type === "select" ? (_jsxs(InputContainer, { width: item.width, className: `px-1 ${item.require ? "required-field" : ""}`, children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "clientId", name: item.name, title: item.label, value: val[item.name], defaultValue: "-select-", required: true, onChange: (e) => {
                                                                            onhandleChange(e, "communication", idx);
                                                                        }, children: [_jsx("option", { defaultChecked: true, disabled: true, value: item.name === "product_id" ? 0 : "", children: "-select-" }), item.name === "method"
                                                                                ? communicatioonMethod.map((items, i) => (_jsx("option", { value: items.name, children: items.name }, i)))
                                                                                : item.name === "product_id"
                                                                                    ? productD.map((items, i) => (_jsx("option", { value: items.id, children: items.name }, i)))
                                                                                    : communicationType.map((items, i) => (_jsx("option", { value: items.name, children: items.name }, i)))] }), _jsx("label", { htmlFor: "clientId", children: item.label })] }), _jsx(ErrorMessage, { id: "clientIdError" })] }, idx)) : (_jsxs(InputContainer, { width: item.width, className: `px-1 ${item.require ? "required-field" : ""}`, children: [_jsx(TextField, { id: item.name, name: item.name, label: item.label, type: "text", value: val[item.name], required: true, onChange: (e) => {
                                                                    onhandleChange(e, "communication", idx);
                                                                } }), _jsx(ErrorMessage, { id: "loanIdError" })] }, idx)), idx == props.Vendordata.communication.length - 1 && (_jsx(AddRowButton, { className: "addBtn", onClick: () => {
                                                            handleAddClick();
                                                        }, children: "+" }))] }));
                                        }) })] }, "contact"));
                        })) : (_jsx(_Fragment, {})) })] }, "contacts"), isNaN(parseInt(urlD)) === false ? (_jsx("div", { className: "d-flex justify-content-end", children: _jsx(UtilityButton, { style: { width: "200px", marginTop: "3rem" }, onClick: () => {
                        handleEditSubmit();
                    }, children: "Save & Update" }) })) : (_jsxs("div", { className: "d-flex justify-content-between mt-5", children: [_jsx(CancelButton, { onClick: () => { setActiveTab((prev) => prev - 1); }, children: "Back" }), _jsx(SaveButton, { onClick: handleSubmit, className: "float-end", children: "Next" })] }))] }));
};
export default Communication;
