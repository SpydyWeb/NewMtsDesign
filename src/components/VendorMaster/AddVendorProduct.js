import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { InputContainer, Table, TableRow, TableTitle, TableTitleBar, TableTitleRow, } from "../order/OrderStyledComponents";
import { AddButton, CancelButton, SaveButton, } from "../order/orderProperty/OrderPropertyStyledComponents";
import { TextField } from "../utils/InputGroup";
import { useNavigate } from "react-router-dom";
import { AddVendorProductList, GetVendorProduct, } from "../../servicesapi/Vendorapi";
import { ApplicationContext } from "../../App";
const AddVendorProduct = () => {
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const history = useNavigate();
    const [CategoryProduct, setCategoryProduct] = useState([]);
    const [inputval, setinputval] = useState(0);
    const [productData, setproductData] = useState({
        name: "",
        productid: 0,
    });
    const [type, setType] = useState(true);
    useEffect(() => {
        GetVendorProduct().then((res) => {
            if (res && res.length > 0) {
                let data = [];
                res.map((ele) => {
                    data.push({ id: ele.id, label: ele.name });
                });
                setCategoryProduct(data);
            }
        });
    }, []);
    const HandleSubmit = (e) => {
        e.preventDefault();
        if (productData.name === "")
            updateMessages([
                {
                    title: "Error !!",
                    message: "Please enter product name",
                },
                ...messages,
            ]);
        else {
            AddVendorProductList(productData).then((res) => {
                if (res.status === 200) {
                    updateMessages([
                        {
                            title: "Success !!",
                            message: "Product has been successfully",
                        },
                        ...messages,
                    ]);
                    setproductData({
                        name: "",
                        productid: 0,
                    });
                    setinputval(0);
                    history("/viewvendorproduct");
                }
                else {
                    res.json().then((val) => updateMessages([
                        {
                            title: "Error !!",
                            message: val,
                        },
                        ...messages,
                    ]));
                }
            });
        }
    };
    return (_jsx("div", { className: "container-fluid card border-0 align-items-center", children: _jsxs(Table, { className: "table mt-4", style: { width: "500px" }, children: [_jsx("div", { className: "d-grid pointer", onClick: () => { }, children: _jsx(TableTitleRow, { children: _jsxs(TableTitleBar, { children: [_jsx(TableTitle, { children: "Add Vendor Product" }), _jsx(AddButton, { style: { width: "auto" }, onClick: () => {
                                        setType((prev) => !prev);
                                    }, children: type ? "Add Category" : "Back" })] }) }) }), _jsx("div", { id: "propertyAddressSection", className: "displaySection", children: _jsx("div", { className: "container-fluid card border-0", children: _jsx("div", { className: "row", children: _jsxs("form", { children: [_jsx(InputContainer, { width: "100%", className: "px-1", children: _jsx(TextField, { id: "name", name: "name", label: type ? "Product Name *" : "Category Name *", type: "text", value: productData.name, onChange: (e) => setproductData({
                                                ...productData,
                                                name: e.target.value,
                                            }) }) }), type ? (_jsx(InputContainer, { width: "100%", className: `px-1`, children: _jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "clientId", name: "productid", value: inputval, defaultValue: "-select-", required: true, onChange: (e) => {
                                                        setproductData({
                                                            ...productData,
                                                            productid: e.target.value,
                                                        });
                                                        setinputval(e.target.value);
                                                    }, children: [_jsx("option", { defaultChecked: true, disabled: true, value: 0, children: "-select-" }), CategoryProduct.map((items, i) => (_jsx("option", { value: items.id, children: items.label }, i)))] }), _jsx("label", { htmlFor: "clientId", children: "Category Product" })] }) })) : (""), _jsxs(TableRow, { className: "border-0 mt-4", children: [_jsx(CancelButton, { onClick: () => history(`/viewvendorproduct`), children: "Cancel" }), _jsx(SaveButton, { className: "float-end", onClick: HandleSubmit, children: "Save" })] })] }) }) }) })] }) }));
};
export default AddVendorProduct;
