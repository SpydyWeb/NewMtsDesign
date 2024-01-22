import { useState, useEffect, useContext } from "react";
import { Borrower, Client, Contact, Document, NewOrder, Order, Product, PropertyAddress } from "../../../utils/form-types";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import { CenterContainer, OrderContainer, TableRow } from "../OrderStyledComponents";
import "../Order.css";
import Contacts from "./Contacts";
import Borrowers from "./Borrowers";
import PropertyAddressForm from "./PropertyAddress";
import ProductForm from "./Products";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UploadDocumentForm from "./UploadDocuments";
import ClientForm from "./ClientForm";
import { isEmpty, isMaxLengthExceeded, isNoOptionSelected, isNotEmail, isNotLength, isNotLengthOrEmpty } from "../../../utils/validations";
import orderServices from "../../../services/order-services";
import { CancelButton, SaveButton } from "../orderProperty/OrderPropertyStyledComponents";
import NavigationIndicator from "../../navigation/navigationIndicator/NavigationIndicator";
import { BsFillPencilFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";

type OrderProps = {};

const AddOrder = (props: OrderProps) => {
  const [associatedProductOptions, setAssociatedProductOptions] = useState<Map<string, any>>(new Map());
  const [documentTypeOptions, setDocumentTypeOptions] = useState<any[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([{ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "" }]);
  const [borrowers, setBorrowers] = useState<Borrower[]>([{ FirstName: "", MiddleName: "", LastName: "", Email: "", Phone: "", IndCorp: "I", Last4SSN: undefined }]);
  const [documents, setDocuments] = useState<Document[]>([{ DocumentType: 0, Product: 0, DocumentId: 0 }]);
  const [renderContacts, setRenderContacts] = useState<number>(0);
  const [renderBorrowers, setRenderBorrowers] = useState<number>(0);
  const [renderUploadDocuments, setRenderUploadDocuments] = useState<number>(0);
  const { orderId } = useParams();
  const history = useNavigate();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } = useContext(ApplicationContext) as ApplicationContextType;

  useEffect(() => {
    orderServices.getData("GetDocumentList").then((response) => {
      if (response.data.statusCode == 200 && response.data.body.Status) {
        setDocumentTypeOptions(response.data.body.Data);
      }
    });
  }, []);

  const updateContacts = (contacts: Contact[]) => {
    setContacts(contacts);
    setRenderContacts(renderContacts + 1);
  };

  const updateBorrowers = (borrowers: Borrower[]) => {
    setBorrowers(borrowers);
    setRenderBorrowers(renderBorrowers + 1);
  };

  const updateDocument = (documents: Document[]) => {
    setDocuments(documents);
    setRenderUploadDocuments(renderUploadDocuments + 1);
  };

  const updateAssociateProductOptions = (options: Map<string, any>) => {
    setAssociatedProductOptions(options);
    setRenderUploadDocuments(renderUploadDocuments + 1);
  };

  const uploadDocuments = async () => {
    for (let i = 0; i < documents.length; i++) {
      let doc = documents[i];
      const file = document.getElementById("file" + i) as HTMLInputElement;
      try {
        if (file.files) {
          const presignedUrl = await orderServices.getPresignedUrl(file.files[0].name);
          doc.DocumentId = presignedUrl.data.body.Data.DocumentId;
          await orderServices.uploadDocument(presignedUrl.data.body.Data.DocumentUrl, file.files[0]);
        }
      } catch (e) {
        console.log("caught an exception " + e);
      }
    }
  };

  const save = async () => {
    updateLoadingMessage("Saving order...");
    updateLoading(true);
    var okay: boolean = true;

    const clientId = document.getElementById("clientId") as HTMLSelectElement;
    const loanId = document.getElementById("loanId") as HTMLInputElement;
    const clientReferenceNumber = document.getElementById("clientReferenceNumber") as HTMLInputElement;
    const additionalInstruction = document.getElementById("additionalInstruction") as HTMLInputElement;
    const streetAddress = document.getElementById("streetAddress") as HTMLInputElement;
    const suite = document.getElementById("suite") as HTMLInputElement;
    const city = document.getElementById("city") as HTMLInputElement;
    const state = document.getElementById("state") as HTMLInputElement;
    const zip = document.getElementById("zip") as HTMLInputElement;
    const county = document.getElementById("county") as HTMLInputElement;
    const parcelNumber = document.getElementById("parcelNumber") as HTMLInputElement;
    const loanAmount = document.getElementById("loanAmount") as HTMLInputElement;
    const avmProduct = document.getElementById("avmProduct") as HTMLSelectElement;
    const titleProduct = document.getElementById("titleProduct") as HTMLSelectElement;
    const appraisalProduct = document.getElementById("appraisalProduct") as HTMLSelectElement;
    const pcrPropertyInspectionConditionReport = document.getElementById("pcrPropertyInspectionConditionReport") as HTMLSelectElement;
    const flood = document.getElementById("flood") as HTMLSelectElement;
    const bpo = document.getElementById("bpo") as HTMLSelectElement;
    const evaluation = document.getElementById("evaluation") as HTMLSelectElement;
    const documentType = document.getElementById("documentType") as HTMLInputElement;
    const associatedProduct = document.getElementById("associatedProduct") as HTMLInputElement;

    const clientIdError = document.getElementById("clientIdError") as HTMLDivElement;
    const loanIdError = document.getElementById("loanIdError") as HTMLDivElement;
    const clientReferenceNumberError = document.getElementById("clientReferenceNumberError") as HTMLDivElement;
    const additionalInstructionError = document.getElementById("additionalInstructionError") as HTMLDivElement;
    const streetAddressError = document.getElementById("streetAddressError") as HTMLDivElement;
    const suiteError = document.getElementById("suiteError") as HTMLDivElement;
    const cityError = document.getElementById("cityError") as HTMLDivElement;
    const stateError = document.getElementById("stateError") as HTMLDivElement;
    const zipError = document.getElementById("zipError") as HTMLDivElement;
    const countyError = document.getElementById("countyError") as HTMLDivElement;
    const avmProductError = document.getElementById("avmProductError") as HTMLDivElement;
    const titleProductError = document.getElementById("titleProductError") as HTMLDivElement;
    const appraisalProductError = document.getElementById("appraisalProductError") as HTMLDivElement;
    const pcrPropertyInspectionConditionReportError = document.getElementById("pcrPropertyInspectionConditionReportError") as HTMLDivElement;
    const floodError = document.getElementById("floodError") as HTMLDivElement;
    const bpoError = document.getElementById("bpoError") as HTMLDivElement;
    const evaluationError = document.getElementById("evaluationError") as HTMLDivElement;

    if (isNoOptionSelected(clientId, clientIdError)) okay = false;

    if (isEmpty(loanId, loanIdError)) okay = false;
    else if (isMaxLengthExceeded(loanId, loanIdError, 20)) okay = false;

    if (isMaxLengthExceeded(clientReferenceNumber, clientReferenceNumberError, 100)) okay = false;
    if (isMaxLengthExceeded(additionalInstruction, additionalInstructionError, 4000)) okay = false;

    if (isEmpty(streetAddress, streetAddressError)) okay = false;
    else if (isMaxLengthExceeded(streetAddress, streetAddressError, 50)) okay = false;

    if (isMaxLengthExceeded(suite, suiteError, 10)) okay = false;

    if (isEmpty(city, cityError)) okay = false;
    else if (isMaxLengthExceeded(city, cityError, 50)) okay = false;

    if (isEmpty(state, stateError)) okay = false;
    else if (isMaxLengthExceeded(state, stateError, 2)) okay = false;
    else if(isNotLength(state, stateError, 2)) okay = false;

    if (isEmpty(zip, zipError)) okay = false;
    else if (isMaxLengthExceeded(zip, zipError, 5)) okay = false;
    else if(isNotLength(zip, zipError, 5)) okay = false;

    if (isMaxLengthExceeded(county, countyError, 50)) okay = false;

    // if (isNoOptionSelected(avmProduct, avmProductError)) okay = false;
    // if (isNoOptionSelected(titleProduct, titleProductError)) okay = false;
    // if (isNoOptionSelected(appraisalProduct, appraisalProductError)) okay = false;
    // if (isNoOptionSelected(pcrPropertyInspectionConditionReport, pcrPropertyInspectionConditionReportError)) okay = false;
    // if (isNoOptionSelected(flood, floodError)) okay = false;
    // if (isNoOptionSelected(bpo, bpoError)) okay = false;
    // if (isNoOptionSelected(evaluation, evaluationError)) okay = false;

    for (let i = 0; i < contacts.length; i++) {
      const contactFirstName = document.getElementById("contactFirstName" + i) as HTMLInputElement;
      const contactMiddleName = document.getElementById("contactMiddleName" + i) as HTMLInputElement;
      const contactLastName = document.getElementById("contactLastName" + i) as HTMLInputElement;
      const contactPhone = document.getElementById("contactPhone" + i) as HTMLInputElement;
      const contactEmail = document.getElementById("contactEmail" + i) as HTMLInputElement;

      const contactFirstNameError = document.getElementById("contactFirstNameError" + i) as HTMLDivElement;
      const contactMiddleNameError = document.getElementById("contactMiddleNameError" + i) as HTMLDivElement;
      const contactLastNameError = document.getElementById("contactLastNameError" + i) as HTMLDivElement;
      const contactPhoneError = document.getElementById("contactPhoneError" + i) as HTMLDivElement;
      const contactEmailError = document.getElementById("contactEmailError" + i) as HTMLDivElement;

      if (isEmpty(contactFirstName, contactFirstNameError)) okay = false;
      else if (isMaxLengthExceeded(contactFirstName, contactFirstNameError, 50)) okay = false;

      if (isMaxLengthExceeded(contactMiddleName, contactMiddleNameError, 50)) okay = false;

      if (isEmpty(contactLastName, contactLastNameError)) okay = false;
      else if (isMaxLengthExceeded(contactLastName, contactLastNameError, 50)) okay = false;

      if (isMaxLengthExceeded(contactPhone, contactPhoneError, 10)) okay = false;
      else if (isNotLengthOrEmpty(contactPhone, contactPhoneError, 10)) okay = false;

      if (isEmpty(contactEmail, contactEmailError)) okay = false;
      else if (isMaxLengthExceeded(contactEmail, contactEmailError, 50)) okay = false;
      else if (isNotEmail(contactEmail, contactEmailError)) okay = false;
    }

    for (let i = 0; i < borrowers.length; i++) {
      const borrowerType = document.getElementById("borrowerType" + i) as HTMLInputElement;
      const borrowerFirstName = document.getElementById("borrowerFirstName" + i) as HTMLInputElement;
      const borrowerMiddleName = document.getElementById("borrowerMiddleName" + i) as HTMLInputElement;
      const borrowerLastName = document.getElementById("borrowerLastName" + i) as HTMLInputElement;
      const borrowerPhone = document.getElementById("borrowerPhone" + i) as HTMLInputElement;
      const borrowerEmail = document.getElementById("borrowerEmail" + i) as HTMLInputElement;
      const borrowerSocialSecurityNumber = document.getElementById("borrowerSocialSecurityNumber" + i) as HTMLInputElement;

      const borrowerFirstNameError = document.getElementById("borrowerFirstNameError" + i) as HTMLDivElement;
      const borrowerMiddleNameError = document.getElementById("borrowerMiddleNameError" + i) as HTMLDivElement;
      const borrowerLastNameError = document.getElementById("borrowerLastNameError" + i) as HTMLDivElement;
      const borrowerPhoneError = document.getElementById("borrowerPhoneError" + i) as HTMLDivElement;
      const borrowerEmailError = document.getElementById("borrowerEmailError" + i) as HTMLDivElement;
      const borrowerSocialSecurityNumberError = document.getElementById("borrowerSocialSecurityNumberError" + i) as HTMLDivElement;

      if (borrowerType.value == "I") {
        if (isEmpty(borrowerFirstName, borrowerFirstNameError)) okay = false;
        else if (isMaxLengthExceeded(borrowerFirstName, borrowerFirstNameError, 50)) okay = false;

        if (isMaxLengthExceeded(borrowerMiddleName, borrowerMiddleNameError, 50)) okay = false;
      }

      if (isEmpty(borrowerLastName, borrowerLastNameError)) okay = false;
      else if (isMaxLengthExceeded(borrowerLastName, borrowerLastNameError, 50)) okay = false;

      if (isMaxLengthExceeded(borrowerSocialSecurityNumber, borrowerSocialSecurityNumberError, 4)) okay = false;
      else if(isNotLengthOrEmpty(borrowerSocialSecurityNumber, borrowerSocialSecurityNumberError, 4)) okay = false;

      if (isEmpty(borrowerEmail, borrowerEmailError)) okay = false;
      else if(isMaxLengthExceeded(borrowerEmail, borrowerEmailError, 50)) okay = false;
      else if(isNotEmail(borrowerEmail, borrowerEmailError)) okay = false;

      if (isMaxLengthExceeded(borrowerPhone, borrowerPhoneError, 10)) okay = false;
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
      const order: NewOrder = {
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
          LoanAmount: loanAmount.value as unknown as number,
        },
        Products: {
          AvmProduct: avmProduct.value as unknown as number,
          TitleProduct: titleProduct.value as unknown as number,
          AppraisalProduct: appraisalProduct.value as unknown as number,
          PCRProduct: pcrPropertyInspectionConditionReport.value as unknown as number,
          FloodProduct: flood.value as unknown as number,
          BPOProduct: bpo.value as unknown as number,
          EvaluationProduct: evaluation.value as unknown as number,
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
            } else {
              updateMessages([
                {
                  title: "Error !!",
                  message: "Could not save order! " + response.data.body.Message,
                },
                ...messages,
              ]);
              const message = response.data.body.Message;

              if (message.startsWith("/Client/Id")) clientIdError.innerText = message.substr(13);
              else if (message.startsWith("/Client/LoanId")) loanIdError.innerText = message.substr(17);
              else if (message.startsWith("/Client/ClientReferenceNumber")) clientReferenceNumberError.innerText = message.substr(32);
              else if (message.startsWith("/Client/Instructions")) additionalInstructionError.innerText = message.substr(23);
              else if (message.startsWith("/PropertyAddress/StreetAddress")) streetAddressError.innerText = message.substr(33);
              else if (message.startsWith("/PropertyAddress/Suite")) suiteError.innerText = message.substr(25);
              else if (message.startsWith("/PropertyAddress/City")) cityError.innerText = message.substr(24);
              else if (message.startsWith("/PropertyAddress/State")) stateError.innerText = message.substr(25);
              else if (message.startsWith("/PropertyAddress/Zip")) zipError.innerText = message.substr(23);
              else if (message.startsWith("/PropertyAddress/County")) countyError.innerText = message.substr(26);
              else if (/Contacts\/[0-9]*\/FirstName/.test(message)) {
                const contactFirstNameError = document.getElementById("contactFirstNameError" + message.substring(10, 11)) as HTMLDivElement;
                contactFirstNameError.innerText = message.substr(24);
              } else if (/Contacts\/[0-9]*\/MiddleName/.test(message)) {
                const contactMiddleNameError = document.getElementById("contactMiddleNameError" + message.substring(10, 11)) as HTMLDivElement;
                contactMiddleNameError.innerText = message.substr(25);
              } else if (/Contacts\/[0-9]*\/LastName/.test(message)) {
                const contactLastNameError = document.getElementById("contactLastNameError" + message.substring(10, 11)) as HTMLDivElement;
                contactLastNameError.innerText = message.substr(23);
              } else if (/Contacts\/[0-9]*\/Email/.test(message)) {
                const contactEmailError = document.getElementById("contactEmailError" + message.substring(10, 11)) as HTMLDivElement;
                contactEmailError.innerText = message.substr(20);
              } else if (/Contacts\/[0-9]*\/Phone/.test(message)) {
                const contactPhoneError = document.getElementById("contactPhoneError" + message.substring(10, 11)) as HTMLDivElement;
                contactPhoneError.innerText = message.substr(20);
              } else if (/Borrowers\/[0-9]*\/FirstName/.test(message)) {
                const borrowerFirstNameError = document.getElementById("borrowerFirstNameError" + message.substring(11, 12)) as HTMLDivElement;
                borrowerFirstNameError.innerText = message.substr(25);
              } else if (/Borrowers\/[0-9]*\/MiddleName/.test(message)) {
                const borrowerMiddleNameError = document.getElementById("borrowerMiddleNameError" + message.substring(11, 12)) as HTMLDivElement;
                borrowerMiddleNameError.innerText = message.substr(26);
              } else if (/Borrowers\/[0-9]*\/LastName/.test(message)) {
                const borrowerLastNameError = document.getElementById("borrowerLastNameError" + message.substring(11, 12)) as HTMLDivElement;
                borrowerLastNameError.innerText = message.substr(24);
              } else if (/Borrowers\/[0-9]*\/Email/.test(message)) {
                const borrowerEmailError = document.getElementById("borrowerEmailError" + message.substring(11, 12)) as HTMLDivElement;
                borrowerEmailError.innerText = message.substr(21);
              } else if (/Borrowers\/[0-9]*\/Phone/.test(message)) {
                const borrowerPhoneError = document.getElementById("borrowerPhoneError" + message.substring(11, 12)) as HTMLDivElement;
                borrowerPhoneError.innerText = message.substr(21);
              } else if (/Borrowers\/[0-9]*\/Last4SSN/.test(message)) {
                const contactLast4SSNError = document.getElementById("borrowerSocialSecurityNumberError" + message.substring(11, 12)) as HTMLDivElement;
                contactLast4SSNError.innerText = message.substr(24);
              }
            }
          } else {
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
    } else {
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

  return (
    <OrderContainer className="mt-4 mb-5">
      <CenterContainer>
        <NavigationIndicator
          curr={
            orderId
              ? { name: "Edit Order", url: "/orders/edit/" + orderId, icon: <BsFillPencilFill className="navigation-indicator-edit-icon" /> }
              : { name: "Add Order", url: "/orders/add", icon: <IoMdAddCircle className="navigation-indicator-icon" /> }
          }
          path={[{ name: "Orders", url: "/orders", icon: <AiFillFileText className="navigation-indicator-icon" /> }]}
        />
      </CenterContainer>
      <CenterContainer className="mt-3">
        <div>
          <div className="container-fluid card border-0">
            <ClientForm />
            <Contacts key={"contacts" + renderContacts} contacts={contacts} updateContacts={updateContacts} />
            <PropertyAddressForm />
            <Borrowers key={"borrowers" + renderBorrowers} borrowers={borrowers} updateBorrowers={updateBorrowers} />
            <ProductForm associatedProductOptions={associatedProductOptions} setAssociatedProductOptions={updateAssociateProductOptions} />
            <UploadDocumentForm
              key={"uploadDocuments" + renderUploadDocuments}
              documents={documents}
              associatedProductOptions={associatedProductOptions}
              updateDocument={updateDocument}
              documentTypeOptions={documentTypeOptions}
            />

            <TableRow className="border-0 mt-4">
              <CancelButton onClick={() => history("/orders")}>Cancel</CancelButton>
              <SaveButton className="float-end" onClick={() => save()}>
                Save
              </SaveButton>
            </TableRow>
          </div>
        </div>
      </CenterContainer>
    </OrderContainer>
  );
};

export default AddOrder;
