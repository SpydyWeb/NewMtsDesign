import React from "react";
import {
  ErrorMessage,
  InputContainer,
  Switch,
  Table,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
} from "../../order/OrderStyledComponents";
import { Form } from "react-bootstrap";
import { TextField } from "../../utils/InputGroup";

const Additional = (props: any) => {
  const { formFields,Vendordata } = props;
  const onhandleChange = (e:any) => {
    const { name, value } = e?.target ? e.target : e;
    props.setVendordata({ ...Vendordata, [name]: value });
  };
  return (
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
              return (
                <div key={index} className="d-flex">
                  <InputContainer key={index} width={"20%"} className={`px-1 d-flex align-items-center`}>
                    <Switch
                      type="switch"
                      id="custom-switch"
                      name={item.Checkname}
                      label={item.Checkedlabel}
                      value={Vendordata[item.Checkname]}
                      onChange={(e: any) => {
                        onhandleChange(e);
                      }}
                    />
                  </InputContainer>
                  <InputContainer key={index} width={"20%"} className={`px-1`}>
                    <TextField
                      id={item.Textname}
                      name={item.Textname}
                      label={item.Textlabel}
                      type="text"
                      value={Vendordata[item.Textname]}
                      onChange={(e: any) => {
                        onhandleChange(e);
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
                  </InputContainer>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Table>
  );
};

export default Additional;
