import React, { useState, useEffect, useContext } from "react";
import { AddButton, ModalButton, OrderDetailPopover, StatusIconContainer } from "./OrderPropertyStyledComponents";
import { TextField, ToggleButton, TextArea } from "../../utils/InputGroup";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { Mortgage } from "../../../utils/form-types";
import AssignmentTable from "./AssignmentTable";
import Pagination from "../../utils/PaginationComponent";
import MortgageServices from "../../../services/mortgage-services";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import assignmentServices from "../../../services/assignment-services";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitleRow, TableTitle } from "../OrderStyledComponents";

const MortgageTable: React.FunctionComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState<boolean>(false);
  const [mortagages, setMortgages] = useState<Mortgage[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedMortgage, setSelectedMortgage] = useState<Mortgage | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("");
  const [assignmentVersion, setAssignmentVersion] = useState<number>(0);
  const [icons, setIcons] = useState<any>({
    mortgageeSortIcon: "",
    mortgagorSortIcon: "",
    dateSortIcon: "",
    recordedSortIcon: "",
    amountSortIcon: "",
    volinstSortIcon: "",
    pageSortIcon: "",
    additionalSortIcon: "",
  });
  const { orderId } = useParams();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext) as ApplicationContextType;

  useEffect(() => {
    getMortgages();
  }, []);

  useEffect(() => {
    getMortgages();
  }, [currPage, totalPage, pageSize, sortColumn, sortDirection]);

  const getMortgages = () => {
    updateLoadingMessage("Fetching mortgages...");
    updateLoading(true);
    MortgageServices.getSize(orderId as unknown as number)
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
              message: "Could not fetch mortgage table size! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch mortgage table size! Please try again.",
            },
            ...messages,
          ]);
        }
      });
    MortgageServices.getAll(orderId as unknown as number, currPage, pageSize, sortColumn, sortDirection)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setMortgages(JSON.parse(response.data.body));
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch mortgages! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch mortgages! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch mortgages! Please try again.",
            },
            ...messages,
          ]);
        }
        updateLoading(false);
      })
      .catch((e) => {
        console.log("caught an exception: " + JSON.stringify(e));
        updateLoading(false);
        if (e.message == "Network Error") {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch mortgages! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch mortgages! Please try again.",
            },
            ...messages,
          ]);
        }
      });
  };

  const save = () => {
    var okay: boolean = true;
    updateLoadingMessage("Saving mortgage...");
    updateLoading(true);
    const mortgagee = document.getElementById("mortgagee") as HTMLInputElement;
    const mortgagor = document.getElementById("mortgagor") as HTMLInputElement;
    const mortgageDate = document.getElementById("mortgageDate") as HTMLInputElement;
    const recordedDate = document.getElementById("recordedDate") as HTMLInputElement;
    const mortgageAmount = document.getElementById("mortgageAmount") as HTMLInputElement;
    const volinst = document.getElementById("volinst") as HTMLInputElement;
    const page = document.getElementById("page") as HTMLInputElement;
    const mortgagePosition = document.getElementById("mortgagePosition") as HTMLInputElement;
    const isOpenEnded = document.getElementById("isOpenEnded") as HTMLInputElement;
    const comments = document.getElementById("comments") as HTMLTextAreaElement;
    const book = document.getElementById("book") as HTMLInputElement;

    const mortgageeError = document.getElementById("mortgageeError") as HTMLDivElement;
    const mortgagorError = document.getElementById("mortgagorError") as HTMLDivElement;
    const recordedDateError = document.getElementById("recordedDateError") as HTMLDivElement;
    const volinstError = document.getElementById("volinstError") as HTMLDivElement;
    const pageError = document.getElementById("pageError") as HTMLDivElement;
    const mortgagePositionError = document.getElementById("mortgagePositionError") as HTMLDivElement;
    const mortgageAmountError = document.getElementById("mortgageAmountError") as HTMLDivElement;
    const bookError = document.getElementById("bookError") as HTMLInputElement;

    if (isEmpty(mortgagee, mortgageeError)) okay = false;
    if (isEmpty(mortgagor, mortgagorError)) okay = false;
    if (isEmpty(recordedDate, recordedDateError)) okay = false;

    if (isEmpty(volinst, volinstError)) okay = false;
    else if (isMaxLengthExceeded(volinst, volinstError, 100)) okay = false;

    if (isMaxLengthExceeded(page, pageError, 100)) okay = false;
    if (isMaxLengthExceeded(book, bookError, 100)) okay = false;
    if (isMaxLengthExceeded(mortgagePosition, mortgagePositionError, 100)) okay = false;
    if (isMaxLengthExceeded(mortgageAmount, mortgageAmountError, 12)) okay = false;

    if (okay) {
      MortgageServices.save({
        id: selectedMortgage?.id ? selectedMortgage.id : null,
        orderId: orderId as unknown as number,
        mortgagee: mortgagee.value,
        mortgagor: mortgagor.value,
        mortgageDate: mortgageDate?.value,
        recordedDate: recordedDate.value,
        mortgageAmount: mortgageAmount.value as unknown as number,
        volinst: volinst.value,
        page: page.value,
        book: book.value,
        mortgagePosition: mortgagePosition.value,
        isOpenEnded: isOpenEnded.checked,
        comments: comments.value,
      })
        .then((response) => {
          if (response.data.statusCode == 200) {
            getMortgages();
            updateMessages([
              {
                title: "Success !!",
                message: "Mortgage " + (selectedMortgage?.id ? "editted " : "added ") + "successfully",
              },
              ...messages,
            ]);
            setShowModal(false);
          } else if (response.data.statusCode == 400) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save mortgage! Please try again.",
              },
              ...messages,
            ]);
            let errors = JSON.parse(response.data.body);
            for (let i in errors) {
              if (errors.at(i).startsWith("volinst")) {
                volinstError.innerText = errors.at(i).substr(9);
              } else if (errors.at(i).startsWith("page")) {
                pageError.innerText = errors.at(i).substr(6);
              } else if (errors.at(i).startsWith("mortgagee")) {
                mortgageeError.innerText = errors.at(i).substr(11);
              } else if (errors.at(i).startsWith("mortgagor")) {
                mortgagorError.innerText = errors.at(i).substr(11);
              } else if (errors.at(i).startsWith("recordedDate")) {
                recordedDateError.innerText = errors.at(i).substr(14);
              } else if (errors.at(i).startsWith("mortgagePosition")) {
                mortgagePositionError.innerText = errors.at(i).substr(18);
              } else if (errors.at(i).startsWith("mortgageAmount")) {
                mortgageAmountError.innerText = errors.at(i).substr(16);
              }
            }
          } else if (response.data.statusCode == 501) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save mortgage! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save mortgage! Please try again.",
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
                message: "Could not save mortgage! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save mortgage! Please try again.",
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
    updateLoadingMessage("Deleting mortgage...");
    updateLoading(true);
    MortgageServices.deleteItem(id)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setCurrPage(1);
          getMortgages();
          updateMessages([{ title: "Success !!", message: "Mortgage deleted successfully" }, ...messages]);
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete mortgage! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete mortgage! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete mortgage! Please try again.",
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
              message: "Could not delete mortgage! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete mortgage! Please try again.",
            },
            ...messages,
          ]);
        }
      });
    setShowDeleteConfirmation(false);
  };

  const handleAccordian = (idx: number) => {
    var icon = document.getElementById("accordian" + idx) as HTMLElement;
    var paymentDiv = document.getElementById("assignment" + idx) as HTMLElement;
    if (icon.className == "bi bi-caret-right-fill") {
      icon.className = "bi bi-caret-down-fill";
      paymentDiv.className = "d-block";
    } else {
      icon.className = "bi bi-caret-right-fill";
      paymentDiv.className = "d-none";
    }
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

  const saveAssignment = () => {
    var okay: boolean = true;
    updateLoadingMessage("Saving assignment...");
    updateLoading(true);
    const fillingType = document.getElementById("fillingType") as HTMLSelectElement;
    const assignTo = document.getElementById("assignTo") as HTMLInputElement;
    const assignFrom = document.getElementById("assignFrom") as HTMLInputElement;
    const recordedDate = document.getElementById("recordedDate") as HTMLInputElement;
    const datedDate = document.getElementById("datedDate") as HTMLInputElement;
    const volinst = document.getElementById("volinst") as HTMLInputElement;
    const page = document.getElementById("page") as HTMLInputElement;
    const comments = document.getElementById("comments") as HTMLTextAreaElement;
    const newMaturityAmount = document.getElementById("newMaturityAmount") as HTMLTextAreaElement;
    const newMaturityDate = document.getElementById("newMaturityDate") as HTMLTextAreaElement;
    const book = document.getElementById("book") as HTMLInputElement;

    var fillingTypeError = document.getElementById("fillingTypeError") as HTMLDivElement;
    const volinstError = document.getElementById("volinstError") as HTMLDivElement;
    const pageError = document.getElementById("pageError") as HTMLDivElement;
    const newMaturityAmountError = document.getElementById("newMaturityAmountError") as HTMLDivElement;
    const newMaturityDateError = document.getElementById("newMaturityDateError") as HTMLDivElement;
    const bookError = document.getElementById("bookError") as HTMLDivElement;

    if (isNoOptionSelected(fillingType, fillingTypeError)) okay = false;

    if (fillingType.value == "Modification") {
      if (isEmpty(newMaturityAmount, newMaturityAmountError)) okay = false;
      else if (isMaxLengthExceeded(newMaturityAmount, newMaturityAmountError, 12)) okay = false;

      if (isEmpty(newMaturityDate, newMaturityDateError)) okay = false;
    }

    if (isMaxLengthExceeded(volinst, volinstError, 100)) okay = false;
    if (isMaxLengthExceeded(page, pageError, 100)) okay = false;
    if (isMaxLengthExceeded(book, bookError, 100)) okay = false;

    if (okay) {
      assignmentServices
        .save({
          id: null,
          mortgageId: selectedMortgage?.id as unknown as number,
          fillingType: fillingType?.value == "-select-" ? "" : fillingType.value,
          assignTo: assignTo.value,
          assignFrom: assignFrom.value,
          datedDate: datedDate?.value,
          recordedDate: recordedDate?.value,
          volinst: volinst?.value,
          page: page?.value,
          book: book.value,
          newMaturityAmount: newMaturityAmount?.value as unknown as number,
          newMaturityDate: newMaturityDate?.value,
          comments: comments?.value,
        })
        .then((response) => {
          if (response.data.statusCode == 200) {
            getMortgages();
            setAssignmentVersion(assignmentVersion + 1);
            updateMessages([
              {
                title: "Success !!",
                message: "Assignment added successfully",
              },
              ...messages,
            ]);
            setShowAssignmentModal(false);
          } else if (response.data.statusCode == 400) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save assignment! Please try again.",
              },
              ...messages,
            ]);
            let errors = JSON.parse(response.data.body);
            for (let i in errors) {
              if (errors.at(i).startsWith("volinst")) {
                volinstError.innerText = errors.at(i).substr(9);
              } else if (errors.at(i).startsWith("page")) {
                pageError.innerText = errors.at(i).substr(6);
              } else if (errors.at(i).startsWith("fillingType")) {
                fillingTypeError.innerText = errors.at(i).substr(13);
              }
            }
          } else if (response.data.statusCode == 501) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save assignment! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save assignment! Please try again.",
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
                message: "Could not save assignment! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save assignment! Please try again.",
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
              Mortgages&nbsp;&nbsp;
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
                setSelectedMortgage(null);
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
            <div className="col-2" onClick={() => handleSort("mortgagee", "mortgageeSortIcon")}>
              <b>
                Mortgagee&nbsp;
                <i id="sortIcon" className={icons["mortgageeSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("mortgagor", "mortgagorSortIcon")}>
              <b>
                Mortgagor&nbsp;
                <i id="sortIcon" className={icons["mortgagorSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("mortgage_date", "dateSortIcon")}>
              <b>
                Mortgage Date&nbsp;
                <i id="sortIcon" className={icons["dateSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("recorded_date", "recordedSortIcon")}>
              <b>
                Recorded Date&nbsp;
                <i id="sortIcon" className={icons["recordedSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("mortgage_amount", "amountSortIcon")}>
              <b>
                Mortgage Amount&nbsp;
                <i id="sortIcon" className={icons["amountSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("volinst", "volinstSortIcon")}>
              <b>
                Vol/Inst#&nbsp;
                <i id="sortIcon" className={icons["volinstSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("page", "pageSortIcon")}>
              <b>
                Page&nbsp;
                <i id="sortIcon" className={icons["pageSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1">
              <b>Add'l Filling</b>
            </div>
            <div className="col-1">
              <b>Action</b>
            </div>
          </TableRow>
          {mortagages.length == 0 && <TableRow className="d-flex justify-content-center">No items...</TableRow>}
          {mortagages.map((item, idx) => (
            <TableRow key={"mortagage" + item.id} className="row">
              <div className="col-2">
                <i id={"accordian" + idx} onClick={() => handleAccordian(idx)} className="bi bi-caret-right-fill"></i>
                {item.mortgagee}
              </div>
              <div className="col-2">{item.mortgagor}</div>
              <div className="col-1">{item.mortgageDate}</div>
              <div className="col-1">{item.recordedDate}</div>
              <div className="col-2">{item.mortgageAmount ? "$" + item.mortgageAmount : ""}</div>
              <div className="col-1">{item.volinst}</div>
              <div className="col-1">{item.page}</div>
              <StatusIconContainer className="col-1">
                <i id={"additionalFillings" + item.id}></i>
              </StatusIconContainer>
              <div className="col-1">
                <i
                  className="bi bi-pencil-square"
                  onClick={() => {
                    setSelectedMortgage(item);
                    setShowModal(true);
                  }}></i>
                <i
                  className="bi bi-trash-fill"
                  onClick={() => {
                    setSelectedMortgage(item);
                    setShowDeleteConfirmation(true);
                  }}></i>
                <i
                  className="bi bi-clipboard-plus"
                  onClick={() => {
                    setSelectedMortgage(item);
                    setShowAssignmentModal(true);
                  }}></i>
              </div>
              <div id={"assignment" + idx} className="d-none">
                <AssignmentTable key={"mortgage" + item.id + " " + assignmentVersion} mortgageId={item.id ? item.id : 0} />
              </div>
            </TableRow>
          ))}
          <Pagination totalPage={totalPage} data={mortagages} pageSize={pageSize} setPageSize={setPageSize} currPage={currPage} setCurrPage={setCurrPage} />
        </div>
      </div>
      <Modal show={showAssignmentModal} size="lg" backdrop="static" centered onHide={() => setShowAssignmentModal(false)}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{"Add Assignment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid card p-2">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="fillingType"
                    onChange={() => {
                      if ((document.getElementById("fillingType") as HTMLSelectElement).value == "Modification") {
                        (document.getElementById("newMaturityAmountContainer") as HTMLDivElement).classList.remove("d-none");
                        (document.getElementById("newMaturityDateContainer") as HTMLDivElement).classList.remove("d-none");
                      } else {
                        (document.getElementById("newMaturityAmountContainer") as HTMLDivElement).classList.add("d-none");
                        (document.getElementById("newMaturityDateContainer") as HTMLDivElement).classList.add("d-none");
                      }
                    }}>
                    <option defaultChecked>-select-</option>
                    <option key={"Amendment"}>Amendment</option>
                    <option key={"Modification"}>Modification</option>
                    <option key={"Consolidation"}>Consolidation</option>
                    <option key={"Re-recorded"}>Re-recorded</option>
                    <option key={"Subordination"}>Subordination</option>
                    <option key={"Assignment of leases & rents"}>Assignment of leases & rents</option>
                    <option key={"Partial release"}>Partial release</option>
                    <option key={"Adjustable rate rider"}>Adjustable rate rider</option>
                    <option key={"Other"}>Other</option>
                  </select>
                  <label htmlFor="fillingType">Filling Type</label>
                </div>
                <ErrorMessage id="fillingTypeError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="recordedDate" label="Recorded Date" type="date" defaultValue={""} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="assignTo" label="Assign to" type="text" defaultValue={""} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="assignFrom" label="Assign from" type="text" defaultValue={""} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="volinst" label="Vol/Inst#" type="text" defaultValue={""} maxLength={100}/>
                <ErrorMessage id="volinstError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="page" label="Page" type="text" defaultValue={""} maxLength={100}/>
                <ErrorMessage id="pageError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="datedDate" label="Dated Date" type="date" defaultValue={""} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="book" label="Book" type="text" defaultValue={""} maxLength={100}/>
                <ErrorMessage id="bookError"></ErrorMessage>
              </div>
              <div
                id="newMaturityAmountContainer"
                className="col-lg-3 col-md-6 col-sm-6 required-field d-none">
                <TextField id="newMaturityAmount" label="New Maturity Amount" type="number" defaultValue={""} required maxLength={12}/>
                <ErrorMessage id="newMaturityAmountError"></ErrorMessage>
              </div>
              <div
                id="newMaturityDateContainer"
                className="col-lg-3 col-md-6 col-sm-6 required-field d-none">
                <TextField id="newMaturityDate" label="New Maturity Date" type="date" defaultValue={""} required/>
                <ErrorMessage id="newMaturityDateError"></ErrorMessage>
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12">
                <TextArea id="comments" label="Comments" defaultValue={""} maxLength={4000}/>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ModalButton onClick={() => setShowAssignmentModal(false)}>Cancel</ModalButton>
          <ModalButton onClick={() => saveAssignment()}>Save</ModalButton>
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
          <ModalButton onClick={() => deleteItem(selectedMortgage?.id ? selectedMortgage?.id : 0)}>Confirm</ModalButton>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} size="lg" backdrop="static" centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{selectedMortgage?.id ? "Edit Mortgage" : "Add Mortgage"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid card p-2">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <TextField id="mortgagee" label="Mortgagee" type="text" defaultValue={selectedMortgage?.mortgagee} required/>
                <ErrorMessage id="mortgageeError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <TextField id="mortgagor" label="Mortgagor" type="text" defaultValue={selectedMortgage?.mortgagor} required/>
                <ErrorMessage id="mortgagorError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="mortgageDate" label="Mortgage Date" type="date" defaultValue={selectedMortgage?.mortgageDate} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <TextField id="recordedDate" label="Recorded Date" type="date" defaultValue={selectedMortgage?.recordedDate} required/>
                <ErrorMessage id="recordedDateError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6 mt-sm-3">
                <ToggleButton id="isOpenEnded" label="Open Ended" defaultChecked={selectedMortgage?.isOpenEnded} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="mortgageAmount" label="Mortgage Amount" type="number" defaultValue={selectedMortgage?.mortgageAmount} maxLength={12}/>
                <ErrorMessage id="mortgageAmountError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <TextField id="volinst" label="Vol/Inst#" type="text" defaultValue={selectedMortgage?.volinst} required maxLength={100}/>
                <ErrorMessage id="volinstError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="page" label="Page" type="text" defaultValue={selectedMortgage?.page} maxLength={100}/>
                <ErrorMessage id="pageError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="mortgagePosition" label="Mortgage Position" type="text" defaultValue={selectedMortgage?.mortgagePosition} maxLength={100}/>
                <ErrorMessage id="mortgagePositionError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="book" label="Book" type="text" defaultValue={selectedMortgage?.book} maxLength={100}/>
                <ErrorMessage id="bookError"></ErrorMessage>
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12">
                <TextArea id="comments" label="Comments" defaultValue={selectedMortgage?.comments} maxLength={4000}/>
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

export default MortgageTable;
