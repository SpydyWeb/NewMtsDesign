import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import reportServices from "../../services/report-services";
import { ModalButton } from "../order/orderProperty/OrderPropertyStyledComponents";
import { Modal } from "react-bootstrap";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ApplicationContext } from "../../App";
import { TabLink } from "../navigation/stepper/StepperStyledComponents";
import "./utils.css";
import { ErrorMessage } from "../order/OrderStyledComponents";
import { DownloadButton, SequenceSelectButton } from "./UtilStyledComponents";
const DownloadReportButton = () => {
    const [showModal, setShowModal] = useState(false);
    const [sequence, setSequence] = useState([
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
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    const [disable, setDisable] = useState({
        preparedFor: true,
        customerInformation: true,
        deed: true,
        tax: true,
        lien: true,
        miscellaneous: true,
        mortgage: true,
    });
    const initiate = async () => {
        let seq = ["basic"];
        if (sequence.length < 7 && document.getElementById("incompleteSequenceError").innerText == "") {
            document.getElementById("incompleteSequenceError").innerText =
                "Warning: You have not selected all sections! If this was intended you can click generate button again to proceed.";
            return;
        }
        for (let i = 0; i < sequence.length; i++)
            seq.push(sequence.at(i).value);
        updateLoadingMessage("Your report will shortly be downloaded!");
        updateLoading(true);
        reportServices.initiate(orderId, "prashant.aryasuntelglobal@gmail.com", seq).then(async (response) => {
            let attempts = 10;
            const delay = (ms) => new Promise((res) => setTimeout(res, ms));
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
    const addItem = (item) => {
        setSequence([...sequence, item]);
        let temp = disable;
        temp[item.value] = true;
        setDisable(temp);
    };
    const removeItem = (item) => {
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
    return (_jsxs(_Fragment, { children: [_jsx(TabLink, { active: false, onClick: () => setShowModal(true), title: "Export data", children: _jsxs(DownloadButton, { children: [_jsx("i", { className: "bi bi-file-earmark-arrow-down-fill" }), "\u00A0Report"] }) }), _jsxs(Modal, { show: showModal, size: "lg", backdrop: "static", centered: true, onHide: () => {
                    setShowModal(false);
                }, children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Generate Report" }) }), _jsxs(Modal.Body, { children: [_jsxs("div", { className: "container-fluid card p-2", children: [_jsx("h6", { children: "Select sections in the sequence they should appear in the report:" }), _jsxs("div", { className: "btn-group-sm", role: "group", "aria-label": "Basic example", children: [_jsx(SequenceSelectButton, { type: "button", id: "preparedFor", disabled: disable.preparedFor, className: "btn btn-secondary", onClick: () => {
                                                    addItem({ label: "Prepared For", value: "preparedFor" });
                                                }, children: "Prepared For" }), _jsx(SequenceSelectButton, { type: "button", id: "customerInformation", disabled: disable.customerInformation, className: "btn btn-secondary", onClick: () => {
                                                    addItem({
                                                        label: "Customer Information",
                                                        value: "customerInformation",
                                                    });
                                                }, children: "Customer Information" }), _jsx(SequenceSelectButton, { type: "button", id: "deed", disabled: disable.deed, className: "btn btn-secondary", onClick: () => {
                                                    addItem({ label: "Deed Information", value: "deed" });
                                                }, children: "Deed Information" }), _jsx(SequenceSelectButton, { type: "button", id: "mortgage", disabled: disable.mortgage, className: "btn btn-secondary", onClick: () => {
                                                    addItem({
                                                        label: "Current Deed of Trusts/Mortgages",
                                                        value: "mortgage",
                                                    });
                                                }, children: "Current Deed of Trusts/Mortgages" }), _jsx(SequenceSelectButton, { type: "button", id: "tax", disabled: disable.tax, className: "btn btn-secondary", onClick: () => {
                                                    addItem({ label: "Tax Information", value: "tax" });
                                                }, children: "Tax Information" }), _jsx(SequenceSelectButton, { type: "button", id: "lien", disabled: disable.lien, className: "btn btn-secondary", onClick: () => {
                                                    addItem({
                                                        label: "Judgment and Lien Information",
                                                        value: "lien",
                                                    });
                                                }, children: "Judgment and Lien Information" }), _jsx(SequenceSelectButton, { type: "button", id: "miscellaneous", disabled: disable.miscellaneous, className: "btn btn-secondary", onClick: () => {
                                                    addItem({
                                                        label: "Miscellaneous Recording Information",
                                                        value: "miscellaneous",
                                                    });
                                                }, children: "Miscellaneous Recording Information" })] }), _jsx("br", {}), _jsx("ol", { children: sequence.map((item, idx) => (_jsxs("li", { children: [item.label, "\u00A0", _jsx("i", { className: "bi bi-x-circle-fill pointer", onClick: () => removeItem(item) })] }, item.label + idx))) }, sequence.toString())] }), _jsx(ErrorMessage, { id: "incompleteSequenceError" })] }), _jsxs(Modal.Footer, { children: [_jsx(ModalButton, { onClick: () => {
                                    setShowModal(false);
                                }, children: "Cancel" }), _jsx(ModalButton, { onClick: () => initiate(), children: "Generate" })] })] })] }));
};
export default DownloadReportButton;
