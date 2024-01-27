import React from "react";
import {
  AdvancedFilterToggle,
  CenterContainer,
  ErrorMessage,
  FloatingButton,
  InputContainer,
  OrderContainer,
  SearchBar,
  SearchButton,
  Table,
  TableRow,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
  UtilityButton,
} from "../order/OrderStyledComponents";
import { Card } from "react-bootstrap";
import { SelectBox, TextField } from "../utils/InputGroup";
import { SearchContainer } from "../order/orderProperty/OrderPropertyStyledComponents";
import { FaSearch } from "react-icons/fa";
import { AdvancedformField } from "./renderUtils";
const AdvanceFilter = (props: any) => {
  const { filterdata, handleFilterChange, allstate, handleSearch } = props;

  const renderFields = (data: any) => {
    return data.map((val: any, i: number) => {
      return val.type === "text" ? (
        <InputContainer width="20%" className="px-1" key={i}>
          <TextField
            label={val.label}
            name={val.name}
            value={filterdata[val.name]}
            onChange={(e: any) => handleFilterChange(e)}
          />
        </InputContainer>
      ) : (
        <InputContainer width="20%" className="px-1" key={i}>
          <div className="form-floating mt-1">
            <select
              className="form-select"
              id="clientId"
              name={val.name}
              defaultValue={
                val.name === "State" ? allstate[0]?.name : val.options[0]?.label
              }
              title={val.label}
            >
              <option key={0} defaultChecked disabled>
                -select-
              </option>
              {val.name === "State"
                ? allstate.map((item: any, idx: number) => (
                    <option key={"clientId" + idx} value={item.name}>
                      {item.name}
                    </option>
                  ))
                : val.options.map((item: any, idx: number) => (
                    <option key={"clientId" + idx} value={item.value}>
                      {item.label}
                    </option>
                  ))}
            </select>
            <label htmlFor="clientId">{val.label}</label>
          </div>
        </InputContainer>
      );
    });
  };
  return (
    <Card.Body className="px-1 py=2">
      <div className="container-fluid">
        <div className="row">
          {renderFields(
            location.pathname.split("/").includes("viewvendor")
              ? AdvancedformField.vendor
              : AdvancedformField.customer
          )}

          <div className="col-10"></div>
          <div className="col-2 mt-2">
            <UtilityButton
              onClick={() => {
                handleSearch();
              }}
            >
              <FaSearch />
              &nbsp;Search
            </UtilityButton>
          </div>
        </div>
      </div>
    </Card.Body>
  );
};

export default AdvanceFilter;
