import React, { useEffect, useState } from "react";
import {
  ErrorMessage,
  InputContainer,
  Table,
  TableRow,
  TableTitleBar,
} from "../Order/OrderStyledComponents";
import { TableTitle, TableTitleRow } from "../Order/OrderStyledComponents";
import {
  CancelButton,
  SaveButton,
  SearchContainer,
  SearchIcon,
} from "../Order/orderProperty/OrderPropertyStyledComponents";
import { TextField } from "../utils/InputGroup";
import { useNavigate } from "react-router-dom";
import { HeadingName } from "./columnField";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommunicationdata,
  addLicencedata,
  addStatedata,
} from "../../store/action/vendorAction";
import {setIsdataSaved} from "../../store/action/actions"
import { addaccessroledata, addroledata } from "../../store/action/userAction";
const CommonForm = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const {  customization } = useSelector((state) => state);
  const [formValues, setformValues]: any = useState({});
  const [heading, SetHeading]: any = useState([]);
  const [formfield, Setformfield]: any = useState([]);
  useEffect(() => {
    let data: any = HeadingName.filter(
      (id: any) => id.id === location.pathname.split("/")[1]
    );
    SetHeading(data[0]);
    Setformfield(data[0].formfield);
    setformValues(data[0].initialValue);
    resetForm();
  }, [location.pathname]);
  const handleChange = (e:any) => {
    const {name,value}=e.target;
    setformValues({...formValues,name:value })
  };
  const resetForm = () => {
  
    formfield?.map((ele) => {
      if (formValues[ele.name] === "") ele.isErrorMsg = false;
    });
   
  };
  useEffect(()=>{
    if(customization.isDataSaved)
   {
    dispatch(setIsdataSaved())
    
    history(`/${heading.id}`)}
  },[customization.isDataSaved])
  const handleSubmit = (e:any) => {
    e.preventDefault();
    let formData = [...formfield];
    formData?.map((ele) => {
      if (formValues[ele.name] === "") ele.isErrorMsg = true;
    });
    Setformfield(formData);
   
   if(formData.every((ele)=>ele.isErrorMsg===false)){
   
        if (heading.id === "licencetype")
        dispatch(addLicencedata({ formData: formValues, editid: "" }));
      else if (heading.id === "communicationtype")
        dispatch(addCommunicationdata({ formData: formValues, editid: "" }));
      else if (heading.id === "role")
        dispatch(addroledata({ formData: formValues, editid: "" }));
      else if (heading.id === "accessrole")
        dispatch(addaccessroledata({ formData: formValues, editid: "" }));
      else dispatch(addStatedata({ formData: formValues, editid: "" }));
   }
  };
  const renderForm = () => {
    return formfield?.map((ele: any, i: number) => {
      return (
        <InputContainer className="px-1" key={i}>
          <TextField
            id={ele.name}
            name={ele.name}
            label={ele.label}
            type="text"
            value={formValues[ele.name]}
            onChange={handleChange}
          />
          <ErrorMessage id="suiteError">
            {ele.isErrorMsg ? `${ele.label} is required` : ""}
          </ErrorMessage>
        </InputContainer>
      );
    });
  };
  // const {
  //   values,
  //   errors,
  //   touched,
  //   handleBlur,
  //   handleChange,
  //   handleSubmit,
  //   isSubmitting,
  // } = useFormik({
  //   initialValues: heading.initialValue,
  //   validationSchema: heading.schema,
  //   onSubmit: (values, action) => {
  //     console.log('====================================');
  //     console.log();
  //     console.log('====================================');
  //     if (heading.id === "licencetype")
  //       dispatch(addLicencedata({ formData: values, editid: "" }));
  //     else if (heading.id === "communicationtype")
  //       dispatch(addCommunicationdata({ formData: values, editid: "" }));
  //     else if (heading.id === "role")
  //       dispatch(addroledata({ formData: values, editid: "" }));
  //     else if (heading.id === "accessrole")
  //       dispatch(addaccessroledata({ formData: values, editid: "" }));
  //     else dispatch(addStatedata({ formData: values, editid: "" }));
  //   },
  // });
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
                {renderForm()}
                <TableRow className="border-0 mt-4">
                  <CancelButton onClick={() => history(`/${heading.id}`)}>
                    Cancel
                  </CancelButton>
                  <SaveButton onClick={handleSubmit} className="float-end">
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
