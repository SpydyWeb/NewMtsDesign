import { useContext, useEffect, useState } from "react";
import { AddButton, AdditionalTableTitle, AdditionalTableTitleRow, ModalButton } from "./OrderPropertyStyledComponents";
import { Modal } from "react-bootstrap";
import { Payment } from "../../../utils/form-types";
import paymentServices from "../../../services/payment-services";
import { TextField, TextArea, SelectBox } from "../../utils/InputGroup";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar } from "../OrderStyledComponents";

type PaymentProps = {
  taxId: number;
};

const PaymentTable = (props: PaymentProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<string>("");
  const [icons, setIcons] = useState<any>({
    typeSortIcon: "",
    periodSortIcon: "",
    yearSortIcon: "",
    amountSortIcon: "",
    dateSortIcon: "",
    statusSortIcon: "",
  });
  const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext) as ApplicationContextType;

  useEffect(() => {
    getPayments();
  }, []);

  useEffect(() => {
    getPayments();
  }, [sortColumn, sortDirection]);

  const getPayments = () => {
    updateLoadingMessage("Fetching payments...");
    updateLoading(true);
    paymentServices
      .getAll(props.taxId, sortColumn, sortDirection)
      .then((response) => {
        if (response.data.statusCode == 200) {
          setPayments(JSON.parse(response.data.body));
          (document.getElementById("payment" + props.taxId) as HTMLDivElement).className = JSON.parse(response.data.body).length > 0 ? "bi bi-check2" : "bi bi-x";
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch payments! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch payments! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch payments! Please try again.",
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
              message: "Could not fetch payments! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch payments! Please try again.",
            },
            ...messages,
          ]);
        }
      });
  };

  const save = () => {
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
          id: selectedPayment?.id ? selectedPayment.id : null,
          taxId: props.taxId,
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
            getPayments();
            updateMessages([
              {
                title: "Success !!",
                message: "Payment " + (selectedPayment?.id ? "editted " : "added ") + "successfully",
              },
              ...messages,
            ]);
            setShowModal(false);
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

  const deleteItem = (id: number) => {
    updateLoadingMessage("Deleting payment...");
    updateLoading(true);
    paymentServices
      .deleteItem(id)
      .then((response) => {
        if (response.data.statusCode == 200) {
          getPayments();
          updateMessages([{ title: "Success !!", message: "Payment deleted successfully" }, ...messages]);
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete payment! Please try again.",
            },
            ...messages,
          ]);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete payment! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete payment! Please try again.",
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
              message: "Could not delete payment! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not delete payment! Please try again.",
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
    <Table className="table mt-2 mb-3 px-0">
      <div className="d-grid">
        <AdditionalTableTitleRow>
          <TableTitleBar>
            <AdditionalTableTitle>Payment Details</AdditionalTableTitle>
            <AddButton
              onClick={() => {
                setSelectedPayment(null);
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
            <div className="col-2" onClick={() => handleSort("tax_type", "typeSortIcon")}>
              <b>
                Type&nbsp;
                <i id="sortIcon" className={icons["typeSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("tax_period", "periodSortIcon")}>
              <b>
                Period&nbsp;
                <i id="sortIcon" className={icons["periodSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("tax_year", "yearSortIcon")}>
              <b>
                Year&nbsp;
                <i id="sortIcon" className={icons["yearSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("tax_amount", "amountSortIcon")}>
              <b>
                Amount&nbsp;
                <i id="sortIcon" className={icons["amountSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1" onClick={() => handleSort("date", "dateSortIcon")}>
              <b>
                Date&nbsp;
                <i id="sortIcon" className={icons["dateSortIcon"]}></i>
              </b>
            </div>
            <div className="col-2" onClick={() => handleSort("status", "statusSortIcon")}>
              <b>
                Status&nbsp;
                <i id="sortIcon" className={icons["statusSortIcon"]}></i>
              </b>
            </div>
            <div className="col-1">
              <b>Action</b>
            </div>
          </TableRow>
          {payments.length == 0 && <TableRow className="d-flex justify-content-center">No items...</TableRow>}
          {payments.map((item, idx) => (
            <TableRow key={"tax" + props.taxId + "payment" + item.id} className="row">
              <div className="col-2">{item.taxType}</div>
              <div className="col-2">{item.taxPeriod}</div>
              <div className="col-2">{item.taxYear}</div>
              <div className="col-2">{item.amount ? "$" + item.amount : ""}</div>
              <div className="col-1">{item.date}</div>
              <div className="col-2">{item.status}</div>
              <div className="col-1">
                <i
                  className="bi bi-pencil-square"
                  onClick={() => {
                    setSelectedPayment(item);
                    setShowModal(true);
                  }}></i>
                <i
                  className="bi bi-trash-fill"
                  onClick={() => {
                    setSelectedPayment(item);
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
          <ModalButton onClick={() => deleteItem(selectedPayment?.id ? selectedPayment?.id : 0)}>Confirm</ModalButton>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} size="lg" backdrop="static" centered onHide={() => setShowModal(false)}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{selectedPayment?.id ? "Edit Payment" : "Add Payment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid card p-2">
            <div className="row">
              <div className="col-md-6 col-lg-3 col-sm-6 required-field">
                <SelectBox
                  id="taxType"
                  label="Tax Type"
                  defaultValue={selectedPayment?.taxType}
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
                <TextField id="taxPeriod" label="Tax Period" type="text" defaultValue={selectedPayment?.taxPeriod} required maxLength={100}/>
                <ErrorMessage id="taxPeriodError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="taxYear" label="Tax Year" type="text" defaultValue={selectedPayment?.taxYear} maxLength={255}/>
                <ErrorMessage id="taxYearError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="amount" label="Amount" type="number" defaultValue={selectedPayment?.amount} maxLength={12}/>
                <ErrorMessage id="amountError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="date" label="Date" type="date" defaultValue={selectedPayment?.date} />
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <SelectBox id="status" label="Status" defaultValue={selectedPayment?.status} options={["Due", "Paid", "Delinquent", "Tax Exempt", "Not Available"]} />
                <ErrorMessage id="statusError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="discountDate" label="Discount Date" type="date" defaultValue={selectedPayment?.discountDate} />
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="discountAmount" label="Discount Amount" type="number" defaultValue={selectedPayment?.discountAmount} maxLength={12}/>
                <ErrorMessage id="discountAmountError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="faceDate" label="Face Date" type="date" defaultValue={selectedPayment?.faceDate} />
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="faceAmount" label="Face Amount" type="number" defaultValue={selectedPayment?.faceAmount} maxLength={12}/>
                <ErrorMessage id="faceAmountError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="penaltyDate" label="Penalty Date" type="date" defaultValue={selectedPayment?.penaltyDate} />
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="penaltyAmount" label="Penalty Amount" type="number" defaultValue={selectedPayment?.penaltyAmount} maxLength={12}/>
                <ErrorMessage id="penaltyAmountError"></ErrorMessage>
              </div>
              <div className="col-md-6 col-lg-3 col-sm-6">
                <TextField id="dueDate" label="Due Date" type="date" defaultValue={selectedPayment?.dueDate} />
              </div>
              <div className="col-md-12 col-lg-12 col-sm-12">
                <TextArea id="comments" label="Comments" defaultValue={selectedPayment?.comments} maxLength={4000}/>
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

export default PaymentTable;
