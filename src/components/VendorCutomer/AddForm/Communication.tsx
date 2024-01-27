import React, { useContext } from "react";
import {
  AddRowButton,
  DeleteRowButton,
  ErrorMessage,
  InputContainer,
  Table,
  TableRow,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
} from "../../order/OrderStyledComponents";
import { ControlledTextField, TextField } from "../../utils/InputGroup";
import { ApplicationContext, ApplicationContextType } from "../../../App";

const Communication = (props: any) => {
  const { formFields, Vendordata, communicationType, communicatioonMethod } =
    props;
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;

  const onhandleChange = (e: any, type: string, i: number) => {
    const { name, value } = e.target;
    const data = [...Vendordata.communication];
    data[i][name] = value;
    let status = false;
    let count = 0;
    if (name === "product_id")
      props.communication.map((ele: any) => {
        if (ele.product_id === value) count++;
      });
    if (count > 1) status = true;
    if (status)
      updateMessages([
        {
          title: "Error !!",
          message: "Product name cannot be same",
        },
        ...messages,
      ]);
    else props.setVendordata({ ...props.Vendordata, [type]: data });
  };
  const handleAddClick = () => {
    let status = false;
    Vendordata.communication.map((ele: any, i: number) => {
      if (
        (ele.type === "" || ele.detail === "") &&
        (ele.productId !== 0 || i === 0)
      ) {
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
      } else
        props.setVendordata({
          ...Vendordata,
          ["communication"]: [
            ...Vendordata.communication,
            {
              type: "",
              detail: "",
              product_id: 0,
            },
          ],
        });
    }
  };
  return (
    <Table className={"table mt-3 px-0"} key={"contacts"}>
      <div
        className="d-grid pointer"
        // onClick={() => handleCollapse()}
      >
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>{formFields.tabName}</TableTitle>
          </TableTitleBar>
        </TableTitleRow>
      </div>

      <div id="contactsSection" className="displaySection">
        {Vendordata.communication.map((val: any) => {
          return (
            <div className="container-fluid card border-0 mt-2" key={"contact"}>
              <TableRow className="row pt-0">
                {formFields.formFields.map((item: any, idx: number) => {
                  return (
                    <>
                      {item.type === "select" ? (
                        <InputContainer
                          key={idx}
                          width={item.width}
                          className={`px-1 ${
                            item.require ? "required-field" : ""
                          }`}
                        >
                          <div className="form-floating mt-1">
                            <select
                              className="form-select"
                              id="clientId"
                              name={item.name}
                              title={item.label}
                              value={
                                val?.isParent
                                  ? Vendordata[val.isParent][item.name]
                                  : Vendordata[item.name]
                              }
                              required
                              onChange={(e: any) => {
                                onhandleChange(
                                  e,
                                  val?.isParent ? val?.isParent : "",
                                  idx
                                );
                              }}
                            >
                              <option defaultChecked disabled>
                                -select-
                              </option>
                              {[
                                item.name === "method"
                                  ? communicatioonMethod
                                  : communicationType,
                              ].map((items: any, i: number) => (
                                <option key={i} value={items.name}>
                                  {items.name}
                                </option>
                              ))}
                            </select>
                            <label htmlFor="clientId">{item.label}</label>
                          </div>
                          <ErrorMessage id="clientIdError"></ErrorMessage>
                        </InputContainer>
                      ) : (
                        <InputContainer
                          key={idx}
                          width={item.width}
                          className={`px-1 ${
                            item.require ? "required-field" : ""
                          }`}
                        >
                          <TextField
                            id={item.name}
                            name={item.name}
                            label={item.label}
                            type="text"
                            value={
                              val?.isParent
                                ? Vendordata[val.isParent][item.name]
                                : Vendordata[item.name]
                            }
                            required
                            onChange={(e: any) => {
                              onhandleChange(
                                e,
                                val?.isParent ? val?.isParent : "",
                                idx
                              );
                            }}
                            //   onBlur={(e) => {
                            //     if (tooltip.valid && e.target.value.length > 3)
                            //       setTooltip({
                            //         isshow: false,
                            //         valid: true,
                            //       });
                            //   }}
                          />
                          <ErrorMessage id="loanIdError"></ErrorMessage>
                        </InputContainer>
                      )}
                      {props.Vendordata.communication.length > 1 && (
                        <DeleteRowButton
                        // onClick={() => {
                        //   let temp = props.Vendordata.communication;
                        //   temp.splice(idx, 1);
                        //   props.updateContacts(temp);
                        // }}
                        >
                          X
                        </DeleteRowButton>
                      )}
                      {/* <TableRow className="row pt-0"> */}
                      {idx == props.Vendordata.communication.length - 1 && (
                        <AddRowButton
                          className="addBtn"
                          onClick={() => {
                            handleAddClick();
                          }}
                        >
                          +
                        </AddRowButton>
                      )}
                      {/* </TableRow> */}
                    </>
                  );
                })}
              </TableRow>
            </div>
          );
        })}
      </div>
    </Table>
  );
};

export default Communication;
