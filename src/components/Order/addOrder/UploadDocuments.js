import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Products } from "../../../utils/form-types";
import { AddRowButton, DeleteRowButton, ErrorMessage, InputContainer, Table, TableRow, TableTitleBar } from "../OrderStyledComponents";
import { TableTitle, TableTitleRow } from "../OrderStyledComponents";
import "../Order.css";
import { FileInput } from "../../utils/InputGroup";
const UploadDocumentForm = (props) => {
    const validateDocuments = () => {
        let okay = true;
        for (let i = 0; i < props.documents.length; i++) {
            const documentType = document.getElementById("documentType" + i);
            const associatedProduct = document.getElementById("associatedProduct" + i);
            const file = document.getElementById("file" + i);
            const documentTypeError = document.getElementById("documentTypeError" + i);
            const associatedProductError = document.getElementById("associatedProductError" + i);
            const fileError = document.getElementById("fileError" + i);
            if (!file.files || file.files.length == 0) {
                fileError.innerText = "No file selected!";
                okay = false;
            }
        }
        return okay;
    };
    const handleCollapse = () => {
        const section = document.getElementById("uploadDocumentSection");
        if (section.classList.contains("displaySection")) {
            if (validateDocuments()) {
                section.classList.remove("displaySection");
                section.classList.add("hideSection");
            }
        }
        else {
            section.classList.add("displaySection");
            section.classList.remove("hideSection");
        }
    };
    return (_jsxs(Table, { className: "table mt-3", children: [_jsx("div", { className: "d-grid pointer", onClick: () => handleCollapse(), children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "Upload documents" }) }) }) }), _jsx("div", { id: "uploadDocumentSection", className: "displaySection", children: props.documents.map((document, idx) => (_jsxs("div", { className: "container-fluid card border-0 mt-2", children: [props.documents.length > 1 && (_jsx(DeleteRowButton, { onClick: () => {
                                let temp = props.documents;
                                temp.splice(idx, 1);
                                props.updateDocument(temp);
                            }, children: "X" })), _jsxs(TableRow, { className: "row pt-0", children: [_jsxs(InputContainer, { width: "14%", className: "px-1", children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "documentType" + idx, defaultValue: document.DocumentType, onChange: (e) => {
                                                        document.DocumentType = e.target.value;
                                                        props.updateDocument(props.documents);
                                                    }, title: "Document type", children: [_jsx("option", { defaultChecked: true, disabled: true, value: 0, children: "-select-" }), props.documentTypeOptions.map((item) => (_jsx("option", { value: item.keyid, children: item.productname }, item.keyid)))] }), _jsx("label", { htmlFor: "documentType" + idx, children: "Document type" })] }), _jsx(ErrorMessage, { id: "documentTypeError" + idx })] }), _jsxs(InputContainer, { width: "14%", className: "px-1", children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "associatedProduct" + idx, title: "Associated Product", defaultValue: document.Product, onChange: (e) => {
                                                        document.Product = e.target.value;
                                                        props.updateDocument(props.documents);
                                                    }, children: [_jsx("option", { value: 0, defaultChecked: true, disabled: true, children: "-select-" }), props.associatedProductOptions.get(Products.AVM_PRODUCT) && (_jsx("option", { value: props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid, children: props.associatedProductOptions.get(Products.AVM_PRODUCT).productname }, props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid)), props.associatedProductOptions.get(Products.TITLE_PRODUCT) && (_jsx("option", { value: props.associatedProductOptions.get(Products.TITLE_PRODUCT).keyid, children: props.associatedProductOptions.get(Products.TITLE_PRODUCT).productname }, props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid)), props.associatedProductOptions.get(Products.APPRAISAL_PRODUCT) && (_jsx("option", { value: props.associatedProductOptions.get(Products.APPRAISAL_PRODUCT).keyid, children: props.associatedProductOptions.get(Products.APPRAISAL_PRODUCT).productname }, props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid)), props.associatedProductOptions.get(Products.PCR_PRODUCT) && (_jsx("option", { value: props.associatedProductOptions.get(Products.PCR_PRODUCT).keyid, children: props.associatedProductOptions.get(Products.PCR_PRODUCT).productname }, props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid)), props.associatedProductOptions.get(Products.FLOOD_PRODUCT) && (_jsx("option", { value: props.associatedProductOptions.get(Products.FLOOD_PRODUCT).keyid, children: props.associatedProductOptions.get(Products.FLOOD_PRODUCT).productname }, props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid)), props.associatedProductOptions.get(Products.BPO_PRODUCT) && (_jsx("option", { value: props.associatedProductOptions.get(Products.BPO_PRODUCT).keyid, children: props.associatedProductOptions.get(Products.BPO_PRODUCT).productname }, props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid)), props.associatedProductOptions.get(Products.EVALUATION_PRODUCT) && (_jsx("option", { value: props.associatedProductOptions.get(Products.EVALUATION_PRODUCT).keyid, children: props.associatedProductOptions.get(Products.EVALUATION_PRODUCT).productname }, props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid))] }), _jsx("label", { htmlFor: "associatedProduct" + idx, children: "Associated Product" })] }), _jsx(ErrorMessage, { id: "associatedProductError" + idx })] }), _jsxs("div", { className: "col-6 px-1", children: [_jsx(FileInput, { id: "file" + idx, label: "", disabled: document.DocumentType == 0 }), _jsx(ErrorMessage, { id: "fileError" + idx })] }), idx == props.documents.length - 1 && (_jsx(AddRowButton, { className: "addBtn", onClick: () => {
                                        if (validateDocuments()) {
                                            let temp = props.documents;
                                            temp.push({ DocumentType: 0, Product: 0, DocumentId: 0 });
                                            props.updateDocument(temp);
                                        }
                                    }, children: "+" }))] })] }, "document" + idx))) })] }, "documents" + props.documents.length));
};
export default UploadDocumentForm;
