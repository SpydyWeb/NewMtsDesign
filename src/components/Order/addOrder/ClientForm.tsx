import { useEffect, useState } from "react";
import { Client } from "../../../utils/form-types";
import { ErrorMessage, InputContainer, Table, TableTitleBar } from "../OrderStyledComponents";
import { TableTitle, TableTitleRow } from "../OrderStyledComponents";
import "../Order.css";
import { TextArea, TextField } from "../../utils/InputGroup";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import orderServices from "../../../services/order-services";

const ClientForm = () => {
  const [clientOptions, setClientOptions] = useState<any[]>([]);

  useEffect(() => {
    orderServices.getData("GetClientList").then((response)=>{
      if (response.data.statusCode == 200 && response.data.body.Status) setClientOptions(response.data.body.Data);
    })
  }, []);

  const handleCollapse = () => {
    const section = document.getElementById("clientFormSection") as HTMLDivElement;
    if (section.classList.contains("displaySection")) {
      let okay = true;

      const clientId = document.getElementById("clientId") as HTMLSelectElement;
      const loanId = document.getElementById("loanId") as HTMLInputElement;
      const additionalInstruction = document.getElementById("additionalInstruction") as HTMLInputElement;
      const clientReferenceNumber = document.getElementById("clientReferenceNumber") as HTMLInputElement;
      const clientIdError = document.getElementById("clientIdError") as HTMLDivElement;
      const loanIdError = document.getElementById("loanIdError") as HTMLDivElement;
      const clientReferenceNumberError = document.getElementById("clientReferenceNumberError") as HTMLDivElement;
      const additionalInstructionError = document.getElementById("additionalInstructionError") as HTMLDivElement;

      if (isNoOptionSelected(clientId, clientIdError)) okay = false;

      if (isEmpty(loanId, loanIdError)) okay = false;
      else if (isMaxLengthExceeded(loanId, loanIdError, 20)) okay = false;

      if (isMaxLengthExceeded(clientReferenceNumber, clientReferenceNumberError, 100)) okay = false;
      if (isMaxLengthExceeded(additionalInstruction, additionalInstructionError, 4000)) okay = false;

      if (okay) {
        section.classList.remove("displaySection");
        section.classList.add("hideSection");
      }
    } else {
      section.classList.add("displaySection");
      section.classList.remove("hideSection");
    }
  };

  return (
    <Table className="table mt-3">
      <div className="d-grid pointer" onClick={() => handleCollapse()}>
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>Client/Customer</TableTitle>
          </TableTitleBar>
        </TableTitleRow>
      </div>
      <div id="clientFormSection" className="displaySection">
        <div className="container-fluid card border-0">
          <div className="row">
            <InputContainer width="20%" className="required-field px-1">
              <div className="form-floating mt-1">
                  <select className="form-select" id="clientId" defaultValue={"-select-"} title="Client Id/ Client Name">
                    <option defaultChecked disabled>-select-</option>
                    {clientOptions.map((item) => (
                      <option key={item.keyid} value={item.keyid}>{item.keyvalue}</option>
                    ))}
                  </select>
                  <label htmlFor="clientId">Client Id/ Client Name</label>
                </div>
              <ErrorMessage id="clientIdError"></ErrorMessage>
            </InputContainer>
            <InputContainer width="14%" className="required-field px-1">
              <TextField id="loanId" label="Loan Id/ Number" type="text" defaultValue={""} required maxLength={20}/>
              <ErrorMessage id="loanIdError"></ErrorMessage>
            </InputContainer>
            <InputContainer width="20%" className="px-1">
              <TextField id="clientReferenceNumber" label="Client Reference Number" type="text" defaultValue={""} maxLength={100}/>
              <ErrorMessage id="clientReferenceNumberError"></ErrorMessage>
            </InputContainer>
            <InputContainer width="46%" className="px-1">
              <TextArea id="additionalInstruction" label=" Instructions/ Note" defaultValue={""} maxLength={4000}/>
              <ErrorMessage id="additionalInstructionError"></ErrorMessage>
            </InputContainer>
          </div>
        </div>
      </div>
    </Table>
  );
};

export default ClientForm;
