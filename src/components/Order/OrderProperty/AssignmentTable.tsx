import { useContext, useEffect, useState } from "react";
import { AdditionalTableTitle, AdditionalTableTitleRow, ModalButton, AddButton } from "./OrderPropertyStyledComponents";
import { Modal } from "react-bootstrap";
import { Assignment } from "../../../utils/form-types";
import assignmentServices from "../../../services/assignment-services";
import { TextField, TextArea, SelectBox } from "../../utils/InputGroup";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar } from "../OrderStyledComponents";

type AssignmentProps = {
  mortgageId: number;
};

const AssignmentTable = (props: AssignmentProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("");
  const [icons, setIcons] = useState<any>({
    typeSortIcon: "",
    fromSortIcon: "",
    toSortIcon: "",
    datedSortIcon: "",
    recordedSortIcon: "",
    volinstSortIcon: "",
    pageSortIcon: "",
  });
  const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext) as ApplicationContextType;

  useEffect(() => {
    getAssignments();
  }, []);

  useEffect(() => {
    getAssignments();
  }, [sortColumn, sortDirection]);

  const getAssignments = () => {
    updateLoadingMessage("Fetching assignments...");
    updateLoading(true);
    assignmentServices
      .getAll(props.mortgageId, sortColumn, sortDirection)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setAssignments(JSON.parse(response.data.body));
          (document.getElementById("additionalFillings" + props.mortgageId) as HTMLDivElement).className = JSON.parse(response.data.body).length > 0 ? "bi bi-check2" : "bi bi-x";
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch assignments! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch assignments! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch assignments! Please try again.",
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
              message: "Could not fetch assignments! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch assignments! Please try again.",
            },
            ...messages,
          ]);
        }
      });
  };

  const save = () => {
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
          id: selectedAssignment?.id ? selectedAssignment.id : null,
          mortgageId: props.mortgageId,
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
            getAssignments();
            updateMessages([
              {
                title: "Success !!",
                message: "Assignment " + (selectedAssignment?.id ? "editted " : "added ") + "successfully",
              },
              ...messages,
            ]);
            setShowModal(false);
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

  const deleteItem = (id: number) => {
    updateLoadingMessage("Deleting assignment...");
    updateLoading(true);
    assignmentServices
      .deleteItem(id)
      .then((response) => {
        if (response.data.statusCode == 200) {
          getAssignments();
          updateMessages([{ title: "Success !!", message: "Assignment deleted successfully" }, ...messages]);
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete assignment! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete assignment! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete assignment! Please try again.",
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
              message: "Could not delete assignment! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete assignment! Please try again.",
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

  return (
    <Table className="table mt-2 mb-3">
      <div className="d-grid">
        <AdditionalTableTitleRow>
          <TableTitleBar>
            <AdditionalTableTitle>Assignment</AdditionalTableTitle>
            <AddButton
              onClick={() => {
                setSelectedAssignment(null);
                setShowModal(true);
              }}>
              +
            </AddButton>
          </TableTitleBar>
        </AdditionalTableTitleRow>
      </div>
      <div className="d-flex">
        <div className="container-fluid card">
          <TableRow className="row">
            <div className="col-2" onClick={() => handleSort("filling_type", "typeSortIcon")}>
              <b>
                Type&nbsp;
                <i id="sortIcon" className={icons["typeSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("assigned_from", "fromSortIcon")}>
              <b>
                Assigned From&nbsp;
                <i id="sortIcon" className={icons["fromSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("assigned_to", "toSortIcon")}>
              <b>
                Assigned To&nbsp;
                <i id="sortIcon" className={icons["toSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("dated_date", "datedSortIcon")}>
              <b>
                Dated Date&nbsp;
                <i id="sortIcon" className={icons["datedSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("recorded_date", "recordedSortIcon")}>
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
          {assignments.length == 0 && <TableRow className="d-flex justify-content-center">No items...</TableRow>}
          {assignments.map((item, idx) => (
            <TableRow key={"mortgage" + props.mortgageId + "assignment" + item.id} className="row">
              <div className="col-2">{item.fillingType}</div>
              <div className="col-2">{item.assignFrom}</div>
              <div className="col-2">{item.assignTo}</div>
              <div className="col-1">{item.datedDate}</div>
              <div className="col-1">{item.recordedDate}</div>
              <div className="col-2">{item.volinst}</div>
              <div className="col-1">{item.page}</div>
              <div className="col-1">
                <i
                  className="bi bi-pencil-square"
                  onClick={() => {
                    setSelectedAssignment(item);
                    setShowModal(true);
                  }}></i>
                <i
                  className="bi bi-trash-fill"
                  onClick={() => {
                    setSelectedAssignment(item);
                    setShowDeleteConfirmation(true);
                  }}></i>
              </div>
            </TableRow>
          ))}
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
          <ModalButton onClick={() => deleteItem(selectedAssignment?.id ? selectedAssignment?.id : 0)}>Confirm</ModalButton>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} size="lg" backdrop="static" centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{selectedAssignment?.id ? "Edit Assignment" : "Add Assignment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid card p-2">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6 required-field">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="fillingType"
                    defaultValue={selectedAssignment?.fillingType}
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
                <TextField id="recordedDate" label="Recorded Date" type="date" defaultValue={selectedAssignment?.recordedDate} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="assignTo" label="Assign to" type="text" defaultValue={selectedAssignment?.assignTo} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="assignFrom" label="Assign from" type="text" defaultValue={selectedAssignment?.assignFrom} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="volinst" label="Vol/Inst#" type="text" defaultValue={selectedAssignment?.volinst} maxLength={100}/>
                <ErrorMessage id="volinstError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="page" label="Page" type="text" defaultValue={selectedAssignment?.page} maxLength={100}/>
                <ErrorMessage id="pageError"></ErrorMessage>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="datedDate" label="Dated Date" type="date" defaultValue={selectedAssignment?.datedDate} />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <TextField id="book" label="Book" type="text" defaultValue={selectedAssignment?.book} maxLength={100}/>
                <ErrorMessage id="bookError"></ErrorMessage>
              </div>
              <div id="newMaturityAmountContainer" className={"col-lg-3 col-md-6 col-sm-6 required-field " + (selectedAssignment?.fillingType == "Modification" ? "" : "d-none")}>
                <TextField id="newMaturityAmount" label="New Maturity Amount" type="number" defaultValue={selectedAssignment?.newMaturityAmount} required maxLength={12} />
                <ErrorMessage id="newMaturityAmountError"></ErrorMessage>
              </div>
              <div id="newMaturityDateContainer" className={"col-lg-3 col-md-6 col-sm-6 required-field " + (selectedAssignment?.fillingType == "Modification" ? "" : "d-none")}>
                <TextField id="newMaturityDate" label="New Maturity Date" type="date" defaultValue={selectedAssignment?.newMaturityDate} required />
                <ErrorMessage id="newMaturityDateError"></ErrorMessage>
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12">
                <TextArea id="comments" label="Comments" defaultValue={selectedAssignment?.comments} maxLength={4000}/>
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

export default AssignmentTable;
