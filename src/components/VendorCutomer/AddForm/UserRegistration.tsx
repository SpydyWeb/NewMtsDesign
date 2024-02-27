import React, { useContext, useState } from "react";
import {
  ErrorMessage,
  InputContainer,
  Table,
  TableRow,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
  UtilityButton,
  AddButton,
  CancelButton,
} from "../../order/OrderStyledComponents";
import { TextField } from "../../utils/InputGroup";
import { Form } from "react-bootstrap";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import { AddVendor, Addvendorfile } from "../../../servicesapi/Vendorapi";
import { useNavigate } from "react-router-dom";
import {
  AddCustomer,
  AddCustomerUser,
  Addcustomerfile,
  DeleteCustomerUser,
  UpdateCustomerUser,
  UploadProductFile,
} from "../../../servicesapi/Customerapi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setloading } from "../../../store/action/actions";

const UserRegistration = (props: any) => {
  const { formFields, Vendordata, setActiveTab } = props;
  const history = useNavigate();
  const dispatch=useDispatch()
  const [userlist, setUserList]: any = useState([]);
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  const [cPassword, setCpassword] = useState("");
  let urlD:any =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [userregistration, setUserRegistation]:any = useState({
    vendorid: 0,
    firstName: "",
    lastName: "",
    emailId: "",
    logId: "",
    password: "",
    allowTextMsg: true,
  });
  const [formType, setFormType] = useState(
    location.pathname.split("/").includes("vendor") ? "vendor" : "customer"
  );
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
        dispatch(setloading());
        let vendordata = props.Vendordata;
        vendordata.productFiles.map((ele:any) => {
          Addvendorfile(ele.file).then((res:any) => {
            // setLoading(false);
            ele.fileid = res.data[0];
            delete ele.file;
            // props.setVendordata(vendordata);
            AddVendor(props.Vendordata).then((res) => {
              if (res.status === 200) {
                // setLoading(false);
                dispatch(setloading());
                updateMessages([
                  {
                    title: "Success !!",
                    message: "Vendor has been create successfully",
                  },
                  ...messages,
                ]);
                
                history("/viewvendor");
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
      if (userlist.length > 0) {
        //   setLoading(true);
        dispatch(setloading());
        let vendordata = props.Vendordata;
        vendordata.productFiles.map((ele: any) => {
          Addcustomerfile(ele.file).then((res: any) => {
            //   setLoading(false);
            ele.fileid = res.data[0];
            delete ele.file;
            AddCustomer(props.Vendordata).then((res:any) => {
              if (res.status === 200) {
                UploadProductFile(props.fileupload, res.data).then((res) => {
                  console.log(res);
                });
                dispatch(setloading());
                updateMessages([
                  {
                    title: "Success !!",
                    message: "Customer has been create successfully",
                  },
                  ...messages,
                ]);
             
                history("/customer");
              } else {
                res.json().then((val: any) =>
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
          });
        });
      } else {
        updateMessages([
            {
              title: "Error !!",
              message: "Please enter atleast one user details",
            },
            ...messages,
          ])
     
      }
    }
  };
  const handleChange = (e: any) => {
    if (location.pathname.split("/").includes("vendor")) {
      props.setVendordata({
        ...(props.Vendordata ? props.Vendordata : ""),
        ["userregistration"]: {
          ...props.Vendordata.userregistration,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setUserRegistation({
        ...userregistration,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleDleteuser = (id:any) => {
    DeleteCustomerUser(id).then((res) => {
      if (res.status === 200) {
        updateMessages([
          {
            title: "Success !!",
            message: "User deleted successfully",
          },
          ...messages,
        ]);
        let data = [...userlist];

        data = data.filter((ele) => ele.vendorid !== id);
        console.log(data);
        setUserList(data);
      }
    });
  };
  const handleEdituser = (id:any) => {
    let data = [...userlist];

    let mydata = data.filter((ele) => ele.vendorid === id);

    setUserRegistation(mydata[0]);
  };
  const handleAdduser = () => {
    if (
      userregistration.firstName === "" ||
      userregistration.emailId === "" ||
      userregistration.lastName === "" ||
      userregistration.logId === "" ||
      userregistration.password === "" ||
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
      if (userregistration.vendorid === 0) {
        AddCustomerUser(userregistration).then((res) => {
          if (res.status === 200) {
            if (res.data === 0) {
              updateMessages([
                {
                  title: "Error !!",
                  message: "User already exist",
                },
                ...messages,
              ]);
            } else {
              updateMessages([
                {
                  title: "Success !!",
                  message: "User added successfully",
                },
                ...messages,
              ]);
              let data = [...props.Vendordata.registerId];
              data.push(res.data);
              props.setVendordata({ ...props.Vendordata, registerId: data });
              setUserList([
                ...userlist,
                {
                  vendorid: res.data,
                  firstName: userregistration.firstName,
                  lastName: userregistration.lastName,
                  emailId: userregistration.emailId,
                  logId: userregistration.logId,
                  password: userregistration.password,
                  allowTextMsg: userregistration.allowTextMsg,
                },
              ]);
              setUserRegistation({
                vendorid: 0,
                firstName: "",
                lastName: "",
                emailId: "",
                logId: "",
                password: "",
                allowTextMsg: true,
              });
              setCpassword("");
            }
          }
        });
      } else {
        UpdateCustomerUser(Vendordata.userregistration).then((res) => {
          if (res.status === 200) {
            updateMessages([
              {
                title: "Success !!",
                message: "User updated successfully",
              },
              ...messages,
            ]);
            let data = [...userlist];
            for (let index = 0; index < data.length; index++) {
              if (data[index].vendorid === userregistration.vendorid) {
                data[index] = userregistration;
              }
            }

            setUserList(data);
            setUserRegistation({
              vendorid: 0,
              firstName: "",
              lastName: "",
              emailId: "",
              logId: "",
              password: "",
              allowTextMsg: true,
            });
            setCpassword("");
          }
        });
      }
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
                      value={
                        item.name === "cPassword"
                          ? cPassword
                          : formType === "vendor"
                          ? Vendordata[item.name]
                          : userregistration[item.name]
                      }
                      required
                      onChange={(e: any) => {
                        item.name === "cPassword"
                          ? setCpassword(e.target.value)
                          : handleChange(e);
                      }}
                      onBlur={() => {
                        if (location.pathname.split("/").includes("vendor")) {
                          if (
                            Vendordata.userregistration.password !==
                              cPassword &&
                            (item.name === "cPassword" ||
                              item.name === "password")
                          ) {
                            updateMessages([
                              {
                                title: "Error !!",
                                message:
                                  "Confirm password should be same as password",
                              },
                              ...messages,
                            ]);
                            setCpassword("");
                          }
                        } else {
                          if (
                            Vendordata.userregistration.password !== cPassword
                          ) {
                            updateMessages([
                              {
                                title: "Error !!",
                                message:
                                  "Confirm password should be same as password",
                              },
                              ...messages,
                            ]);
                            setCpassword("");
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
                    className={`px-1 d-flex align-items-center ${
                      item.require ? "required-field" : ""
                    }`}
                  >
                    <input type={"checkbox"} checked={true} />
                    {item.name}
                  </InputContainer>
                );
              })}
              {location.pathname.split("/").includes("vendor") === false ? (
                <div
                  style={{ width: "10%" }}
                  className="d-flex align-items-center"
                >
                  <UtilityButton onClick={() => handleAdduser()}>
                    Add
                  </UtilityButton>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Table>

      {userlist.length > 0 ? (
        <Table className="table mb-5">
          <div className="d-grid">
            <TableTitleRow>
              <TableTitleBar>
                <TableTitle>User List</TableTitle>
                {/* <AddButton
                    onClick={() => {
                      history("/orders/add");
                    }}>
                    +
                  </AddButton> */}
              </TableTitleBar>
            </TableTitleRow>
          </div>
          <div className="d-flex">
            <div className="container-fluid card">
              <TableRow className="row">
                <div className="col-1">S. No.</div>
                <div className="col">Name</div>
                <div className="col">Email Id</div>
                <div className="col">Log Id</div>
                <div className="col">Status</div>
                <div className="col">Action</div>
              </TableRow>

              {userlist.map((ele:any, i:number) => {
                return (
                  <TableRow className="row" key={i + 1}>
                    <div className="col-1">{i + 1}</div>
                    <div className="col">{`${ele.firstName} ${ele.lastName}`}</div>
                    <div className="col">{ele.emailId}</div>
                    <div className="col">{ele.logId}</div>
                    <div className="col">
                      {ele.allowTextMsg ? "True" : "False"}
                    </div>
                    <div className="col">
                      <MdDelete
                        size={20}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDleteuser(ele.vendorid)}
                      />
                      <FaRegEdit
                        size={20}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdituser(ele.vendorid)}
                      />
                    </div>
                  </TableRow>
                );
              })}

              {/* <Pagination totalPage={totalPage} data={orderPage} pageSize={pageSize} setPageSize={setPageSize} currPage={currPage} setCurrPage={setCurrPage} /> */}
            </div>
          </div>
        </Table>
      ) : (
        <></>
      )}
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
