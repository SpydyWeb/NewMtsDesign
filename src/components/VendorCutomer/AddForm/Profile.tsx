import React, { useState } from "react";
import {
  ErrorMessage,
  InputContainer,
  Table,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
} from "../../order/OrderStyledComponents";
import { TextArea, TextField } from "../../utils/InputGroup";
import { Checkexistingid } from "../../../servicesapi/Vendorapi";
import ToolTipValidation from "./ToolTipValidation";
import { VendorFormField } from "./FormField";

const Profile = (props: any) => {
  const { allstate, formFields, Vendordata } = props;
  const [tooltip, setTooltip] = useState({ isshow: false, valid: false });

  const checkUserId = (id: string) => {
    Checkexistingid(id).then((res) => {
      if (res.status === 200 && id.length > 3) {
        res.json().then((res1) => {
          setTooltip({
            isshow: true,
            valid: res1,
          });
        });
      } else {
        setTooltip({
          isshow: true,
          valid: false,
        });
      }
    });
  };
  const onhandleChange = (e: any, type: string) => {
    if (type === "")
      props.setVendordata({
        ...(Vendordata ? Vendordata : ""),
        [e.target.name]: e.target.value,
      });
    else {
      props.setVendordata({
        ...(Vendordata ? Vendordata : ""),
        [type]: {
          ...Vendordata[type],
          [e.target.name]: e.target.value,
        },
      });
    }
  };
  return (
    <>
      {formFields.map((val: any, i: number) => {
        return (
          <Table className="table mt-3" key={i}>
            <div
              className="d-grid"
              // onClick={() => handleCollapse()}
            >
              <TableTitleRow>
                <TableTitleBar>
                  <TableTitle>{val.tabName}</TableTitle>
                </TableTitleBar>
              </TableTitleRow>
            </div>
            <div key={i} id="clientFormSection" className="displaySection">
              <div className="container-fluid card border-0">
                <div className="row">
                  {val.formFields.map((item: any, index: number) => {
                    return item.type === "text" ? (
                      <InputContainer
                        key={index}
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
                            if (
                              e.target.value.length > 3 &&
                              e.target.value.length != 11
                            ) {
                              checkUserId(e.target.value);
                            }
                            onhandleChange(
                              e,
                              val?.isParent ? val?.isParent : ""
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
                        {tooltip.isshow && Vendordata?.vendorId !== "" ? (
                          <ToolTipValidation
                            isValid={tooltip.valid}
                            validMessage="Correct"
                            invalidMessage={"Vendor ID already exist"}
                          />
                        ) : (
                          <></>
                        )}
                      </InputContainer>
                    ) : (
                      <InputContainer
                      key={index}
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
                            title= {item.label}
                            value={
                                val?.isParent
                                  ? Vendordata[val.isParent][item.name]
                                  : Vendordata[item.name]
                              }
                              required
                              onChange={(e: any) => {
                                onhandleChange(
                                  e,
                                  val?.isParent ? val?.isParent : ""
                                );
                              }}
                          >
                            <option defaultChecked disabled>
                              -select-
                            </option>
                            {allstate.map((items: any, i: number) => (
                              <option key={i} value={items.name}>
                                {items.name}
                              </option>
                            ))}
                          </select>
                          <label htmlFor="clientId">
                           {item.label}
                          </label>
                        </div>
                        <ErrorMessage id="clientIdError"></ErrorMessage>
                      </InputContainer>
                    );
                  })}
                </div>
              </div>
            </div>
          </Table>
        );
      })}
    </>
  );
};

export default Profile;
