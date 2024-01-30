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

const Licence = (props: any) => {
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;

  const { formFields, Vendordata, allstate, licenceType } = props;
  const handleAddClick = () => {
    let status = false;
    if (props?.edit)
      props.licences.map((ele: any) => {
        if (
          ele.firstName === "" ||
          ele.lastName === "" ||
          ele.licenceNo === "" ||
          ele.licenceType === "" ||
          ele.address === "" ||
          ele.expiry_Date === "" ||
          ele.issueDate === ""
        ) {
          status = true;
        }
      });
    else
      Vendordata.licences.map((ele: any) => {
        if (
          ele.firstName === "" ||
          ele.lastName === "" ||
          ele.licenceNo === "" ||
          ele.licenceType === "" ||
          ele.address === "" ||
          ele.expiry_Date === "" ||
          ele.issueDate === ""
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
    else if (props?.edit)
      props.setLicence([
        ...props.licences,
        {
          firstName: "",
          lastName: "",
          licenceNo: "",
          licenceType: "",
          status: "",
          address: "",
          expiry_Date: "",
          issueDate: "",
          disciplinaryAction: "",
          note: "",
        },
      ]);
    else
      props.setVendordata({
        ...Vendordata,
        ["licences"]: [
          ...Vendordata.licences,
          {
            firstName: "",
            lastName: "",
            licenceNo: "",
            licenceType: "",
            status: "",
            address: "",
            expiry_Date: "",
            issueDate: "",
            disciplinaryAction: "",
            note: "",
          },
        ],
      });
  };

  const handlechangeLicense = (e: any, i: number) => {
    const { name, value } = e.target;
    const data = [...Vendordata?.licences];
  
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
  
    props.setVendordata({ ...Vendordata, ["licences"]: data });
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
        {Vendordata.licences.map((val: any,idx: number) => {
          return (
            <div className="container-fluid card border-0 mt-2" key={"contact"}>
              {Vendordata.licences.length > 1 && (
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
                                handlechangeLicense(e, idx);
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
                              {item.name === "state"
                                ? allstate.map((items: any, i: number) => (
                                    <option key={i} value={items.name}>
                                      {items.name}
                                    </option>
                                  ))
                                : item.name === "status"
                                ? ["Active", "Inactive"].map(
                                    (items: any, i: number) => (
                                      <option key={i} value={items}>
                                        {items}
                                      </option>
                                    )
                                  )
                                : licenceType.map((items: any, i: number) => (
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
                            type={item.type}
                            value={
                              val?.isParent
                                ? Vendordata[val.isParent][item.name]
                                : Vendordata[item.name]
                            }
                            required
                            onChange={(e: any) => {
                              handlechangeLicense(e, idx);
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
                      {idx == props.Vendordata.licences.length - 1 && (
                        <AddRowButton
                          className="addBtn shadow-1"
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

export default Licence;
