import React, { useContext, useEffect, useState } from "react";
import {
  ErrorMessage,
  InputContainer,
  Table,
  TableRow,
  TableTitleBar,
  CancelButton,
  SaveButton,
  SearchContainer,
  TableTitle,
  TableTitleRow,
  SearchIcon,
} from "../order/OrderStyledComponents";

import { TextField } from "../utils/InputGroup";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HeadingName } from "./columnField";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommunicationdata,
  addLicencedata,
  addStatedata,
} from "../../store/action/vendorAction";
import { addaccessroledata, addroledata } from "../../store/action/userAction";
import userData from "./dbAuten.json";
import { ApplicationContext, ApplicationContextType } from "../../App";
import { UserRegistration } from "../../servicesapi/Userapi";
const CommonForm = () => {
  const [ispasswordmessage, setisPasswordMessage] = useState(true);
  const [oldName, setoldName] = useState("");
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  const { customization }: any = useSelector((state) => state);
  const [formValues, setformValues]: any = useState({});
  const [heading, SetHeading]: any = useState([]);
  const [formfield, Setformfield]: any = useState([]);
  const [UserData, setUserData]: any = useState({
    userType: "",
    firstName: "",
    lastName: "",
    emailId: "",
    logId: "",
    password: "",
    outEmail: "",
    cellPhone: "",
    allowTextMsg: false,
    manager: "",
    department: "",
    workStartH: 0,
    workStartM: 0,
    workEndH: 0,
    workEndM: 0,
    emailSignature: "",
  });
  const [WorkSt, setWorkSt]: any = useState({ Hour: "", Minute: "", type: "" });
  const [WorkEt, setWorkEt]: any = useState({ Hour: "", Minute: "", type: "" });
  const [Cpassword, setCpassword] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    uppercase: false,
    number: false,
    specailchar: false,
  });
  let urlD =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  useEffect(() => {
    let data: any = HeadingName.filter(
      (id: any) => id.id === location.pathname.split("/")[1]
    );
    if (location.pathname.split("/")[1] === "createuser")
      data = HeadingName.filter((id: any) => id.id === "user");
    console.log(location.pathname.split("/")[1]);

    // if(location.pathname.split("/")[1])

    if (data[0]?.id === "role") {
      setoldName(data[0].initialValue.name);
    } else if (data[0]?.id === "accessrole") {
      setoldName(data[0].initialValue.subrole);
    }
    console.log(data, oldName);
    SetHeading(data[0]);
    Setformfield(data[0].formfield);
    setformValues(data[0].initialValue);
    resetForm();
  }, [location.pathname]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };
  const resetForm = () => {
    formfield?.map((ele:any) => {
      if (formValues[ele.name] === "") {
        ele.isErrorMsg = false;
        formValues[ele.name] = "";
      }
    });
    if (isNaN(parseInt(urlD)) === true) setformValues(formValues);
  };
  const onChangeHandle = (evt:any) => {
    if (evt.target.name === "password") {
      // setPasswordValid(CheckvalidatePassword(evt.target.value, passwordValid));
      isPasswordMview();
    }
    // if (evt.target.name === "emailId") {
    //   setTooltip({
    //     Valid: CheckvalidEmail(evt.target.value),
    //     isShow: true,
    //   });
    // }
    setUserData({ ...UserData, [evt.target.name]: evt.target.value });
  };
  const onChangeStartTime = (evt:any) => {
    if (evt.target.name === "type") {
      if (evt.target.value === "PM") {
        setUserData({
          ...UserData,
          workStartH: parseInt(WorkSt.Hour) + 12,
        });
      } else {
        setUserData({
          ...UserData,
          workStartH: WorkSt.Hour,
        });
      }
      if (evt.target.name === "Hour") {
        setUserData({ ...UserData, workStartH: evt.target.value });
      }
    }
    if (evt.target.name === "Minute")
      setUserData({
        ...UserData,
        workStartM: parseInt(evt.target.value),
      });

    setWorkSt({ ...WorkSt, [evt.target.name]: evt.target.value });
  };
  const onChangeEndTime = (evt:any) => {
    if (evt.target.name === "type") {
      if (evt.target.value === "PM") {
        setUserData({ ...UserData, workEndH: parseInt(WorkEt.Hour) + 12 });
      } else setUserData({ ...UserData, workEndH: parseInt(WorkEt.Hour) });
    }
    if (evt.target.name === "Hour") {
      setUserData({ ...UserData, workEndH: evt.target.value });
    }
    if (evt.target.name === "Minute")
      setUserData({
        ...UserData,
        workEndM: parseInt(evt.target.value),
      });
    setWorkEt({ ...WorkEt, [evt.target.name]: evt.target.value });
    // setUserData({
    //   ...UserData,
    //   workEndT: WorkEt,
    // });
  };
  const onDataSave = () => {
    if (
      UserData.firstName === "" ||
      UserData.lastName === "" ||
      UserData.emailId === "" ||
      UserData.logId === "" ||
      UserData.manager === "" ||
      UserData.department === "" ||
      Cpassword === ""
    )
      updateMessages([
        {
          title: "Error !!",
          message: "Please enter all mandatory fields",
        },
        ...messages,
      ]);
    else {
      UserRegistration(UserData).then((res) => {
        if (res.status === 200) {
          // dispatch(setDialogueview(""));
          updateMessages([
            {
              title: "Success !!",
              message: "User Registered Successfully",
            },
            ...messages,
          ]);
          // document.getElementById("closePopup").click();
          history("/user");
        }
      });
    }
  };

  const ResetData = () => {
    setUserData({
      userType: "",
      firstName: "",
      lastName: "",
      emailId: "",
      logId: "",
      password: "",
      outEmail: "",
      cellPhone: "",
      allowTextMsg: false,
      manager: "",
      department: "",
      workStartH: 0,
      workStartM: 0,
      workEndH: 0,
      workEndM: 0,
      emailSignature: "",
    });
    setCpassword("");
  };
  const isPasswordMview = () => {
    if (
      passwordValid.length &&
      passwordValid.number &&
      passwordValid.specailchar &&
      passwordValid.uppercase
    ) {
      setisPasswordMessage(true);
    } else {
      setisPasswordMessage(false);
    }
  };
  useEffect(() => {
    if (customization.isLoading === false && customization.Message === "save") {
      updateMessages([
        {
          title: "Success !!",
          message: "Data has been saved",
        },
        ...messages,
      ]);
      resetForm();
      history(`/${heading.id}`);
    } else if (
      customization.Message !== "" &&
      customization.Message !== undefined
    ) {
      updateMessages([
        {
          title: "Error !!",
          message: customization.Message,
        },
        ...messages,
      ]);
    }
  }, [customization.isLoading]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let formData = [...formfield];
    let id = "";
    formData?.map((ele) => {
      if (formValues[ele.name] === "") ele.isErrorMsg = true;
    });
    Setformfield(formData);
    if (isNaN(parseInt(urlD)) === false) {
      id = urlD;
    }
    if (formData.every((ele) => ele.isErrorMsg === false)) {
      if (heading.id === "licencetype")
        dispatch(addLicencedata({ formData: formValues, editid: id }));
      else if (heading.id === "communicationtype")
        dispatch(addCommunicationdata({ formData: formValues, editid: id }));
      else if (heading.id === "role") {
        if (id !== "") formValues.oldrole = oldName;
        console.log(id, formValues, oldName);

        dispatch(addroledata({ formData: formValues, editid: id }));
      } else if (heading.id === "accessrole") {
        if (id !== "") formValues.oldName = oldName;

        dispatch(addaccessroledata({ formData: formValues, editid: id }));
      } else dispatch(addStatedata({ formData: formValues, editid: id }));
    }
  };
  const renderForm = () => {
    return formfield?.map((ele: any, i: number) => {
      return ele.type === "text" ? (
        <InputContainer
          width={ele?.width ? ele.width : "100%"}
          className={`px-1 ${ele.required ? "required-field" : ""}`}
          key={i}
        >
          <TextField
            id={ele.name}
            name={ele.name}
            label={ele.label}
            type="text"
            value={
              heading.id === "user"
                ? ele.name === "Cpassword"
                  ? Cpassword
                  : UserData[ele.name]
                : formValues[ele.name]
            }
            onChange={(e: any) =>
              heading.id === "user"
                ? ele.name === "Cpassword"
                  ? setCpassword(e.target.value)
                  : onChangeHandle(e)
                : handleChange(e)
            }
            onBlur={() => {
              if (
                heading.id === "user" &&
                UserData.password !== Cpassword &&
                ele.name === "Cpassword"
              ) {
                setCpassword("");
                updateMessages([
                  {
                    title: "Error !!",
                    message: "Password and confirm passwrod should be the same",
                  },
                  ...messages,
                ]);
              }
            }}
          />
          <ErrorMessage id="suiteError">
            {ele.isErrorMsg ? `${ele.label} is required` : ""}
          </ErrorMessage>
        </InputContainer>
      ) : (
        <>
          {ele?.parentLabel !== undefined ? (
            <div className="px-1" key={i}>
              {ele?.parentLabel}
            </div>
          ) : (
            <></>
          )}
          <InputContainer
            width={ele?.width ? ele.width : "100%"}
            className={`px-1 ${ele.required ? "required-field" : ""}`}
            key={i}
          >
            <div className="form-floating mt-1">
              {" "}
              <select
                className="form-select"
                id={ele.name}
                name={ele.name}
                value={
                  heading.id === "user"
                    ? ele?.groupBy === "wet"
                      ? WorkEt[ele.name]
                      : ele?.groupBy === "wst"
                      ? WorkSt[ele.name]
                      : UserData[ele.name]
                    : formValues[ele.name]
                }
                onChange={
                  heading.id === "user"
                    ? ele.name === "Hour" ||
                      ele.name === "Minute" ||
                      ele.name === "type"
                      ? ele?.groupBy === "wst"
                        ? onChangeStartTime
                        : onChangeEndTime
                      : onChangeHandle
                    : handleChange
                }
              >
                <option>---Select---</option>
                {heading.id === "user" && ele.name === "userType"
                  ? userData.userType.map((val, i) => (
                      <option value={val} key={i}>
                        {val}
                      </option>
                    ))
                  : heading.id === "user" && ele.name === "manager"
                  ? userData.manager.map((val, i) => (
                      <option value={val} key={i}>
                        {val}
                      </option>
                    ))
                  : heading.id === "user" && ele.name === "department"
                  ? userData.department.map((val, i) => (
                      <option value={val} key={i}>
                        {val}
                      </option>
                    ))
                  : heading.id === "user" && ele.name === "type"
                  ? userData.TimeType.map((val, i) => (
                      <option value={val} key={i}>
                        {val}
                      </option>
                    ))
                  : heading.id === "user" && ele.name === "Hour"
                  ? userData.hours.map((val, i) => (
                      <option value={val} key={i}>
                        {val}
                      </option>
                    ))
                  : heading.id === "user" && ele.name === "Minute"
                  ? userData.minutes.map((val, i) => (
                      <option value={val} key={i}>
                        {val}
                      </option>
                    ))
                  : ""}
              </select>
              <label htmlFor={ele.name}>{ele.label}</label>
            </div>
            <ErrorMessage id="suiteError">
              {ele.isErrorMsg ? `${ele.label} is required` : ""}
            </ErrorMessage>
          </InputContainer>
        </>
      );
    });
  };
  return (
    <div className="container-fluid card border-0 align-items-center">
      <Table className="table mt-4" style={{ width: "500px" }}>
        <div className="d-grid pointer" onClick={() => {}}>
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>{heading.label}</TableTitle>
            </TableTitleBar>
          </TableTitleRow>
        </div>
        <div id="propertyAddressSection" className="displaySection">
          <div className="container-fluid card border-0">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="row">{renderForm()}</div>
                <TableRow className="border-0 mt-4">
                  <CancelButton
                    onClick={() => {
                      resetForm();
                      if (location.pathname === "/createuser") history("/");
                      else history(`/${heading.id}`);
                    }}
                  >
                    Cancel
                  </CancelButton>
                  <SaveButton
                    onClick={heading.id === "user" ? onDataSave : handleSubmit}
                    className="float-end"
                  >
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

export default CommonForm;
