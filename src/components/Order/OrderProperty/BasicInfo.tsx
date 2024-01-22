import { useState, useEffect, useContext } from "react";
import basicServices from "../../../services/basic-services";
import { OrderDetailPopover, SaveButton } from "./OrderPropertyStyledComponents";
import { Basic } from "../../../utils/form-types";
import { TextField, ToggleButton, TextArea } from "../../utils/InputGroup";
import { OverlayTrigger, Popover } from "react-bootstrap";
import OrderInfo from "../OrderInfo";
import { useParams } from "react-router-dom";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import { isEmpty, isMaxLengthExceeded } from "../../../utils/validations";
import "../Order.css";
import { ErrorMessage, Table, TableRow, TableTitleBar, TableTitleRow, TableTitle } from "../OrderStyledComponents";

type OrderProps = {};

const BasicInfo = (props: OrderProps) => {
  const [basicDetails, setBasicDetails] = useState<Basic | null>(null);
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const { orderId } = useParams();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext) as ApplicationContextType;

  useEffect(() => {
    updateLoadingMessage("Fetching data...");
    updateLoading(true);
    getBasic();
  }, []);

  const getBasic = () => {
    basicServices
      .getDetails(orderId as unknown as number)
      .then((response) => {
        //ToDo:: check if the array is empty, if yes we cannot set details
        if (response.data.statusCode == 200) {
          if (JSON.parse(response.data.body).length > 0) setBasicDetails(JSON.parse(response.data.body).at(JSON.parse(response.data.body).length - 1));
          updateLoading(false);
        } else if (response.data.statusCode == 400) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch data! Please try again.",
            },
            ...messages,
          ]);
          updateLoading(false);
        } else if (response.data.statusCode == 501) {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch data! Please try again.",
            },
            ...messages,
          ]);
          updateLoading(false);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch data! Please try again.",
            },
            ...messages,
          ]);
          updateLoading(false);
        }
      })
      .catch((e) => {
        console.log("error while retrieving basic details: " + e);
        updateLoading(false);

        if (e.message == "Network Error") {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch data! Please try again.",
            },
            ...messages,
          ]);
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Could not fetch data! Please try again.",
            },
            ...messages,
          ]);
        }
      });
  };

  const save = () => {
    updateLoadingMessage("Saving...");
    updateLoading(true);
    var okay: boolean = true;

    const searchDate = document.getElementById("searchDate") as HTMLInputElement;
    const effectiveDate = document.getElementById("effectiveDate") as HTMLInputElement;
    const searchStartDate = document.getElementById("searchStartDate") as HTMLInputElement;
    const isFullLegal = document.getElementById("isFullLegal") as HTMLInputElement;
    const parcelId = document.getElementById("parcelId") as HTMLInputElement;
    const township = document.getElementById("township") as HTMLInputElement;
    const noOfLiens = document.getElementById("noOfLiens") as HTMLInputElement;
    const liensTotalAmount = document.getElementById("liensTotalAmount") as HTMLInputElement;
    const comments = document.getElementById("comments") as HTMLInputElement;
    const legalDescription = document.getElementById("legalDescription") as HTMLInputElement;

    const searchDateError = document.getElementById("searchDateError") as HTMLInputElement;
    const effectiveDateError = document.getElementById("effectiveDateError") as HTMLInputElement;
    const parcelIdError = document.getElementById("parcelIdError") as HTMLInputElement;
    const townshipError = document.getElementById("townshipError") as HTMLInputElement;
    const liensTotalAmountError = document.getElementById("liensTotalAmountError") as HTMLInputElement;

    if (isEmpty(searchDate, searchDateError)) okay = false;
    if (isEmpty(effectiveDate, effectiveDateError)) okay = false;
    if (isMaxLengthExceeded(parcelId, parcelIdError, 100)) okay = false;
    if (isMaxLengthExceeded(township, townshipError, 100)) okay = false;
    if (isMaxLengthExceeded(liensTotalAmount, liensTotalAmountError, 12)) okay = false;

    if (okay) {
      basicServices
        .saveDetails({
          id: basicDetails?.id as unknown as number,
          orderId: orderId as unknown as number,
          searchDate: searchDate.value,
          effectiveDate: effectiveDate.value,
          searchStartDate: searchStartDate.value,
          isFullLegal: isFullLegal.checked,
          parcelId: parcelId.value,
          township: township.value,
          noOfLiens: noOfLiens.value as unknown as number,
          liensTotalAmount: liensTotalAmount.value as unknown as number,
          comments: comments.value,
          legalDescription: legalDescription.value,
        })
        .then((response) => {
          if (response.data.statusCode == 200) {
            getBasic();
            updateMessages([{ title: "Success !!", message: "Basic saved successfully" }, ...messages]);
          } else if (response.data.statusCode == 400) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save data! Please try again.",
              },
              ...messages,
            ]);
            updateLoading(false);

            let errors = JSON.parse(response.data.body);
            for (let i in errors) {
              if (errors.at(i).startsWith("searchDate")) {
                searchDateError.innerText = errors.at(i).substr(12);
              } else if (errors.at(i).startsWith("effectiveDate")) {
                effectiveDateError.innerText = errors.at(i).substr(15);
              } else if (errors.at(i).startsWith("parcelId")) {
                parcelIdError.innerText = errors.at(i).substr(10);
              } else if (errors.at(i).startsWith("township")) {
                townshipError.innerText = errors.at(i).substr(10);
              } else if (errors.at(i).startsWith("liensTotalAmount")) {
                liensTotalAmountError.innerText = errors.at(i).substr(18);
              }
            }
          } else if (response.data.statusCode == 501) {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save data! Please try again.",
              },
              ...messages,
            ]);
            updateLoading(false);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save data! Please try again.",
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
                message: "Could not save data! Please try again.",
              },
              ...messages,
            ]);
          } else {
            updateMessages([
              {
                title: "Error !!",
                message: "Could not save data! Please try again.",
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
      <div>
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>
              Basic&nbsp;&nbsp;
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
          </TableTitleBar>
        </TableTitleRow>
      </div>
      <div>
        <div className="container-fluid card">
          <div className="row">
            <div className="col-3 required-field mt-3">
              <TextField id="searchDate" label="Search Date" type="date" defaultValue={basicDetails?.searchDate} required/>
              <ErrorMessage id="searchDateError"></ErrorMessage>
            </div>
            <div className="col-3 required-field mt-3">
              <TextField id="effectiveDate" label="Effective Date" type="date" defaultValue={basicDetails?.effectiveDate} required/>
              <ErrorMessage id="effectiveDateError"></ErrorMessage>
            </div>
            <div className="col-3 mt-3">
              <TextField id="searchStartDate" label="Search Start Date" type="date" defaultValue={basicDetails?.searchStartDate} />
            </div>
            <div className="col-3 my-auto">
              <ToggleButton id="isFullLegal" label="Full Legal" defaultChecked={basicDetails?.isFullLegal} />
            </div>
            <div className="col-3 mt-3">
              <TextField id="parcelId" label="Parcel Id" type="text" defaultValue={basicDetails?.parcelId} maxLength={100}/>
              <ErrorMessage id="parcelIdError"></ErrorMessage>
            </div>
            <div className="col-3 mt-3">
              <TextField id="township" label="Township" type="text" defaultValue={basicDetails?.township} maxLength={100}/>
              <ErrorMessage id="townshipError"></ErrorMessage>
            </div>
            <div className="col-3 mt-3">
              <TextField id="noOfLiens" label="No of Liens" type="number" defaultValue={basicDetails?.noOfLiens} />
            </div>
            <div className="col-3 mt-3">
              <TextField id="liensTotalAmount" label="Liens Total Amount" type="number" defaultValue={basicDetails?.liensTotalAmount} maxLength={12}/>
              <ErrorMessage id="liensTotalAmountError"></ErrorMessage>
            </div>
          </div>
          <TableRow className="row">
            <div className="col-lg-12 col-md-12">
              <TextArea id="comments" label="Comments" defaultValue={basicDetails?.comments} maxLength={4000}/>
            </div>
            <div className="col-lg-12 col-md-12 mt-3">
              <TextArea id="legalDescription" label="Legal Description" defaultValue={basicDetails?.legalDescription} maxLength={4000}/>
            </div>
          </TableRow>
          <TableRow>
            <SaveButton className="float-end" onClick={() => save()}>
              Save
            </SaveButton>
          </TableRow>
        </div>
      </div>
    </Table>
  );
};

export default BasicInfo;
