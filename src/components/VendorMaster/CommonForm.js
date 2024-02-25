import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import { ErrorMessage, InputContainer, Table, TableRow, TableTitleBar, } from "../Order/OrderStyledComponents";
import { TableTitle, TableTitleRow } from "../Order/OrderStyledComponents";
import { CancelButton, SaveButton, } from "../Order/orderProperty/OrderPropertyStyledComponents";
import { TextField } from "../utils/InputGroup";
import { useLocation, useNavigate } from "react-router-dom";
import { HeadingName } from "./columnField";
import { useDispatch, useSelector } from "react-redux";
import { addCommunicationdata, addLicencedata, addStatedata, } from "../../store/action/vendorAction";
import { addaccessroledata, addroledata } from "../../store/action/userAction";
import userData from "./dbAuten.json";
import { ApplicationContext } from "../../App";
import { UserRegistration } from "../../servicesapi/Userapi";
const CommonForm = () => {
    const [ispasswordmessage, setisPasswordMessage] = useState(true);
    const [oldName, setoldName] = useState("");
    const history = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const { customization } = useSelector((state) => state);
    const [formValues, setformValues] = useState({});
    const [heading, SetHeading] = useState([]);
    const [formfield, Setformfield] = useState([]);
    const [UserData, setUserData] = useState({
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
    const [WorkSt, setWorkSt] = useState({ Hour: "", Minute: "", type: "" });
    const [WorkEt, setWorkEt] = useState({ Hour: "", Minute: "", type: "" });
    const [Cpassword, setCpassword] = useState("");
    const [passwordValid, setPasswordValid] = useState({
        length: false,
        uppercase: false,
        number: false,
        specailchar: false,
    });
    let urlD = location.pathname.split("/")[location.pathname.split("/").length - 1];
    useEffect(() => {
        let data = HeadingName.filter((id) => id.id === location.pathname.split("/")[1]);
        if (location.pathname.split("/")[1] === "createuser")
            data = HeadingName.filter((id) => id.id === "user");
        console.log(location.pathname.split("/")[1]);
        // if(location.pathname.split("/")[1])
        if (data[0]?.id === "role") {
            setoldName(data[0].initialValue.name);
        }
        else if (data[0]?.id === "accessrole") {
            setoldName(data[0].initialValue.subrole);
        }
        console.log(data, oldName);
        SetHeading(data[0]);
        Setformfield(data[0].formfield);
        setformValues(data[0].initialValue);
        resetForm();
    }, [location.pathname]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValues({ ...formValues, [name]: value });
    };
    const resetForm = () => {
        formfield?.map((ele) => {
            if (formValues[ele.name] === "") {
                ele.isErrorMsg = false;
                formValues[ele.name] = "";
            }
        });
        if (isNaN(parseInt(urlD)) === true)
            setformValues(formValues);
    };
    const onChangeHandle = (evt) => {
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
    const onChangeStartTime = (evt) => {
        if (evt.target.name === "type") {
            if (evt.target.value === "PM") {
                setUserData({
                    ...UserData,
                    workStartH: parseInt(WorkSt.Hour) + 12,
                });
            }
            else {
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
    const onChangeEndTime = (evt) => {
        if (evt.target.name === "type") {
            if (evt.target.value === "PM") {
                setUserData({ ...UserData, workEndH: parseInt(WorkEt.Hour) + 12 });
            }
            else
                setUserData({ ...UserData, workEndH: parseInt(WorkEt.Hour) });
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
        if (UserData.firstName === "" ||
            UserData.lastName === "" ||
            UserData.emailId === "" ||
            UserData.logId === "" ||
            UserData.manager === "" ||
            UserData.department === "" ||
            Cpassword === "")
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
                    history('/user');
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
        if (passwordValid.length &&
            passwordValid.number &&
            passwordValid.specailchar &&
            passwordValid.uppercase) {
            setisPasswordMessage(true);
        }
        else {
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
        }
        else if (customization.Message !== "" &&
            customization.Message !== undefined) {
            updateMessages([
                {
                    title: "Error !!",
                    message: customization.Message,
                },
                ...messages,
            ]);
        }
    }, [customization.isLoading]);
    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = [...formfield];
        let id = "";
        formData?.map((ele) => {
            if (formValues[ele.name] === "")
                ele.isErrorMsg = true;
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
                if (id !== "")
                    formValues.oldrole = oldName;
                console.log(id, formValues, oldName);
                dispatch(addroledata({ formData: formValues, editid: id }));
            }
            else if (heading.id === "accessrole") {
                if (id !== "")
                    formValues.oldName = oldName;
                dispatch(addaccessroledata({ formData: formValues, editid: id }));
            }
            else
                dispatch(addStatedata({ formData: formValues, editid: id }));
        }
    };
    const renderForm = () => {
        return formfield?.map((ele, i) => {
            return ele.type === "text" ? (_jsxs(InputContainer, { width: ele?.width ? ele.width : "100%", className: `px-1 ${ele.required ? "required-field" : ""}`, children: [_jsx(TextField, { id: ele.name, name: ele.name, label: ele.label, type: "text", value: heading.id === "user" ? ele.name === "Cpassword" ? Cpassword : UserData[ele.name] : formValues[ele.name], onChange: (e) => heading.id === "user"
                            ? ele.name === "Cpassword"
                                ? setCpassword(e.target.value)
                                : onChangeHandle(e)
                            : handleChange(e), onBlur: () => {
                            if (heading.id === "user" && UserData.password !== Cpassword && ele.name === "Cpassword") {
                                setCpassword('');
                                updateMessages([
                                    {
                                        title: "Error !!",
                                        message: 'Password and confirm passwrod should be the same',
                                    },
                                    ...messages,
                                ]);
                            }
                        } }), _jsx(ErrorMessage, { id: "suiteError", children: ele.isErrorMsg ? `${ele.label} is required` : "" })] }, i)) : (_jsxs(_Fragment, { children: [ele?.parentLabel !== undefined ? (_jsx("div", { className: "px-1", children: ele?.parentLabel }, i)) : (_jsx(_Fragment, {})), _jsxs(InputContainer, { width: ele?.width ? ele.width : "100%", className: `px-1 ${ele.required ? "required-field" : ""}`, children: [_jsxs("div", { className: "form-floating mt-1", children: [" ", _jsxs("select", { className: "form-select", id: ele.name, name: ele.name, value: heading.id === "user"
                                            ? ele?.groupBy === "wet"
                                                ? WorkEt[ele.name]
                                                : ele?.groupBy === "wst"
                                                    ? WorkSt[ele.name]
                                                    : UserData[ele.name]
                                            : formValues[ele.name], onChange: heading.id === "user"
                                            ? ele.name === "Hour" ||
                                                ele.name === "Minute" ||
                                                ele.name === "type"
                                                ? ele?.groupBy === "wst"
                                                    ? onChangeStartTime
                                                    : onChangeEndTime
                                                : onChangeHandle
                                            : handleChange, children: [_jsx("option", { children: "---Select---" }), heading.id === "user" && ele.name === "userType"
                                                ? userData.userType.map((val, i) => (_jsx("option", { value: val, children: val }, i)))
                                                : heading.id === "user" && ele.name === "manager"
                                                    ? userData.manager.map((val, i) => (_jsx("option", { value: val, children: val }, i)))
                                                    : heading.id === "user" && ele.name === "department"
                                                        ? userData.department.map((val, i) => (_jsx("option", { value: val, children: val }, i)))
                                                        : heading.id === "user" && ele.name === "type"
                                                            ? userData.TimeType.map((val, i) => (_jsx("option", { value: val, children: val }, i)))
                                                            : heading.id === "user" && ele.name === "Hour"
                                                                ? userData.hours.map((val, i) => (_jsx("option", { value: val, children: val }, i)))
                                                                : heading.id === "user" && ele.name === "Minute"
                                                                    ? userData.minutes.map((val, i) => (_jsx("option", { value: val, children: val }, i)))
                                                                    : ""] }), _jsx("label", { htmlFor: ele.name, children: ele.label })] }), _jsx(ErrorMessage, { id: "suiteError", children: ele.isErrorMsg ? `${ele.label} is required` : "" })] }, i)] }));
        });
    };
    return (_jsx("div", { className: "container-fluid card border-0 align-items-center", children: _jsxs(Table, { className: "table mt-4", style: { width: "500px" }, children: [_jsx("div", { className: "d-grid pointer", onClick: () => { }, children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: heading.label }) }) }) }), _jsx("div", { id: "propertyAddressSection", className: "displaySection", children: _jsx("div", { className: "container-fluid card border-0", children: _jsx("div", { className: "row", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("div", { className: "row", children: renderForm() }), _jsxs(TableRow, { className: "border-0 mt-4", children: [_jsx(CancelButton, { onClick: () => {
                                                    resetForm();
                                                    if (location.pathname === "/createuser")
                                                        history('/');
                                                    else
                                                        history(`/${heading.id}`);
                                                }, children: "Cancel" }), _jsx(SaveButton, { onClick: heading.id === "user" ? onDataSave : handleSubmit, className: "float-end", children: "Save" })] })] }) }) }) })] }) }));
};
export default CommonForm;
