import { useEffect, useState } from "react";
import { Document, Products } from "../../../utils/form-types";
import { AddRowButton, DeleteRowButton, ErrorMessage, InputContainer, Table, TableRow, TableTitleBar } from "../OrderStyledComponents";
import { TableTitle, TableTitleRow } from "../OrderStyledComponents";
import "../Order.css";
import { ControlledSelectBox, FileInput, SelectBox } from "../../utils/InputGroup";
import orderServices from "../../../services/order-services";

type UploadDocumentProps = {
  documents: Document[];
  associatedProductOptions: Map<string, any>;
  documentTypeOptions: any[];
  updateDocument: any;
};

const UploadDocumentForm = (props: UploadDocumentProps) => {

  const validateDocuments = () => {
    let okay = true;

    for (let i = 0; i < props.documents.length; i++) {
      const documentType = document.getElementById("documentType" + i) as HTMLInputElement;
      const associatedProduct = document.getElementById("associatedProduct" + i) as HTMLInputElement;
      const file = document.getElementById("file" + i) as HTMLInputElement;

      const documentTypeError = document.getElementById("documentTypeError" + i) as HTMLInputElement;
      const associatedProductError = document.getElementById("associatedProductError" + i) as HTMLInputElement;
      const fileError = document.getElementById("fileError" + i) as HTMLInputElement;

      if (!file.files || file.files.length == 0) {
        fileError.innerText = "No file selected!";
        okay = false;
      }
    }

    return okay;
  };

  const handleCollapse = () => {
    const section = document.getElementById("uploadDocumentSection") as HTMLDivElement;
    if (section.classList.contains("displaySection")) {
      if (validateDocuments()) {
        section.classList.remove("displaySection");
        section.classList.add("hideSection");
      }
    } else {
      section.classList.add("displaySection");
      section.classList.remove("hideSection");
    }
  };

  return (
    <Table className="table mt-3" key={"documents" + props.documents.length}>
      <div className="d-grid pointer" onClick={() => handleCollapse()}>
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>Upload documents</TableTitle>
          </TableTitleBar>
        </TableTitleRow>
      </div>
      <div id="uploadDocumentSection" className="displaySection">
        {props.documents.map((document, idx) => (
          <div className="container-fluid card border-0 mt-2" key={"document" + idx}>
            {props.documents.length > 1 && (
              <DeleteRowButton
                onClick={() => {
                  let temp = props.documents;
                  temp.splice(idx, 1);
                  props.updateDocument(temp);
                }}>
                X
              </DeleteRowButton>
            )}
            <TableRow className="row pt-0">
              <InputContainer width="14%" className="px-1">
                <div className="form-floating mt-1">
                  <select
                    className="form-select"
                    id={"documentType" + idx}
                    defaultValue={document.DocumentType}
                    onChange={(e: any) => {
                      document.DocumentType = e.target.value;
                      props.updateDocument(props.documents);
                    }}
                    title="Document type">
                    <option defaultChecked disabled value={0}>
                      -select-
                    </option>
                    {props.documentTypeOptions.map((item) => (
                      <option key={item.keyid} value={item.keyid}>
                        {item.productname}
                      </option>
                    ))}
                  </select>
                  <label htmlFor={"documentType" + idx}>Document type</label>
                </div>
                <ErrorMessage id={"documentTypeError" + idx}></ErrorMessage>
              </InputContainer>
              <InputContainer width="14%" className="px-1">
                <div className="form-floating mt-1">
                  <select
                    className="form-select"
                    id={"associatedProduct" + idx}
                    title="Associated Product"
                    defaultValue={document.Product}
                    onChange={(e: any) => {
                      document.Product = e.target.value;
                      props.updateDocument(props.documents);
                    }}>
                    <option value={0} defaultChecked disabled>
                      -select-
                    </option>
                    {props.associatedProductOptions.get(Products.AVM_PRODUCT) && (
                      <option value={props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid} key={props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid}>
                        {props.associatedProductOptions.get(Products.AVM_PRODUCT).productname}
                      </option>
                    )}
                    {props.associatedProductOptions.get(Products.TITLE_PRODUCT) && (
                      <option value={props.associatedProductOptions.get(Products.TITLE_PRODUCT).keyid} key={props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid}>
                        {props.associatedProductOptions.get(Products.TITLE_PRODUCT).productname}
                      </option>
                    )}
                    {props.associatedProductOptions.get(Products.APPRAISAL_PRODUCT) && (
                      <option value={props.associatedProductOptions.get(Products.APPRAISAL_PRODUCT).keyid} key={props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid}>
                        {props.associatedProductOptions.get(Products.APPRAISAL_PRODUCT).productname}
                      </option>
                    )}
                    {props.associatedProductOptions.get(Products.PCR_PRODUCT) && (
                      <option value={props.associatedProductOptions.get(Products.PCR_PRODUCT).keyid} key={props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid}>
                        {props.associatedProductOptions.get(Products.PCR_PRODUCT).productname}
                      </option>
                    )}
                    {props.associatedProductOptions.get(Products.FLOOD_PRODUCT) && (
                      <option value={props.associatedProductOptions.get(Products.FLOOD_PRODUCT).keyid} key={props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid}>
                        {props.associatedProductOptions.get(Products.FLOOD_PRODUCT).productname}
                      </option>
                    )}
                    {props.associatedProductOptions.get(Products.BPO_PRODUCT) && (
                      <option value={props.associatedProductOptions.get(Products.BPO_PRODUCT).keyid} key={props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid}>
                        {props.associatedProductOptions.get(Products.BPO_PRODUCT).productname}
                      </option>
                    )}
                    {props.associatedProductOptions.get(Products.EVALUATION_PRODUCT) && (
                      <option value={props.associatedProductOptions.get(Products.EVALUATION_PRODUCT).keyid} key={props.associatedProductOptions.get(Products.AVM_PRODUCT).keyid}>
                        {props.associatedProductOptions.get(Products.EVALUATION_PRODUCT).productname}
                      </option>
                    )}
                  </select>
                  <label htmlFor={"associatedProduct" + idx}>Associated Product</label>
                </div>
                <ErrorMessage id={"associatedProductError" + idx}></ErrorMessage>
              </InputContainer>
              <div className="col-6 px-1">
                <FileInput id={"file" + idx} label="" disabled={document.DocumentType==0}/>
                <ErrorMessage id={"fileError" + idx}></ErrorMessage>
              </div>
              {idx == props.documents.length - 1 && (
                <AddRowButton
                  className="addBtn"
                  onClick={() => {
                    if (validateDocuments()) {
                      let temp = props.documents;
                      temp.push({ DocumentType: 0, Product: 0, DocumentId: 0 });
                      props.updateDocument(temp);
                    }
                  }}>
                  +
                </AddRowButton>
              )}
            </TableRow>
          </div>
        ))}
      </div>
    </Table>
  );
};

export default UploadDocumentForm;
