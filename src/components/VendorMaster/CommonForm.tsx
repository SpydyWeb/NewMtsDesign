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
const CommonForm = () => {
  const history = useNavigate();
  const [heading, SetHeading]: any = useState([]);
  useEffect(() => {
    console.log("====================================");
    console.log(
      HeadingName.filter((id: any) => id.id === location.pathname.split("/")[1])
    );
    console.log("====================================");
    SetHeading(
      ...HeadingName.filter(
        (id: any) => id.id === location.pathname.split("/")[1]
      )
    );
  }, [location.pathname]);
  return (
    <div className="container-fluid card border-0 align-items-center" >
      <Table className="table mt-4" style={{width:'500px'}}>
        <div className="d-grid pointer" onClick={() => handleCollapse()}>
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>{heading.label}</TableTitle>
            </TableTitleBar>
          </TableTitleRow>
        </div>
        <div id="propertyAddressSection" className="displaySection">
          <div className="container-fluid card border-0">
            <div className="row">
              {heading?.formfield?.map((ele, i) => {
                return (
                  <InputContainer className="px-1" key={i}>
                    <TextField
                      id={ele.name}
                      name={ele.name}
                      label={ele.label}
                      type="text"
                      defaultValue={""}
                      
                    />
                    <ErrorMessage id="suiteError"></ErrorMessage>
                  </InputContainer>
                );
              })}
               <TableRow className="border-0 mt-4">
              <CancelButton onClick={() => history(`/${heading.id}`)}>Cancel</CancelButton>
              <SaveButton className="float-end" onClick={() => {}}>
                Save
              </SaveButton>
            </TableRow>
            </div>
          </div>
        </div>
      </Table>
    </div>
  );
};

export default CommonForm;
