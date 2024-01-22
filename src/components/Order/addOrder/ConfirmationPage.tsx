import { useLocation, useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { Col, Container, Row } from "react-bootstrap";
import { Borrower, Contact, Document } from "../../../utils/form-types";
import { SerialNumber, SuccessIcon, TableRow } from "../OrderStyledComponents";
import { CancelButton, SaveButton } from "../orderProperty/OrderPropertyStyledComponents";
import { pallete } from "../../../utils/style-utils";
import { useEffect } from "react";

const Confirmation = () => {
  const { state } = useLocation();
  const history = useNavigate();

  return (
    <div>
      <Container>
        <div className="text-center mt-5">
          <SuccessIcon className="mx-auto" />
          <h2>Order saved successfully!</h2>
        </div>
        <Row className="mt-3 px-5 py-3">
          <h4>Client Information</h4>
          <Row className="mt-2">
            <Col lg={6} xl={4}>
              <b>Client id:</b>&nbsp;{state.Client.Id}
            </Col>
            <Col lg={6} xl={4}>
              <b>Loan id:</b>&nbsp;{state.Client.LoanId}
            </Col>
            <Col lg={6} xl={4}>
              <b>Client reference number:</b>&nbsp;{state.Client.ClientReferenceNumber}
            </Col>
            <Col xs={12}>
              <b>Instructions:</b>&nbsp;{state.Client.Instructions ? state.Client.Instructions : "------"}
            </Col>
          </Row>
        </Row>
        <Row className="px-5 py-3">
          <h4>Contacts</h4>
          {state.Contacts.map((contact: Contact, idx: number) => (
            <Row className="mt-2 position-relative">
              <SerialNumber>{idx + 1}.</SerialNumber>
              <Col lg={6} xl={4}>
                <b>First name:</b>&nbsp;{contact.FirstName}
              </Col>
              <Col lg={6} xl={4}>
                <b>Middle name:</b>&nbsp;{contact.MiddleName ? contact.MiddleName : "------"}
              </Col>
              <Col lg={6} xl={4}>
                <b>Last name:</b>&nbsp;{contact.LastName}
              </Col>
              <Col lg={6} xl={4}>
                <b>Email:</b>&nbsp;{contact.Email}
              </Col>
              <Col lg={6} xl={4}>
                <b>Phone:</b>&nbsp;{contact.Phone}
              </Col>
            </Row>
          ))}
        </Row>
        <Row className="px-5 py-3">
          <h4>Property Address</h4>
          <Row className="mt-2">
            <Col lg={6} xl={4}>
              <b>Street Address:</b>&nbsp;{state.PropertyAddress.StreetAddress}
            </Col>
            <Col lg={6} xl={4}>
              <b>Suite/Unit:</b>&nbsp;{state.PropertyAddress.Suite}
            </Col>
            <Col lg={6} xl={4}>
              <b>City:</b>&nbsp;{state.PropertyAddress.City}
            </Col>
            <Col lg={6} xl={4}>
              <b>State:</b>&nbsp;{state.PropertyAddress.State}
            </Col>
            <Col lg={6} xl={4}>
              <b>Zip:</b>&nbsp;{state.PropertyAddress.Zip}
            </Col>
            <Col lg={6} xl={4}>
              <b>County:</b>&nbsp;{state.PropertyAddress.County}
            </Col>
            <Col lg={6} xl={4}>
              <b>Parcel number:</b>&nbsp;{state.PropertyAddress.Parcel ? state.PropertyAddress.Parcel : "------"}
            </Col>
            <Col lg={6} xl={4}>
              <b>Loan amount:</b>&nbsp;{state.PropertyAddress.LoanAmount ? state.PropertyAddress.LoanAmount : "------"}
            </Col>
          </Row>
        </Row>
        <Row className="px-5 py-3">
          <h4>Borrowers</h4>
          {state.Borrowers.map((borrower: Borrower, idx: number) => (
            <Row className="mt-2 position-relative">
              <SerialNumber>{idx + 1}.</SerialNumber>
              <Col lg={6} xl={4}>
                <b>First name:</b>&nbsp;{borrower.FirstName}
              </Col>
              <Col lg={6} xl={4}>
                <b>Middle name:</b>&nbsp;{borrower.MiddleName ? borrower.MiddleName : "------"}
              </Col>
              <Col lg={6} xl={4}>
                <b>Last name:</b>&nbsp;{borrower.LastName}
              </Col>
              <Col lg={6} xl={4}>
                <b>Borrower type:</b>&nbsp;{borrower.IndCorp}
              </Col>
              <Col lg={6} xl={4}>
                <b>Email:</b>&nbsp;{borrower.Email ? borrower.Email : "------"}
              </Col>
              <Col lg={6} xl={4}>
                <b>Phone:</b>&nbsp;{borrower.Phone ? borrower.Phone : "------"}
              </Col>
              <Col lg={6} xl={4}>
                <b>Social security number:</b>&nbsp;{borrower.Last4SSN}
              </Col>
            </Row>
          ))}
        </Row>
        <Row className="px-5 py-3">
          <h4>Products</h4>
          <Row className="mt-2">
            <Col lg={6} xl={4}>
              <b>AVM product:</b>&nbsp;{state.Products.AvmProduct}
            </Col>
            <Col lg={6} xl={4}>
              <b>Title product:</b>&nbsp;{state.Products.TitleProduct}
            </Col>
            <Col lg={6} xl={4}>
              <b>Appraisal product:</b>&nbsp;{state.Products.AppraisalProduct}
            </Col>
            <Col lg={6} xl={4}>
              <b>PCR property inspection condition report:</b>&nbsp;{state.Products.PCRProduct}
            </Col>
            <Col lg={6} xl={4}>
              <b>Flood:</b>&nbsp;{state.Products.FloodProduct}
            </Col>
            <Col lg={6} xl={4}>
              <b>BPO:</b>&nbsp;{state.Products.BPOProduct}
            </Col>
            <Col lg={6} xl={4}>
              <b>Evaluation:</b>&nbsp;{state.Products.EvaluationProduct}
            </Col>
          </Row>
        </Row>
        <Row className="px-5 py-3">
          <h4>Upload Documents</h4>
          {state.Documents.map((document: Document, idx: number) => (
            <Row className="mt-2 position-relative">
              <SerialNumber>{idx + 1}.</SerialNumber>
              <Col lg={6} xl={4}>
              <b>Document type:</b>&nbsp;{document.DocumentType}
            </Col>
            <Col lg={6} xl={4}>
              <b>Associated product:</b>&nbsp;{document.Product}
            </Col>
            <Col lg={6} xl={4}>
              <b>Document Id:</b>&nbsp;{document.DocumentId}
            </Col>
            </Row>
          ))}
        </Row>
        <Row className="border-0 mt-2 px-5 py-3 mt-3 mb-5 d-flex justify-content-between">
          <CancelButton
            onClick={() => {
              // history("/orders/edit/" + state.id);
            }}>
            Edit
          </CancelButton>
          <SaveButton className="float-end" onClick={() => history("/orders")}>
            Confirm
          </SaveButton>
        </Row>
      </Container>
    </div>
  );
};

export default Confirmation;
