import React, { useContext, useEffect, useRef, useState } from "react";
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
  GetVendorAddressbyid,
  GetVendorContactbyid,
  GetVendorEandOById,
  UpdateVendorAddress,
  UpdateVendorContact,
  UpdateVendorEandO,
  updateAccountinfo,
} from "../../../servicesapi/Vendorapi";
import ToolTipValidation from "./ToolTipValidation";
import { VendorFormField } from "./FormField";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import {
  UpdateCustomerAddress,
  UpdateCustomerContact,
  Updatecustomeraccountinfo,
} from "../../../servicesapi/Customerapi";
import {
  CancelButton,
  SaveButton,
} from "../../order/orderProperty/OrderPropertyStyledComponents";
import { validateEmail } from "../renderUtils";
const clientTypeDDl = [
  { name: 'Lender', value: 'Lender' },
  { name: 'Broker', value: 'Broker' },
  { name: 'Agent', value: 'Agent' },
  { name: 'Servicer', value: 'Servicer' },
  { name: 'Other', value: 'Other' }
];
const Profile = (props: any) => {
  const {
    allstate,
    formFields,
    Vendordata,
    setVendordata,
    activeTab,
    setActiveTab,
  } = props;
  const target = useRef(null);
  const [sameAs, setSameas] = useState({ address: false, contact: false });
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
  const [EOformValue, setEOFormValue] = useState({
    per_claim_amount: "",
    policy_aggrigate: "",
    effectivedate: "",
    expirydate: "",
    policynumber: "",
    providerName: "",
  });
  useEffect(() => {
    console.log(Vendordata);
    
  }, []);
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
      Vendordata.primery_Contact.cellPhone === "" ||
      Vendordata.billing_Code === "" ||
      Vendordata.billing_Name === "" ||
      Vendordata.tax_Id === "" ||
      Vendordata.custom_Field1 === "" ||
      Vendordata.custom_Field2 === "" ||
      Vendordata.profile_Note === ""
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
            props.setVendordata({
              ...props.Vendordata,
              ["primery_Address"]: props.Vendordata.primery_Address,
              ["secondary_Address"]: props.Vendordata.secondary_Address,
            });
            // props.setEditData(!props.editData);
            // props.seteditModalOpen((prev: any) => !prev);
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
            props.setVendordata({
              ...props.Vendordata,
              ["primery_Contact"]: props.Vendordata.primery_Contact,
              ["secondary_contact"]: props.Vendordata.secondary_contact,
            });
            // props.setEditData(!props.editData);
            // props.seteditModalOpen((prev) => !prev);
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
        console.log("hitt");
        // if (props.EOformValue.providerName !== "") {
        //   props.EOformValue["vendor_id"] = props.selecetedVedorId;
        //   if (props.EOformValue.id === undefined) {
        //     Addvendoreoc(props.EOformValue).then((res:any) => {
        //       if (res.status === 200) {
        //         updateMessages([
        //           {
        //             title: "Success !!",
        //             message: "E&O coverage policy added succsessfully",
        //           },
        //           ...messages,
        //         ])
        //         props.setEditData(!props.editData);
        //         props.seteditModalOpen((prev) => !prev);
        //       } else {
        //         res.json().then((res) =>  updateMessages([
        //           {
        //             title: "Error !!",
        //             message: res,
        //           },
        //           ...messages,
        //         ]));
        //       }
        //     });
        //   } else {
        //     delete props.EOformValue.updateDate;
        //     delete props.EOformValue.createdDate;
        //     delete props.EOformValue.isDeleted;
        //     UpdateVendorEandO(props.EOformValue, props.EOformValue.id).then(
        //       (res:any) => {
        //         if (res.status === 200) {
        //           updateMessages([
        //             {
        //               title: "Success !!",
        //               message: "E&O coverage policy Updated succsessfully",
        //             },
        //             ...messages,
        //           ])
        //            props.setEditData(!props.editData);
        //           props.seteditModalOpen((prev) => !prev);
        //         } else {
        //           res.json().then((res) =>  updateMessages([
        //             {
        //               title: "Error !!",
        //               message: res,
        //             },
        //             ...messages,
        //           ]));
        //         }
        //       }
        //     );
        //   }
        // }
        updateAccountinfo(dataaccountinginfo, urlD).then((res: any) => {
          if (res.status === 200) {
            updateMessages([
              {
                title: "Success !!",
                message: "Profile updated succsessfully",
              },
              ...messages,
            ]);
            props.setVendordata({
              ...props.Vendordata,
              ["accountinfo"]: props.Vendordata.accountinfo,
            });
            // props.setEditData(!props.editData);
            // props.seteditModalOpen((prev) => !prev);
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
      } else {
        delete dataaddress[0].updateDate;
        delete dataaddress[0].createdDate;
        delete dataaddress[1].updateDate;
        delete dataaddress[1].createdDate;
        UpdateCustomerAddress(dataaddress, urlD).then((res: any) => {
          if (res.status === 200) {
            updateMessages([
              {
                title: "Success !!",
                message: "Address Updated Succsessfully",
              },
              ...messages,
            ]);
            props.setVendordata({
              ...props.Vendordata,
              ["primery_Address"]: props.Vendordata.primery_Address,
              ["secondary_Address"]: props.Vendordata.secondary_Address,
            });
            props.seteditModalOpen((prev) => !prev);
            props.setEditData(!props.editData);
          } else {
            res.json().then((res: any) =>
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
        UpdateCustomerContact(datacontact, urlD).then((res: any) => {
          if (res.status === 200) {
            updateMessages([
              {
                title: "Success !!",
                message: "Contact updated succsessfully",
              },
              ...messages,
            ]);
            props.setVendordata({
              ...props.Vendordata,
              ["primery_Contact"]: props.Vendordata.primery_Contact,
              ["secondary_contact"]: props.Vendordata.secondary_contact,
            });
            props.setEditData(!props.editData);
            props.seteditModalOpen((prev) => !prev);
          } else {
            res.json().then((res: any) =>
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
        let accoutninfodata = props.Vendordata.accountinfo;
        Updatecustomeraccountinfo(accoutninfodata, urlD).then((res) => {
          if (res.status === 200) {
            updateMessages([
              {
                title: "Success !!",
                message: "Accouting information updated succsessfully",
              },
              ...messages,
            ]);
            props.setVendordata({
              ...props.Vendordata,
              ["accountinfo"]: accoutninfodata,
            });
            props.setEditData(!props.editData);
            props.seteditModalOpen((prev) => !prev);
          } else {
            res.json().then((res: any) =>
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
      }
    }
  };
  const handleNext = () => {
    if (
      Vendordata.vendorId === "" ||
      Vendordata.name === "" ||
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
      Vendordata.primery_Contact.cellPhone === "" ||
      Vendordata.accountinfo.billing_Code === "" ||
      Vendordata.accountinfo.billing_Name === "" ||
      Vendordata.accountinfo.tax_Id === "" ||
      Vendordata.accountinfo.custom_Field1 === "" ||
      Vendordata.accountinfo.custom_Field2 === "" ||
      Vendordata.accountinfo.profile_Note === "" ||
      (Vendordata.parent &&
        Vendordata.parent === "" &&
        location.pathname.split("/").includes("vendor") === false)
    )
      updateMessages([
        {
          title: "Error !!",
          message: "Please fill all the mandatory fields",
        },
        ...messages,
      ]);
    else setActiveTab((prev: number) => prev + 1);
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
                  {val?.isParent === "secondary_Address" ||
                  val?.isParent === "secondary_contact" ? (
                    <div className="d-flex align-items-center">
                      (
                      <input
                        type="checkbox"
                        checked={
                          val?.isParent === "secondary_Address"
                            ? sameAs.address
                            : sameAs.contact
                        }
                        onChange={(e) => {
                          if (val?.isParent === "secondary_Address") {
                            setSameas({ ...sameAs, address: !sameAs.address });
                            if (e.target.checked)
                              props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ""),
                                ["secondary_Address"]:
                                  props.Vendordata.primery_Address,
                              });
                            else
                              props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ""),
                                ["secondary_Address"]: {
                                  address: "",
                                  city: "",
                                  suite: "",
                                  state: "",
                                  pincode: "",
                                },
                              });
                          } else {
                            setSameas({ ...sameAs, contact: !sameAs.contact });
                            if (e.target.checked)
                              props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ""),
                                ["secondary_contact"]:
                                  props.Vendordata.primery_Contact,
                              });
                            else
                              props.setVendordata({
                                ...(props.Vendordata ? props.Vendordata : ""),
                                ["secondary_contact"]: {
                                  firstName: "",
                                  middleName: "",
                                  lastName: "",
                                  phone: "",
                                  email: "",
                                  ext: "",
                                  cellPhone: "",
                                },
                              });
                          }
                        }}
                      />{" "}
                      Same as{" "}
                      {val?.isParent === "secondary_contact"
                        ? "Primary Contact"
                        : "Primary Address"}
                      )
                    </div>
                  ) : (
                    <></>
                  )}
                </TableTitleBar>
              </TableTitleRow>
            </div>
            <div key={i} id="clientFormSection" className="displaySection">
              <div className="container-fluid card border-0">
                <div className="row">
                  {Vendordata?.primery_Address ? (
                    val.formFields.map((item: any, index: number) => {
                      console.log('--value--',  val?.isParent
                      ? Vendordata[val.isParent][item.name]
                      : Vendordata[item.name]);
                      
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
                                e.target.value.length != 11 &&
                                item.name === "vendorId"
                              ) {
                                checkUserId(e.target.value);
                              }
                              onhandleChange(
                                e,
                                val?.isParent ? val?.isParent : ""
                              );
                            }}
                            onBlur={(e: any) => {
                              if (item.name === "pincode") {
                                if (e.target.value.length !== 5) {
                                  updateMessages([
                                    {
                                      title: "Error !!",
                                      message: "Please enter the valid zipcode",
                                    },
                                    ...messages,
                                  ]);
                                  props.setVendordata({
                                    ...(props.Vendordata
                                      ? props.Vendordata
                                      : ""),
                                    [val?.isParent]: {
                                      ...props.Vendordata[val?.isParent],
                                      [e.target.name]: "",
                                    },
                                  });
                                }
                              } else if (item.name === "email") {
                                if (!validateEmail(e.target.value)) {
                                  updateMessages([
                                    {
                                      title: "Error !!",
                                      message: "Please enter valid email id",
                                    },
                                    ...messages,
                                  ]);
                                  props.setVendordata({
                                    ...(props.Vendordata
                                      ? props.Vendordata
                                      : ""),
                                    [val?.isParent]: {
                                      ...props.Vendordata[val?.isParent],
                                      [e.target.name]: "",
                                    },
                                  });
                                }
                              }
                            }}
                          />
                          <ErrorMessage id="loanIdError"></ErrorMessage>
                          {item.name === "vendorId" ? (
                            tooltip.isshow && Vendordata?.vendorId !== "" ? (
                              <ToolTipValidation
                                target={target}
                                isValid={tooltip.valid}
                                validMessage="Correct"
                                invalidMessage={"Vendor ID already exist"}
                              />
                            ) : (
                              <></>
                            )
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
                              <option defaultChecked disabled value="">
                                -select-
                              </option>
                              {item.name==="client_type"?
                              clientTypeDDl.map((items:any,i:number)=>(
                                <option key={i} value={items.value}>
                                {items.name}
                              </option>
                              ))
                              :
                              
                              allstate.map((items: any, i: number) => (
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
                    })
                  ) : (
                    <></>
                  )}
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
        <div className="d-flex justify-content-end">
          <SaveButton onClick={handleNext} className="float-end">
            Next
          </SaveButton>
        </div>
      )}
    </>
  );
};

export default Profile;
