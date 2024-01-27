import React from "react";
import {
  ErrorMessage,
  InputContainer,
  Table,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
} from "../../order/OrderStyledComponents";
import { TextArea, TextField } from "../../utils/InputGroup";

const Profile = () => {
  return (
    <Table className="table mt-3">
      <div
        className="d-grid pointer"
        // onClick={() => handleCollapse()}
      >
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>Basic Detail</TableTitle>
          </TableTitleBar>
        </TableTitleRow>
      </div>
      <div id="clientFormSection" className="displaySection">
        <div className="container-fluid card border-0">
          <div className="row">
            <InputContainer width="14%" className="required-field px-1">
              <TextField
                id="loanId"
                label="Loan Id/ Number"
                type="text"
                defaultValue={""}
                required
                maxLength={20}
              />
              <ErrorMessage id="loanIdError"></ErrorMessage>
            </InputContainer>
            <InputContainer width="20%" className="px-1">
              <TextField
                id="clientReferenceNumber"
                label="Client Reference Number"
                type="text"
                defaultValue={""}
                maxLength={100}
              />
              <ErrorMessage id="clientReferenceNumberError"></ErrorMessage>
            </InputContainer>
          </div>
        </div>
      </div>
    </Table>
  );
};

export default Profile;
