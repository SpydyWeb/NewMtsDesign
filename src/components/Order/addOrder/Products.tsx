import { useEffect, useState } from "react";
import { Products } from "../../../utils/form-types";
import { ErrorMessage, InputContainer, Table, TableTitleBar } from "../OrderStyledComponents";
import { TableTitle, TableTitleRow } from "../OrderStyledComponents";
import "../Order.css";
import orderServices from "../../../services/order-services";
import { isNoOptionSelected } from "../../../utils/validations";

type ProductProps = {
  associatedProductOptions: Map<string, any>;
  setAssociatedProductOptions: any;
};

const ProductForm = ({ associatedProductOptions, setAssociatedProductOptions }: ProductProps) => {
  const [productOptions, setProductOptions] = useState<Map<string, any[]>>();

  useEffect(() => {
    orderServices.getData("GetProductList").then((response) => {
      let temp = new Map();
      Object.values(Products).forEach((productType) => {
        temp.set(
          productType,
          response.data.body.Data.filter((item: any) => {
            return item.productgroup == productType;
          })
        );
      });
      setProductOptions(temp);
    });
  }, []);

  const handleCollapse = () => {
    const section = document.getElementById("productsSection") as HTMLDivElement;
    if (section.classList.contains("displaySection")) {
      let okay = true;

      const avmProduct = document.getElementById("avmProduct") as HTMLSelectElement;
      const titleProduct = document.getElementById("titleProduct") as HTMLSelectElement;
      const appraisalProduct = document.getElementById("appraisalProduct") as HTMLSelectElement;
      const pcrPropertyInspectionConditionReport = document.getElementById("pcrPropertyInspectionConditionReport") as HTMLSelectElement;
      const flood = document.getElementById("flood") as HTMLSelectElement;
      const bpo = document.getElementById("bpo") as HTMLSelectElement;
      const evaluation = document.getElementById("evaluation") as HTMLSelectElement;
      const avmProductError = document.getElementById("avmProductError") as HTMLInputElement;
      const titleProductError = document.getElementById("titleProductError") as HTMLInputElement;
      const appraisalProductError = document.getElementById("appraisalProductError") as HTMLInputElement;
      const pcrPropertyInspectionConditionReportError = document.getElementById("pcrPropertyInspectionConditionReportError") as HTMLInputElement;
      const floodError = document.getElementById("floodError") as HTMLInputElement;
      const bpoError = document.getElementById("bpoError") as HTMLInputElement;
      const evaluationError = document.getElementById("evaluationError") as HTMLInputElement;

      if (isNoOptionSelected(avmProduct, avmProductError)) okay = false;
      if (isNoOptionSelected(titleProduct, titleProductError)) okay = false;
      if (isNoOptionSelected(appraisalProduct, appraisalProductError)) okay = false;
      if (isNoOptionSelected(pcrPropertyInspectionConditionReport, pcrPropertyInspectionConditionReportError)) okay = false;
      if (isNoOptionSelected(flood, floodError)) okay = false;
      if (isNoOptionSelected(bpo, bpoError)) okay = false;
      if (isNoOptionSelected(evaluation, evaluationError)) okay = false;

      if (okay) {
        section.classList.remove("displaySection");
        section.classList.add("hideSection");
      }
    } else {
      section.classList.add("displaySection");
      section.classList.remove("hideSection");
    }
  };

  return (
    <Table className="table mt-4">
      <div className="d-grid pointer" onClick={() => handleCollapse()}>
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>Products</TableTitle>
          </TableTitleBar>
        </TableTitleRow>
      </div>
      <div id="productsSection" className="displaySection">
        <div className="container-fluid card border-0">
          <div className="row">
            <InputContainer width="14%" className="px-1 required-field">
              <div className="form-floating mt-1">
                <select
                  className="form-select"
                  id="avmProduct"
                  title="AVM Product"
                  defaultValue={"-select-"}
                  onChange={(e) => {
                    let temp = associatedProductOptions;
                    temp?.set(Products.AVM_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                    setAssociatedProductOptions(temp);
                  }}>
                  <option defaultChecked disabled>
                    -select-
                  </option>
                  {productOptions?.get(Products.AVM_PRODUCT)?.map((item: any) => (
                    <option value={item.keyid} key={item.keyid}>
                      {item.productname}
                    </option>
                  ))}
                </select>
                <label htmlFor="avmProduct">AVM Product</label>
              </div>
              <ErrorMessage id="avmProductError" />
            </InputContainer>
            <InputContainer width="14%" className="px-1 required-field">
              <div className="form-floating mt-1">
                <select
                  className="form-select"
                  id="titleProduct"
                  title="Title Product"
                  defaultValue={"-select-"}
                  onChange={(e) => {
                    let temp = associatedProductOptions;
                    temp?.set(Products.TITLE_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                    setAssociatedProductOptions(temp);
                  }}>
                  <option defaultChecked disabled>
                    -select-
                  </option>
                  {productOptions?.get(Products.TITLE_PRODUCT)?.map((item: any) => (
                    <option value={item.keyid} key={item.keyid}>
                      {item.productname}
                    </option>
                  ))}
                </select>
                <label htmlFor="titleProduct">Title Product</label>
              </div>
              <ErrorMessage id="titleProductError" />
            </InputContainer>
            <InputContainer width="14%" className="px-1 required-field">
              <div className="form-floating mt-1">
                <select
                  className="form-select"
                  id="appraisalProduct"
                  title="Appraisal Product"
                  defaultValue={"-select-"}
                  onChange={(e) => {
                    let temp = associatedProductOptions;
                    temp?.set(Products.APPRAISAL_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                    setAssociatedProductOptions(temp);
                  }}>
                  <option defaultChecked disabled>
                    -select-
                  </option>
                  {productOptions?.get(Products.APPRAISAL_PRODUCT)?.map((item: any) => (
                    <option value={item.keyid} key={item.keyid}>
                      {item.productname}
                    </option>
                  ))}
                </select>
                <label htmlFor="appraisalProduct">Appraisal Product</label>
              </div>
              <ErrorMessage id="appraisalProductError" />
            </InputContainer>
            <InputContainer width="16%" className="px-1 required-field">
              <div className="form-floating mt-1">
                <select
                  className="form-select"
                  id="pcrPropertyInspectionConditionReport"
                  title="PCR Property Inspection Condition Report"
                  defaultValue={"-select-"}
                  onChange={(e) => {
                    let temp = associatedProductOptions;
                    temp?.set(Products.PCR_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                    setAssociatedProductOptions(temp);
                  }}>
                  <option defaultChecked disabled>
                    -select-
                  </option>
                  {productOptions?.get(Products.PCR_PRODUCT)?.map((item: any) => (
                    <option value={item.keyid} key={item.keyid}>
                      {item.productname}
                    </option>
                  ))}
                </select>
                <label htmlFor="pcrPropertyInspectionConditionReport">PCR Property Inspection Condition Report</label>
              </div>
              <ErrorMessage id="pcrPropertyInspectionConditionReportError" />
            </InputContainer>
            <InputContainer width="14%" className="px-1 required-field">
              <div className="form-floating mt-1">
                <select
                  className="form-select"
                  id="flood"
                  title="Flood"
                  defaultValue={"-select-"}
                  onChange={(e) => {
                    let temp = associatedProductOptions;
                    temp?.set(Products.FLOOD_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                    setAssociatedProductOptions(temp);
                  }}>
                  <option defaultChecked disabled>
                    -select-
                  </option>
                  {productOptions?.get(Products.FLOOD_PRODUCT)?.map((item: any) => (
                    <option value={item.keyid} key={item.keyid}>
                      {item.productname}
                    </option>
                  ))}
                </select>
                <label htmlFor="flood">Flood</label>
              </div>
              <ErrorMessage id="floodError" />
            </InputContainer>
            <InputContainer width="14%" className="px-1 required-field">
              <div className="form-floating mt-1">
                <select
                  className="form-select"
                  id="bpo"
                  title="BPO"
                  defaultValue={"-select-"}
                  onChange={(e) => {
                    let temp = associatedProductOptions;
                    temp?.set(Products.BPO_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                    setAssociatedProductOptions(temp);
                  }}>
                  <option defaultChecked disabled>
                    -select-
                  </option>
                  {productOptions?.get(Products.BPO_PRODUCT)?.map((item: any) => (
                    <option value={item.keyid} key={item.keyid}>
                      {item.productname}
                    </option>
                  ))}
                </select>
                <label htmlFor="bpo">BPO</label>
              </div>
              <ErrorMessage id="bpoError" />
            </InputContainer>
            <InputContainer width="14%" className="px-1 required-field">
              <div className="form-floating mt-1">
                <select
                  className="form-select"
                  id="evaluation"
                  title="Evaluation"
                  defaultValue={"-select-"}
                  onChange={(e) => {
                    let temp = associatedProductOptions;
                    temp?.set(Products.EVALUATION_PRODUCT, { keyid: e.target.value, productname: e.target.options[e.target.selectedIndex].text });
                    setAssociatedProductOptions(temp);
                  }}>
                  <option defaultChecked disabled>
                    -select-
                  </option>
                  {productOptions?.get(Products.EVALUATION_PRODUCT)?.map((item: any) => (
                    <option value={item.keyid} key={item.keyid}>
                      {item.productname}
                    </option>
                  ))}
                </select>
                <label htmlFor="evaluation">Evaluation</label>
              </div>
              <ErrorMessage id="evaluationError" />
            </InputContainer>
          </div>
        </div>
      </div>
    </Table>
  );
};

export default ProductForm;
