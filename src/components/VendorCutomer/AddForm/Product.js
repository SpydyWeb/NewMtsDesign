import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { Accordion } from "react-bootstrap";
import { InputContainer, Switch, UtilityButton, } from "../../order/OrderStyledComponents";
import { useDispatch, useSelector } from "react-redux";
import ProductPricePopup from "./ProductPricePopup";
import { setDialogueview } from "../../../store/action/actions";
import { ApplicationContext } from "../../../App";
import { CancelButton, SaveButton, } from "../../order/orderProperty/OrderPropertyStyledComponents";
const Product = (props) => {
    const { setActiveTab, setVendordata } = props;
    const [expanded, setexpanded] = useState();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    let urlD = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const { customization } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [viewData, setViewData] = useState({
        nation: [],
        state: [],
        county: [],
    });
    const [Productseletected, setProductseletected] = useState("");
    const [productid, setProductid] = useState();
    const [formType, setFormType] = useState(location.pathname === "/admin/viewvendor" ? "vendor" : "customer");
    const handleNext = () => {
        let status = false;
        let count = 0;
        props.productD.map((ele) => {
            console.log();
            if (ele.selected === true) {
                count = 1;
            }
        });
        if (status || count === 0)
            updateMessages([
                {
                    title: "Error !!",
                    message: "Please fill all the mandatory fields",
                },
                ...messages,
            ]);
        else {
            setVendordata({ ...props.Vendordata, product: props.productD });
            setActiveTab((prev) => prev + 1);
        }
    };
    const handlechange = (e, indx, mainIndx, productid) => {
        const { name, value } = e.target;
        const data = [...props.productD];
        for (let index = 0; index < data.length; index++) {
            if (data[index].id === productid) {
                if (name === "selected")
                    data[index].selected = !data[index].selected;
                else if (name === "price1")
                    data[index].price1 = +value;
                else if (name === "price2")
                    data[index].price2 = +value;
                else if (name === "price3")
                    data[index].price3 = +value;
                break;
            }
        }
        console.log(data);
        props.setProductD(data);
        const productdata = [...props.productdata];
        if (name === "selected")
            productdata[mainIndx].subCategory[indx].selected =
                !productdata[mainIndx].subCategory[indx].selected;
        else if (name === "price1")
            productdata[mainIndx].subCategory[indx].price1 = isNaN(value)
                ? ""
                : +value;
        else if (name === "price2")
            productdata[mainIndx].subCategory[indx].price2 = isNaN(value)
                ? ""
                : +value;
        else if (name === "price3")
            productdata[mainIndx].subCategory[indx].price3 = isNaN(value)
                ? ""
                : +value;
        console.log(productdata);
        props.setProductdata(productdata);
    };
    return (_jsxs(_Fragment, { children: [customization.dialogueview !== "" ? (_jsx(ProductPricePopup, { selecetedVedorId: props.selecetedVedorId, setProductD: props.setProductD, productid: productid, productD: props.productD, formType: formType, Productseletected: Productseletected, setProductseletected: setProductseletected })) : (""), _jsx("div", { children: props.productdata.map((ele, indx) => {
                    if (ele.subCategory && ele.subCategory.length > 0) {
                        return (_jsx(_Fragment, { children: _jsx(Accordion, { defaultActiveKey: expanded, children: _jsxs(Accordion.Item, { eventKey: indx.toString(), children: [_jsx(Accordion.Header, { children: ele.name }), _jsx(Accordion.Body, { children: _jsx("div", { children: ele.subCategory.map((val, i) => {
                                                    let selected;
                                                    if (val.productPriceList === null) {
                                                        selected = null;
                                                    }
                                                    else
                                                        selected = val.productPriceList[0]?.cityStateType;
                                                    return (
                                                    // <AccordionDetails>
                                                    //     <Typography>
                                                    _jsxs("div", { className: "row", children: [_jsx(InputContainer, { width: "40%", className: `px-1 d-flex align-items-center`, children: _jsx(Switch, { type: "switch", id: "custom-switch", name: "selected", label: val.name, checked: val.selected, onChange: (e) => handlechange(e, i, indx, val.id) }) }), location.pathname.split("/").includes("vendor") || isNaN(urlD) === false ?
                                                                _jsx(InputContainer, { width: "20%", className: `px-1`, children: _jsx(UtilityButton, { onClick: () => {
                                                                            if (val.selected) {
                                                                                setProductid(val.id);
                                                                                setProductseletected(ele);
                                                                                dispatch(setDialogueview("addproductprice"));
                                                                            }
                                                                            else
                                                                                updateMessages([
                                                                                    {
                                                                                        title: "Error !!",
                                                                                        message: "Please select the product",
                                                                                    },
                                                                                    ...messages,
                                                                                ]);
                                                                        }, children: selected === null
                                                                            ? "Add Product Price"
                                                                            : `Update ${selected === 0
                                                                                ? "Nation-wise"
                                                                                : selected === 1
                                                                                    ? "State-wise"
                                                                                    : "County-wise"}` }) }) : _jsx(_Fragment, {})] })
                                                    //     </Typography>
                                                    // </AccordionDetails>
                                                    );
                                                }) }) })] }) }) }));
                    }
                    else
                        return _jsx(_Fragment, {});
                }) }), isNaN(parseInt(urlD)) === false ? (_jsx("div", { className: "d-flex justify-content-end", children: _jsx(UtilityButton, { style: { width: "200px", marginTop: "3rem" }, onClick: () => {
                        // handleEditSubmit();
                    }, children: "Save & Update" }) })) : (_jsxs("div", { className: "d-flex justify-content-between mt-5", children: [_jsx(CancelButton, { onClick: () => {
                            setActiveTab((prev) => prev - 1);
                        }, children: "Back" }), _jsx(SaveButton, { onClick: handleNext, className: "float-end", children: "Next" })] }))] }));
};
export default Product;
