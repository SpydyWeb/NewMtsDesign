import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { ErrorMessage, InputContainer, Table, TableRow, TableTitle, TableTitleBar, TableTitleRow, UtilityButton, } from "../../order/OrderStyledComponents";
import { TextField } from "../../utils/InputGroup";
import { ApplicationContext } from "../../../App";
import { AddVendor, Addvendorfile } from "../../../servicesapi/Vendorapi";
import { CancelButton, } from "../../order/orderProperty/OrderPropertyStyledComponents";
import { useNavigate } from "react-router-dom";
import { AddCustomer, AddCustomerUser, Addcustomerfile, DeleteCustomerUser, UpdateCustomerUser, UploadProductFile, } from "../../../servicesapi/Customerapi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setloading } from "../../../store/action/actions";
const UserRegistration = (props) => {
    const { formFields, Vendordata, setActiveTab } = props;
    const history = useNavigate();
    const dispatch = useDispatch();
    const [userlist, setUserList] = useState([]);
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const [cPassword, setCpassword] = useState("");
    let urlD = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const [userregistration, setUserRegistation] = useState({
        vendorid: 0,
        firstName: "",
        lastName: "",
        emailId: "",
        logId: "",
        password: "",
        allowTextMsg: true,
    });
    const [formType, setFormType] = useState(location.pathname.split("/").includes("vendor") ? "vendor" : "customer");
    const Submit = (e) => {
        console.log(Vendordata);
        if (location.pathname.split("/").includes("vendor")) {
            if (Vendordata.userregistration.firstName === "" ||
                Vendordata.userregistration.emailId === "" ||
                Vendordata.userregistration.lastName === "" ||
                Vendordata.userregistration.logId === "" ||
                Vendordata.userregistration.password === "" ||
                cPassword === "")
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
                vendordata.productFiles.map((ele) => {
                    Addvendorfile(ele.file).then((res) => {
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
                                // props.setActiveStep(0);
                                // props.setVendordata({
                                //   id: 0,
                                //   vendorId: "",
                                //   name: "",
                                //   primery_Address: {
                                //     address: "",
                                //     city: "",
                                //     suite: "",
                                //     state: "",
                                //     pincode: "",
                                //   },
                                //   secondary_Address: {
                                //     address: "",
                                //     city: "",
                                //     suite: "",
                                //     state: "",
                                //     pincode: "",
                                //   },
                                //   primery_Contact: {
                                //     firstName: "",
                                //     middleName: "",
                                //     lastName: "",
                                //     phone: "",
                                //     email: "",
                                //     ext: "",
                                //     cellPhone: "",
                                //   },
                                //   secondary_contact: {
                                //     firstName: "",
                                //     middleName: "",
                                //     lastName: "",
                                //     phone: "",
                                //     email: "",
                                //     ext: "",
                                //     cellPhone: "",
                                //   },
                                //   assignmentNote: "",
                                //   new_Assignment: true,
                                //   qcRejection: true,
                                //   dailyReminder: true,
                                //   profileReminder: true,
                                //   licences: [
                                //     {
                                //       firstName: "",
                                //       lastName: "",
                                //       licenceNo: "",
                                //       licenceType: "",
                                //       status: "",
                                //       address: "",
                                //       expiry_Date: "",
                                //       issueDate: "",
                                //       disciplinaryAction: "",
                                //       note: "",
                                //     },
                                //   ],
                                //   communication: [
                                //     {
                                //       type: "",
                                //       detail: "",
                                //       product_id: 0,
                                //       method: "",
                                //     },
                                //   ],
                                //   product: [
                                //     {
                                //       id: "",
                                //       name: "string",
                                //       price: 0,
                                //       productId: 0,
                                //       selected: false,
                                //     },
                                //   ],
                                //   userregistration: {
                                //     firstName: "",
                                //     lastName: "",
                                //     emailId: "",
                                //     logId: "",
                                //     password: "",
                                //     allowTextMsg: true,
                                //   },
                                //   productFiles: [
                                //     {
                                //       fileName: "",
                                //       location: "",
                                //       size: 0,
                                //       file: "",
                                //       type: "",
                                //       remarks: "",
                                //       issueDate: "",
                                //       expiryDate: "",
                                //       fileid: 0,
                                //     },
                                //   ],
                                // });
                                history("/viewvendor");
                            }
                            else {
                                res.json().then((val) => updateMessages([
                                    {
                                        title: "Error !!",
                                        message: "Log Id is already exists",
                                    },
                                    ...messages,
                                ]));
                            }
                        });
                    });
                });
            }
        }
        else {
            if (userlist.length > 0) {
                //   setLoading(true);
                dispatch(setloading());
                let vendordata = props.Vendordata;
                vendordata.productFiles.map((ele) => {
                    Addcustomerfile(ele.file).then((res) => {
                        //   setLoading(false);
                        ele.fileid = res.data[0];
                        delete ele.file;
                        AddCustomer(props.Vendordata).then((res) => {
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
                                //   props.setActiveStep(0);
                                //   props.setVendordata({
                                //       customerId: '',
                                //       name: '',
                                //       parent: '',
                                //       client_type: '',
                                //       timezone: '',
                                //       primery_Address: {
                                //           address: '',
                                //           city: '',
                                //           suite: '',
                                //           state: '',
                                //           pincode: ''
                                //       },
                                //       secondary_Address: {
                                //           address: '',
                                //           city: '',
                                //           suite: '',
                                //           state: '',
                                //           pincode: ''
                                //       },
                                //       primery_Contact: {
                                //           firstName: '',
                                //           middleName: '',
                                //           lastName: '',
                                //           phone: '',
                                //           email: '',
                                //           ext: '',
                                //           cellPhone: ''
                                //       },
                                //       secondary_contact: {
                                //           firstName: '',
                                //           middleName: '',
                                //           lastName: '',
                                //           phone: '',
                                //           email: '',
                                //           ext: '',
                                //           cellPhone: ''
                                //       },
                                //       order_Confirmation: false,
                                //       assignment: false,
                                //       inspection: false,
                                //       in_QC_Review: false,
                                //       uploadedfile: 'string',
                                //       communication: [
                                //           {
                                //               vendorId: 0,
                                //               type: '',
                                //               detail: '',
                                //               product_id: 0,
                                //               customerId: 0,
                                //               method: ''
                                //           }
                                //       ],
                                //       product: [
                                //           {
                                //               id: 0,
                                //               name: 'string',
                                //               price1: 0,
                                //               price2: 0,
                                //               price3: 0,
                                //               productId: 0,
                                //               selected: true,
                                //               subCategory: [null]
                                //           }
                                //       ],
                                //       additionalDetail: [''],
                                //       customer_Integration_details: {
                                //           detail: '',
                                //           port: '',
                                //           login: '',
                                //           password: '',
                                //           customerId: 0
                                //       },
                                //       registerId: [0]
                                //   });
                                history("/customer");
                            }
                            else {
                                res.json().then((val) => updateMessages([
                                    {
                                        title: "Error !!",
                                        message: val,
                                    },
                                    ...messages,
                                ]));
                            }
                        });
                    });
                });
            }
            else {
                toast.error("Please enter atleast one user details");
            }
        }
    };
    const handleChange = (e) => {
        if (location.pathname.split("/").includes("vendor")) {
            props.setVendordata({
                ...(props.Vendordata ? props.Vendordata : ""),
                ["userregistration"]: {
                    ...props.Vendordata.userregistration,
                    [e.target.name]: e.target.value,
                },
            });
        }
        else {
            setUserRegistation({
                ...userregistration,
                [e.target.name]: e.target.value,
            });
        }
    };
    const handleDleteuser = (id) => {
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
    const handleEdituser = (id) => {
        let data = [...userlist];
        let mydata = data.filter((ele) => ele.vendorid === id);
        setUserRegistation(mydata[0]);
    };
    const handleAdduser = () => {
        if (userregistration.firstName === "" ||
            userregistration.emailId === "" ||
            userregistration.lastName === "" ||
            userregistration.logId === "" ||
            userregistration.password === "" ||
            cPassword === "")
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
                        }
                        else {
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
            }
            else {
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
    return (_jsxs(_Fragment, { children: [_jsxs(Table, { className: "table mt-3", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: formFields.tabName }) }) }) }), _jsx("div", { id: "clientFormSection", className: "displaySection", children: _jsx("div", { className: "container-fluid card border-0", children: _jsxs("div", { className: "row", children: [formFields.formFields.map((item, index) => {
                                        return item.type === "text" ? (_jsxs(InputContainer, { width: item.width, className: `px-1 ${item.require ? "required-field" : ""}`, children: [_jsx(TextField, { id: item.name, name: item.name, label: item.label, type: "text", value: item.name === "cPassword"
                                                        ? cPassword
                                                        : formType === "vendor"
                                                            ? Vendordata[item.name]
                                                            : userregistration[item.name], required: true, onChange: (e) => {
                                                        item.name === "cPassword"
                                                            ? setCpassword(e.target.value)
                                                            : handleChange(e);
                                                    }, onBlur: () => {
                                                        if (location.pathname.split("/").includes("vendor")) {
                                                            if (Vendordata.userregistration.password !==
                                                                cPassword &&
                                                                (item.name === "cPassword" ||
                                                                    item.name === "password")) {
                                                                updateMessages([
                                                                    {
                                                                        title: "Error !!",
                                                                        message: "Confirm password should be same as password",
                                                                    },
                                                                    ...messages,
                                                                ]);
                                                                setCpassword("");
                                                            }
                                                        }
                                                        else {
                                                            if (Vendordata.userregistration.password !== cPassword) {
                                                                updateMessages([
                                                                    {
                                                                        title: "Error !!",
                                                                        message: "Confirm password should be same as password",
                                                                    },
                                                                    ...messages,
                                                                ]);
                                                                setCpassword("");
                                                            }
                                                        }
                                                    } }), _jsx(ErrorMessage, { id: "loanIdError" })] }, index)) : (_jsxs(InputContainer, { width: item.width, className: `px-1 d-flex align-items-center ${item.require ? "required-field" : ""}`, children: [_jsx("input", { type: "checkbox", checked: true }), item.name] }, index));
                                    }), location.pathname.split("/").includes("vendor") === false ? (_jsx("div", { style: { width: "10%" }, className: "d-flex align-items-center", children: _jsx(UtilityButton, { onClick: () => handleAdduser(), children: "Add" }) })) : (_jsx(_Fragment, {}))] }) }) })] }), userlist.length > 0 ? (_jsxs(Table, { className: "table mb-5", children: [_jsx("div", { className: "d-grid", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: "User List" }) }) }) }), _jsx("div", { className: "d-flex", children: _jsxs("div", { className: "container-fluid card", children: [_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-1", children: "S. No." }), _jsx("div", { className: "col", children: "Name" }), _jsx("div", { className: "col", children: "Email Id" }), _jsx("div", { className: "col", children: "Log Id" }), _jsx("div", { className: "col", children: "Status" }), _jsx("div", { className: "col", children: "Action" })] }), userlist.map((ele, i) => {
                                    return (_jsxs(TableRow, { className: "row", children: [_jsx("div", { className: "col-1", children: i + 1 }), _jsx("div", { className: "col", children: `${ele.firstName} ${ele.lastName}` }), _jsx("div", { className: "col", children: ele.emailId }), _jsx("div", { className: "col", children: ele.logId }), _jsx("div", { className: "col", children: ele.allowTextMsg ? "True" : "False" }), _jsxs("div", { className: "col", children: [_jsx(MdDelete, { size: 20, style: { cursor: "pointer" }, onClick: () => handleDleteuser(ele.vendorid) }), _jsx(FaRegEdit, { size: 20, style: { cursor: "pointer" }, onClick: () => handleEdituser(ele.vendorid) })] })] }, i + 1));
                                })] }) })] })) : (_jsx(_Fragment, {})), _jsxs("div", { className: `d-flex justify-content-${isNaN(urlD) ? "between" : "end"}`, children: [isNaN(urlD) ? (_jsx(CancelButton, { style: { width: "200px" }, onClick: () => {
                            setActiveTab((prev) => prev - 1);
                        }, children: "Back" })) : (_jsx(_Fragment, {})), _jsx(UtilityButton, { style: { width: "200px" }, onClick: Submit, children: "Save & Submit" })] })] }));
};
export default UserRegistration;
