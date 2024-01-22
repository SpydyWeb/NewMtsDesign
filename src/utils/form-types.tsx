export type Order = {
  Id: number | null;
  UserName: string;
  Client: Client;
  Contacts: Contact[];
  PropertyAddress: PropertyAddress;
  Borrowers: Borrower[];
  Products: Product;
  Documents: Document[];
};

export type NewOrder = Omit<Order, "Id">;

export type SavedOrder = {
  systemorderid: string;
  orderid: number;
  clientid: number;
  clientname: string;
  propertyaddress: string;
  propertycity: string;
  propertystate: string;
  propertyzip: string;
  clientreferencenumber: string;
  loanid: string;
  orderstatus: string;
  orderdate: string;
  productgroup: string;
  product: string;
  vendorreportcategory: string;
}

export type Client = {
  Id: number;
  LoanId: string;
  ClientReferenceNumber: string;
  Instructions: string;
};

export type Contact = {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Email: string;
  Phone: string;
};

export type Borrower = {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Last4SSN: number | undefined;
  Email: string;
  Phone: string;
  IndCorp: string;
};

export type PropertyAddress = {
  StreetAddress: string;
  Suite: string;
  City: string;
  State: string;
  Zip: string;
  County: string;
  Parcel: string;
  LoanAmount: number;
};

export type Product = {
  AvmProduct: number;
  TitleProduct: number;
  AppraisalProduct: number;
  PCRProduct: number;
  FloodProduct: number;
  BPOProduct: number;
  EvaluationProduct: number;
};

export const Products = {
  AVM_PRODUCT: "AVM",
  TITLE_PRODUCT: "",
  APPRAISAL_PRODUCT: "APP",
  PCR_PRODUCT: "",
  FLOOD_PRODUCT: "",
  BPO_PRODUCT: "",
  EVALUATION_PRODUCT: "",
};

export type Document = {
  DocumentId: number;
  DocumentType: number;
  Product: number;
};

export type Search = {
  GlobalSearch: string;
  AdvanceSearch: AdvancedSearch;
}

export type AdvancedSearch = {
  OrderId: number;
  ClientId: number;	
  PropertyAddress: string,
  PropertyCity: string;
  PropertyState: string;
  PropertyZip: number;
  ClientReferenceNumber: string;
  LoanId: string;
  OrderStatus: string;
  OrderDate: string;
  OrderToDate: string
  ProductGroup: string;
  Product:  number[],  
}

export type Basic = {
  id: number | null;
  orderId: number;
  searchDate: string;
  effectiveDate: string;
  searchStartDate: string;
  isFullLegal: boolean;
  parcelId: string;
  township: string;
  noOfLiens: number;
  liensTotalAmount: number;
  comments: string;
  legalDescription: string;
};

export type Deed = {
  id: number | null;
  orderId: number;
  grantee: string;
  granteeVesting: string;
  granteeLegalName: string;
  isGranteeDeceased: boolean;
  granteeDeceasedName: string;
  granteeDeceasedDate: string;
  grantor: string;
  grantorVesting: string;
  grantorLegalName: string;
  isGrantorDeceased: boolean;
  grantorDeceasedName: string;
  grantorDeceasedDate: string;
  deedDate: string;
  recordedDate: string;
  deedType: string;
  hasPriorDeed: boolean;
  considerationAmount: number;
  volinst: string;
  page: string;
  book: string;
  comments: string;
};

export type Mortgage = {
  id: number | null;
  orderId: number;
  mortgagee: string;
  mortgagor: string;
  mortgageDate: string;
  recordedDate: string;
  mortgageAmount: number;
  volinst: string;
  page: string;
  book: string;
  mortgagePosition: string;
  isOpenEnded: boolean;
  comments: string;
};

export type Lien = {
  id: number | null;
  orderId: number;
  plaintiff: string;
  defendant: string;
  lienType: string;
  dob: string;
  ucc: boolean;
  ssn: string;
  caseNumber: string;
  date: string;
  recordedDate: string;
  lienAmount: number;
  volinst: string;
  page: string;
  book: string;
  searchedNames: string;
  comments: string;
};

export type Tax = {
  id: number | null;
  orderId: number;
  parcelId: string;
  land: number;
  building: number;
  total: number;
  lotDescription: string;
  landDescription: string;
  buildingDescription: string;
  assessmentAddress1: string;
  assessmentAddress2: string;
  zip: string;
  city: string;
  state: string;
  county: string;
  comments: string;
};

export type Miscellaneous = {
  id: number | null;
  orderId: number;
  type: string;
  firstParty: string;
  secondParty: string;
  recordedDate: string;
  volinst: string;
  page: string;
  book: string;
  comments: string;
};

export type Assignment = {
  id: number | null;
  mortgageId: number;
  fillingType: string;
  assignTo: string;
  assignFrom: string;
  recordedDate: string;
  datedDate: string;
  volinst: string;
  page: string;
  book: string;
  newMaturityAmount: number;
  newMaturityDate: string;
  comments: string;
};

export type Payment = {
  id: number | null;
  taxId: number;
  taxType: string;
  taxPeriod: string;
  taxYear: string;
  amount: number;
  date: string;
  status: string;
  discountDate: string;
  discountAmount: number;
  faceDate: string;
  faceAmount: number;
  penaltyDate: string;
  penaltyAmount: number;
  dueDate: string;
  comments: string;
};
