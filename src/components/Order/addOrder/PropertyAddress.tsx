import { useEffect } from "react";
import locationServices from "../../../services/location-services";
import { PropertyAddress } from "../../../utils/form-types";
import { ErrorMessage, InputContainer, Table, TableTitleBar } from "../OrderStyledComponents";
import { TableTitle, TableTitleRow } from "../OrderStyledComponents";
import { SearchContainer, SearchIcon } from "../orderProperty/OrderPropertyStyledComponents";
import "../Order.css";
import { TextField } from "../../utils/InputGroup";
import { isEmpty, isMaxLengthExceeded, isNotLength } from "../../../utils/validations";

const PropertyAddressForm = () => {
  const autofillLocation = () => {
    const zip = document.getElementById("zip") as HTMLInputElement;
    const zipError = document.getElementById("zipError") as HTMLInputElement;
    zipError.innerText = "";
    const city = document.getElementById("city") as HTMLInputElement;
    const state = document.getElementById("state") as HTMLInputElement;
    const county = document.getElementById("county") as HTMLInputElement;
    locationServices
      .getCityandState(zip?.value)
      .then((response) => {
        if (response.data["places"].length > 0) {
          city.value = response.data["places"].at(0)["place name"];
          state.value = response.data["places"].at(0)["state abbreviation"];
        } else {
          city.disabled = false;
          state.disabled = false;
          zipError.innerText = "Couldn't find city and state! Try again or enter manually!";
        }
      })
      .catch((e) => {
        console.log("caught an exception: " + e);
        city.disabled = false;
        state.disabled = false;
        zipError.innerText = "Couldn't find city and state! Try again or enter manually!";
      });

    locationServices
      .getCounty(zip?.value)
      .then((response) => {
        if (response.data.status) {
          county.value = response.data.data.county.at(0);
        } else {
          county.disabled = false;
          zipError.innerText = "Couldn't find county! Try again or enter manually!";
        }
      })
      .catch((e) => {
        console.log("caught an exception: " + e);
        county.disabled = false;
        zipError.innerText = "Couldn't find county! Try again or enter manually!";
      });
  };

  const handleCollapse = () => {
    const section = document.getElementById("propertyAddressSection") as HTMLDivElement;
    if (section.classList.contains("displaySection")) {
      let okay = true;

      const streetAddress = document.getElementById("streetAddress") as HTMLInputElement;
      const suite = document.getElementById("suite") as HTMLInputElement;
      const city = document.getElementById("city") as HTMLInputElement;
      const state = document.getElementById("state") as HTMLInputElement;
      const zip = document.getElementById("zip") as HTMLInputElement;
      const county = document.getElementById("county") as HTMLInputElement;
      const streetAddressError = document.getElementById("streetAddressError") as HTMLInputElement;
      const suiteError = document.getElementById("suiteError") as HTMLInputElement;
      const cityError = document.getElementById("cityError") as HTMLInputElement;
      const stateError = document.getElementById("stateError") as HTMLInputElement;
      const zipError = document.getElementById("zipError") as HTMLInputElement;
      const countyError = document.getElementById("countyError") as HTMLInputElement;

      if (isEmpty(streetAddress, streetAddressError)) okay = false;
      else if(isMaxLengthExceeded(streetAddress, streetAddressError, 50)) okay = false;

      if(isMaxLengthExceeded(suite, suiteError, 10)) okay = false;

      if (isEmpty(city, cityError)) okay = false;
      else if(isMaxLengthExceeded(city, cityError, 50)) okay = false;

      if (isEmpty(state, stateError)) okay = false;
      else if(isMaxLengthExceeded(state, stateError, 2)) okay = false;
      else if(isNotLength(state, stateError, 2)) okay = false;

      if (isEmpty(zip, zipError)) okay = false;
      else if(isMaxLengthExceeded(zip, zipError, 5)) okay = false;
      else if(isNotLength(zip, zipError, 5)) okay = false;

      if(isMaxLengthExceeded(county, countyError, 50)) okay = false;

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
    <Table className="table mt-4">
      <div className="d-grid pointer" onClick={() => handleCollapse()}>
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>Property Address</TableTitle>
          </TableTitleBar>
        </TableTitleRow>
      </div>
      <div id="propertyAddressSection" className="displaySection">
        <div className="container-fluid card border-0">
          <div className="row">
            <InputContainer width="50%" className="px-1 required-field">
              <TextField id="streetAddress" label="Street Address" type="text" defaultValue={""} maxLength={50} required />
              <ErrorMessage id="streetAddressError"></ErrorMessage>
            </InputContainer>
            <InputContainer width="30%" className="px-1">
              <TextField id="suite" label="Suite/Unit" type="text" defaultValue={""} maxLength={10} />
              <ErrorMessage id="suiteError"></ErrorMessage>
            </InputContainer>
            <InputContainer width="20%" className="px-1 required-field">
              <SearchContainer className="form-floating">
                <input
                  type="text"
                  className="form-control w-100"
                  id="zip"
                  placeholder="Zip"
                  defaultValue={""}
                  maxLength={5}
                  onChange={(e) => {
                    const errorDiv = document.getElementById("zipError") as HTMLDivElement;
                    errorDiv.innerText = "";
                    // if (e.target.value.length >= 5) errorDiv.innerText = "Max character limit reached (5)";
                    if (e.target.value.length == 0) errorDiv.innerText = "This field is required!";
                  }}
                  required
                />
                <label htmlFor="zip">Zip</label>
                <SearchIcon
                  className="bi bi-search search-icon"
                  onClick={() => {
                    autofillLocation();
                  }}
                />
              </SearchContainer>
              <ErrorMessage id="zipError"></ErrorMessage>
            </InputContainer>
            <InputContainer width="18%" className="px-1 required-field">
              <TextField id="city" label="City" type="text" defaultValue={""} maxLength={50} required />
              <ErrorMessage id="cityError"></ErrorMessage>
            </InputContainer>
            <InputContainer width="14%" className="px-1 required-field">
              <TextField id="state" label="State" type="text" defaultValue={""} maxLength={2} required />
              <ErrorMessage id="stateError"></ErrorMessage>
            </InputContainer>
            <InputContainer width="18%" className="px-1">
              <TextField id="county" label="County" type="text" defaultValue={""} maxLength={50} />
              <ErrorMessage id="countyError"></ErrorMessage>
            </InputContainer>
            <InputContainer width="26%" className="px-1">
              <TextField id="parcelNumber" label="Parcel number" type="text" defaultValue={""} />
            </InputContainer>
            <InputContainer width="24%" className="px-1">
              <TextField id="loanAmount" label="Loan Amount" type="number" defaultValue={""} />
            </InputContainer>
          </div>
        </div>
      </div>
    </Table>
  );
};

export default PropertyAddressForm;
