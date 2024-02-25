import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import { AddRowButton, DeleteRowButton, ErrorMessage, InputContainer, Table, TableRow, TableTitle, TableTitleBar, TableTitleRow, UtilityButton, } from "../../order/OrderStyledComponents";
import { TextField } from "../../utils/InputGroup";
import { ApplicationContext } from "../../../App";
import { AiOutlineDownload } from "react-icons/ai";
import { CurrentUrl } from "../../../servicesapi/UrlApi";
import { Addexistingvendorfile, Addvendorfile, UpdateVendorFile, } from "../../../servicesapi/Vendorapi";
import { Addcustomerfile, Addexistingcustomerfile, UpdatecustomerFile, } from "../../../servicesapi/Customerapi";
import { CancelButton, SaveButton, } from "../../order/orderProperty/OrderPropertyStyledComponents";
const FileUpload = (props) => {
    const { formFields, Vendordata, productD, setActiveTab } = props;
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    let urlD = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const handlechangedate = (e, i) => {
        const { name, value } = e.target;
        const data = [...Vendordata.productFiles];
        var q = new Date();
        var date = new Date(q.getFullYear(), q.getMonth(), q.getDate());
        if (name === "issueDate") {
            if (new Date(value) < date) {
                data[i][name] = value;
            }
            else {
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Issue date should be less than from today",
                    },
                    ...messages,
                ]);
            }
        }
        else
            data[i][name] = value;
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
    const handleEditSubmit = () => {
        let status = false;
        props.Vendordata.productFiles.map((ele) => {
            if (ele.fileName === "" ||
                ele.type === "" ||
                ele.issueDate === "" ||
                ele.expiryDate === "") {
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
        else {
            let data = props.Vendordata.productFiles;
            if (location.pathname.split("/").includes("vendor")) {
                data.map((ele) => {
                    console.log();
                    if (props.iseditdata === 0 || ele.id === undefined) {
                        const data = new FormData();
                        data.append("expiryDate", ele.expiryDate);
                        data.append("issueDate", ele.issueDate);
                        data.append("remarks", ele.remarks);
                        data.append("size", ele.size);
                        data.append("type", ele.type);
                        data.append("fileName", ele.fileName);
                        Addvendorfile(ele.file).then((resP) => {
                            data.append("File_id", resP.data[0]);
                            Addexistingvendorfile(data, urlD).then((res) => {
                                ele.File_id = ele.fileid;
                                ele.new_File_id = res.data[0];
                                delete ele.updateDate;
                                // ele.File_id = ele.fileid;
                                // ele.new_File_id = 0;
                                if (res.status === 200) {
                                    updateMessages([
                                        {
                                            title: "Success !!",
                                            message: "File updated succsessfully",
                                        },
                                        ...messages,
                                    ]);
                                }
                                else {
                                    res.json().then((res) => updateMessages([
                                        {
                                            title: "Error !!",
                                            message: res,
                                        },
                                        ...messages,
                                    ]));
                                }
                            });
                        });
                    }
                    else {
                        console.log("else hit");
                        Addvendorfile(ele.file).then((res) => {
                            ele.File_id = ele.fileid;
                            ele.size = ele.size === null ? 0 : ele.size;
                            ele.new_File_id = res.data[0];
                            // ele.id = urlD;
                            delete ele.updateDate;
                            UpdateVendorFile(ele).then((res) => {
                                if (res.status === 200) {
                                    updateMessages([
                                        {
                                            title: "Success !!",
                                            message: "File updated succsessfully",
                                        },
                                        ...messages,
                                    ]);
                                }
                                else {
                                    res.json().then((res) => updateMessages([
                                        {
                                            title: "Error !!",
                                            message: res,
                                        },
                                        ...messages,
                                    ]));
                                }
                            });
                        });
                    }
                });
            }
            else {
                data.map((ele) => {
                    console.log();
                    if (props.iseditdata === 0 || ele.id === undefined) {
                        const data = new FormData();
                        data.append("expiryDate", ele.expiryDate);
                        data.append("issueDate", ele.issueDate);
                        data.append("remarks", ele.remarks);
                        data.append("size", ele.size);
                        data.append("type", ele.type);
                        data.append("fileName", ele.fileName);
                        Addcustomerfile(ele.file).then((resP) => {
                            data.append("File_id", resP.data[0]);
                            Addexistingcustomerfile(data, urlD).then((res) => {
                                ele.File_id = ele.fileid;
                                ele.new_File_id = res.data[0];
                                delete ele.updateDate;
                                // ele.File_id = ele.fileid;
                                // ele.new_File_id = 0;
                                if (res.status === 200) {
                                    updateMessages([
                                        {
                                            title: "Success !!",
                                            message: "File updated succsessfully",
                                        },
                                        ...messages,
                                    ]);
                                }
                                else {
                                    res.json().then((res) => updateMessages([
                                        {
                                            title: "Error !!",
                                            message: res,
                                        },
                                        ...messages,
                                    ]));
                                }
                            });
                        });
                    }
                    else {
                        Addcustomerfile(ele.file).then((res) => {
                            ele.File_id = ele.fileid;
                            ele.size = ele.size === null ? 0 : ele.size;
                            ele.new_File_id = res.data[0];
                            // ele.id = urlD;
                            delete ele.updateDate;
                            UpdatecustomerFile(ele).then((res) => {
                                if (res.status === 200) {
                                    updateMessages([
                                        {
                                            title: "Success !!",
                                            message: "File updated succsessfully",
                                        },
                                        ...messages,
                                    ]);
                                }
                                else {
                                    res.json().then((res) => updateMessages([
                                        {
                                            title: "Error !!",
                                            message: res,
                                        },
                                        ...messages,
                                    ]));
                                }
                            });
                        });
                    }
                });
            }
            props.setVendorDetail({ ...props.vendorDetail, ["productFiles"]: data });
            // props.seteditModalOpen((prev) => !prev);
        }
    };
    const handleNext = () => {
        let status = false;
        props.Vendordata.productFiles.map((ele) => {
            if (ele.fileName === "" ||
                ele.type === "" ||
                ele.issueDate === "" ||
                ele.expiryDate === "") {
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
        else
            props.setActiveTab((prev) => prev + 1);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Table, { className: "table mt-3 px-0", children: [_jsx("div", { className: "d-grid pointer", children: _jsx(TableTitleRow, { children: _jsx(TableTitleBar, { children: _jsx(TableTitle, { children: formFields.tabName }) }) }) }), _jsx("div", { id: "contactsSection", className: "displaySection", children: Vendordata?.productFiles?.length > 0 ? (Vendordata.productFiles.map((val, idx) => {
                            return (_jsxs("div", { className: "container-fluid card border-0 mt-2", children: [Vendordata.productFiles.length > 1 && (_jsx(DeleteRowButton, { onClick: () => {
                                            let data = props.Vendordata.productFiles;
                                            data.splice(idx, 1);
                                            props.setVendordata({
                                                ...props.Vendordata,
                                                productFiles: data,
                                            });
                                        }, children: "X" })), _jsxs(TableRow, { className: "row pt-0", children: [_jsxs(InputContainer, { width: "20%", className: "d-flex align-items-center", children: [val.file === "" && isNaN(urlD) ? (""
                                                    // <UtilityButton style={{ width: "100px" }}>
                                                    //   Upload
                                                    // </UtilityButton>
                                                    ) : (_jsx(AiOutlineDownload, { style: { color: "blue" }, size: 20, onClick: () => {
                                                            if (val.location !== null) {
                                                                let url = CurrentUrl +
                                                                    val.location.slice(val.location.indexOf("UploadedVendorFiles"));
                                                                window.open(url, "_blank", "noreferrer");
                                                            }
                                                            else
                                                                updateMessages([
                                                                    {
                                                                        title: "Error !!",
                                                                        message: "File not found",
                                                                    },
                                                                    ...messages,
                                                                ]);
                                                        } })), isNaN(urlD) === false ? val.fileName === ""
                                                        ? "No file"
                                                        : val.fileName.length > 10
                                                            ? val.fileName.slice(0, 10) + "..."
                                                            : val.fileName : _jsx("input", { 
                                                        //  style={{display:'none'}}
                                                        type: "file", name: "file", onChange: (e) => {
                                                            const data = [...props.Vendordata.productFiles];
                                                            data[idx]["fileName"] = e.target.files[0].name;
                                                            data[idx]["size"] = e.target.files[0].size;
                                                            data[idx]["file"] = e.target.files[0];
                                                            props.setVendordata({
                                                                ...props.Vendordata,
                                                                ["productFiles"]: data,
                                                            });
                                                        } })] }), formFields.formFields.map((item) => {
                                                return (_jsxs(_Fragment, { children: [item.type === "select" ? (_jsxs(InputContainer, { width: item.width, className: `px-1 ${item.require ? "required-field" : ""}`, children: [_jsxs("div", { className: "form-floating mt-1", children: [_jsxs("select", { className: "form-select", id: "clientId", name: item.name, title: item.label, value: val[item.name], defaultValue: "-select-", required: true, onChange: (e) => {
                                                                                handlechangedate(e, idx);
                                                                                //   onhandleChange(
                                                                                //     e,
                                                                                //     val?.isParent ? val?.isParent : "",
                                                                                //     idx
                                                                                //   );
                                                                            }, children: [_jsx("option", { defaultChecked: true, disabled: true, value: "", children: "-select-" }), productD.map((items, i) => (_jsx("option", { value: items.name, children: items.name }, i)))] }), _jsx("label", { htmlFor: "clientId", children: item.label })] }), _jsx(ErrorMessage, { id: "clientIdError" })] }, idx)) : (_jsxs(InputContainer, { width: item.width, className: `px-1 ${item.require ? "required-field" : ""}`, children: [_jsx(TextField, { id: item.name, name: item.name, label: item.label, type: item.type, value: val[item.name], required: true, onChange: (e) => {
                                                                        handlechangedate(e, idx);
                                                                        // onhandleChange(
                                                                        //   e,
                                                                        //   val?.isParent ? val?.isParent : "",
                                                                        //   idx
                                                                        // );
                                                                    } }), _jsx(ErrorMessage, { id: "loanIdError" })] }, idx)), idx == props.Vendordata.productFiles.length - 1 && (_jsx(AddRowButton, { className: "addBtn", onClick: () => {
                                                                handleAddClick();
                                                            }, children: "+" }))] }));
                                            })] })] }, "contact"));
                        })) : (_jsx(_Fragment, {})) })] }, "contacts"), isNaN(parseInt(urlD)) === false ? (_jsx("div", { className: "d-flex justify-content-end", children: _jsx(UtilityButton, { style: { width: "200px", marginTop: "3rem" }, onClick: () => handleEditSubmit(), children: "Save & Update" }) })) : (_jsxs("div", { className: "d-flex justify-content-between mt-5", children: [_jsx(CancelButton, { onClick: () => {
                            setActiveTab((prev) => prev - 1);
                        }, children: "Back" }), _jsx(SaveButton, { onClick: handleNext, className: "float-end", children: "Next" })] }))] }));
};
export default FileUpload;
