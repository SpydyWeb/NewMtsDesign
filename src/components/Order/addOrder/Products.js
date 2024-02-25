import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Products } from "../../../utils/form-types";
import { ErrorMessage, InputContainer, Table, TableTitleBar } from "../OrderStyledComponents";
import { TableTitle, TableTitleRow } from "../OrderStyledComponents";
import "../Order.css";
import orderServices from "../../../services/order-services";
import { isNoOptionSelected } from "../../../utils/validations";
const ProductForm = ({ associatedProductOptions, setAssociatedProductOptions }) => {
    const [productOptions, setProductOptions] = useState();
    useEffect(() => {
        orderServices.getData("GetProductList").then((response) => {
            let temp = new Map();
            Object.values(Products).forEach((productType) => {
                temp.set(productType, response.data.body.Data.filter((item) => {
                    return item.productgroup == productType;
                }));
            });
            setProductOptions(temp);
        });
    }, []);
    const handleCollapse = () => {
        const section = document.getElementById("productsSection");
        if (section.classList.contains("displaySection")) {
            let okay = true;
            const avmProduct = document.getElementById("avmProduct");
            const titleProduct = document.getElementById("titleProduct");
            const appraisalProduct = document.getElementById("appraisalProduct");
            const pcrPropertyInspectionConditionReport = document.getElementById("pcrPropertyInspectionConditionReport");
            const flood = document.getElementById("flood");
            const bpo = document.getElementById("bpo");
            const evaluation = document.getElementById("evaluation");
            const avmProductError = document.getElementById("avmProductError");
            const titleProductError = document.getElementById("titleProductError");
            const appraisalProductError = document.getElementById("appraisalProductError");
            const pcrPropertyInspectionConditionReportError = document.getElementById("pcrPropertyInspectionConditionReportError");
            const floodError = document.getElementById("floodError");
            const bpoError = document.getElementById("bpoError");
            const evaluationError = document.getElementById("evaluationError");
            if (isNoOptionSelected(avmProduct, avmProductError))
                okay = false;
            if (isNoOptionSelected(titleProduct, titleProductError))
                okay = false;
            if (isNoOptionSelected(appraisalProduct, appraisalProductError))
                okay = false;
            if (isNoOptionSelected(pcrPropertyInspectionConditionReport, pcrPropertyInspectionConditionReportError))
                okay = false;
            if (isNoOptionSelected(flood, floodError))
                okay = false;
            if (isNoOptionSelected(bpo, bpoError))
                okay = false;
            if (isNoOptionSelected(evaluation, evaluationError))
                okay = false;
            if (okay) {
                section.classList.remove("displaySection");
                section.classList.add("hideSection");
            }
        }
        else {
            section.classList.add("displaySection");
            section.classList.remove("hideSection");
        }
    };
    return (_jsxs(Table, { className: "table mt-4", children: [_jsx("div", { className: "d-grid pointer", onClick: () => handleCollapse(), children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "Products" }) }) }) }), _jsx("div", { id: "productsSection", className: "displaySection", children: _jsx("div", { className: "container-fluid card border-0", children: _jsxs("div", { className: "row", children: [_jsxs(InputContainer, { width: "14%", className: "px-1 required-field", children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "avmProduct", title: "AVM Product", defaultValue: "-select-", onChange: (e) => {
                                                    let temp = associatedProductOptions;
                                                    temp?.set(Products.AVM_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                                                    setAssociatedProductOptions(temp);
                                                }, children: [_jsx("option", { defaultChecked: true, disabled: true, children: "-select-" }), productOptions?.get(Products.AVM_PRODUCT)?.map((item) => (_jsx("option", { value: item.keyid, children: item.productname }, item.keyid)))] }), _jsx("label", { htmlFor: "avmProduct", children: "AVM Product" })] }), _jsx(ErrorMessage, { id: "avmProductError" })] }), _jsxs(InputContainer, { width: "14%", className: "px-1 required-field", children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "titleProduct", title: "Title Product", defaultValue: "-select-", onChange: (e) => {
                                                    let temp = associatedProductOptions;
                                                    temp?.set(Products.TITLE_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                                                    setAssociatedProductOptions(temp);
                                                }, children: [_jsx("option", { defaultChecked: true, disabled: true, children: "-select-" }), productOptions?.get(Products.TITLE_PRODUCT)?.map((item) => (_jsx("option", { value: item.keyid, children: item.productname }, item.keyid)))] }), _jsx("label", { htmlFor: "titleProduct", children: "Title Product" })] }), _jsx(ErrorMessage, { id: "titleProductError" })] }), _jsxs(InputContainer, { width: "14%", className: "px-1 required-field", children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "appraisalProduct", title: "Appraisal Product", defaultValue: "-select-", onChange: (e) => {
                                                    let temp = associatedProductOptions;
                                                    temp?.set(Products.APPRAISAL_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                                                    setAssociatedProductOptions(temp);
                                                }, children: [_jsx("option", { defaultChecked: true, disabled: true, children: "-select-" }), productOptions?.get(Products.APPRAISAL_PRODUCT)?.map((item) => (_jsx("option", { value: item.keyid, children: item.productname }, item.keyid)))] }), _jsx("label", { htmlFor: "appraisalProduct", children: "Appraisal Product" })] }), _jsx(ErrorMessage, { id: "appraisalProductError" })] }), _jsxs(InputContainer, { width: "16%", className: "px-1 required-field", children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "pcrPropertyInspectionConditionReport", title: "PCR Property Inspection Condition Report", defaultValue: "-select-", onChange: (e) => {
                                                    let temp = associatedProductOptions;
                                                    temp?.set(Products.PCR_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                                                    setAssociatedProductOptions(temp);
                                                }, children: [_jsx("option", { defaultChecked: true, disabled: true, children: "-select-" }), productOptions?.get(Products.PCR_PRODUCT)?.map((item) => (_jsx("option", { value: item.keyid, children: item.productname }, item.keyid)))] }), _jsx("label", { htmlFor: "pcrPropertyInspectionConditionReport", children: "PCR Property Inspection Condition Report" })] }), _jsx(ErrorMessage, { id: "pcrPropertyInspectionConditionReportError" })] }), _jsxs(InputContainer, { width: "14%", className: "px-1 required-field", children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "flood", title: "Flood", defaultValue: "-select-", onChange: (e) => {
                                                    let temp = associatedProductOptions;
                                                    temp?.set(Products.FLOOD_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                                                    setAssociatedProductOptions(temp);
                                                }, children: [_jsx("option", { defaultChecked: true, disabled: true, children: "-select-" }), productOptions?.get(Products.FLOOD_PRODUCT)?.map((item) => (_jsx("option", { value: item.keyid, children: item.productname }, item.keyid)))] }), _jsx("label", { htmlFor: "flood", children: "Flood" })] }), _jsx(ErrorMessage, { id: "floodError" })] }), _jsxs(InputContainer, { width: "14%", className: "px-1 required-field", children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "bpo", title: "BPO", defaultValue: "-select-", onChange: (e) => {
                                                    let temp = associatedProductOptions;
                                                    temp?.set(Products.BPO_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                                                    setAssociatedProductOptions(temp);
                                                }, children: [_jsx("option", { defaultChecked: true, disabled: true, children: "-select-" }), productOptions?.get(Products.BPO_PRODUCT)?.map((item) => (_jsx("option", { value: item.keyid, children: item.productname }, item.keyid)))] }), _jsx("label", { htmlFor: "bpo", children: "BPO" })] }), _jsx(ErrorMessage, { id: "bpoError" })] }), _jsxs(InputContainer, { width: "14%", className: "px-1 required-field", children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "evaluation", title: "Evaluation", defaultValue: "-select-", onChange: (e) => {
                                                    let temp = associatedProductOptions;
                                                    temp?.set(Products.EVALUATION_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                                                    setAssociatedProductOptions(temp);
                                                }, children: [_jsx("option", { defaultChecked: true, disabled: true, children: "-select-" }), productOptions?.get(Products.EVALUATION_PRODUCT)?.map((item) => (_jsx("option", { value: item.keyid, children: item.productname }, item.keyid)))] }), _jsx("label", { htmlFor: "evaluation", children: "Evaluation" })] }), _jsx(ErrorMessage, { id: "evaluationError" })] })] }) }) })] }));
};
export default ProductForm;
