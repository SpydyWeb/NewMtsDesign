import React, { useContext, useState } from "react";
import {
  ErrorMessage,
  InputContainer,
  Table,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
  UtilityButton,
} from "../../order/OrderStyledComponents";
import { TextArea, TextField } from "../../utils/InputGroup";
import {
  Addvendoreoc,
  Checkexistingid,
  UpdateVendorAddress,
  UpdateVendorContact,
  UpdateVendorEandO,
  updateAccountinfo,
} from "../../../servicesapi/Vendorapi";
import ToolTipValidation from "./ToolTipValidation";
import { VendorFormField } from "./FormField";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import { UpdateCustomerAddress, UpdateCustomerContact, Updatecustomeraccountinfo } from "../../../servicesapi/Customerapi";

const Profile = (props: any) => {
  const { allstate, formFields, Vendordata } = props;
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  const [tooltip, setTooltip] = useState({ isshow: false, valid: false });
  let urlD =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
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
  const handleEditSubmit = () => {
    if (
      Vendordata.primery_Address.address === "" ||
      Vendordata.primery_Address.city === "" ||
      Vendordata.primery_Address.state === "" ||
      Vendordata.primery_Address.pincode === "" ||
      Vendordata.secondary_Address.address === "" ||
      Vendordata.secondary_Address.city === "" ||
      Vendordata.secondary_Address.state === "" ||
      Vendordata.secondary_Address.pincode === "" ||
      Vendordata.primery_Contact.firstName === "" ||
      Vendordata.primery_Contact.lastName === "" ||
      Vendordata.primery_Contact.phone === "" ||
      Vendordata.primery_Contact.email === "" ||
      Vendordata.primery_Contact.cellPhone === "" 
      // Vendordata.billing_Code === "" ||
      // Vendordata.billing_Name === "" ||
      // Vendordata.tax_Id === "" ||
      // Vendordata.custom_Field1 === "" ||
      // Vendordata.custom_Field2 === "" ||
      // Vendordata.profile_Note === ""
    )
      updateMessages([
        {
          title: "Error !!",
          message: "Please fill all the mandatory fields",
        },
        ...messages,
      ]);
    else {
      let dataaddress = [];
      let datacontact = [];
      let dataaccountinginfo = [];
      dataaddress.push(Vendordata.primery_Address);
      dataaddress.push(Vendordata.secondary_Address);
      datacontact.push(Vendordata.primery_Contact);
      datacontact.push(Vendordata.secondary_contact);
      dataaccountinginfo = Vendordata.accountinfo;
      if (datacontact[1].firstName === "") {
        datacontact = new Array(datacontact[0]);
      } else {
        delete datacontact[1]["id"];
        delete datacontact[1]["updateDate"];
        delete datacontact[1]["createdDate"];
        delete datacontact[1]["isDeleted"];
      }
      if (location.pathname.split("/").includes("vendor")) {
        UpdateVendorAddress(dataaddress, urlD).then((res) => {
          if (res.status === 200) {
            props.setVendorDetail({
              ...props.vendorDetail,
              ["primery_Address"]: props.Vendordata.primery_Address,
              ["secondary_Address"]: props.Vendordata.secondary_Address,
            });
            props.setEditData(!props.editData);
            props.seteditModalOpen((prev: any) => !prev);
          } else {
            res.json().then((res) =>
              updateMessages([
                {
                  title: "Error !!",
                  message: res,
                },
                ...messages,
              ])
            );
          }
        });
        UpdateVendorContact(datacontact, urlD).then((res) => {
          if (res.status === 200) {
            updateMessages([
              {
                title: "Success !!",
                message: "Profile updated succsessfully",
              },
              ...messages,
            ]);
            props.setVendorDetail({
              ...props.vendorDetail,
              ["primery_Contact"]: props.Vendordata.primery_Contact,
              ["secondary_contact"]: props.Vendordata.secondary_contact,
            });
            props.setEditData(!props.editData);
            props.seteditModalOpen((prev) => !prev);
          } else {
            res.json().then((res) =>  updateMessages([
              {
                title: "Error !!",
                message: res,
              },
              ...messages,
            ]));
          }
        });
        console.log("hitt");
        if (props.EOformValue.providerName !== "") {
          props.EOformValue["vendor_id"] = props.selecetedVedorId;
          if (props.EOformValue.id === undefined) {
            Addvendoreoc(props.EOformValue).then((res:any) => {
              if (res.status === 200) {
                updateMessages([
                  {
                    title: "Success !!",
                    message: "E&O coverage policy added succsessfully",
                  },
                  ...messages,
                ])
                props.setEditData(!props.editData);
                props.seteditModalOpen((prev) => !prev);
              } else {
                res.json().then((res) =>  updateMessages([
                  {
                    title: "Error !!",
                    message: res,
                  },
                  ...messages,
                ]));
              }
            });
          } else {
            delete props.EOformValue.updateDate;
            delete props.EOformValue.createdDate;
            delete props.EOformValue.isDeleted;
            UpdateVendorEandO(props.EOformValue, props.EOformValue.id).then(
              (res:any) => {
                if (res.status === 200) {
                  updateMessages([
                    {
                      title: "Success !!",
                      message: "E&O coverage policy Updated succsessfully",
                    },
                    ...messages,
                  ])
                   props.setEditData(!props.editData);
                  props.seteditModalOpen((prev) => !prev);
                } else {
                  res.json().then((res) =>  updateMessages([
                    {
                      title: "Error !!",
                      message: res,
                    },
                    ...messages,
                  ]));
                }
              }
            );
          }
        }
        updateAccountinfo(dataaccountinginfo, urlD).then(
          (res:any) => {
            if (res.status === 200) {
              updateMessages([
                {
                  title: "Success !!",
                  message: "Profile updated succsessfully",
                },
                ...messages,
              ])
              props.setVendorDetail({
                ...props.vendorDetail,
                ["accountinfo"]: props.Vendordata.accountinfo,
              });
              props.setEditData(!props.editData);
              props.seteditModalOpen((prev) => !prev);
            } else {
              res.json().then((res) =>  updateMessages([
                {
                  title: "Error !!",
                  message: res,
                },
                ...messages,
              ]));
            }
          }
        );
      } else {
        delete dataaddress[0].updateDate;
        delete dataaddress[0].createdDate;
        delete dataaddress[1].updateDate;
        delete dataaddress[1].createdDate;
        UpdateCustomerAddress(dataaddress, urlD).then(
          (res:any) => {
            if (res.status === 200) {
              updateMessages([
                {
                  title: "Success !!",
                  message: "Address Updated Succsessfully",
                },
                ...messages,
              ])
              props.setVendorDetail({
                ...props.vendorDetail,
                ["primery_Address"]: props.Vendordata.primery_Address,
                ["secondary_Address"]: props.Vendordata.secondary_Address,
              });
              props.seteditModalOpen((prev) => !prev);
              props.setEditData(!props.editData);
            } else {
              res.json().then((res:any) =>  updateMessages([
                {
                  title: "Error !!",
                  message: res,
                },
                ...messages,
              ]));
            }
          }
        );
        UpdateCustomerContact(datacontact, urlD).then(
          (res:any) => {
            if (res.status === 200) {
              updateMessages([
                {
                  title: "Success !!",
                  message: "Contact updated succsessfully",
                },
                ...messages,
              ])
              props.setVendorDetail({
                ...props.vendorDetail,
                ["primery_Contact"]: props.Vendordata.primery_Contact,
                ["secondary_contact"]: props.Vendordata.secondary_contact,
              });
              props.setEditData(!props.editData);
              props.seteditModalOpen((prev) => !prev);
            } else {
              res.json().then((res:any) =>  updateMessages([
                {
                  title: "Error !!",
                  message: res,
                },
                ...messages,
              ]));
            }
          }
        );
        let accoutninfodata = props.Vendordata.accountinfo;
        Updatecustomeraccountinfo(accoutninfodata, urlD).then(
          (res) => {
            if (res.status === 200) {
              updateMessages([
                {
                  title: "Success !!",
                  message: "Accouting information updated succsessfully",
                },
                ...messages,
              ])
              props.setVendorDetail({
                ...props.vendorDetail,
                ["accountinfo"]: accoutninfodata,
              });
              props.setEditData(!props.editData);
              props.seteditModalOpen((prev) => !prev);
            } else {
              res.json().then((res:any) =>  updateMessages([
                {
                  title: "Error !!",
                  message: res,
                },
                ...messages,
              ]));
            }
          }
        );
      }
    }
  };
  return (
    <>
      {formFields.map((val: any, i: number) => {
        return (isNaN(parseInt(urlD)) === false && val?.isedit === true) ||
          isNaN(parseInt(urlD)) === true ? (
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
                          <label htmlFor="clientId">{item.label}</label>
                        </div>
                        <ErrorMessage id="clientIdError"></ErrorMessage>
                      </InputContainer>
                    );
                  })}
                </div>
              </div>
            </div>
          </Table>
        ) : (
          <></>
        );
      })}
      {isNaN(parseInt(urlD)) === false ? (
        <div className="d-flex justify-content-end">
          <UtilityButton
            style={{ width: "200px" }}
            onClick={() => {
              handleEditSubmit();
            }}
          >
            Save & Update
          </UtilityButton>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
