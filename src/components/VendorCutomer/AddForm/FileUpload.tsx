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
import { TextField } from "../../utils/InputGroup";
import { ApplicationContext, ApplicationContextType } from "../../../App";

const FileUpload = (props: any) => {
  const { formFields, Vendordata, productD } = props;
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;

  const handlechangedate = (e: any, i: number) => {
    const { name, value } = e.target;
    const data = [...Vendordata.productFiles];
    var q = new Date();
    var date = new Date(q.getFullYear(), q.getMonth(), q.getDate());

    if (name === "issueDate") {
      if (new Date(value) < date) {
        data[i][name] = value;
      } else {
        updateMessages([
          {
            title: "Error !!",
            message: "Issue date should be less than from today",
          },
          ...messages,
        ]);
      }
    } else data[i][name] = value;
    props.setVendordata({ ...props.Vendordata, ["productFiles"]: data });
  };
  const handleAddClick = () => {
    let data = Vendordata.productFiles;
    if (data.at(-1).type === "" || data.at(-1).fileName === "")
      updateMessages([
        {
          title: "Error !!",
          message: "Please fill all the mandatory fields",
        },
        ...messages,
      ]);
    else {
      data.push({
        fileName: "",
        location: "",
        size: 0,
        file: "",
        type: "",
        remarks: "",
        issueDate: "",
        expiryDate: "",
      });
      props.setVendordata({ ...Vendordata, productFiles: data });
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
        {Vendordata.productFiles.map((val: any, idx: number) => {
          return (
            <div className="container-fluid card border-0 mt-2" key={"contact"}>
              {Vendordata.productFiles.length > 1 && (
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
              <TableRow className="row pt-0">
                {formFields.formFields.map((item: any) => {
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
                              defaultValue={"-select-"}
                              required
                              onChange={(e: any) => {
                                handlechangedate(e, idx);
                                //   onhandleChange(
                                //     e,
                                //     val?.isParent ? val?.isParent : "",
                                //     idx
                                //   );
                              }}
                            >
                              <option defaultChecked disabled>
                                -select-
                              </option>
                              {productD.map((items: any, i: number) => (
                                <option key={i} value={items.id}>
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
                            type={item.type}
                            value={
                              val?.isParent
                                ? Vendordata[val.isParent][item.name]
                                : Vendordata[item.name]
                            }
                            required
                            onChange={(e: any) => {
                              handlechangedate(e, idx);
                              // onhandleChange(
                              //   e,
                              //   val?.isParent ? val?.isParent : "",
                              //   idx
                              // );
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

                      {/* <TableRow className="row pt-0"> */}
                      {idx == props.Vendordata.productFiles.length - 1 && (
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

export default FileUpload;
