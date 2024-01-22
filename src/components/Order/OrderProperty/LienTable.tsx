import React, { useState, useEffect, useContext } from "react";
import { ModalButton, AddButton, OrderDetailPopover } from "./OrderPropertyStyledComponents";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { Lien } from "../../../utils/form-types";
import Pagination from "../../utils/PaginationComponent";
import LiensServices from "../../../services/liens-services";
import { TextField, ToggleButton, TextArea } from "../../utils/InputGroup";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import { isEmpty, isMaxLengthExceeded } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitle, TableTitleRow } from "../OrderStyledComponents";

const LienTable: React.FunctionComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [liens, setLiens] = useState<Lien[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedLien, setSelectedLien] = useState<Lien | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("");
  const [icons, setIcons] = useState<any>({
    plaintiffSortIcon: "",
    defendantSortIcon: "",
    uccSortIcon: "",
    recordedSortIcon: "",
    lienAmountSortIcon: "",
    caseSortIcon: "",
    docketSortIcon: "",
    volinstSortIcon: "",
    pageSortIcon: "",
  });
  const { orderId } = useParams();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext) as ApplicationContextType;

  useEffect(() => {
    getLiens();
  }, []);

  useEffect(() => {
    getLiens();
  }, [currPage, totalPage, pageSize, sortColumn, sortDirection]);

  const getLiens = () => {
    updateLoadingMessage("Fetching liens...");
    updateLoading(true);
    LiensServices.getSize(orderId as unknown as number)
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
              message: "Could not fetch lien table size! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch lien table size! Please try again.",
            },
            ...messages,
          ]);
        }
      });
    LiensServices.getAll(orderId as unknown as number, currPage, pageSize, sortColumn, sortDirection)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setLiens(JSON.parse(response.data.body));
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch liens! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch liens! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch liens! Please try again.",
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
              message: "Could not fetch liens! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch liens! Please try again.",
            },
            ...messages,
          ]);
        }
      });
  };

  const save = () => {
    var okay: boolean = true;
    updateLoadingMessage("Saving lien...");
    updateLoading(true);
    const plaintiff = document.getElementById("plaintiff") as HTMLInputElement;
    const defendant = document.getElementById("defendant") as HTMLInputElement;
    const lienType = document.getElementById("lienType") as HTMLInputElement;
    const dob = document.getElementById("dob") as HTMLInputElement;
    const ucc = document.getElementById("ucc") as HTMLInputElement;
    const ssn = document.getElementById("ssn") as HTMLInputElement;
    const caseNumber = document.getElementById("caseNumber") as HTMLInputElement;
    const date = document.getElementById("date") as HTMLInputElement;
    const recordedDate = document.getElementById("recordedDate") as HTMLInputElement;
    const lienAmount = document.getElementById("lienAmount") as HTMLInputElement;
    const volinst = document.getElementById("volinst") as HTMLInputElement;
    const page = document.getElementById("page") as HTMLInputElement;
    const searchedNames = document.getElementById("searchedNames") as HTMLInputElement;
    const comments = document.getElementById("comments") as HTMLInputElement;
    const book = document.getElementById("book") as HTMLInputElement;

    var plaintiffError = document.getElementById("plaintiffError") as HTMLDivElement;
    var defendantError = document.getElementById("defendantError") as HTMLDivElement;
    var caseNumberError = document.getElementById("caseNumberError") as HTMLDivElement;
    var ssnError = document.getElementById("ssnError") as HTMLDivElement;
    var volinstError = document.getElementById("volinstError") as HTMLDivElement;
    var pageError = document.getElementById("pageError") as HTMLDivElement;
    var lienAmountError = document.getElementById("lienAmountError") as HTMLDivElement;
    const bookError = document.getElementById("bookError") as HTMLInputElement;

    if (isEmpty(plaintiff, plaintiffError)) okay = false;
    if (isEmpty(defendant, defendantError)) okay = false;
    if (isMaxLengthExceeded(ssn, ssnError, 100)) okay = false;
    if (isMaxLengthExceeded(caseNumber, caseNumberError, 100)) okay = false;
    if (isMaxLengthExceeded(volinst, volinstError, 100)) okay = false;
    if (isMaxLengthExceeded(page, pageError, 100)) okay = false;
    if (isMaxLengthExceeded(book, bookError, 100)) okay = false;
    if (isMaxLengthExceeded(lienAmount, lienAmountError, 12)) okay = false;

    if (okay) {
      LiensServices.save({
        id: selectedLien?.id ? selectedLien.id : null,
        orderId: orderId as unknown as number,
        plaintiff: plaintiff.value,
        defendant: defendant.value,
        lienType: lienType.value,
        dob: dob.value,
        ucc: ucc.checked,
        ssn: ssn.value,
        caseNumber: caseNumber.value,
        date: date.value,
        recordedDate: recordedDate.value,
        lienAmount: lienAmount.value as unknown as number,
        volinst: volinst.value,
        page: page.value,
        book: book.value,
        searchedNames: searchedNames.value,
        comments: comments.value,
      })
        .then((response) => {
          if (response.data.statusCode == 200) {
            getLiens();
            updateMessages([
              {
                title: "Success !!",
                message: "Lien " + (selectedLien?.id ? "editted " : "added ") + "successfully",
              },
              ...messages,
            ]);
            setShowModal(false);
          } else if (response.data.statusCode == 400) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save lien! Please try again.",
              },
              ...messages,
            ]);
            let errors = JSON.parse(response.data.body);
            for (let i in errors) {
              if (errors.at(i).startsWith("volinst")) {
                volinstError.innerText = errors.at(i).substr(9);
              } else if (errors.at(i).startsWith("page")) {
                pageError.innerText = errors.at(i).substr(6);
              } else if (errors.at(i).startsWith("plaintiff")) {
                plaintiffError.innerText = errors.at(i).substr(11);
              } else if (errors.at(i).startsWith("defendant")) {
                defendantError.innerText = errors.at(i).substr(11);
              } else if (errors.at(i).startsWith("caseNumber")) {
                caseNumberError.innerText = errors.at(i).substr(12);
              } else if (errors.at(i).startsWith("ssn")) {
                ssnError.innerText = errors.at(i).substr(5);
              } else if (errors.at(i).startsWith("lienAmount")) {
                lienAmountError.innerText = errors.at(i).substr(12);
              }
            }
          } else if (response.data.statusCode == 501) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save lien! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save lien! Please try again.",
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
                message: "Could not save lien! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save lien! Please try again.",
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
    updateLoadingMessage("Deleting lien...");
    updateLoading(true);
    LiensServices.deleteItem(id)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setCurrPage(1);
          getLiens();
          updateMessages([{ title: "Success !!", message: "Lien deleted successfully" }, ...messages]);
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete lien! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete lien! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete lien! Please try again.",
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
              message: "Could not delete lien! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete lien! Please try again.",
            },
            ...messages,
          ]);
        }
      });
    setShowDeleteConfirmation(false);
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

  return (
    <Table className="table mt-5 mb-5">
      <div className="d-grid">
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>
              Liens&nbsp;&nbsp;
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
                setSelectedLien(null);
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
            <div className="col-2" onClick={() => handleSort("plaintiff", "plaintiffSortIcon")}>
              <b>
                Plaintiff&nbsp;
                <i id="sortIcon" className={icons["plaintiffSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("defendant", "defendantSortIcon")}>
              <b>
                Defendant&nbsp;
                <i id="sortIcon" className={icons["defendantSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("ucc", "uccSortIcon")}>
              <b>
                UCC&nbsp;
                <i id="sortIcon" className={icons["uccSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("recorded_date", "recordedSortIcon")}>
              <b>
                Recorded Date&nbsp;
                <i id="sortIcon" className={icons["recordedSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("lien_amount", "lienAmountSortIcon")}>
              <b>
                Lien Amount&nbsp;
                <i id="sortIcon" className={icons["lienAmountSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("docket_number", "caseSortIcon")}>
              <b>
                Docket/Case#&nbsp;
                <i id="sortIcon" className={icons["caseSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("dated_date", "docketSortIcon")}>
              <b>
                Docket Date&nbsp;
                <i id="sortIcon" className={icons["docketSortIcon"]}></i>
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
              <b>Action</b>
            </div>
          </TableRow>
          {liens.length == 0 && <TableRow className="d-flex justify-content-center">No items...</TableRow>}
          {liens.map((item, idx) => (
            <TableRow key={"lien" + item.id} className="row">
              <div className="col-2">{item.plaintiff}</div>
              <div className="col-2">{item.defendant}</div>
              <div className="col-1">{item.ucc ? "true" : "false"}</div>
              <div className="col-1">{item.recordedDate}</div>
              <div className="col-1">{item.lienAmount ? "$" + item.lienAmount : ""}</div>
              <div className="col-1">{item.caseNumber}</div>
              <div className="col-1">{item.date}</div>
              <div className="col-1">{item.volinst}</div>
              <div className="col-1">{item.page}</div>
              <div className="col-1">
                <i
                  className="bi bi-pencil-square"
                  onClick={() => {
                    setSelectedLien(item);
                    setShowModal(true);
                  }}></i>
                <i
                  className="bi bi-trash-fill"
                  onClick={() => {
                    setSelectedLien(item);
                    setShowDeleteConfirmation(true);
                  }}></i>
              </div>
            </TableRow>
          ))}
          <Pagination totalPage={totalPage} data={liens} pageSize={pageSize} setPageSize={setPageSize} currPage={currPage} setCurrPage={setCurrPage} />
        </div>
      </div>
      <Modal show={showDeleteConfirmation} backdrop="static" centered onHide={() => setShowDeleteConfirmation(false)}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Confirm Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Are you sure you want to delete this item?</h5>
        </Modal.Body>
        <Modal.Footer>
          <ModalButton onClick={() => setShowDeleteConfirmation(false)}>Cancel</ModalButton>
          <ModalButton onClick={() => deleteItem(selectedLien?.id ? selectedLien?.id : 0)}>Confirm</ModalButton>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} size="lg" backdrop="static" centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{selectedLien?.id ? "Edit Lien" : "Add Lien"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid card p-2">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <TextField id="plaintiff" label="Plaintiff/Debtor" type="text" defaultValue={selectedLien?.plaintiff} required/>
                <ErrorMessage id="plaintiffError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <TextField id="defendant" label="Defendant/Holder" type="text" defaultValue={selectedLien?.defendant} required/>
                <ErrorMessage id="defendantError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="lienType" label="Lien Type" type="text" defaultValue={selectedLien?.lienType} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="lienAmount" label="Lien Amount" type="number" defaultValue={selectedLien?.lienAmount} maxLength={12}/>
                <ErrorMessage id="lienAmountError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="volinst" label="Vol/Inst#" type="text" defaultValue={selectedLien?.volinst} maxLength={100}/>
                <ErrorMessage id="volinstError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="page" label="Page" type="text" defaultValue={selectedLien?.page} maxLength={100}/>
                <ErrorMessage id="pageError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="ssn" label="SSN" type="text" defaultValue={selectedLien?.ssn} maxLength={100}/>
                <ErrorMessage id="ssnError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="caseNumber" label="Docket/Case Number" type="text" defaultValue={selectedLien?.caseNumber} maxLength={100}/>
                <ErrorMessage id="caseNumberError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="dob" label="DOB" type="date" defaultValue={selectedLien?.dob} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mt-sm-3">
                <ToggleButton id="ucc" label="UCC" defaultChecked={selectedLien?.ucc} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="date" label="Date" type="date" defaultValue={selectedLien?.date} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="recordedDate" label="Recorded Date" type="date" defaultValue={selectedLien?.recordedDate} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="book" label="Book" type="text" defaultValue={selectedLien?.book} maxLength={100}/>
                <ErrorMessage id="bookError"></ErrorMessage>
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12">
                <TextArea id="searchedNames" label="Searched Names" defaultValue={selectedLien?.searchedNames} maxLength={4000}/>
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12">
                <TextArea id="comments" label="Comments" defaultValue={selectedLien?.comments} maxLength={4000}/>
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

export default LienTable;
