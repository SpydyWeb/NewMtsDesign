import { InputContainer, SerialNumber, TableTitle, TableTitleRow } from "../OrderStyledComponents";
import { Contact } from "../../../utils/form-types";
import { ErrorMessage, Table, TableRow, TableTitleBar, AddRowButton, DeleteRowButton } from "../OrderStyledComponents";
import "../Order.css";
import { useEffect } from "react";
import { ControlledTextField, ControlledToggleButton } from "../../utils/InputGroup";
import { isEmpty, isMaxLengthExceeded, isNotEmail, isNotLength, isNotLengthOrEmpty } from "../../../utils/validations";

type ContactProps = {
  contacts: Contact[];
  updateContacts: any;
};

const Contacts = (props: ContactProps) => {
  useEffect(() => {
    if (props.contacts.length == 0) {
      let temp = props.contacts;
      temp.push({ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "" });
      props.updateContacts(temp);
    }
  }, []);

  const handleCollapse = () => {
    const section = document.getElementById("contactsSection") as HTMLDivElement;
    if (section.classList.contains("displaySection")) {
      let okay = true;

      for (let i = 0; i < props.contacts.length; i++) {
        const contactFirstName = document.getElementById("contactFirstName" + i) as HTMLInputElement;
        const contactMiddleName = document.getElementById("contactMiddleName" + i) as HTMLInputElement;
        const contactLastName = document.getElementById("contactLastName" + i) as HTMLInputElement;
        const contactPhone = document.getElementById("contactPhone" + i) as HTMLInputElement;
        const contactEmail = document.getElementById("contactEmail" + i) as HTMLInputElement;

        const contactFirstNameError = document.getElementById("contactFirstNameError" + i) as HTMLInputElement;
        const contactMiddleNameError = document.getElementById("contactMiddleNameError" + i) as HTMLInputElement;
        const contactLastNameError = document.getElementById("contactLastNameError" + i) as HTMLInputElement;
        const contactPhoneError = document.getElementById("contactPhoneError" + i) as HTMLInputElement;
        const contactEmailError = document.getElementById("contactEmailError" + i) as HTMLInputElement;

        if (isEmpty(contactFirstName, contactFirstNameError)) okay = false;
        else if (isMaxLengthExceeded(contactFirstName, contactFirstNameError, 50)) okay = false;

        if (isMaxLengthExceeded(contactMiddleName, contactMiddleNameError, 50)) okay = false;

        if (isEmpty(contactLastName, contactLastNameError)) okay = false;
        else if (isMaxLengthExceeded(contactLastName, contactLastNameError, 50)) okay = false;

        if(isMaxLengthExceeded(contactPhone, contactPhoneError, 10)) okay = false;
        else if (isNotLengthOrEmpty(contactPhone, contactPhoneError, 10)) okay = false;
        
        if (isEmpty(contactEmail, contactEmailError)) okay = false;
        else if(isMaxLengthExceeded(contactEmail, contactEmailError, 50)) okay = false;
        else if(isNotEmail(contactEmail, contactEmailError)) okay = false;
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
    <Table className={"table mt-3 px-0" + "contacts" + props.contacts.length} key={"contacts" + props.contacts.length}>
      <div className="d-grid pointer" onClick={() => handleCollapse()}>
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>Contacts</TableTitle>
          </TableTitleBar>
        </TableTitleRow>
      </div>

      <div id="contactsSection" className="displaySection">
        {props.contacts.map((item, idx) => (
          <div className="container-fluid card border-0 mt-2" key={"contact" + idx}>
            {props.contacts.length > 1 && (
              <DeleteRowButton
                onClick={() => {
                  let temp = props.contacts;
                  temp.splice(idx, 1);
                  props.updateContacts(temp);
                }}>
                X
              </DeleteRowButton>
            )}
            <TableRow className="row pt-0">
              <InputContainer width="18%" className="required-field px-1">
                <ControlledTextField
                  id={"contactFirstName" + idx}
                  type="text"
                  label={(idx == 0 ? "Primary " : "") + "First Name"}
                  defaultValue={item?.FirstName}
                  maxLength={50}
                  changeHandler={(e: any) => {
                    const errorDiv = document.getElementById("contactFirstNameError" + idx) as HTMLDivElement;
                    errorDiv.innerText = "";
                    if (e.target.value.length >= 50) errorDiv.innerText = "Max character limit reached (50)";
                    else if (e.target.value.length == 0) errorDiv.innerText = "This field is required!";
                    item.FirstName = e.target.value;
                  }}
                />
                <ErrorMessage id={"contactFirstNameError" + idx}></ErrorMessage>
              </InputContainer>
              <InputContainer width="18%" className="px-1">
                <ControlledTextField
                  id={"contactMiddleName" + idx}
                  type="text"
                  label={(idx == 0 ? "Primary " : "") + "Middle Name"}
                  defaultValue={item?.MiddleName}
                  maxLength={50}
                  changeHandler={(e: any) => {
                    const errorDiv = document.getElementById("contactMiddleNameError" + idx) as HTMLDivElement;
                    errorDiv.innerText = "";
                    if (e.target.value.length >= 50) errorDiv.innerText = "Max character limit reached (50)";
                    item.MiddleName = e.target.value;
                  }}
                />
                <ErrorMessage id={"contactMiddleNameError" + idx}></ErrorMessage>
              </InputContainer>
              <InputContainer width="18%" className="required-field px-1">
                <ControlledTextField
                  id={"contactLastName" + idx}
                  type="text"
                  label={(idx == 0 ? "Primary " : "") + "Last Name"}
                  defaultValue={item?.LastName}
                  maxLength={50}
                  changeHandler={(e: any) => {
                    const errorDiv = document.getElementById("contactLastNameError" + idx) as HTMLDivElement;
                    errorDiv.innerText = "";
                    if (e.target.value.length >= 50) errorDiv.innerText = "Max character limit reached (50)";
                    else if (e.target.value.length == 0) errorDiv.innerText = "This field is required!";
                    item.LastName = e.target.value;
                  }}
                />
                <ErrorMessage id={"contactLastNameError" + idx}></ErrorMessage>
              </InputContainer>
              <InputContainer width="28%" className="required-field px-1 ">
                <ControlledTextField
                  type="text"
                  id={"contactEmail" + idx}
                  label={(idx == 0 ? "Primary " : "") + "Email"}
                  defaultValue={item?.Email}
                  maxLength={50}
                  changeHandler={(e: any) => {
                    const errorDiv = document.getElementById("contactEmailError" + idx) as HTMLDivElement;
                    errorDiv.innerText = "";
                    if (e.target.value.length >= 50) errorDiv.innerText = "Max character limit reached (50)";
                    else if (e.target.value.length == 0) errorDiv.innerText = "This field is required!";
                    item.Email = e.target.value;
                  }}
                />
                <ErrorMessage id={"contactEmailError" + idx}></ErrorMessage>
              </InputContainer>
              <InputContainer width="18%" className="ps-1 pe-3">
                <ControlledTextField
                  type="text"
                  id={"contactPhone" + idx}
                  label={(idx == 0 ? "Primary " : "") + "Phone"}
                  defaultValue={item?.Phone}
                  maxLength={10}
                  changeHandler={(e: any) => {
                    const errorDiv = document.getElementById("contactPhoneError" + idx) as HTMLDivElement;
                    errorDiv.innerText = "";
                    // if (e.target.value.length >= 10) errorDiv.innerText = "Max character limit reached (10)";
                    item.Phone = e.target.value;
                  }}
                />
                <ErrorMessage id={"contactPhoneError" + idx}></ErrorMessage>
              </InputContainer>
              {idx == props.contacts.length - 1 && (
                <AddRowButton
                  className="addBtn"
                  onClick={() => {
                    if (props.contacts.length < 5) {
                      let temp = props.contacts;
                      temp.push({ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "" });
                      props.updateContacts(temp);
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

export default Contacts;
