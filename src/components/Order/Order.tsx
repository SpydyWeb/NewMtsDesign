import React, { useContext, useEffect, useState } from "react";
import {
  AdvancedFilterToggle,
  CenterContainer,
  OrderContainer,
  SearchBar,
  SearchButton,
  UtilityButton,
  Table,
  TableRow,
  TableTitleBar,
  TableTitleRow,
  TableTitle,
  InputContainer,
  ErrorMessage,
  FloatingButton,
} from "./OrderStyledComponents";
import { SearchContainer, SearchIcon } from "./orderProperty/OrderPropertyStyledComponents";
import Pagination from "../utils/PaginationComponent";
import { SavedOrder, Order, Products, PropertyAddress } from "../../utils/form-types";
import { useNavigate } from "react-router-dom";
import { Accordion, Card, useAccordionButton, Form, InputGroup, AccordionContext, Modal } from "react-bootstrap";
import { FaSearch, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { ControlledSelectBox, SelectBox, TextField } from "../utils/InputGroup";
import "./Order.css";
import orderServices from "../../services/order-services";
import { ApplicationContext, ApplicationContextType } from "../../App";
import locationServices from "../../services/location-services";
import Multiselect from "multiselect-react-dropdown";

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

const Orders: React.FunctionComponent = () => {
  const [clientOptions, setClientOptions] = useState<any[]>([]);
  const [productOptions, setProductOptions] = useState<Map<string, any[]>>();
  const [optionRender, setOptionRender] = useState<number>(0);
  const [productsPlaceholder, setProductsPlaceholder] = useState<string>("Products: none selected");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  const [orderPage, setOrderPage] = useState<SavedOrder[]>();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext) as ApplicationContextType;
  const [icons, setIcons] = useState<any>({
    orderIdSortIcon: "",
    clientIdSortIcon: "",
    clientReferenceNumberSortIcon: "",
    loanIdSortIcon: "",
    propertyAddressIcon: "",
  });
  const history = useNavigate();

  useEffect(() => {
    orderServices.getData("GetClientList").then((response) => {
      if (response.data.statusCode == 200 && response.data.body.Status) setClientOptions(response.data.body.Data);
    });

    orderServices.getData("GetProductList").then((response) => {
      let temp = new Map();
      Object.values(Products).forEach((productType) => {
        temp.set(
          productType,
          response.data.body.Data.filter((item: any) => {
            return item.productgroup == productType;
          })
        );
      });
      setProductOptions(temp);
    });
  }, []);

  useEffect(() => {
    setOrderPage(orders?.slice((currPage - 1) * pageSize, currPage * pageSize));
  }, [currPage, totalPage, pageSize, orders]);

  const autofillLocation = () => {
    const zip = document.getElementById("zip") as HTMLInputElement;
    const zipError = document.getElementById("zipError") as HTMLInputElement;
    zipError.innerText = "";
    const city = document.getElementById("city") as HTMLInputElement;
    const state = document.getElementById("state") as HTMLInputElement;
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
  };

  const getOptions = () => {
    let options: any[] = [];
    let products = productOptions?.get((document.getElementById("selectProductGroup") as HTMLInputElement).value);
    if (!products) products = [];
    if (products.length) {
      options.push({ label: "Select All", value: 0 });
    }
    for (let i = 0; i < products.length; i++) {
      options.push({ label: products[i].keyid + ". " + products[i].productname, value: products[i].keyid });
    }
    return options;
  };

  const getOrders = () => {
    updateLoadingMessage("Fetching orders...");
    updateLoading(true);

    const globalSearch = document.getElementById("globalSearch") as HTMLInputElement;
    const orderId = document.getElementById("orderId") as HTMLInputElement;
    const clientId = document.getElementById("clientId") as HTMLSelectElement;
    const loanId = document.getElementById("loanId") as HTMLInputElement;
    const referenceNumber = document.getElementById("referenceNumber") as HTMLInputElement;
    const status = document.getElementById("status") as HTMLInputElement;
    const date = document.getElementById("date") as HTMLInputElement;
    const orderToDate = document.getElementById("orderToDate") as HTMLInputElement;
    const propertyAddress = document.getElementById("propertyAddress") as HTMLInputElement;
    const zip = document.getElementById("zip") as HTMLInputElement;
    const city = document.getElementById("city") as HTMLInputElement;
    const state = document.getElementById("state") as HTMLInputElement;
    const selectProductGroup = document.getElementById("selectProductGroup") as HTMLInputElement;

    if(globalSearch.value == "" && orderId.value == "" && clientId.value == "-select-" && loanId.value == "" && referenceNumber.value == "" &&
    status.value == "-select-" && date.value == "" && orderToDate.value == "" && propertyAddress.value == "" && zip.value == "" && city.value == "" &&
    state.value == "" && selectProductGroup.value == "-select-"){
      updateMessages([
        {
          title: "Error !!",
          message: "No criteria selected for search!! Atleast 1 field is mandatory!",
        },
        ...messages,
      ]);
      updateLoading(false);
      return;
    }

    orderServices
      .getData("OrderSearch", {
        GlobalSearch: globalSearch.value,
        AdvanceSearch: {
          OrderId: parseInt(orderId.value),
          ClientId: parseInt(clientId.value),
          LoanId: loanId.value,
          ClientReferenceNumber: referenceNumber.value,
          OrderStatus: status.value,
          OrderDate: date?.valueAsDate?.getMonth() + "/" + date?.valueAsDate?.getDate() + "/" + date?.valueAsDate?.getFullYear(),
          OrderToDate: orderToDate?.valueAsDate?.getMonth() + "/" + orderToDate?.valueAsDate?.getDate() + "/" + orderToDate?.valueAsDate?.getFullYear(),
          PropertyAddress: propertyAddress.value,
          PropertyZip: parseInt(zip.value),
          PropertyCity: city.value,
          PropertyState: state.value,
          ProductGroup: selectProductGroup.value,
          Product: selectedProducts.map((product) => product.value).filter((p: number) => p != 0),
        },
      })
      .then((response) => {
        updateLoading(false);
        if (response.data.statusCode == 200) {
          if (response.data.body.Status) {
            updateMessages([
              {
                title: "Success !!",
                message: "Order fetched successfully",
              },
              ...messages,
            ]);
            setTotalPage(Math.ceil(response.data.body.Data.length / pageSize));
            setOrders(response.data.body.Data);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not fetch orders! " + response.data.body.Message,
              },
              ...messages,
            ]);
          }
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch orders! Please try again.",
            },
            ...messages,
          ]);
        }
      })
      .catch((e) => {
        console.log("caught an exception: " + e);
        updateLoading(false);
        if (e.message == "Network Error") {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch orders! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch orders! Please try again.",
            },
            ...messages,
          ]);
        }
      });
  };

  const handleSort = (column: string, iconId: string) => {
    let temp = icons;
    for (let k in icons) {
      if (k != iconId) temp[k] = "";
    }
    if (icons[iconId] == "bi bi-arrow-down") {
      if (orders)
        setOrders(
          ([] as SavedOrder[]).concat(orders).sort((order1: SavedOrder, order2: SavedOrder) => {
            let val1 = (column == "propertyAddress" ? getAddress(order1) : order1[column as keyof SavedOrder]).toLocaleString();
            let val2 = (column == "propertyAddress" ? getAddress(order2) : order2[column as keyof SavedOrder]).toLocaleString();
            if (val1 > val2) return -1;
            if (val1 < val2) return 1;
            return 0;
          })
        );
      icons[iconId] = "bi bi-arrow-up";
    } else {
      setOrders(
        ([] as SavedOrder[]).concat(orders).sort((order1: SavedOrder, order2: SavedOrder) => {
          let val1 = (column == "propertyAddress" ? getAddress(order1) : order1[column as keyof SavedOrder]).toLocaleString();
          let val2 = (column == "propertyAddress" ? getAddress(order2) : order2[column as keyof SavedOrder]).toLocaleString();
          if (val1 < val2) return -1;
          if (val1 > val2) return 1;
          return 0;
        })
      );
      icons[iconId] = "bi bi-arrow-down";
    }
    setIcons(icons);
  };

  const getAddress = (order: SavedOrder) => {
    let address =
      order?.propertyaddress + (order?.propertyaddress ? ", " : "") + order?.propertycity + (order?.propertycity ? ", " : "") + order?.propertystate + (order?.propertystate ? ", " : "") + order?.propertyzip;

    if (address.length > 0 && address.charAt(address.length - 2) == ",") address = address.substring(0, address.length - 2);

    return address;
  };

  return (
    <OrderContainer className="mt-3">
      <CenterContainer className="mb-5">
        <Accordion defaultActiveKey="" className="w-100">
          <Card>
            <SearchBar>
              <InputGroup className="mb-1 w-50">
                <Form.Control id="globalSearch" placeholder="Search" aria-label="Search" aria-describedby="filter-search" />
                <SearchButton
                  id="filter-search"
                  onClick={() => {
                    getOrders();
                  }}>
                  <FaSearch />
                </SearchButton>
              </InputGroup>
              <CustomToggle eventKey="0">Advanced Filter</CustomToggle>
            </SearchBar>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="px-1 py=2">
                <div className="container-fluid">
                  <div className="row">
                    <InputContainer width="14%" className="px-1">
                      <TextField id="orderId" label="Order Id" type="number" defaultValue={""} />
                    </InputContainer>
                    <InputContainer width="14%" className="px-1">
                      <div className="form-floating mt-1">
                        <select className="form-select" id="clientId" defaultValue={"-select-"} title="Client Id">
                          <option key={0} defaultChecked disabled>
                            -select-
                          </option>
                          {clientOptions.map((item, idx) => (
                            <option key={"clientId" + idx} value={item.keyid}>
                              {item.keyvalue}
                            </option>
                          ))}
                        </select>
                        <label htmlFor="clientId">Client Id</label>
                      </div>
                      <ErrorMessage id="clientIdError"></ErrorMessage>
                    </InputContainer>
                    <InputContainer width="14%" className="px-1">
                      <TextField id="loanId" label="Loan Id" type="text" defaultValue={""} />
                    </InputContainer>
                    <InputContainer width="18%" className="px-1">
                      <TextField id="referenceNumber" label="Reference Number" type="text" defaultValue={""} />
                    </InputContainer>
                    <InputContainer width="12%" className="px-1">
                      <SelectBox id="status" label="Status" defaultValue={""} options={["New", "InProgress", "Completed", "Cancelled"]} />
                    </InputContainer>
                    <InputContainer width="14%" className="px-1">
                      <TextField id="date" label="Date" type="date" defaultValue={""} />
                    </InputContainer>
                    <InputContainer width="14%" className="px-1">
                      <TextField id="orderToDate" label="Order To Date" type="date" defaultValue={""} />
                    </InputContainer>
                    <InputContainer width="26%" className="px-1">
                      <TextField id="propertyAddress" label="Property Address" type="text" defaultValue={""} />
                    </InputContainer>
                    <InputContainer width="14%" className="px-1">
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
                    <InputContainer width="16%" className="px-1">
                      <TextField id="city" label="City" type="text" defaultValue={""} />
                    </InputContainer>
                    <InputContainer width="10%" className="px-1">
                      <TextField id="state" label="State" type="text" defaultValue={""} maxLength={2} />
                    </InputContainer>
                    <InputContainer width="14%" className="px-1">
                      <ControlledSelectBox
                        id="selectProductGroup"
                        label="Product Group"
                        options={Object.values(Products)}
                        defaultValue={"-select-"}
                        changeHandler={() => {
                          setSelectedProducts([]);
                          setOptionRender(optionRender + 1);
                        }}
                      />
                    </InputContainer>
                    <InputContainer width="20%" className="col-2 px-1 multiselect-container" key={optionRender}>
                      <Multiselect
                        className="mt-1 mx-1 w-100 h-100"
                        displayValue="label"
                        hideSelectedList
                        avoidHighlightFirstOption
                        selectedValues={selectedProducts}
                        placeholder={productsPlaceholder}
                        onRemove={(event, curr) => {
                          if (curr.value == 0) {
                            setProductsPlaceholder("Products: none selected");
                            setSelectedProducts([]);
                          } else {
                            setProductsPlaceholder(`Products: ${event.filter((e: any) => e.value != 0).length} selected`);
                            setSelectedProducts(event.filter((e: any) => e.value != 0));
                          }
                        }}
                        onSelect={(event: any[], curr) => {
                          if (curr.value == 0) {
                            setProductsPlaceholder("Products: all selected");
                            setSelectedProducts(getOptions());
                          } else {
                            if (event.length == getOptions().length - 1) {
                              event.push({ value: 0, label: "Select All" });
                              setProductsPlaceholder(`Products: all selected`);
                            } else {
                              setProductsPlaceholder(`Products: ${event.length} selected`);
                            }
                            setSelectedProducts(event);
                          }
                        }}
                        options={getOptions()}
                        showCheckbox
                      />
                    </InputContainer>
                    <div className="col-10"></div>
                    <div className="col-2 mt-2">
                      <UtilityButton
                        onClick={() => {
                          getOrders();
                        }}>
                        <FaSearch />
                        &nbsp;Search
                      </UtilityButton>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </CenterContainer>
      {orderPage && orderPage?.length!! > 0 && (
        <CenterContainer>
          <Table className="table mb-5">
            <div className="d-grid">
              <TableTitleRow>
                <TableTitleBar>
                  <TableTitle>Orders</TableTitle>
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
                  <div className="col-1" onClick={() => handleSort("orderid", "orderIdSortIcon")}>
                    <b>
                      Order Id&nbsp;
                      <i id="sortIcon" className={icons["orderIdSortIcon"]}></i>
                    </b>
                  </div>
                  <div className="col-3" onClick={() => handleSort("clientid", "clientIdSortIcon")}>
                    <b>
                      Client Id/ Name&nbsp;
                      <i id="sortIcon" className={icons["clientIdSortIcon"]}></i>
                    </b>
                  </div>
                  <div className="col-3" onClick={() => handleSort("clientreferencenumber", "clientReferenceNumberSortIcon")}>
                    <b>
                      Client Reference Number&nbsp;
                      <i id="sortIcon" className={icons["clientReferenceNumberSortIcon"]}></i>
                    </b>
                  </div>
                  <div className="col-1" onClick={() => handleSort("loanid", "loanIdSortIcon")}>
                    <b>
                      Loan id&nbsp;
                      <i id="sortIcon" className={icons["loanIdSortIcon"]}></i>
                    </b>
                  </div>
                  <div className="col-3" onClick={() => handleSort("propertyAddress", "propertyAddressSortIcon")}>
                    <b>
                      Property Address&nbsp;
                      <i id="sortIcon" className={icons["propertyAddressSortIcon"]}></i>
                    </b>
                  </div>
                  <div className="col-1">
                    <b>Action</b>
                  </div>
                </TableRow>
                {orderPage.length == 0 && <TableRow className="d-flex justify-content-center">No items...</TableRow>}
                {orderPage.map((item, idx) => (
                  <TableRow key={"order" + idx} className="row">
                    <div className="col-1">{item.orderid}</div>
                    <div className="col-3">{item.clientid}</div>
                    <div className="col-3">{item.clientreferencenumber}</div>
                    <div className="col-1">{item.loanid}</div>
                    <div className="col-3">{getAddress(item)}</div>
                    <div className="col-1">
                      <i
                        className="bi mx-1 bi-pencil-square pointer"
                        onClick={() => {
                          history("/orders/edit/" + item.orderid);
                        }}></i>
                      <i
                        className="bi mx-1 bi-clipboard-plus pointer"
                        onClick={() => {
                          history("/orders/property/" + item.orderid);
                        }}></i>
                    </div>
                  </TableRow>
                ))}
                <Pagination totalPage={totalPage} data={orderPage} pageSize={pageSize} setPageSize={setPageSize} currPage={currPage} setCurrPage={setCurrPage} />
              </div>
            </div>
          </Table>
        </CenterContainer>
      )}
      <FloatingButton title="Add order"
        onClick={() => {
          history("/orders/add");
        }}>
        +
      </FloatingButton>
    </OrderContainer>
  );
};

export default Orders;
