import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useContext } from "react";
import { ApplicationContext } from "../../../App";
import { CenterContainer, OrderContainer, TableRow } from "../OrderStyledComponents";
import "../Order.css";
import Contacts from "./Contacts";
import Borrowers from "./Borrowers";
import PropertyAddressForm from "./PropertyAddress";
import ProductForm from "./Products";
import { useNavigate, useParams } from "react-router-dom";
import UploadDocumentForm from "./UploadDocuments";
import ClientForm from "./ClientForm";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected, isNotEmail, isNotLength, isNotLengthOrEmpty } from "../../../utils/validations";
import orderServices from "../../../services/order-services";
import { CancelButton, SaveButton } from "../orderProperty/OrderPropertyStyledComponents";
import NavigationIndicator from "../../navigation/navigationIndicator/NavigationIndicator";
import { BsFillPencilFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
const AddOrder = (props) => {
    const [associatedProductOptions, setAssociatedProductOptions] = useState(new Map());
    const [documentTypeOptions, setDocumentTypeOptions] = useState([]);
    const [contacts, setContacts] = useState([{ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "" }]);
    const [borrowers, setBorrowers] = useState([{ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "", IndCorp: "I", Last4SSN: undefined }]);
    const [documents, setDocuments] = useState([{ DocumentType: 0, Product: 0, DocumentId: 0 }]);
    const [renderContacts, setRenderContacts] = useState(0);
    const [renderBorrowers, setRenderBorrowers] = useState(0);
    const [renderUploadDocuments, setRenderUploadDocuments] = useState(0);
    const { orderId } = useParams();
    const history = useNavigate();
    const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext);
    useEffect(() => {
        orderServices.getData("GetDocumentList").then((response) => {
            if (response.data.statusCode == 200 && response.data.body.Status) {
                setDocumentTypeOptions(response.data.body.Data);
            }
        });
    }, []);
    const updateContacts = (contacts) => {
        setContacts(contacts);
        setRenderContacts(renderContacts + 1);
    };
    const updateBorrowers = (borrowers) => {
        setBorrowers(borrowers);
        setRenderBorrowers(renderBorrowers + 1);
    };
    const updateDocument = (documents) => {
        setDocuments(documents);
        setRenderUploadDocuments(renderUploadDocuments + 1);
    };
    const updateAssociateProductOptions = (options) => {
        setAssociatedProductOptions(options);
        setRenderUploadDocuments(renderUploadDocuments + 1);
    };
    const uploadDocuments = async () => {
        for (let i = 0; i < documents.length; i++) {
            let doc = documents[i];
            const file = document.getElementById("file" + i);
            try {
                if (file.files) {
                    const presignedUrl = await orderServices.getPresignedUrl(file.files[0].name);
                    doc.DocumentId = presignedUrl.data.body.Data.DocumentId;
                    await orderServices.uploadDocument(presignedUrl.data.body.Data.DocumentUrl, file.files[0]);
                }
            }
            catch (e) {
                console.log("caught an exception " + e);
            }
        }
    };
    const save = async () => {
        updateLoadingMessage("Saving order...");
        updateLoading(true);
        var okay = true;
        const clientId = document.getElementById("clientId");
        const loanId = document.getElementById("loanId");
        const clientReferenceNumber = document.getElementById("clientReferenceNumber");
        const additionalInstruction = document.getElementById("additionalInstruction");
        const streetAddress = document.getElementById("streetAddress");
        const suite = document.getElementById("suite");
        const city = document.getElementById("city");
        const state = document.getElementById("state");
        const zip = document.getElementById("zip");
        const county = document.getElementById("county");
        const parcelNumber = document.getElementById("parcelNumber");
        const loanAmount = document.getElementById("loanAmount");
        const avmProduct = document.getElementById("avmProduct");
        const titleProduct = document.getElementById("titleProduct");
        const appraisalProduct = document.getElementById("appraisalProduct");
        const pcrPropertyInspectionConditionReport = document.getElementById("pcrPropertyInspectionConditionReport");
        const flood = document.getElementById("flood");
        const bpo = document.getElementById("bpo");
        const evaluation = document.getElementById("evaluation");
        const documentType = document.getElementById("documentType");
        const associatedProduct = document.getElementById("associatedProduct");
        const clientIdError = document.getElementById("clientIdError");
        const loanIdError = document.getElementById("loanIdError");
        const clientReferenceNumberError = document.getElementById("clientReferenceNumberError");
        const additionalInstructionError = document.getElementById("additionalInstructionError");
        const streetAddressError = document.getElementById("streetAddressError");
        const suiteError = document.getElementById("suiteError");
        const cityError = document.getElementById("cityError");
        const stateError = document.getElementById("stateError");
        const zipError = document.getElementById("zipError");
        const countyError = document.getElementById("countyError");
        const avmProductError = document.getElementById("avmProductError");
        const titleProductError = document.getElementById("titleProductError");
        const appraisalProductError = document.getElementById("appraisalProductError");
        const pcrPropertyInspectionConditionReportError = document.getElementById("pcrPropertyInspectionConditionReportError");
        const floodError = document.getElementById("floodError");
        const bpoError = document.getElementById("bpoError");
        const evaluationError = document.getElementById("evaluationError");
        if (isNoOptionSelected(clientId, clientIdError))
            okay = false;
        if (isEmpty(loanId, loanIdError))
            okay = false;
        else if (isMaxLengthExceeded(loanId, loanIdError, 20))
            okay = false;
        if (isMaxLengthExceeded(clientReferenceNumber, clientReferenceNumberError, 100))
            okay = false;
        if (isMaxLengthExceeded(additionalInstruction, additionalInstructionError, 4000))
            okay = false;
        if (isEmpty(streetAddress, streetAddressError))
            okay = false;
        else if (isMaxLengthExceeded(streetAddress, streetAddressError, 50))
            okay = false;
        if (isMaxLengthExceeded(suite, suiteError, 10))
            okay = false;
        if (isEmpty(city, cityError))
            okay = false;
        else if (isMaxLengthExceeded(city, cityError, 50))
            okay = false;
        if (isEmpty(state, stateError))
            okay = false;
        else if (isMaxLengthExceeded(state, stateError, 2))
            okay = false;
        else if (isNotLength(state, stateError, 2))
            okay = false;
        if (isEmpty(zip, zipError))
            okay = false;
        else if (isMaxLengthExceeded(zip, zipError, 5))
            okay = false;
        else if (isNotLength(zip, zipError, 5))
            okay = false;
        if (isMaxLengthExceeded(county, countyError, 50))
            okay = false;
        // if (isNoOptionSelected(avmProduct, avmProductError)) okay = false;
        // if (isNoOptionSelected(titleProduct, titleProductError)) okay = false;
        // if (isNoOptionSelected(appraisalProduct, appraisalProductError)) okay = false;
        // if (isNoOptionSelected(pcrPropertyInspectionConditionReport, pcrPropertyInspectionConditionReportError)) okay = false;
        // if (isNoOptionSelected(flood, floodError)) okay = false;
        // if (isNoOptionSelected(bpo, bpoError)) okay = false;
        // if (isNoOptionSelected(evaluation, evaluationError)) okay = false;
        for (let i = 0; i < contacts.length; i++) {
            const contactFirstName = document.getElementById("contactFirstName" + i);
            const contactMiddleName = document.getElementById("contactMiddleName" + i);
            const contactLastName = document.getElementById("contactLastName" + i);
            const contactPhone = document.getElementById("contactPhone" + i);
            const contactEmail = document.getElementById("contactEmail" + i);
            const contactFirstNameError = document.getElementById("contactFirstNameError" + i);
            const contactMiddleNameError = document.getElementById("contactMiddleNameError" + i);
            const contactLastNameError = document.getElementById("contactLastNameError" + i);
            const contactPhoneError = document.getElementById("contactPhoneError" + i);
            const contactEmailError = document.getElementById("contactEmailError" + i);
            if (isEmpty(contactFirstName, contactFirstNameError))
                okay = false;
            else if (isMaxLengthExceeded(contactFirstName, contactFirstNameError, 50))
                okay = false;
            if (isMaxLengthExceeded(contactMiddleName, contactMiddleNameError, 50))
                okay = false;
            if (isEmpty(contactLastName, contactLastNameError))
                okay = false;
            else if (isMaxLengthExceeded(contactLastName, contactLastNameError, 50))
                okay = false;
            if (isMaxLengthExceeded(contactPhone, contactPhoneError, 10))
                okay = false;
            else if (isNotLengthOrEmpty(contactPhone, contactPhoneError, 10))
                okay = false;
            if (isEmpty(contactEmail, contactEmailError))
                okay = false;
            else if (isMaxLengthExceeded(contactEmail, contactEmailError, 50))
                okay = false;
            else if (isNotEmail(contactEmail, contactEmailError))
                okay = false;
        }
        for (let i = 0; i < borrowers.length; i++) {
            const borrowerType = document.getElementById("borrowerType" + i);
            const borrowerFirstName = document.getElementById("borrowerFirstName" + i);
            const borrowerMiddleName = document.getElementById("borrowerMiddleName" + i);
            const borrowerLastName = document.getElementById("borrowerLastName" + i);
            const borrowerPhone = document.getElementById("borrowerPhone" + i);
            const borrowerEmail = document.getElementById("borrowerEmail" + i);
            const borrowerSocialSecurityNumber = document.getElementById("borrowerSocialSecurityNumber" + i);
            const borrowerFirstNameError = document.getElementById("borrowerFirstNameError" + i);
            const borrowerMiddleNameError = document.getElementById("borrowerMiddleNameError" + i);
            const borrowerLastNameError = document.getElementById("borrowerLastNameError" + i);
            const borrowerPhoneError = document.getElementById("borrowerPhoneError" + i);
            const borrowerEmailError = document.getElementById("borrowerEmailError" + i);
            const borrowerSocialSecurityNumberError = document.getElementById("borrowerSocialSecurityNumberError" + i);
            if (borrowerType.value == "I") {
                if (isEmpty(borrowerFirstName, borrowerFirstNameError))
                    okay = false;
                else if (isMaxLengthExceeded(borrowerFirstName, borrowerFirstNameError, 50))
                    okay = false;
                if (isMaxLengthExceeded(borrowerMiddleName, borrowerMiddleNameError, 50))
                    okay = false;
            }
            if (isEmpty(borrowerLastName, borrowerLastNameError))
                okay = false;
            else if (isMaxLengthExceeded(borrowerLastName, borrowerLastNameError, 50))
                okay = false;
            if (isMaxLengthExceeded(borrowerSocialSecurityNumber, borrowerSocialSecurityNumberError, 4))
                okay = false;
            else if (isNotLengthOrEmpty(borrowerSocialSecurityNumber, borrowerSocialSecurityNumberError, 4))
                okay = false;
            if (isEmpty(borrowerEmail, borrowerEmailError))
                okay = false;
            else if (isMaxLengthExceeded(borrowerEmail, borrowerEmailError, 50))
                okay = false;
            else if (isNotEmail(borrowerEmail, borrowerEmailError))
                okay = false;
            if (isMaxLengthExceeded(borrowerPhone, borrowerPhoneError, 10))
                okay = false;
        }
        // for (let i = 0; i < documents.length; i++) {
        //   const documentType = document.getElementById("documentType" + i) as HTMLInputElement;
        //   const associatedProduct = document.getElementById("associatedProduct" + i) as HTMLInputElement;
        //   const file = document.getElementById("file" + i) as HTMLInputElement;
        //   const documentTypeError = document.getElementById("documentTypeError" + i) as HTMLDivElement;
        //   const associatedProductError = document.getElementById("associatedProductError" + i) as HTMLDivElement;
        //   const fileError = document.getElementById("fileError" + i) as HTMLDivElement;
        //   if (!file.files || file.files.length == 0) {
        //     fileError.innerText = "No file selected!";
        //     okay = false;
        //   }
        // }
        await uploadDocuments();
        if (okay) {
            const order = {
                UserName: "",
                Client: {
                    Id: parseInt(clientId.value),
                    LoanId: loanId.value,
                    ClientReferenceNumber: clientReferenceNumber.value,
                    Instructions: additionalInstruction.value,
                },
                Contacts: contacts,
                Borrowers: borrowers,
                PropertyAddress: {
                    StreetAddress: streetAddress.value,
                    Suite: suite.value,
                    City: city.value,
                    State: state.value,
                    Zip: zip.value,
                    County: county.value,
                    Parcel: parcelNumber.value,
                    LoanAmount: loanAmount.value,
                },
                Products: {
                    AvmProduct: avmProduct.value,
                    TitleProduct: titleProduct.value,
                    AppraisalProduct: appraisalProduct.value,
                    PCRProduct: pcrPropertyInspectionConditionReport.value,
                    FloodProduct: flood.value,
                    BPOProduct: bpo.value,
                    EvaluationProduct: evaluation.value,
                },
                Documents: documents,
            };
            orderServices
                .save(order)
                .then((response) => {
                updateLoading(false);
                if (response.data.statusCode == 200) {
                    if (response.data.body.Status) {
                        updateMessages([
                            {
                                title: "Success !!",
                                message: "Order added successfully",
                            },
                            ...messages,
                        ]);
                        history("/orders/confirmation", { state: { ...order, Id: response.data.body.OrderId } });
                    }
                    else {
                        updateMessages([
                            {
                                title: "Error !!",
                                message: "Could not save order! " + response.data.body.Message,
                            },
                            ...messages,
                        ]);
                        const message = response.data.body.Message;
                        if (message.startsWith("/Client/Id"))
                            clientIdError.innerText = message.substr(13);
                        else if (message.startsWith("/Client/LoanId"))
                            loanIdError.innerText = message.substr(17);
                        else if (message.startsWith("/Client/ClientReferenceNumber"))
                            clientReferenceNumberError.innerText = message.substr(32);
                        else if (message.startsWith("/Client/Instructions"))
                            additionalInstructionError.innerText = message.substr(23);
                        else if (message.startsWith("/PropertyAddress/StreetAddress"))
                            streetAddressError.innerText = message.substr(33);
                        else if (message.startsWith("/PropertyAddress/Suite"))
                            suiteError.innerText = message.substr(25);
                        else if (message.startsWith("/PropertyAddress/City"))
                            cityError.innerText = message.substr(24);
                        else if (message.startsWith("/PropertyAddress/State"))
                            stateError.innerText = message.substr(25);
                        else if (message.startsWith("/PropertyAddress/Zip"))
                            zipError.innerText = message.substr(23);
                        else if (message.startsWith("/PropertyAddress/County"))
                            countyError.innerText = message.substr(26);
                        else if (/Contacts\/[0-9]*\/FirstName/.test(message)) {
                            const contactFirstNameError = document.getElementById("contactFirstNameError" + message.substring(10, 11));
                            contactFirstNameError.innerText = message.substr(24);
                        }
                        else if (/Contacts\/[0-9]*\/MiddleName/.test(message)) {
                            const contactMiddleNameError = document.getElementById("contactMiddleNameError" + message.substring(10, 11));
                            contactMiddleNameError.innerText = message.substr(25);
                        }
                        else if (/Contacts\/[0-9]*\/LastName/.test(message)) {
                            const contactLastNameError = document.getElementById("contactLastNameError" + message.substring(10, 11));
                            contactLastNameError.innerText = message.substr(23);
                        }
                        else if (/Contacts\/[0-9]*\/Email/.test(message)) {
                            const contactEmailError = document.getElementById("contactEmailError" + message.substring(10, 11));
                            contactEmailError.innerText = message.substr(20);
                        }
                        else if (/Contacts\/[0-9]*\/Phone/.test(message)) {
                            const contactPhoneError = document.getElementById("contactPhoneError" + message.substring(10, 11));
                            contactPhoneError.innerText = message.substr(20);
                        }
                        else if (/Borrowers\/[0-9]*\/FirstName/.test(message)) {
                            const borrowerFirstNameError = document.getElementById("borrowerFirstNameError" + message.substring(11, 12));
                            borrowerFirstNameError.innerText = message.substr(25);
                        }
                        else if (/Borrowers\/[0-9]*\/MiddleName/.test(message)) {
                            const borrowerMiddleNameError = document.getElementById("borrowerMiddleNameError" + message.substring(11, 12));
                            borrowerMiddleNameError.innerText = message.substr(26);
                        }
                        else if (/Borrowers\/[0-9]*\/LastName/.test(message)) {
                            const borrowerLastNameError = document.getElementById("borrowerLastNameError" + message.substring(11, 12));
                            borrowerLastNameError.innerText = message.substr(24);
                        }
                        else if (/Borrowers\/[0-9]*\/Email/.test(message)) {
                            const borrowerEmailError = document.getElementById("borrowerEmailError" + message.substring(11, 12));
                            borrowerEmailError.innerText = message.substr(21);
                        }
                        else if (/Borrowers\/[0-9]*\/Phone/.test(message)) {
                            const borrowerPhoneError = document.getElementById("borrowerPhoneError" + message.substring(11, 12));
                            borrowerPhoneError.innerText = message.substr(21);
                        }
                        else if (/Borrowers\/[0-9]*\/Last4SSN/.test(message)) {
                            const contactLast4SSNError = document.getElementById("borrowerSocialSecurityNumberError" + message.substring(11, 12));
                            contactLast4SSNError.innerText = message.substr(24);
                        }
                    }
                }
                else {
                    updateMessages([
                        {
                            title: "Error !!",
                            message: "Could not save order! Please try again.",
                        },
                        ...messages,
                    ]);
                }
            })
                .catch((e) => {
                console.log("caught an exception: " + e);
                updateLoading(false);
                updateMessages([
                    {
                        title: "Error !!",
                        message: "Could not save order! Please try again.",
                    },
                    ...messages,
                ]);
            });
        }
        else {
            updateMessages([
                {
                    title: "Error !!",
                    message: "Could not save order! Some fields are failing.",
                },
                ...messages,
            ]);
            updateLoading(false);
        }
    };
    return (_jsxs(OrderContainer, { className: "mt-4 mb-5", children: [_jsx(CenterContainer, { children: _jsx(NavigationIndicator, { curr: orderId
                        ? { name: "Edit Order", url: "/orders/edit/" + orderId, icon: _jsx(BsFillPencilFill, { className: "navigation-indicator-edit-icon" }) }
                        : { name: "Add Order", url: "/orders/add", icon: _jsx(IoMdAddCircle, { className: "navigation-indicator-icon" }) }, path: [{ name: "Orders", url: "/orders", icon: _jsx(AiFillFileText, { className: "navigation-indicator-icon" }) }] }) }), _jsx(CenterContainer, { className: "mt-3", children: _jsx("div", { children: _jsxs("div", { className: "container-fluid card border-0", children: [_jsx(ClientForm, {}), _jsx(Contacts, { contacts: contacts, updateContacts: updateContacts }, "contacts" + renderContacts), _jsx(PropertyAddressForm, {}), _jsx(Borrowers, { borrowers: borrowers, updateBorrowers: updateBorrowers }, "borrowers" + renderBorrowers), _jsx(ProductForm, { associatedProductOptions: associatedProductOptions, setAssociatedProductOptions: updateAssociateProductOptions }), _jsx(UploadDocumentForm, { documents: documents, associatedProductOptions: associatedProductOptions, updateDocument: updateDocument, documentTypeOptions: documentTypeOptions }, "uploadDocuments" + renderUploadDocuments), _jsxs(TableRow, { className: "border-0 mt-4", children: [_jsx(CancelButton, { onClick: () => history("/orders"), children: "Cancel" }), _jsx(SaveButton, { className: "float-end", onClick: () => save(), children: "Save" })] })] }) }) })] }));
};
export default AddOrder;
