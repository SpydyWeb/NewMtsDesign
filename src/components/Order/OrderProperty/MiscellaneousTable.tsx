import React, { useContext, useEffect, useState } from "react";
import { ModalButton, AddButton, OrderDetailPopover } from "./OrderPropertyStyledComponents";
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import { Miscellaneous } from "../../../utils/form-types";
import Pagination from "../../utils/PaginationComponent";
import MiscellaneousServices from "../../../services/miscellaneous-services";
import { TextField, TextArea, SelectBox } from "../../utils/InputGroup";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import { isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitle, TableTitleRow } from "../OrderStyledComponents";

const MiscellaneousTable: React.FunctionComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [miscellaneousItems, setMiscellaneousItems] = useState<Miscellaneous[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedMiscellaneous, setSelectedMiscellaneous] = useState<Miscellaneous | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("");
  const [icons, setIcons] = useState<any>({
    typeSortIcon: "",
    firstSortIcon: "",
    secondSortIcon: "",
    recordedSortIcon: "",
    volinstSortIcon: "",
    pageSortIcon: "",
  });
  const { orderId } = useParams();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext) as ApplicationContextType;

  useEffect(() => {
    getMiscellaneous();
  }, []);

  useEffect(() => {
    getMiscellaneous();
  }, [currPage, totalPage, pageSize, sortColumn, sortDirection]);

  const getMiscellaneous = () => {
    updateLoadingMessage("Fetching miscellaneous...");
    updateLoading(true);
    MiscellaneousServices.getSize(orderId as unknown as number)
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
              message: "Could not fetch miscellaneous table size! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch miscellaneous table size! Please try again.",
            },
            ...messages,
          ]);
        }
      });
    MiscellaneousServices.getAll(orderId as unknown as number, currPage, pageSize, sortColumn, sortDirection)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setMiscellaneousItems(JSON.parse(response.data.body));
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch miscellaneous items! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch miscellaneous items! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch miscellaneous items! Please try again.",
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
              message: "Could not fetch miscellaneous items! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch miscellaneous items! Please try again.",
            },
            ...messages,
          ]);
        }
      });
  };

  const save = () => {
    var okay: boolean = true;
    updateLoadingMessage("Saving miscellaneous...");
    updateLoading(true);
    const type = document.getElementById("type") as HTMLSelectElement;
    const firstParty = document.getElementById("firstParty") as HTMLInputElement;
    const secondParty = document.getElementById("secondParty") as HTMLInputElement;
    const recordedDate = document.getElementById("recordedDate") as HTMLInputElement;
    const volinst = document.getElementById("volinst") as HTMLInputElement;
    const page = document.getElementById("page") as HTMLInputElement;
    const comments = document.getElementById("comments") as HTMLTextAreaElement;
    const book = document.getElementById("book") as HTMLInputElement;

    var typeError = document.getElementById("typeError") as HTMLDivElement;
    var volinstError = document.getElementById("volinstError") as HTMLDivElement;
    var pageError = document.getElementById("pageError") as HTMLDivElement;
    const firstPartyError = document.getElementById("firstPartyError") as HTMLInputElement;
    const secondPartyError = document.getElementById("secondPartyError") as HTMLInputElement;
    const bookError = document.getElementById("bookError") as HTMLInputElement;

    if (isNoOptionSelected(type, typeError)) okay = false;
    if (isMaxLengthExceeded(volinst, volinstError, 100)) okay = false;
    if (isMaxLengthExceeded(page, pageError, 100)) okay = false;
    if (isMaxLengthExceeded(book, bookError, 100)) okay = false;
    if (isMaxLengthExceeded(firstParty, firstPartyError, 1000)) okay = false;
    if (isMaxLengthExceeded(secondParty, secondPartyError, 1000)) okay = false;

    if (okay) {
      MiscellaneousServices.save({
        id: selectedMiscellaneous?.id ? selectedMiscellaneous.id : null,
        orderId: orderId as unknown as number,
        type: type.value == "-select-" ? "" : type.value,
        firstParty: firstParty.value,
        secondParty: secondParty.value,
        recordedDate: recordedDate?.value,
        volinst: volinst?.value,
        page: page?.value,
        book: book.value,
        comments: comments?.value,
      })
        .then((response) => {
          if (response.data.statusCode == 200) {
            getMiscellaneous();
            updateMessages([
              {
                title: "Success !!",
                message: "Miscellaneous " + (selectedMiscellaneous?.id ? "editted " : "added ") + "successfully",
              },
              ...messages,
            ]);
            setShowModal(false);
            updateLoading(false);
          } else if (response.data.statusCode == 400) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save miscellaneous! Please try again.",
              },
              ...messages,
            ]);
            updateLoading(false);
            let errors = JSON.parse(response.data.body);
            for (let i in errors) {
              if (errors.at(i).startsWith("type")) {
                typeError.innerText = errors.at(i).substr(6);
              } else if (errors.at(i).startsWith("firstParty")) {
                firstPartyError.innerText = errors.at(i).substr(12);
              } else if (errors.at(i).startsWith("secondParty")) {
                secondPartyError.innerText = errors.at(i).substr(13);
              } else if (errors.at(i).startsWith("volinst")) {
                volinstError.innerText = errors.at(i).substr(9);
              } else if (errors.at(i).startsWith("page")) {
                pageError.innerText = errors.at(i).substr(6);
              }
            }
          } else if (response.data.statusCode == 501) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save miscellaneous! Please try again.",
              },
              ...messages,
            ]);
            updateLoading(false);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save miscellaneous! Please try again.",
              },
              ...messages,
            ]);
            updateLoading(false);
          }
        })
        .catch((e) => {
          console.log("caught an exception: " + e);
          updateLoading(false);
          if (e.message == "Network Error") {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save miscellaneous! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save miscellaneous! Please try again.",
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
    updateLoadingMessage("Deleting miscellaneous...");
    updateLoading(true);
    MiscellaneousServices.deleteItem(id)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setCurrPage(1);
          getMiscellaneous();
          updateMessages([
            {
              title: "Success !!",
              message: "Miscellaneous deleted successfully",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete miscellaneous! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete miscellaneous! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete miscellaneous! Please try again.",
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
              message: "Could not delete miscellaneous! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete miscellaneous! Please try again.",
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
              Miscellaneous&nbsp;&nbsp;
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
                setSelectedMiscellaneous(null);
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
            <div className="col-2" onClick={() => handleSort("exception_type", "typeSortIcon")}>
              <b>
                Type&nbsp;
                <i id="sortIcon" className={icons["typeSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("first_party", "firstSortIcon")}>
              <b>
                First Party&nbsp;
                <i id="sortIcon" className={icons["firstSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("second_party", "secondSortIcon")}>
              <b>
                Second Party&nbsp;
                <i id="sortIcon" className={icons["secondSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("recorded_date", "recordedSortIcon")}>
              <b>
                Recorded Date&nbsp;
                <i id="sortIcon" className={icons["recordedSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("volinst", "volinstSortIcon")}>
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
          {miscellaneousItems.length == 0 && <TableRow className="d-flex justify-content-center">No items...</TableRow>}
          {miscellaneousItems.map((item, idx) => (
            <TableRow key={"miscellaneous" + item.id} className="row">
              <div className="col-2">{item.type}</div>
              <div className="col-2">{item.firstParty}</div>
              <div className="col-2">{item.secondParty}</div>
              <div className="col-2">{item.recordedDate}</div>
              <div className="col-2">{item.volinst}</div>
              <div className="col-1">{item.page}</div>
              <div className="col-1">
                <i
                  className="bi bi-pencil-square"
                  onClick={() => {
                    setSelectedMiscellaneous(item);
                    setShowModal(true);
                  }}></i>
                <i
                  className="bi bi-trash-fill"
                  onClick={() => {
                    setSelectedMiscellaneous(item);
                    setShowDeleteConfirmation(true);
                  }}></i>
              </div>
            </TableRow>
          ))}
          <Pagination totalPage={totalPage} data={miscellaneousItems} pageSize={pageSize} setPageSize={setPageSize} currPage={currPage} setCurrPage={setCurrPage} />
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
          <ModalButton onClick={() => deleteItem(selectedMiscellaneous?.id ? selectedMiscellaneous?.id : 0)}>Confirm</ModalButton>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} size="lg" backdrop="static" centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{selectedMiscellaneous?.id ? "Edit Miscellaneous" : "Add Miscellaneous"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid card p-2">
            <div className="row">
              <div className="col-md-6 col-lg-3 col-sm-6 required-field">
                <SelectBox
                  id="type"
                  label="Type"
                  defaultValue={selectedMiscellaneous?.type}
                  options={[
                    "Divorce",
                    "Outsales",
                    "Oil & Gas leases",
                    "Lease agreements",
                    "Easements",
                    "Restrictions",
                    "Right of way",
                    "Assignment of oil and gas lease",
                    "UCC1",
                    "Power of Attorney",
                    "Others",
                  ]}
                />
                <ErrorMessage id="typeError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="firstParty" label="First Party" type="text" defaultValue={selectedMiscellaneous?.firstParty} maxLength={1000}/>
                <ErrorMessage id="firstPartyError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="secondParty" label="Second Party" type="text" defaultValue={selectedMiscellaneous?.secondParty} maxLength={1000}/>
                <ErrorMessage id="secondPartyError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="recordedDate" label="Recorded Date" type="date" defaultValue={selectedMiscellaneous?.recordedDate} />
              </div>
              <div className="col-md-6 col-lg-3 col-sm-12">
                <TextField id="volinst" label="Vol/Inst#" type="text" defaultValue={selectedMiscellaneous?.volinst} maxLength={100}/>
                <ErrorMessage id="volinstError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-12">
                <TextField id="page" label="Page" type="text" defaultValue={selectedMiscellaneous?.page} maxLength={100}/>
                <ErrorMessage id="pageError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="book" label="Book" type="text" defaultValue={selectedMiscellaneous?.book} maxLength={100}/>
                <ErrorMessage id="bookError"></ErrorMessage>
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12">
                <TextArea id="comments" label="Comments" defaultValue={selectedMiscellaneous?.comments} maxLength={4000}/>
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

export default MiscellaneousTable;
