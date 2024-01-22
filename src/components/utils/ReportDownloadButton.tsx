import reportServices from "../../services/report-services";
import { ModalButton } from "../order/orderProperty/OrderPropertyStyledComponents";
import { Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ApplicationContext, ApplicationContextType } from "../../App";
import { TabLink } from "../navigation/stepper/StepperStyledComponents";
import "./utils.css";
import { ErrorMessage } from "../order/OrderStyledComponents";
import { DownloadButton, SequenceSelectButton } from "./UtilStyledComponents";

const DownloadReportButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sequence, setSequence] = useState<any[]>([
    {
      label: "Prepared For",
      value: "preparedFor",
    },
    {
      label: "Customer Information",
      value: "customerInformation",
    },
    {
      label: "Deed Information",
      value: "deed",
    },
    {
      label: "Current Deed of Trusts/Mortgages",
      value: "mortgage",
    },
    {
      label: "Tax Information",
      value: "tax",
    },
    {
      label: "Judgment and Lien Information",
      value: "lien",
    },
    {
      label: "Miscellaneous Recording Information",
      value: "miscellaneous",
    },
  ]);
  const { orderId } = useParams();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext) as ApplicationContextType;
  const [disable, setDisable] = useState<any>({
    preparedFor: true,
    customerInformation: true,
    deed: true,
    tax: true,
    lien: true,
    miscellaneous: true,
    mortgage: true,
  });

  const initiate = async () => {
    let seq: string[] = ["basic"];
    if (sequence.length < 7 && (document.getElementById("incompleteSequenceError") as HTMLDivElement).innerText == "") {
      (document.getElementById("incompleteSequenceError") as HTMLDivElement).innerText =
        "Warning: You have not selected all sections! If this was intended you can click generate button again to proceed.";
      return;
    }
    for (let i = 0; i < sequence.length; i++) seq.push(sequence.at(i).value);
    updateLoadingMessage("Your report will shortly be downloaded!");
    updateLoading(true);
    reportServices.initiate(orderId as unknown as number, "prashant.aryasuntelglobal@gmail.com", seq).then(async (response) => {
      let attempts = 10;
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
      while (attempts--) {
        let response1 = await reportServices.track(JSON.parse(response.data.body)["id"]);
        if (!JSON.parse(response1.data.body)["in_progress"]) {
          window.open(JSON.parse(response1.data.body)["file_url"], "_blank");
          updateLoading(false);
          updateMessages([{ title: "Success !!", message: "Report download completed." }, ...messages]);
          return;
        }
        await delay(10000);
      }
      updateMessages([
        {
          title: "Error !!",
          message: "Could not download report! Please try again.",
        },
        ...messages,
      ]);
      updateLoading(false);
    });
    setShowModal(false);
  };

  const addItem = (item: any) => {
    setSequence([...sequence, item]);
    let temp = disable;
    temp[item.value] = true;
    setDisable(temp);
  };

  const removeItem = (item: any) => {
    let temp = sequence;
    setDisable(false);
    temp = temp.filter((i) => {
      return i != item;
    });
    setSequence(temp);
    temp = disable;
    temp[item.value] = false;
    setDisable(temp);
  };

  return (
    <>
      <TabLink active={false} onClick={() => setShowModal(true)} title="Export data">
        <DownloadButton>
          <i className="bi bi-file-earmark-arrow-down-fill"></i>
          &nbsp;Report
        </DownloadButton>
      </TabLink>
      <Modal
        show={showModal}
        size="lg"
        backdrop="static"
        centered
        onHide={() => {
          setShowModal(false);
        }}>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Generate Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid card p-2">
            <h6>Select sections in the sequence they should appear in the report:</h6>
            <div className="btn-group-sm" role="group" aria-label="Basic example">
              <SequenceSelectButton
                type="button"
                id="preparedFor"
                disabled={disable.preparedFor}
                className="btn btn-secondary"
                onClick={() => {
                  addItem({ label: "Prepared For", value: "preparedFor" });
                }}>
                Prepared For
              </SequenceSelectButton>
              <SequenceSelectButton
                type="button"
                id="customerInformation"
                disabled={disable.customerInformation}
                className="btn btn-secondary"
                onClick={() => {
                  addItem({
                    label: "Customer Information",
                    value: "customerInformation",
                  });
                }}>
                Customer Information
              </SequenceSelectButton>
              <SequenceSelectButton
                type="button"
                id="deed"
                disabled={disable.deed}
                className="btn btn-secondary"
                onClick={() => {
                  addItem({ label: "Deed Information", value: "deed" });
                }}>
                Deed Information
              </SequenceSelectButton>
              <SequenceSelectButton
                type="button"
                id="mortgage"
                disabled={disable.mortgage}
                className="btn btn-secondary"
                onClick={() => {
                  addItem({
                    label: "Current Deed of Trusts/Mortgages",
                    value: "mortgage",
                  });
                }}>
                Current Deed of Trusts/Mortgages
              </SequenceSelectButton>
              <SequenceSelectButton
                type="button"
                id="tax"
                disabled={disable.tax}
                className="btn btn-secondary"
                onClick={() => {
                  addItem({ label: "Tax Information", value: "tax" });
                }}>
                Tax Information
              </SequenceSelectButton>
              <SequenceSelectButton
                type="button"
                id="lien"
                disabled={disable.lien}
                className="btn btn-secondary"
                onClick={() => {
                  addItem({
                    label: "Judgment and Lien Information",
                    value: "lien",
                  });
                }}>
                Judgment and Lien Information
              </SequenceSelectButton>
              <SequenceSelectButton
                type="button"
                id="miscellaneous"
                disabled={disable.miscellaneous}
                className="btn btn-secondary"
                onClick={() => {
                  addItem({
                    label: "Miscellaneous Recording Information",
                    value: "miscellaneous",
                  });
                }}>
                Miscellaneous Recording Information
              </SequenceSelectButton>
            </div>
            <br />
            <ol key={sequence.toString()}>
              {sequence.map((item, idx) => (
                <li key={item.label + idx}>
                  {item.label}&nbsp;
                  <i className="bi bi-x-circle-fill pointer" onClick={() => removeItem(item)}></i>
                </li>
              ))}
            </ol>
          </div>
          <ErrorMessage id="incompleteSequenceError"></ErrorMessage>
        </Modal.Body>
        <Modal.Footer>
          <ModalButton
            onClick={() => {
              setShowModal(false);
            }}>
            Cancel
          </ModalButton>
          <ModalButton onClick={() => initiate()}>Generate</ModalButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DownloadReportButton;
