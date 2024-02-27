import React, { useContext, useEffect, useState } from "react";
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
  SearchContainer,
  SearchIcon,
} from "../order/OrderStyledComponents";
import {
  Accordion,
  AccordionContext,
  Card,
  Form,
  InputGroup,
  useAccordionButton,
} from "react-bootstrap";
import { FaAngleDown, FaAngleUp, FaRegEdit, FaSearch } from "react-icons/fa";
import { ControlledSelectBox, SelectBox, TextField } from "../utils/InputGroup";
import Multiselect from "multiselect-react-dropdown";
import {
  GetStateList,
  GetallVendorBySearch,
} from "../../servicesapi/Vendorapi";
import { CustomerSearch } from "../../servicesapi/Customerapi";
import AdvanceFilter from "./AdvanceFilter";
import { ApplicationContext, ApplicationContextType } from "../../App";
import { useNavigate } from "react-router-dom";

function CustomToggle({ children, eventKey }: any) {
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(eventKey, () => {});
  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <AdvancedFilterToggle type="button" onClick={decoratedOnClick}>
      <b>
        {children}
        {isCurrentEventKey ? <FaAngleUp /> : <FaAngleDown />}
      </b>
    </AdvancedFilterToggle>
  );
}
const ViewTable = () => {
  const [allstate, setAllState] = useState([]);
  const [allstatedata, setAllStatedata] = useState([]);
  const history = useNavigate();

  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  const [filterdata, setFilterdata] = useState({
    Id: "",
    Email: "",
    Name: "",
    Status: 0,
    Contact: "",
    Licence: "",
    State: "",
    Product: "",
  });
  const [isDataload, setisDataload] = useState(false);
  const columns = [
    {
      field: "Action",
      headerName: "Action",
    },
    {
      headerName: "Status",
      field: "status",
    },
    { headerName: "ID", field: "vendorid" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email", minWidth: 300, flex: 1 },
    { headerName: "Contact", field: "contact", minWidth: 300, flex: 1 },
  ];
  const Customercolumns = [
    {
      field: "Action",
      headerName: "Action",
    
    },
    { headerName: "ID", field: "vendorid", minWidth: 150, flex: 1 },
    { headerName: "Name", field: "name", minWidth: 150, flex: 1 },
    { headerName: "Email", field: "email", minWidth: 300, flex: 1 },
    // { headerName: 'State', field: 'state', minWidth: 150, flex: 1 },
    { headerName: "Contact", field: "contact", minWidth: 300, flex: 1 },
    // { headerName: 'Product', field: 'product', minWidth: 150, flex: 1 }
  ];
  useEffect(() => {
    setAllStatedata([]);
    setFilterdata({
      Id: "",
      Email: "",
      Name: "",
      Status: 0,
      Contact: "",
      Licence: "",
      State: "",
      Product: "",
    });
  }, [location.pathname]);
  const handleSearch = () => {
    updateLoadingMessage("Fetching Vendor Data...");
    updateLoading(true);
    let data: any = {};
    if (filterdata.Id !== "") data.id = filterdata.Id;
    if (filterdata.Name !== "") data.name = filterdata.Name;
    if (filterdata.Email !== "") data.email = filterdata.Email;
    if (filterdata.Contact !== "") data.contact = filterdata.Contact;
    if (filterdata.Licence !== "") data.licence = filterdata.Licence;
    if (filterdata.State !== "") data.state = filterdata.State;
    if (filterdata.Product !== "") data.product = filterdata.Product;

    if (location.pathname.split("/").includes("viewvendor")) {
      data.status = filterdata.Status;
      GetallVendorBySearch(data).then((res) => {
        let data: any = [];
   console.log(res);
   
        if(res.length===0)
        updateMessages([
          {
            title: "Error !!",
            message: "No data found!!",
          },
          ...messages,
        ]);
        res.map((ele: any) =>
          data.push({
            id: ele.id,
            vendorid: ele.vendorid,
            name: ele.name,
            email: ele.email,
            state: ele.address.split(",")[3],
            contact:
              ele.contact1.split(",")[4] === ""
                ? ele.contact1.split(",")[3]
                : ele.contact1.split(",")[3] +
                  " ," +
                  ele.contact1.split(",")[4],
            licenceType: ele.licence.licenceType,
            product: ele.product.name,
            status: ele.status,
          })
        );
        updateLoading(false);
        setAllStatedata(data);
      });
    } else {
      CustomerSearch(data).then((res:any) => {
        console.log(res);
        if(res.length===0)
        updateMessages([
          {
            title: "Error !!",
            message: "No data found!!",
          },
          ...messages,
        ]);
        let data: any = [];
        res.map((ele: any) =>
          data.push({
            id: ele.id,
            vendorid: ele.customerId,
            name: ele.name,
            email: ele.email,
            state: ele.address.split(",")[3],
            contact:
              ele.contact1.split(",")[4] === ""
                ? ele.contact1.split(",")[3]
                : ele.contact1.split(",")[3] +
                  " ," +
                  ele.contact1.split(",")[4],
            product: ele.product.name,
          })
        );
        setAllStatedata(data);
        updateLoading(false);
      });
    }
  };
  const handleFilterChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value === "clear") setFilterdata({ ...filterdata, [name]: "" });
    else setFilterdata({ ...filterdata, [name]: value });
  };
  const renderColumn = (data: any) => {
    return data.map((ele: any, i: number) => {
      return (
        <div
          key={i}
          className={`col${
            ele.field === "status" || ele.field === "Action" ? "-1" : ""
          }`}
          // onClick={() => handleSort("orderid", "orderIdSortIcon")}
        >
          <b>
            {ele.headerName}
            {/* <i id="sortIcon" className={icons["orderIdSortIcon"]}></i> */}
          </b>
        </div>
      );
    });
  };
  const renderStatusCell = (status: number) => {
    return status === 0 ? (
      <span
        style={{
          border: "2px solid black",
          padding: "3px 6px",
          borderRadius: "5px",
          color: "black",
        }}
      >
        New
      </span>
    ) : status === 1 ? (
      <span
        style={{
          border: "2px solid orange",
          padding: "3px 6px",
          borderRadius: "5px",
          color: "orange",
        }}
      >
        Updated
      </span>
    ) : status === 2 ? (
      <span
        style={{
          border: "2px solid green",
          padding: "3px 6px",
          borderRadius: "5px",
          color: "green",
        }}
      >
        Verified
      </span>
    ) : (
      <span
        style={{
          border: "2px solid red",
          padding: "3px 6px",
          borderRadius: "5px",
          color: "red",
        }}
      >
        InActive
      </span>
    );
  };
  const handleEditData = (val: any) => {
    console.log(val);
    history(
      `/${
        location.pathname.split("/").includes("viewvendor")
          ? `vendor`
          : "customer"
      }/edit/${val.id}`,
      { state: val }
    );
  };
  const renderRows = (data: any, columns: any) => {
    let fields: any = [];
    columns.map((ele: any) => {
      fields.push(ele.field);
    });
    return data.map((item: any, idx: number) => (
      <TableRow key={"order" + idx} className="row">
        {fields.map((val:any, i:number) => {
          return i === 0 ? (
            <div className={`col-1`} key={i}>
              {" "}
              <FaRegEdit
                role="button"
                size={20}
                onClick={() => handleEditData(item)}
              />
            </div>
          ) : (
            <div
              className={`col${
                val === "status" || val === "Action" ? "-1" : ""
              }`}
              key={i}
            >
              {val === "status" ? renderStatusCell(item[val]) : item[val]}
            </div>
          );
        })}
      </TableRow>
    ));
  };
  return (
    <OrderContainer className="mt-3">
      <CenterContainer className="mb-5">
        <Accordion defaultActiveKey="" className="w-100">
          <Card>
            <SearchBar>
              <InputGroup className="mb-1 w-50">
                <Form.Control
                  id="globalSearch"
                  placeholder="Search"
                  aria-label="Search"
                  name="Name"
                  onChange={(e) => handleFilterChange(e)}
                  value={filterdata.Name}
                  aria-describedby="filter-search"
                />
                <SearchButton id="filter-search" onClick={() => handleSearch()}>
                  <FaSearch />
                </SearchButton>
              </InputGroup>
              <CustomToggle eventKey="0">Advanced Filter</CustomToggle>
            </SearchBar>
            <Accordion.Collapse eventKey="0">
              <AdvanceFilter
                filterdata={filterdata}
                handleFilterChange={handleFilterChange}
                allstate={allstate}
                handleSearch={handleSearch}
              />
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </CenterContainer>
      {isDataload === false && allstatedata?.length > 0 && (
        <CenterContainer>
          <Table className="table mb-5">
            <div className="d-grid">
              <TableTitleRow>
                <TableTitleBar>
                  <TableTitle>
                    {location.pathname.split("/").includes("viewvendor")
                      ? "Vendor"
                      : "Customer"}
                  </TableTitle>
                  {/* <AddButton
                    onClick={() => {
                      history("/orders/add");
                    }}>
                    +
                  </AddButton> */}
                </TableTitleBar>
              </TableTitleRow>
            </div>
            <div className="d-flex">
              <div className="container-fluid card">
                <TableRow className="row">
                  {renderColumn(
                    location.pathname.split("/").includes("viewvendor")
                      ? columns
                      : Customercolumns
                  )}
                </TableRow>
                {allstatedata.length == 0 && (
                  <TableRow className="d-flex justify-content-center">
                    No items...
                  </TableRow>
                )}
                {allstatedata.length > 0 ? (
                  renderRows(
                    allstatedata,
                    location.pathname.split("/").includes("viewvendor")
                      ? columns
                      : Customercolumns
                  )
                ) : (
                  <></>
                )}

                {/* <Pagination totalPage={totalPage} data={orderPage} pageSize={pageSize} setPageSize={setPageSize} currPage={currPage} setCurrPage={setCurrPage} /> */}
              </div>
            </div>
          </Table>
        </CenterContainer>
      )}
      <FloatingButton
        title="Add order"
        onClick={() => {
          history(
            `/${
              location.pathname.split("/").includes("viewvendor")
                ? "vendor"
                : "customer"
            }/create`
          );
        }}
      >
        +
      </FloatingButton>
    </OrderContainer>
  );
};

export default ViewTable;
