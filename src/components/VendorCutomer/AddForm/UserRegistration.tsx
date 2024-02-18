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
import { TextField } from "../../utils/InputGroup";
import { Form } from "react-bootstrap";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import { AddVendor, Addvendorfile } from "../../../servicesapi/Vendorapi";
import { CancelButton } from "../../order/orderProperty/OrderPropertyStyledComponents";

const UserRegistration = (props: any) => {
  const { formFields, Vendordata, setActiveTab } = props;
  const history = useNavigate();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  const [cPassword, setCpassword] = useState("");
  let urlD =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const Submit = (e: any) => {
    console.log(Vendordata);

    if (location.pathname.split("/").includes("vendor")) {
      if (
        Vendordata.userregistration.firstName === "" ||
        Vendordata.userregistration.emailId === "" ||
        Vendordata.userregistration.lastName === "" ||
        Vendordata.userregistration.logId === "" ||
        Vendordata.userregistration.password === "" ||
        cPassword === ""
      )
        updateMessages([
          {
            title: "Error !!",
            message: "Please fill all the mandatory fields",
          },
          ...messages,
        ]);
      else {
        // setLoading(true);
        let vendordata = props.Vendordata;
        vendordata.productFiles.map((ele) => {
          Addvendorfile(ele.file).then((res) => {
            // setLoading(false);
            ele.fileid = res.data[0];
            delete ele.file;
            // props.setVendordata(vendordata);
            AddVendor(props.Vendordata).then((res) => {
              if (res.status === 200) {
                // setLoading(false);
                updateMessages([
                  {
                    title: "Success !!",
                    message: "Vendor has been create successfully",
                  },
                  ...messages,
                ]);
                // props.setActiveStep(0);
                props.setVendordata({
                  id: 0,
                  vendorId: "",
                  name: "",
                  primery_Address: {
                    address: "",
                    city: "",
                    suite: "",
                    state: "",
                    pincode: "",
                  },
                  secondary_Address: {
                    address: "",
                    city: "",
                    suite: "",
                    state: "",
                    pincode: "",
                  },
                  primery_Contact: {
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    ext: "",
                    cellPhone: "",
                  },
                  secondary_contact: {
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    ext: "",
                    cellPhone: "",
                  },
                  assignmentNote: "",
                  new_Assignment: true,
                  qcRejection: true,
                  dailyReminder: true,
                  profileReminder: true,
                  licences: [
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
                  communication: [
                    {
                      type: "",
                      detail: "",
                      product_id: 0,
                      method: "",
                    },
                  ],
                  product: [
                    {
                      id: "",
                      name: "string",
                      price: 0,
                      productId: 0,
                      selected: false,
                    },
                  ],
                  userregistration: {
                    firstName: "",
                    lastName: "",
                    emailId: "",
                    logId: "",
                    password: "",
                    allowTextMsg: true,
                  },
                  productFiles: [
                    {
                      fileName: "",
                      location: "",
                      size: 0,
                      file: "",
                      type: "",
                      remarks: "",
                      issueDate: "",
                      expiryDate: "",
                      fileid: 0,
                    },
                  ],
                });
                history('/viewvendor');
              } else {
                res.json().then((val) =>
                  updateMessages([
                    {
                      title: "Error !!",
                      message: "Log Id is already exists",
                    },
                    ...messages,
                  ])
                );
              }
            });
          });
        });
      }
    } else {
      // if (userlist.length > 0) {
      //     setLoading(true);
      //     let vendordata = props.Vendordata;
      //     vendordata.productFiles.map((ele) => {
      //         Addcustomerfile(ele.file).then((res) => {
      //             setLoading(false);
      //             ele.fileid = res.data[0];
      //             delete ele.file;
      //             AddCustomer(props.Vendordata).then((res) => {
      //                 if (res.status === 200) {
      //                     UploadProductFile(props.fileupload, res.data).then((res) => {
      //                         console.log(res);
      //                     });
      //                     toast.success('Customer has been create successfully');
      //                     props.setActiveStep(0);
      //                     props.setVendordata({
      //                         customerId: '',
      //                         name: '',
      //                         parent: '',
      //                         client_type: '',
      //                         timezone: '',
      //                         primery_Address: {
      //                             address: '',
      //                             city: '',
      //                             suite: '',
      //                             state: '',
      //                             pincode: ''
      //                         },
      //                         secondary_Address: {
      //                             address: '',
      //                             city: '',
      //                             suite: '',
      //                             state: '',
      //                             pincode: ''
      //                         },
      //                         primery_Contact: {
      //                             firstName: '',
      //                             middleName: '',
      //                             lastName: '',
      //                             phone: '',
      //                             email: '',
      //                             ext: '',
      //                             cellPhone: ''
      //                         },
      //                         secondary_contact: {
      //                             firstName: '',
      //                             middleName: '',
      //                             lastName: '',
      //                             phone: '',
      //                             email: '',
      //                             ext: '',
      //                             cellPhone: ''
      //                         },
      //                         order_Confirmation: false,
      //                         assignment: false,
      //                         inspection: false,
      //                         in_QC_Review: false,
      //                         uploadedfile: 'string',
      //                         communication: [
      //                             {
      //                                 vendorId: 0,
      //                                 type: '',
      //                                 detail: '',
      //                                 product_id: 0,
      //                                 customerId: 0,
      //                                 method: ''
      //                             }
      //                         ],
      //                         product: [
      //                             {
      //                                 id: 0,
      //                                 name: 'string',
      //                                 price1: 0,
      //                                 price2: 0,
      //                                 price3: 0,
      //                                 productId: 0,
      //                                 selected: true,
      //                                 subCategory: [null]
      //                             }
      //                         ],
      //                         additionalDetail: [''],
      //                         customer_Integration_details: {
      //                             detail: '',
      //                             port: '',
      //                             login: '',
      //                             password: '',
      //                             customerId: 0
      //                         },
      //                         registerId: [0]
      //                     });
      //                 } else {
      //                     res.json().then((val) => toast.error(val));
      //                 }
      //             });
      //         });
      //     });
      // } else {
      //     toast.error('Please enter atleast one user details');
      // }
    }
  };
  const handleChange = (e) => {
    if (location.pathname.split("/").includes("vendor")) {
        props.setVendordata({
            ...(props.Vendordata ? props.Vendordata : ''),
            ['userregistration']: {
                ...props.Vendordata.userregistration,
                [e.target.name]: e.target.value
            }
        });
    } else {
        setUserRegistation({
            ...userregistration,
            [e.target.name]: e.target.value
        });
    }
};
  return (
    <>
      <Table className="table mt-3">
        <div
          className="d-grid"
          // onClick={() => handleCollapse()}
        >
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>{formFields.tabName}</TableTitle>
            </TableTitleBar>
          </TableTitleRow>
        </div>
        <div id="clientFormSection" className="displaySection">
          <div className="container-fluid card border-0">
            <div className="row">
              {formFields.formFields.map((item: any, index: number) => {
                return item.type === "text" ? (
                  <InputContainer
                    key={index}
                    width={item.width}
                    className={`px-1 ${item.require ? "required-field" : ""}`}
                  >
                    <TextField
                      id={item.name}
                      name={item.name}
                      label={item.label}
                      type="text"
                      value={item.name==="cPassword"?cPassword:Vendordata[item.name]}
                      required
                      onChange={(e: any) => {
                        item.name==="cPassword"?
                        setCpassword(e.target.value):
                        handleChange(e);
                      }}
                      onBlur={() => {
                        if (location.pathname.split("/").includes("vendor")) {
                            if (Vendordata.userregistration.password !== cPassword&&(item.name==="cPassword"||item.name==="password")) {
                                updateMessages([
                                    {
                                      title: "Error !!",
                                      message: "Confirm password should be same as password",
                                    },
                                    ...messages,
                                  ]);
                                setCpassword('');
                            }
                        } else {
                            if (userregistration.password !== cPassword) {
                                updateMessages([
                                    {
                                      title: "Error !!",
                                      message: "Confirm password should be same as password",
                                    },
                                    ...messages,
                                  ]);
                                setCpassword('');
                            }
                        }
                    }}
                    />
                    <ErrorMessage id="loanIdError"></ErrorMessage>
                  </InputContainer>
                ) : (
                  <InputContainer
                    key={index}
                    width={item.width}
                    className={`px-1 ${item.require ? "required-field" : ""}`}
                  >
                  <input type={"checkbox"} checked={true}/>{item.name}
                   
                  </InputContainer>
                );
              })}
            </div>
          </div>
        </div>
      </Table>

      <div
        className={`d-flex justify-content-${isNaN(urlD) ? "between" : "end"}`}
      >
        {isNaN(urlD) ? (
          <CancelButton
            style={{ width: "200px" }}
            onClick={() => {
              setActiveTab((prev: number) => prev - 1);
            }}
          >
            Back
          </CancelButton>
        ) : (
          <></>
        )}
        <UtilityButton style={{ width: "200px" }} onClick={Submit}>
          Save & Submit
        </UtilityButton>
      </div>
    </>
  );
};

export default UserRegistration;
