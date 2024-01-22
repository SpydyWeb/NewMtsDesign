import React, { useContext, useEffect, useState } from "react";
import { AddButton, ModalButton, OrderDetailPopover, SearchContainer, SearchIcon, StatusIconContainer } from "./OrderPropertyStyledComponents";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { Tax } from "../../../utils/form-types";
import Pagination from "../../utils/PaginationComponent";
import TaxServices from "../../../services/tax-services";
import LocationServices from "../../../services/location-services";
import { TextField, TextArea, DisabledTextField, SelectBox } from "../../utils/InputGroup";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import paymentServices from "../../../services/payment-services";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitle, TableTitleRow } from "../OrderStyledComponents";
import PaymentTable from "./PaymentTable";

const TaxTable: React.FunctionComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentVersion, setPaymentVersion] = useState<number>(0);
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("");
  const [icons, setIcons] = useState<any>({
    parcelSortIcon: "",
    landSortIcon: "",
    buildingSortIcon: "",
    totalSortIcon: "",
    addressSortIcon: "",
  });
  const { orderId } = useParams();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext) as ApplicationContextType;

  useEffect(() => {
    getTaxes();
  }, []);

  useEffect(() => {
    getTaxes();
  }, [currPage, totalPage, pageSize, sortColumn, sortDirection]);

  const getTaxes = () => {
    updateLoadingMessage("Fetching taxes...");
    updateLoading(true);
    TaxServices.getSize(orderId as unknown as number)
      .then((response) => {
        setTotalPage(Math.ceil(JSON.parse(response.data.body).size / pageSize));
      })
      .catch((e) => {
        console.log("caught an exception: " + e);
        updateLoading(false);
        if (e.message == "Network Error") {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch tax table size! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch tax table size! Please try again.",
            },
            ...messages,
          ]);
        }
      });
    TaxServices.getAll(orderId as unknown as number, currPage, pageSize, sortColumn, sortDirection)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setTaxes(JSON.parse(response.data.body));
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch taxes! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch taxes! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch taxes! Please try again.",
            },
            ...messages,
          ]);
        }
        updateLoading(false);
      })
      .catch((e) => {
        console.log("caught an exception: " + e);
        updateLoading(false);
        if (e.message == "Network Error") {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch taxes! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch taxes! Please try again.",
            },
            ...messages,
          ]);
        }
      });
  };

  const save = () => {
    var okay: boolean = true;
    updateLoadingMessage("Saving tax...");
    updateLoading(true);
    const parcelId = document.getElementById("parcelId") as HTMLInputElement;
    const land = document.getElementById("land") as HTMLInputElement;
    const building = document.getElementById("building") as HTMLInputElement;
    const total = document.getElementById("total") as HTMLInputElement;
    const lotDescription = document.getElementById("lotDescription") as HTMLInputElement;
    const landDescription = document.getElementById("landDescription") as HTMLInputElement;
    const buildingDescription = document.getElementById("buildingDescription") as HTMLInputElement;
    const assessmentAddress1 = document.getElementById("assessmentAddress1") as HTMLInputElement;
    const assessmentAddress2 = document.getElementById("assessmentAddress2") as HTMLInputElement;
    const zip = document.getElementById("zip") as HTMLInputElement;
    const city = document.getElementById("city") as HTMLInputElement;
    const state = document.getElementById("state") as HTMLInputElement;
    const county = document.getElementById("county") as HTMLInputElement;
    const comments = document.getElementById("comments") as HTMLTextAreaElement;

    var parcelIdError = document.getElementById("parcelIdError") as HTMLDivElement;
    const assessmentAddress1Error = document.getElementById("assessmentAddress1Error") as HTMLInputElement;
    const assessmentAddress2Error = document.getElementById("assessmentAddress2Error") as HTMLInputElement;
    const zipError = document.getElementById("zipError") as HTMLInputElement;
    const cityError = document.getElementById("cityError") as HTMLInputElement;
    const stateError = document.getElementById("stateError") as HTMLInputElement;
    const countyError = document.getElementById("countyError") as HTMLInputElement;
    const landError = document.getElementById("landError") as HTMLInputElement;
    const buildingError = document.getElementById("buildingError") as HTMLInputElement;
    const totalError = document.getElementById("totalError") as HTMLInputElement;

    if (isEmpty(parcelId, parcelIdError)) okay = false;
    else if (isMaxLengthExceeded(parcelId, parcelIdError, 200)) okay = false;

    if (isMaxLengthExceeded(assessmentAddress1, assessmentAddress1Error, 100)) okay = false;
    if (isMaxLengthExceeded(assessmentAddress2, assessmentAddress2Error, 100)) okay = false;
    if (isMaxLengthExceeded(zip, zipError, 5)) okay = false;
    if (isMaxLengthExceeded(city, cityError, 100)) okay = false;
    if (isMaxLengthExceeded(state, stateError, 2)) okay = false;
    if (isMaxLengthExceeded(county, countyError, 100)) okay = false;
    if (isMaxLengthExceeded(land, landError, 12)) okay = false;
    if (isMaxLengthExceeded(building, buildingError, 12)) okay = false;
    if (isMaxLengthExceeded(total, totalError, 12)) okay = false;

    if (okay) {
      TaxServices.save({
        id: selectedTax?.id ? selectedTax.id : null,
        orderId: orderId as unknown as number,
        parcelId: parcelId.value,
        land: land.value as unknown as number,
        building: building.value as unknown as number,
        total: total.value as unknown as number,
        lotDescription: lotDescription.value,
        landDescription: landDescription.value,
        buildingDescription: buildingDescription.value,
        assessmentAddress1: assessmentAddress1.value,
        assessmentAddress2: assessmentAddress2.value,
        zip: zip.value,
        city: city.value,
        state: state.value,
        county: county.value,
        comments: comments.value,
      })
        .then((response) => {
          if (response.data.statusCode == 200) {
            getTaxes();
            updateMessages([
              {
                title: "Success !!",
                message: "Tax " + (selectedTax?.id ? "editted " : "added ") + "successfully",
              },
              ...messages,
            ]);
            setShowModal(false);
          } else if (response.data.statusCode == 400) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save tax! Please try again.",
              },
              ...messages,
            ]);
            let errors = JSON.parse(response.data.body);
            for (let i in errors) {
              if (errors.at(i).startsWith("parcelId")) {
                parcelIdError.innerText = errors.at(i).substr(10);
              } else if (errors.at(i).startsWith("assessmentAddress1")) {
                assessmentAddress1Error.innerText = errors.at(i).substr(20);
              } else if (errors.at(i).startsWith("assessmentAddress2")) {
                assessmentAddress2Error.innerText = errors.at(i).substr(20);
              } else if (errors.at(i).startsWith("zip")) {
                zipError.innerText = errors.at(i).substr(5);
              } else if (errors.at(i).startsWith("city")) {
                cityError.innerText = errors.at(i).substr(6);
              } else if (errors.at(i).startsWith("state")) {
                stateError.innerText = errors.at(i).substr(7);
              } else if (errors.at(i).startsWith("county")) {
                countyError.innerText = errors.at(i).substr(8);
              } else if (errors.at(i).startsWith("land")) {
                landError.innerText = errors.at(i).substr(6);
              } else if (errors.at(i).startsWith("building")) {
                buildingError.innerText = errors.at(i).substr(10);
              } else if (errors.at(i).startsWith("total")) {
                totalError.innerText = errors.at(i).substr(7);
              }
            }
          } else if (response.data.statusCode == 501) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save tax! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save tax! Please try again.",
              },
              ...messages,
            ]);
          }
          updateLoading(false);
        })
        .catch((e) => {
          console.log("caught an exception: " + e);
          updateLoading(false);
          if (e.message == "Network Error") {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save tax! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save tax! Please try again.",
              },
              ...messages,
            ]);
          }
        });
    } else {
      updateLoading(false);
    }
  };

  const deleteItem = (id: number) => {
    updateLoadingMessage("Deleting tax...");
    updateLoading(true);
    TaxServices.deleteItem(id)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setCurrPage(1);
          updateLoading(false);
          updateMessages([{ title: "Success !!", message: "Tax deleted successfully" }, ...messages]);
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete tax! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete tax! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete tax! Please try again.",
            },
            ...messages,
          ]);
        }
        getTaxes();
      })
      .catch((e) => {
        console.log("caught an exception: " + e);
        updateLoading(false);
        if (e.message == "Network Error") {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete tax! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete tax! Please try again.",
            },
            ...messages,
          ]);
        }
      });
    setShowDeleteConfirmation(false);
  };

  const handleAccordian = (idx: number) => {
    var icon = document.getElementById("accordian" + idx) as HTMLElement;
    var paymentDiv = document.getElementById("payment" + idx) as HTMLElement;
    if (icon.className == "bi bi-caret-right-fill") {
      icon.className = "bi bi-caret-down-fill";
      paymentDiv.className = "d-block";
    } else {
      icon.className = "bi bi-caret-right-fill";
      paymentDiv.className = "d-none";
    }
  };

  const autofillLocation = () => {
    const zip = document.getElementById("zip") as HTMLInputElement;
    const zipError = document.getElementById("zipError") as HTMLInputElement;
    zipError.innerText = "";
    const city = document.getElementById("city") as HTMLInputElement;
    const state = document.getElementById("state") as HTMLInputElement;
    const county = document.getElementById("county") as HTMLInputElement;
    city.disabled = false;
    state.disabled = false;
    county.disabled = false;
    LocationServices.getCityandState(zip?.value)
      .then((response) => {
        if (response.data["places"].length > 0) {
          city.value = response.data["places"].at(0)["place name"];
          state.value = response.data["places"].at(0)["state abbreviation"];
        } else {
          zipError.innerText = "Some error occured! Try again or enter manually!";
        }
      })
      .catch((e) => {
        console.log("caught an exception: " + e);
        zipError.innerText = "Some error occured! Try again or enter manually!";
      });

    LocationServices.getCounty(zip?.value)
      .then((response) => {
        if (response.data.status) {
          county.value = response.data.data.county.at(0);
        } else {
          zipError.innerText = "Some error occured! Try again or enter manually!";
        }
      })
      .catch((e) => {
        console.log("caught an exception: " + e);
        zipError.innerText = "Some error occured! Try again or enter manually!";
      });
  };

  const getAssessmentAddress = (assessmentAddress1: any, assessmentAddress2: any, zip: any, city: any, state: any, county: any) => {
    let address =
      assessmentAddress1 +
      (assessmentAddress1 ? ", " : "") +
      assessmentAddress2 +
      (assessmentAddress2 ? ", " : "") +
      zip +
      (zip ? ", " : "") +
      city +
      (city ? ", " : "") +
      state +
      (state ? ", " : "") +
      county;

    if (address.length > 0 && address.charAt(address.length - 2) == ",") address = address.substring(0, address.length - 2);

    return address;
  };

  const handleSort = (column: string, iconId: string) => {
    setCurrPage(1);
    setSortColumn(column);
    let temp = icons;
    for (let k in icons) {
      if (k != iconId) temp[k] = "";
    }
    icons[iconId] = icons[iconId] == "bi bi-arrow-down" ? "bi bi-arrow-up" : "bi bi-arrow-down";
    setIcons(icons);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const savePayment = () => {
    var okay: boolean = true;
    updateLoadingMessage("Saving payment...");
    updateLoading(true);
    const taxType = document.getElementById("taxType") as HTMLSelectElement;
    const taxPeriod = document.getElementById("taxPeriod") as HTMLInputElement;
    const taxYear = document.getElementById("taxYear") as HTMLInputElement;
    const amount = document.getElementById("amount") as HTMLInputElement;
    const date = document.getElementById("date") as HTMLInputElement;
    const status = document.getElementById("status") as HTMLInputElement;
    const discountDate = document.getElementById("discountDate") as HTMLInputElement;
    const discountAmount = document.getElementById("discountAmount") as HTMLInputElement;
    const faceDate = document.getElementById("faceDate") as HTMLInputElement;
    const faceAmount = document.getElementById("faceAmount") as HTMLInputElement;
    const penaltyDate = document.getElementById("penaltyDate") as HTMLInputElement;
    const penaltyAmount = document.getElementById("penaltyAmount") as HTMLInputElement;
    const dueDate = document.getElementById("dueDate") as HTMLInputElement;
    const comments = document.getElementById("comments") as HTMLTextAreaElement;

    var taxTypeError = document.getElementById("taxTypeError") as HTMLDivElement;
    var taxPeriodError = document.getElementById("taxPeriodError") as HTMLDivElement;
    const taxYearError = document.getElementById("taxYearError") as HTMLInputElement;
    const amountError = document.getElementById("amountError") as HTMLInputElement;
    const statusError = document.getElementById("statusError") as HTMLInputElement;
    const discountAmountError = document.getElementById("discountAmountError") as HTMLInputElement;
    const faceAmountError = document.getElementById("faceAmountError") as HTMLInputElement;
    const penaltyAmountError = document.getElementById("penaltyAmountError") as HTMLInputElement;

    if (isNoOptionSelected(taxType, taxTypeError)) okay = false;

    if (isEmpty(taxPeriod, taxPeriodError)) okay = false;
    else if (isMaxLengthExceeded(taxPeriod, taxPeriodError, 100)) okay = false;

    if (isMaxLengthExceeded(taxYear, taxYearError, 255)) okay = false;
    if (isMaxLengthExceeded(status, statusError, 255)) okay = false;
    if (isMaxLengthExceeded(amount, amountError, 12)) okay = false;
    if (isMaxLengthExceeded(discountAmount, discountAmountError, 12)) okay = false;
    if (isMaxLengthExceeded(faceAmount, faceAmountError, 12)) okay = false;
    if (isMaxLengthExceeded(penaltyAmount, penaltyAmountError, 12)) okay = false;

    if (okay) {
      paymentServices
        .save({
          id: null,
          taxId: selectedTax?.id as unknown as number,
          taxType: taxType.value == "-select-" ? "" : taxType.value,
          taxPeriod: taxPeriod.value,
          taxYear: taxYear.value,
          amount: amount.value as unknown as number,
          date: date.value,
          status: status.value == "-select-" ? "" : status.value,
          discountDate: discountDate.value,
          discountAmount: discountAmount.value as unknown as number,
          faceDate: faceDate.value,
          faceAmount: faceAmount.value as unknown as number,
          penaltyDate: penaltyDate.value,
          penaltyAmount: penaltyAmount.value as unknown as number,
          dueDate: dueDate.value,
          comments: comments.value,
        })
        .then((response) => {
          if (response.data.statusCode == 200) {
            getTaxes();
            setPaymentVersion(paymentVersion + 1);
            updateMessages([
              {
                title: "Success !!",
                message: "Payment added successfully",
              },
              ...messages,
            ]);
            setShowPaymentModal(false);
          } else if (response.data.statusCode == 400) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save payment! Please try again.",
              },
              ...messages,
            ]);
            let errors = JSON.parse(response.data.body);
            for (let i in errors) {
              if (errors.at(i).startsWith("taxType")) {
                taxTypeError.innerText = errors.at(i).substr(9);
              } else if (errors.at(i).startsWith("taxPeriod")) {
                taxPeriodError.innerText = errors.at(i).substr(11);
              } else if (errors.at(i).startsWith("taxYear")) {
                taxYearError.innerText = errors.at(i).substr(9);
              } else if (errors.at(i).startsWith("amount")) {
                amountError.innerText = errors.at(i).substr(8);
              } else if (errors.at(i).startsWith("status")) {
                statusError.innerText = errors.at(i).substr(8);
              } else if (errors.at(i).startsWith("discountAmount")) {
                discountAmountError.innerText = errors.at(i).substr(16);
              } else if (errors.at(i).startsWith("faceAmount")) {
                faceAmountError.innerText = errors.at(i).substr(12);
              } else if (errors.at(i).startsWith("penaltyAmount")) {
                penaltyAmountError.innerText = errors.at(i).substr(15);
              }
            }
          } else if (response.data.statusCode == 501) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save payment! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save payment! Please try again.",
              },
              ...messages,
            ]);
          }
          updateLoading(false);
        })
        .catch((e) => {
          console.log("caught an exception: " + e);
          updateLoading(false);
          if (e.message == "Network Error") {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save payment! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save payment! Please try again.",
              },
              ...messages,
            ]);
          }
        });
    } else {
      updateLoading(false);
    }
  };

  return (
    <Table className="table mt-5 mb-5">
      <div className="d-grid">
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>
              Taxes&nbsp;&nbsp;
              <OverlayTrigger
                show={showOrder}
                rootClose
                placement="bottom"
                overlay={
                  <Popover
                    onMouseEnter={() => setShowOrder(true)}
                    onMouseLeave={() => {
                      setShowOrder(false);
                    }}
                    id="popover-basic">
                    <Popover.Header as="h3">Order</Popover.Header>
                    <Popover.Body>{OrderInfo}</Popover.Body>
                  </Popover>
                }>
                <OrderDetailPopover
                  onMouseEnter={() => setShowOrder(true)}
                  onMouseLeave={() => {
                    setShowOrder(false);
                  }}>
                  (Order Id: {orderId} &nbsp;&nbsp;&nbsp;&nbsp;Property Address: 1902 Glendell Road, Harrisburg, PA, 17112 Dauphin)
                </OrderDetailPopover>
              </OverlayTrigger>
            </TableTitle>
            <AddButton
              onClick={() => {
                setSelectedTax(null);
                setShowModal(true);
              }}>
              +
            </AddButton>
          </TableTitleBar>
        </TableTitleRow>
      </div>
      <div className="d-flex">
        <div className="container-fluid card">
          <TableRow className="row">
            <div className="col-2" onClick={() => handleSort("parcel", "parcelSortIcon")}>
              <b>
                Parcel&nbsp;
                <i id="sortIcon" className={icons["parcelSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("land", "landSortIcon")}>
              <b>
                Land&nbsp;
                <i id="sortIcon" className={icons["landSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("building", "buildingSortIcon")}>
              <b>
                Building&nbsp;
                <i id="sortIcon" className={icons["buildingSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("total", "totalSortIcon")}>
              <b>
                Total&nbsp;
                <i id="sortIcon" className={icons["totalSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("aaddress_line1", "addressSortIcon")}>
              <b>
                Assessment&nbsp; Address
                <i id="sortIcon" className={icons["addressSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1">
              <b>Payment</b>
            </div>
            <div className="col-1">
              <b>Action</b>
            </div>
          </TableRow>
          {taxes.length == 0 && <TableRow className="d-flex justify-content-center">No items...</TableRow>}
          {taxes.map((item, idx) => (
            <TableRow key={"tax" + item.id} className="row">
              <div className="col-2">
                <i id={"accordian" + idx} onClick={() => handleAccordian(idx)} className="bi bi-caret-right-fill"></i>
                {item.parcelId}
              </div>
              <div className="col-2">{item.land ? "$" + item.land : ""}</div>
              <div className="col-2">{item.building ? "$" + item.building : ""}</div>
              <div className="col-2">{item.total ? "$" + item.total : ""}</div>
              <div className="col-2">{getAssessmentAddress(item.assessmentAddress1, item.assessmentAddress2, item.zip, item.city, item.state, item.county)}</div>
              <StatusIconContainer className="col-1 status_icon_font_size">
                <i id={"payment" + item.id}></i>
              </StatusIconContainer>
              <div className="col-1">
                <i
                  className="bi bi-pencil-square"
                  onClick={() => {
                    setSelectedTax(item);
                    setShowModal(true);
                  }}></i>
                <i
                  className="bi bi-trash-fill"
                  onClick={() => {
                    setSelectedTax(item);
                    setShowDeleteConfirmation(true);
                  }}></i>
                <i
                  className="bi bi-clipboard-plus"
                  onClick={() => {
                    setSelectedTax(item);
                    setShowPaymentModal(true);
                  }}></i>
              </div>
              <div id={"payment" + idx} className="d-none">
                <PaymentTable key={"tax" + item.id + " " + paymentVersion} taxId={item.id ? item.id : 0} />
              </div>
            </TableRow>
          ))}
          <Pagination totalPage={totalPage} data={taxes} pageSize={pageSize} setPageSize={setPageSize} currPage={currPage} setCurrPage={setCurrPage} />
        </div>
      </div>
      <Modal show={showPaymentModal} size="lg" backdrop="static" centered onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{"Add Payment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid card p-2">
            <div className="row">
              <div className="col-md-6 col-lg-3 col-sm-6 required-field">
                <SelectBox
                  id="taxType"
                  label="Tax Type"
                  defaultValue={""}
                  options={[
                    "Fire",
                    "Town",
                    "County/Township",
                    "County/Borough",
                    "County/City",
                    "Municipality",
                    "Combined",
                    "Borough",
                    "City",
                    "County",
                    "Parish",
                    "Real Estate",
                    "Sanitation",
                    "School",
                    "Special Assessment",
                    "Township",
                    "Village",
                    "Water and Sewer",
                    "Other",
                  ]}
                />
                <ErrorMessage id="taxTypeError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6 required-field">
                <TextField id="taxPeriod" label="Tax Period" type="text" defaultValue={""} required maxLength={100} />
                <ErrorMessage id="taxPeriodError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="taxYear" label="Tax Year" type="text" defaultValue={""} maxLength={255} />
                <ErrorMessage id="taxYearError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="amount" label="Amount" type="number" defaultValue={""} maxLength={12} />
                <ErrorMessage id="amountError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="date" label="Date" type="date" defaultValue={""} />
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <SelectBox id="status" label="Status" defaultValue={""} options={["Due", "Paid", "Delinquent", "Tax Exempt", "Not Available"]} />
                <ErrorMessage id="statusError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="discountDate" label="Discount Date" type="date" defaultValue={""} />
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="discountAmount" label="Discount Amount" type="number" defaultValue={""} maxLength={12} />
                <ErrorMessage id="discountAmountError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="faceDate" label="Face Date" type="date" defaultValue={""} />
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="faceAmount" label="Face Amount" type="number" defaultValue={""} maxLength={12} />
                <ErrorMessage id="faceAmountError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="penaltyDate" label="Penalty Date" type="date" defaultValue={""} />
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="penaltyAmount" label="Penalty Amount" type="number" defaultValue={""} maxLength={12} />
                <ErrorMessage id="penaltyAmountError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="dueDate" label="Due Date" type="date" defaultValue={""} />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12">
                <TextArea id="comments" label="Comments" defaultValue={""} maxLength={4000} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ModalButton onClick={() => setShowPaymentModal(false)}>Cancel</ModalButton>
          <ModalButton onClick={() => savePayment()}>Save</ModalButton>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteConfirmation} backdrop="static" centered onHide={() => setShowDeleteConfirmation(false)}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Confirm Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to delete this item?</h5>
        </Modal.Body>
        <Modal.Footer>
          <ModalButton onClick={() => setShowDeleteConfirmation(false)}>Cancel</ModalButton>
          <ModalButton onClick={() => deleteItem(selectedTax?.id ? selectedTax?.id : 0)}>Confirm</ModalButton>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} size="lg" backdrop="static" centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{selectedTax?.id ? "Edit Tax" : "Add Tax"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid card p-2">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 required-field mt-3">
                <TextField id="parcelId" label="Parcel Id/Assessment Id" type="text" defaultValue={selectedTax?.parcelId} required maxLength={200} />
                <ErrorMessage id="parcelIdError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mt-3">
                <TextField id="land" label="Land" type="number" defaultValue={selectedTax?.land} maxLength={12} />
                <ErrorMessage id="landError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mt-3">
                <TextField id="building" label="Building" type="number" defaultValue={selectedTax?.building} maxLength={12} />
                <ErrorMessage id="buildingError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mt-3">
                <TextField id="total" label="Total" type="number" defaultValue={selectedTax?.total} maxLength={12} />
                <ErrorMessage id="totalError"></ErrorMessage>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
                <TextArea id="lotDescription" label="Lot Description" defaultValue={selectedTax?.lotDescription} />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
                <TextArea id="landDescription" label="Land Description" defaultValue={selectedTax?.landDescription} />
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 mt-3">
                <TextArea id="buildingDescription" label="Building Description" defaultValue={selectedTax?.buildingDescription} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12 mt-3">
                <TextArea id="assessmentAddress1" label="Assessment Address 1" defaultValue={selectedTax?.assessmentAddress1} maxLength={100} />
                <ErrorMessage id="assessmentAddress1Error"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 mt-3">
                <TextArea id="assessmentAddress2" label="Address 2" defaultValue={selectedTax?.assessmentAddress2} maxLength={100} />
                <ErrorMessage id="assessmentAddress2Error"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6 mt-3">
                <SearchContainer className="form-floating">
                  <input
                    type="text"
                    className="form-control w-100"
                    id="zip"
                    placeholder="Zip"
                    defaultValue={selectedTax?.zip}
                    maxLength={5}
                    onChange={(e) => {
                      const errorDiv = document.getElementById("zipError") as HTMLDivElement;
                      errorDiv.innerText = "";
                      if (e.target.value.length >= 5) errorDiv.innerText = "Max character limit reached (5)";
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
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6 mt-3">
                <DisabledTextField id="city" label="City" type="text" defaultValue={selectedTax?.city} maxLength={100} />
                <ErrorMessage id="cityError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6 mt-3">
                <DisabledTextField id="state" label="State" type="text" defaultValue={selectedTax?.state} maxLength={2} />
                <ErrorMessage id="stateError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6 mt-3">
                <DisabledTextField id="county" label="County" type="text" defaultValue={selectedTax?.county} maxLength={100} />
                <ErrorMessage id="countyError"></ErrorMessage>
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 mt-3">
                <TextArea id="comments" label="Comments" defaultValue={selectedTax?.comments} maxLength={4000} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ModalButton onClick={() => setShowModal(false)}>Cancel</ModalButton>
          <ModalButton onClick={() => save()}>Save</ModalButton>
        </Modal.Footer>
      </Modal>
    </Table>
  );
};

export default TaxTable;
