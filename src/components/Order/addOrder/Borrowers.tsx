import { InputContainer, SerialNumber, TableTitle, TableTitleRow } from "../OrderStyledComponents";
import { Borrower } from "../../../utils/form-types";
import { ErrorMessage, Table, TableRow, TableTitleBar, AddRowButton, DeleteRowButton } from "../OrderStyledComponents";
import "../Order.css";
import { useEffect } from "react";
import { ControlledTextField, ControlledToggleButton } from "../../utils/InputGroup";
import { isEmpty, isMaxLengthExceeded, isNotEmail, isNotLengthOrEmpty } from "../../../utils/validations";

type BorrowerProps = {
  borrowers: Borrower[];
  updateBorrowers: any;
};

const Borrowers = (props: BorrowerProps) => {
  useEffect(() => {
    if (props.borrowers.length == 0) {
      let temp = props.borrowers;
      temp.push({ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "", IndCorp: "I", Last4SSN: 0 });
      props.updateBorrowers(temp);
    }
  }, []);

  const handleCollapse = () => {
    const section = document.getElementById("borrowersSection") as HTMLDivElement;
    if (section.classList.contains("displaySection")) {
      let okay = true;

      for (let i = 0; i < props.borrowers.length; i++) {
        const borrowerType = document.getElementById("borrowerType" + i) as HTMLInputElement;
        const borrowerFirstName = document.getElementById("borrowerFirstName" + i) as HTMLInputElement;
        const borrowerMiddleName = document.getElementById("borrowerMiddleName" + i) as HTMLInputElement;
        const borrowerLastName = document.getElementById("borrowerLastName" + i) as HTMLInputElement;
        const borrowerPhone = document.getElementById("borrowerPhone" + i) as HTMLInputElement;
        const borrowerEmail = document.getElementById("borrowerEmail" + i) as HTMLInputElement;
        const borrowerSocialSecurityNumber = document.getElementById("borrowerSocialSecurityNumber" + i) as HTMLInputElement;

        const borrowerFirstNameError = document.getElementById("borrowerFirstNameError" + i) as HTMLInputElement;
        const borrowerMiddleNameError = document.getElementById("borrowerMiddleNameError" + i) as HTMLInputElement;
        const borrowerLastNameError = document.getElementById("borrowerLastNameError" + i) as HTMLInputElement;
        const borrowerPhoneError = document.getElementById("borrowerPhoneError" + i) as HTMLInputElement;
        const borrowerEmailError = document.getElementById("borrowerEmailError" + i) as HTMLInputElement;
        const borrowerSocialSecurityNumberError = document.getElementById("borrowerSocialSecurityNumberError" + i) as HTMLInputElement;

        if (borrowerType.value == "I") {
          if (isEmpty(borrowerFirstName, borrowerFirstNameError)) okay = false;
          else if (isMaxLengthExceeded(borrowerFirstName, borrowerFirstNameError, 50)) okay = false;
  
          if (isMaxLengthExceeded(borrowerMiddleName, borrowerMiddleNameError, 50)) okay = false;
        }

        if (isEmpty(borrowerLastName, borrowerLastNameError)) okay = false;
        else if (isMaxLengthExceeded(borrowerLastName, borrowerLastNameError, 50)) okay = false;

        if (isMaxLengthExceeded(borrowerSocialSecurityNumber, borrowerSocialSecurityNumberError, 4)) okay = false;
        else if(isNotLengthOrEmpty(borrowerSocialSecurityNumber, borrowerSocialSecurityNumberError, 4)) okay = false;

        if(isEmpty(borrowerEmail, borrowerEmailError)) okay = false;
        else if(isMaxLengthExceeded(borrowerEmail, borrowerEmailError, 50)) okay = false;
        else if(isNotEmail(borrowerEmail, borrowerEmailError)) okay = false;

        if(isMaxLengthExceeded(borrowerPhone, borrowerPhoneError, 10)) okay = false;
      }

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
    <Table className={"table mt-3"} key={"borrowers" + props.borrowers.length}>
      <div className="d-grid pointer" onClick={() => handleCollapse()}>
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>Borrowers</TableTitle>
          </TableTitleBar>
        </TableTitleRow>
      </div>
      <div id="borrowersSection" className="displaySection">
        {props.borrowers.map((item, idx) => (
          <div className="container-fluid card border-0 mt-2" key={"borrower" + item.IndCorp + idx}>
            {props.borrowers.length > 1 && (
              <DeleteRowButton
                onClick={() => {
                  let temp = props.borrowers;
                  temp.splice(idx, 1);
                  props.updateBorrowers(temp);
                }}>
                X
              </DeleteRowButton>
            )}
            <TableRow className="row pt-0">
              <InputContainer width="18%" className="px-1">
                <div className="form-floating mt-1">
                  <select
                    className="form-select"
                    id={"borrowerType" + idx}
                    defaultValue={item?.IndCorp}
                    onChange={(e: any) => {
                      item.IndCorp = e.target.value;
                      props.updateBorrowers(props.borrowers);
                    }}
                    title={(idx == 0 ? "Primary " : "") + "Borrower Type"}>
                    <option key={"Individual"} value="I">Individual</option>
                    <option key={"Corporation"} value="C">Corporation</option>
                  </select>
                  <label htmlFor={"borrowerType" + idx}>{(idx == 0 ? "Primary " : "") + "Borrower Type"}</label>
                </div>
              </InputContainer>
              {item.IndCorp == "I" && (
                <>
                  <InputContainer width="18%" className="px-1 required-field ">
                    <ControlledTextField
                      type="text"
                      id={"borrowerFirstName" + idx}
                      label={(idx == 0 ? "Primary " : "") + "First Name"}
                      defaultValue={item?.FirstName}
                      maxLength={50}
                      changeHandler={(e: any) => {
                        const errorDiv = document.getElementById("borrowerFirstNameError" + idx) as HTMLDivElement;
                        errorDiv.innerText = "";
                        if (e.target.value.length >= 50) errorDiv.innerText = "Max character limit reached (50)";
                        else if (e.target.value.length == 0) errorDiv.innerText = "This field is required!";
                        item.FirstName = e.target.value;
                      }}
                    />
                    <ErrorMessage id={"borrowerFirstNameError" + idx}></ErrorMessage>
                  </InputContainer>
                  <InputContainer width="18%" className="px-1">
                    <ControlledTextField
                      type="text"
                      id={"borrowerMiddleName" + idx}
                      label={(idx == 0 ? "Primary " : "") + "Middle Name"}
                      defaultValue={item?.MiddleName}
                      maxLength={50}
                      changeHandler={(e: any) => {
                        const errorDiv = document.getElementById("borrowerMiddleNameError" + idx) as HTMLDivElement;
                        errorDiv.innerText = "";
                        if (e.target.value.length >= 50) errorDiv.innerText = "Max character limit reached (50)";
                        item.MiddleName = e.target.value;
                      }}
                    />
                    <ErrorMessage id={"borrowerMiddleNameError" + idx}></ErrorMessage>
                  </InputContainer>
                </>
              )}
              <InputContainer width="18%" className="px-1 required-field ">
                <ControlledTextField
                  type="text"
                  id={"borrowerLastName" + idx}
                  label={(idx == 0 ? "Primary " : "") + (item.IndCorp == "I" ? "Last Name" : "Name")}
                  defaultValue={item?.LastName}
                  maxLength={50}
                  changeHandler={(e: any) => {
                    const errorDiv = document.getElementById("borrowerLastNameError" + idx) as HTMLDivElement;
                    errorDiv.innerText = "";
                    if (e.target.value.length >= 50) errorDiv.innerText = "Max character limit reached (50)";
                    else if (e.target.value.length == 0) errorDiv.innerText = "This field is required!";
                    item.LastName = e.target.value;
                  }}
                />
                <ErrorMessage id={"borrowerLastNameError" + idx}></ErrorMessage>
              </InputContainer>
              <InputContainer width="28%" className={item.IndCorp == "I" ? "ps-1 pe-3 required-field" : "px-1 required-field"}>
                <ControlledTextField
                  type="text"
                  id={"borrowerEmail" + idx}
                  label={(idx == 0 ? "Primary " : "") + "Email"}
                  defaultValue={item?.Email}
                  maxLength={50}
                  changeHandler={(e: any) => {
                    const errorDiv = document.getElementById("borrowerEmailError" + idx) as HTMLDivElement;
                    errorDiv.innerText = "";
                    if (e.target.value.length >= 50) errorDiv.innerText = "Max character limit reached (50)";
                    else if (e.target.value.length == 0) errorDiv.innerText = "This field is required!";
                    item.Email = e.target.value;
                  }}
                />
                <ErrorMessage id={"borrowerEmailError" + idx}></ErrorMessage>
              </InputContainer>
              <InputContainer width="18%" className="px-1 ">
                <ControlledTextField
                  type="text"
                  id={"borrowerPhone" + idx}
                  label={(idx == 0 ? "Primary " : "") + "Phone"}
                  defaultValue={item?.Phone}
                  maxLength={10}
                  changeHandler={(e: any) => {
                    const errorDiv = document.getElementById("borrowerPhoneError" + idx) as HTMLDivElement;
                    errorDiv.innerText = "";
                    if (e.target.value.length >= 10) errorDiv.innerText = "Max character limit reached (10)";
                    item.Phone = e.target.value;
                  }}
                />
                <ErrorMessage id={"borrowerPhoneError" + idx}></ErrorMessage>
              </InputContainer>
              <InputContainer width="18%" className={(item.IndCorp == "I" ? "px-1" : "ps-1 pe-3")}>
                <ControlledTextField
                  type="tel"
                  id={"borrowerSocialSecurityNumber" + idx}
                  label={(idx == 0 ? "Primary " : "") + "Social Security Number (Last 4 digit)"}
                  defaultValue={item?.Last4SSN}
                  maxLength={4}
                  changeHandler={(e: any) => {
                    const errorDiv = document.getElementById("borrowerSocialSecurityNumberError" + idx) as HTMLDivElement;
                    errorDiv.innerText = "";
                    // if (e.target.value.length >= 4) errorDiv.innerText = "Max character limit reached (4)";
                    item.Last4SSN = e.target.value as unknown as number;
                  }}
                />
                <ErrorMessage id={"borrowerSocialSecurityNumberError" + idx}></ErrorMessage>
              </InputContainer>
              {idx == props.borrowers.length - 1 && (
                <AddRowButton
                  className="addBtn"
                  onClick={() => {
                    if (props.borrowers.length < 5) {
                      let temp = props.borrowers;
                      temp.push({ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "", IndCorp: "I", Last4SSN: 0 });
                      props.updateBorrowers(temp);
                    }
                  }}>
                  +
                </AddRowButton>
              )}
            </TableRow>
          </div>
        ))}
      </div>
    </Table>
  );
};

export default Borrowers;
