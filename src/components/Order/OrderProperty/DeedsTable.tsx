import React, { useContext, useEffect, useState } from "react";
import { ModalButton, AddButton, OrderDetailPopover } from "./OrderPropertyStyledComponents";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { Deed } from "../../../utils/form-types";
import Pagination from "../../utils/PaginationComponent";
import DeedsServices from "../../../services/deeds-services";
import { TextField, ToggleButton, TextArea } from "../../utils/InputGroup";
import deedsServices from "../../../services/deeds-services";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import { isMaxLengthExceeded, isEmpty } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitle, TableTitleRow } from "../OrderStyledComponents";

const DeedsTable: React.FunctionComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [deeds, setDeeds] = useState<Deed[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedDeed, setSelectedDeed] = useState<Deed | null>(null);
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("");
  const [icons, setIcons] = useState<any>({
    granteeSortIcon: "",
    grantorSortIcon: "",
    priorSortIcon: "",
    deedSortIcon: "",
    recordedSortIcon: "",
    considerationSortIcon: "",
    volinstSortIcon: "",
    pageSortIcon: "",
  });
  const { orderId } = useParams();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext) as ApplicationContextType;

  useEffect(() => {
    getDeeds();
  }, []);

  useEffect(() => {
    getDeeds();
  }, [currPage, totalPage, pageSize, sortColumn, sortDirection]);

  const getDeeds = () => {
    updateLoadingMessage("Fetching deeds...");
    updateLoading(true);
    deedsServices
      .getSize(orderId as unknown as number)
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
              message: "Could not fetch deed table size! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch deed table size! Please try again.",
            },
            ...messages,
          ]);
        }
      });
    deedsServices
      .getAll(orderId as unknown as number, currPage, pageSize, sortColumn, sortDirection)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setDeeds(JSON.parse(response.data.body));
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch deeds! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch deeds! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch deeds! Please try again.",
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
              message: "Could not fetch deeds! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch deeds! Please try again.",
            },
            ...messages,
          ]);
        }
      });
  };

  const save = () => {
    var okay: boolean = true;
    updateLoadingMessage("Saving deed...");
    updateLoading(true);
    const grantee = document.getElementById("grantee") as HTMLInputElement;
    const granteeVesting = document.getElementById("granteeVesting") as HTMLInputElement;
    const granteeLegalName = document.getElementById("granteeLegalName") as HTMLInputElement;
    const isGranteeDeceased = document.getElementById("isGranteeDeceased") as HTMLInputElement;
    const granteeDeceasedName = document.getElementById("granteeDeceasedName") as HTMLInputElement;
    const granteeDeceasedDate = document.getElementById("granteeDeceasedDate") as HTMLInputElement;
    const grantor = document.getElementById("grantor") as HTMLInputElement;
    const grantorVesting = document.getElementById("grantorVesting") as HTMLInputElement;
    const grantorLegalName = document.getElementById("grantorLegalName") as HTMLInputElement;
    const isGrantorDeceased = document.getElementById("isGrantorDeceased") as HTMLInputElement;
    const grantorDeceasedName = document.getElementById("grantorDeceasedName") as HTMLInputElement;
    const grantorDeceasedDate = document.getElementById("grantorDeceasedDate") as HTMLInputElement;
    const deedDate = document.getElementById("deedDate") as HTMLInputElement;
    const recordedDate = document.getElementById("recordedDate") as HTMLInputElement;
    const deedType = document.getElementById("deedType") as HTMLSelectElement;
    const hasPriorDeed = document.getElementById("hasPriorDeed") as HTMLInputElement;
    const considerationAmount = document.getElementById("considerationAmount") as HTMLInputElement;
    const volinst = document.getElementById("volInst") as HTMLInputElement;
    const page = document.getElementById("page") as HTMLInputElement;
    const comments = document.getElementById("comments") as HTMLTextAreaElement;
    const other = document.getElementById("other") as HTMLInputElement;
    const book = document.getElementById("book") as HTMLInputElement;

    var granteeError = document.getElementById("granteeError") as HTMLDivElement;
    var grantorError = document.getElementById("grantorError") as HTMLDivElement;
    var deedDateError = document.getElementById("deedDateError") as HTMLDivElement;
    var recordedDateError = document.getElementById("recordedDateError") as HTMLDivElement;
    var volInstError = document.getElementById("volInstError") as HTMLDivElement;
    var pageError = document.getElementById("pageError") as HTMLDivElement;
    var considerationAmountError = document.getElementById("considerationAmountError") as HTMLDivElement;
    var otherError = document.getElementById("otherError") as HTMLDivElement;
    const bookError = document.getElementById("bookError") as HTMLInputElement;

    if (isEmpty(grantee, granteeError)) okay = false;
    if (isEmpty(grantor, grantorError)) okay = false;
    if (isEmpty(deedDate, deedDateError)) okay = false;
    if (isEmpty(recordedDate, recordedDateError)) okay = false;
    if (isEmpty(volinst, volInstError)) okay = false;
    else if (isMaxLengthExceeded(volinst, volInstError, 100)) okay = false;
    if (isMaxLengthExceeded(page, pageError, 100)) okay = false;
    if (isMaxLengthExceeded(book, bookError, 100)) okay = false;
    if (isMaxLengthExceeded(considerationAmount, considerationAmountError, 12)) okay = false;

    if (deedType.value == "Other") {
      if (isEmpty(other, otherError)) okay = false;
      else if (isMaxLengthExceeded(other, otherError, 100)) okay = false;
    }

    if (okay) {
      DeedsServices.save({
        id: selectedDeed?.id ? selectedDeed.id : null,
        orderId: orderId as unknown as number,
        grantee: grantee?.value,
        granteeVesting: granteeVesting?.value,
        granteeLegalName: granteeLegalName?.value,
        isGranteeDeceased: isGranteeDeceased?.checked,
        granteeDeceasedName: granteeDeceasedName?.value,
        granteeDeceasedDate: granteeDeceasedDate?.value,
        grantor: grantor?.value,
        grantorVesting: grantorVesting?.value,
        grantorLegalName: grantorLegalName?.value,
        isGrantorDeceased: isGrantorDeceased?.checked,
        grantorDeceasedName: grantorDeceasedName?.value,
        grantorDeceasedDate: grantorDeceasedDate?.value,
        deedDate: deedDate?.value,
        recordedDate: recordedDate?.value,
        deedType: deedType?.value == "-select-" ? "" : deedType.value == "Other" ? other?.value : deedType.value,
        hasPriorDeed: hasPriorDeed?.checked,
        considerationAmount: considerationAmount?.value as unknown as number,
        volinst: volinst?.value,
        page: page?.value,
        book: book.value,
        comments: comments?.value,
      })
        .then((response) => {
          if (response.data.statusCode == 200) {
            getDeeds();
            updateMessages([
              {
                title: "Success !!",
                message: "Deed " + (selectedDeed?.id ? "editted " : "added ") + "successfully",
              },
              ...messages,
            ]);
            setShowModal(false);
          } else if (response.data.statusCode == 400) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save deed! Please try again.",
              },
              ...messages,
            ]);
            let errors = JSON.parse(response.data.body);
            for (let i in errors) {
              if (errors.at(i).startsWith("grantee")) {
                granteeError.innerText = errors.at(i).substr(9);
              } else if (errors.at(i).startsWith("grantor")) {
                grantorError.innerText = errors.at(i).substr(9);
              } else if (errors.at(i).startsWith("deedDate")) {
                deedDateError.innerText = errors.at(i).substr(10);
              } else if (errors.at(i).startsWith("recordedDate")) {
                recordedDateError.innerText = errors.at(i).substr(14);
              } else if (errors.at(i).startsWith("volinst")) {
                volInstError.innerText = errors.at(i).substr(9);
              } else if (errors.at(i).startsWith("page")) {
                pageError.innerText = errors.at(i).substr(6);
              } else if (errors.at(i).startsWith("considerationAmount")) {
                considerationAmountError.innerText = errors.at(i).substr(21);
              }
            }
          } else if (response.data.statusCode == 501) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save deed! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save deed! Please try again.",
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
                message: "Could not save deed! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save deed! Please try again.",
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
    setCurrPage(1);
    updateLoadingMessage("Deleting deed...");
    updateLoading(true);
    DeedsServices.deleteItem(id)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setCurrPage(1);
          getDeeds();
          updateMessages([{ title: "Success !!", message: "Deed deleted successfully" }, ...messages]);
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete deed! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete deed! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete deed! Please try again.",
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
              message: "Could not delete deed! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete deed! Please try again.",
            },
            ...messages,
          ]);
        }
      });
    setShowDeleteConfirmation(false);
  };

  const handleSort = (column: string, iconId: string) => {
    setSortColumn(column);
    let temp = icons;
    for (let k in icons) {
      if (k != iconId) temp[k] = "";
    }
    icons[iconId] = icons[iconId] == "bi bi-arrow-down" ? "bi bi-arrow-up" : "bi bi-arrow-down";
    setIcons(icons);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const findDeedType = (deedType: string) => {
    if (
      [
        "",
        "-select-",
        "Affidavit of Death",
        "Bargain and Sale Deed",
        "Certificate of Title",
        "Corrective Deed",
        "Deed",
        "Deed in Lieu",
        "Deed of Distribution",
        "Divorce Decree",
        "Easement",
        "Executors Deed",
        "Foreclosure Deed",
        "Gift Deed",
        "Grant Deed",
        "In-Sale",
        "Indenture",
        "Interspousal Transfer Deed",
        "Lease",
        "Land Contract",
        "Out-Sale",
        "Quit Claim Deed",
        "Re-Recorded Deed",
        "Sheriffs Deed",
        "Substitute Trustees Deed",
        "Survivorship Deed",
        "Transfer on Death Deed",
        "Trustee Deed",
        "Warranty Deed",
        "Will",
      ].includes(deedType)
    )
      return true;
    return false;
  };

  return (
    <Table className="table mt-5 mb-5">
      <div className="d-grid">
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>
              Deeds&nbsp;&nbsp;
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
                setSelectedDeed(null);
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
            <div className="col-2" onClick={() => handleSort("grantee", "granteeSortIcon")}>
              <b>
                Grantee Information&nbsp;
                <i id="sortIcon" className={icons["granteeSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("grantor", "grantorSortIcon")}>
              <b>
                Grantor Information&nbsp;
                <i id="sortIcon" className={icons["grantorSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("is_prior", "priorSortIcon")}>
              <b>
                Prior&nbsp;
                <i id="sortIcon" className={icons["priorSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("deed_date", "deedSortIcon")}>
              <b>
                Deed Date&nbsp;
                <i id="sortIcon" className={icons["deedSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("recorded_date", "recordedSortIcon")}>
              <b>
                Recorded Date&nbsp;
                <i id="sortIcon" className={icons["recordedSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("consideration_amount", "considerationSortIcon")}>
              <b>
                Consideration Amount&nbsp;
                <i id="sortIcon" className={icons["considerationSortIcon"]}></i>
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
          {deeds.length == 0 && <TableRow className="d-flex justify-content-center">No items...</TableRow>}
          {deeds.map((item, idx) => (
            <TableRow key={"deed" + item.id} className="row">
              <div className="col-2">
                <b>Grantee: </b>
                {item.grantee}
                <br />
                <b>Vesting: </b>
                {item.granteeVesting}
              </div>
              <div className="col-2">
                <b>Grantor: </b>
                {item.grantor}
                <br />
                <b>Vesting: </b>
                {item.grantorVesting}
              </div>
              <div className="col-1">{item.hasPriorDeed}</div>
              <div className="col-1">{item.deedDate}</div>
              <div className="col-1">{item.recordedDate}</div>
              <div className="col-2">{item.considerationAmount ? "$" + item.considerationAmount : ""}</div>
              <div className="col-1">{item.volinst}</div>
              <div className="col-1">{item.page}</div>
              <div className="col-1">
                <i
                  className="bi bi-pencil-square"
                  onClick={() => {
                    setSelectedDeed(item);
                    setShowModal(true);
                  }}></i>
                <i
                  className="bi bi-trash-fill"
                  onClick={() => {
                    setSelectedDeed(item);
                    setShowDeleteConfirmation(true);
                  }}></i>
              </div>
            </TableRow>
          ))}
          <Pagination totalPage={totalPage} data={deeds} pageSize={pageSize} setPageSize={setPageSize} currPage={currPage} setCurrPage={setCurrPage} />
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
          <ModalButton onClick={() => deleteItem(selectedDeed?.id ? selectedDeed?.id : 0)}>Confirm</ModalButton>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} size="lg" backdrop="static" centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{selectedDeed?.id ? "Edit Deed" : "Add Deed"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid card p-2">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <TextField id="grantee" label="Grantee" type="text" defaultValue={selectedDeed?.grantee} required/>
                <ErrorMessage id="granteeError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="granteeVesting" label="Grantee Vesting" type="text" defaultValue={selectedDeed?.granteeVesting} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="granteeLegalName" label="Name on Legal Desc." type="text" defaultValue={selectedDeed?.granteeLegalName} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mt-sm-3">
                <ToggleButton id="isGranteeDeceased" label="Deceased" defaultChecked={selectedDeed?.isGranteeDeceased} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="granteeDeceasedName" label="Deceased Name" type="text" defaultValue={selectedDeed?.granteeDeceasedName} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="granteeDeceasedDate" label="Deceased Date" type="date" defaultValue={selectedDeed?.granteeDeceasedDate} />
              </div>
            </div>
          </div>
          <div className="container-fluid card p-2 mt-3">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <TextField id="grantor" label="Grantor" type="text" defaultValue={selectedDeed?.grantor} required/>
                <ErrorMessage id="grantorError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="grantorVesting" label="Grantor Vesting" type="text" defaultValue={selectedDeed?.grantorVesting} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="grantorLegalName" label="Name on Legal Desc." type="text" defaultValue={selectedDeed?.grantorLegalName} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mt-sm-3">
                <ToggleButton id="isGrantorDeceased" label="Deceased" defaultChecked={selectedDeed?.isGrantorDeceased} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="grantorDeceasedName" label="Deceased Name" type="text" defaultValue={selectedDeed?.grantorDeceasedName} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="grantorDeceasedDate" label="Deceased Date" type="date" defaultValue={selectedDeed?.grantorDeceasedDate} />
              </div>
            </div>
          </div>
          <div className="container-fluid card p-2 mt-3">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <TextField id="deedDate" label="Deed Date" type="date" defaultValue={selectedDeed?.deedDate} required/>
                <ErrorMessage id="deedDateError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <TextField id="recordedDate" label="Recorded Date" type="date" defaultValue={selectedDeed?.recordedDate} required/>
                <ErrorMessage id="recordedDateError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <TextField id="volInst" label="Vol/Inst#" type="text" defaultValue={selectedDeed?.volinst} required maxLength={100}/>
                <ErrorMessage id="volInstError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 mt-sm-3">
                <ToggleButton id="hasPriorDeed" label="Prior Deed" defaultChecked={selectedDeed?.hasPriorDeed} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="considerationAmount" label="Consideration Amount" type="number" defaultValue={selectedDeed?.considerationAmount} maxLength={12}/>
                <ErrorMessage id="considerationAmountError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="page" label="Page" type="text" defaultValue={selectedDeed?.page} maxLength={100}/>
                <ErrorMessage id="pageError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="deedType"
                    defaultValue={findDeedType(selectedDeed?.deedType ? selectedDeed.deedType : "") ? selectedDeed?.deedType : "Other"}
                    onChange={() => {
                      if ((document.getElementById("deedType") as HTMLSelectElement).value == "Other") {
                        (document.getElementById("otherContainer") as HTMLDivElement).style.display = "";
                      } else {
                        (document.getElementById("otherContainer") as HTMLDivElement).style.display = "none";
                      }
                    }}>
                    <option defaultChecked>-select-</option>
                    <option key="Affidavit of Death">Affidavit of Death</option>
                    <option key="Bargain and Sale Deed">Bargain and Sale Deed</option>
                    <option key="Certificate of Title">Certificate of Title</option>
                    <option key="Corrective Deed">Corrective Deed</option>
                    <option key="Deed">Deed</option>
                    <option key="Deed in Lieu">Deed in Lieu</option>
                    <option key="Deed of Distribution">Deed of Distribution</option>
                    <option key="Divorce Decree">Divorce Decree</option>
                    <option key="Easement">Easement</option>
                    <option key="Executors Deed">Executors Deed</option>
                    <option key="Foreclosure Deed">Foreclosure Deed</option>
                    <option key="Gift Deed">Gift Deed</option>
                    <option key="Grant Deed">Grant Deed</option>
                    <option key="In-Sale">In-Sale</option>
                    <option key="Indenture">Indenture</option>
                    <option key="Interspousal Transfer Deed">Interspousal Transfer Deed</option>
                    <option key="Lease">Lease</option>
                    <option key="Land Contract">Land Contract</option>
                    <option key="Other">Other</option>
                    <option key="Out-Sale">Out-Sale</option>
                    <option key="Quit Claim Deed">Quit Claim Deed</option>
                    <option key="Re-Recorded Deed">Re-Recorded Deed</option>
                    <option key="Sheriffs Deed">Sheriffs Deed</option>
                    <option key="Substitute Trustees Deed">Substitute Trustees Deed</option>
                    <option key="Survivorship Deed">Survivorship Deed</option>
                    <option key="Transfer on Death Deed">Transfer on Death Deed</option>
                    <option key="Trustee Deed">Trustee Deed</option>
                    <option key="Warranty Deed">Warranty Deed</option>
                    <option key="Will">Will</option>
                  </select>
                  <label htmlFor="deedType">Deed Type</label>
                </div>
              </div>
              <div
                id="otherContainer"
                className="col-lg-3 col-md-6 col-sm-6 required-field"
                style={{
                  display: findDeedType(selectedDeed?.deedType ? selectedDeed.deedType : "") ? "none" : "",
                }}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="other"
                    placeholder="Other"
                    defaultValue={findDeedType(selectedDeed?.deedType ? selectedDeed.deedType : "") ? "" : selectedDeed?.deedType}
                  />
                  <label htmlFor="other">Other</label>
                </div>
                <ErrorMessage id="otherError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="book" label="Book" type="text" defaultValue={selectedDeed?.book} maxLength={100}/>
                <ErrorMessage id="bookError"></ErrorMessage>
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12 ">
                <TextArea id="comments" label="Comments" defaultValue={selectedDeed?.comments} maxLength={4000}/>
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

export default DeedsTable;
