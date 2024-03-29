import React, { useContext, useEffect, useState } from "react";
import {
  ErrorMessage,
  InputContainer,
  Table,
  TableRow,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
  AddButton,
  CancelButton,
  SaveButton,
} from "../order/OrderStyledComponents";
import { TextField } from "../utils/InputGroup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AddVendorProductList,
  GetVendorProduct,
} from "../../servicesapi/Vendorapi";
import { ApplicationContext, ApplicationContextType } from "../../App";

const AddVendorProduct = () => {
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  const history = useNavigate();
  const [CategoryProduct, setCategoryProduct] = useState([]);
  const [inputval, setinputval] = useState(0);
  const [productData, setproductData]:any = useState({
    name: "",
    productid: 0,
  });
  const [type, setType] = useState(true);
  useEffect(() => {
    GetVendorProduct().then((res) => {
      if (res && res.length > 0) {
        let data: any = [];
        res.map((ele: any) => {
          data.push({ id: ele.id, label: ele.name });
        });
        setCategoryProduct(data);
      }
    });
  }, []);

  const HandleSubmit = (e:any) => {
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
        } else {
          res.json().then((val) =>
            updateMessages([
              {
                title: "Error !!",
                message: val,
              },
              ...messages,
            ])
          );
        }
      });
    }
  };
  return (
    <div className="container-fluid card border-0 align-items-center">
      <Table className="table mt-4" style={{ width: "500px" }}>
        <div className="d-grid pointer" onClick={() => {}}>
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>Add Vendor Product</TableTitle>
              <AddButton
                style={{ width: "auto" }}
                onClick={() => {
                  setType((prev) => !prev);
                }}
              >
                {type ? "Add Category" : "Back"}
              </AddButton>
            </TableTitleBar>
          </TableTitleRow>
        </div>
        <div id="propertyAddressSection" className="displaySection">
          <div className="container-fluid card border-0">
            <div className="row">
              <form>
                <InputContainer width="100%" className="px-1">
                  <TextField
                    id={"name"}
                    name={"name"}
                    label={type ? "Product Name *" : "Category Name *"}
                    type="text"
                    value={productData.name}
                    onChange={(e:any) =>
                      setproductData({
                        ...productData,
                        name: e.target.value,
                      })
                    }
                  />
                  {/* <ErrorMessage id="suiteError">
            {ele.isErrorMsg ? `${ele.label} is required` : ""}
          </ErrorMessage> */}
                </InputContainer>
                {type ? (
                  <InputContainer width={"100%"} className={`px-1`}>
                    <div className="form-floating mt-1">
                      <select
                        className="form-select"
                        id="clientId"
                        name={"productid"}
                        value={inputval}
                        defaultValue={"-select-"}
                        required
                        onChange={(e:any) => {
                          setproductData({
                            ...productData,
                            productid: e.target.value,
                          });
                          setinputval(e.target.value);
                        }}
                      >
                        <option defaultChecked disabled value={0}>
                          -select-
                        </option>
                        {CategoryProduct.map((items: any, i: number) => (
                          <option key={i} value={items.id}>
                            {items.label}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="clientId">Category Product</label>
                    </div>
                  </InputContainer>
                ) : (
                  ""
                )}
                <TableRow className="border-0 mt-4">
                  <CancelButton onClick={() => history(`/viewvendorproduct`)}>
                    Cancel
                  </CancelButton>
                  <SaveButton className="float-end" onClick={HandleSubmit}>
                    Save
                  </SaveButton>
                </TableRow>
              </form>
            </div>
          </div>
        </div>
      </Table>
    </div>
  );
};

export default AddVendorProduct;
