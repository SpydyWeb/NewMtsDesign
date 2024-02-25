import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { ErrorMessage, InputContainer, Table, TableTitle, TableTitleBar, TableTitleRow, UtilityButton, } from "../../order/OrderStyledComponents";
import { TextField } from "../../utils/InputGroup";
import { UpdateCustomerIntegrationDetail } from "../../../servicesapi/Customerapi";
import { ApplicationContext } from "../../../App";
const IntegrationDetail = (props) => {
    const { formFields, Vendordata } = props;
    let urlD = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const handleEditSubmit = () => {
        let data = props.Vendordata.customer_Integration_details;
        delete data.updateDate;
        delete data.id;
        delete data.createdDate;
        data.additional_Detail = [];
        // data["additionalDetail"] = props.Vendordata.additionalDetail;
        UpdateCustomerIntegrationDetail(data, urlD).then((res) => {
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
                    ["customer_Integration_details"]: props.Vendordata.customer_Integration_details,
                    //   ["additionalDetail"]: props.Vendordata.additionalDetail,
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
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Table, { className: "table mt-3", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: formFields.tabName }) }) }) }), _jsx("div", { id: "clientFormSection", className: "displaySection", children: _jsx("div", { className: "container-fluid card border-0", children: _jsx("div", { className: "row", children: Vendordata?.customer_Integration_details ? formFields.formFields.map((item, index) => {
                                    return item.type === "text" || item.type === "password" ? (_jsxs(InputContainer, { width: item.width, className: `px-1 ${item.require ? "required-field" : ""}`, children: [_jsx(TextField, { id: item.name, name: item.name, label: item.label, type: item.type, value: Vendordata['customer_Integration_details'][item.name], onChange: (e) => {
                                                    props.setVendordata({
                                                        ...props.Vendordata,
                                                        ['customer_Integration_details']: {
                                                            ...props.Vendordata.customer_Integration_details,
                                                            [e.target.name]: e.target.value
                                                        }
                                                    });
                                                } }), _jsx(ErrorMessage, { id: "loanIdError" })] }, index)) : (_jsx(_Fragment, {}));
                                }) : _jsx(_Fragment, {}) }) }) })] }), isNaN(parseInt(urlD)) === false ? (_jsx("div", { className: "d-flex justify-content-end", children: _jsx(UtilityButton, { style: { width: "200px" }, onClick: () => {
                        handleEditSubmit();
                    }, children: "Save & Update" }) })) : (_jsx(_Fragment, {}))] }));
};
export default IntegrationDetail;
