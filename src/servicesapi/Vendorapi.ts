import { CurrentUrl } from "./UrlApi";
let Url = `${CurrentUrl}api/Vendor/`;
const token = localStorage.getItem("jwtTokenId");
let config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};
// AddLicenceType
export const AddLicenceType = async (userData: any) => {
  return await fetch(`${Url}AddLicenceType`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

// UpdateLicenceType
export const UpdateLicenceType = async (userData: any, id: any) => {
  return await fetch(`${Url}UpdateLicenceType/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

//DeleteLicenceType
export const DeleteLicenceType = async (id: any) => {
  return await fetch(`${Url}DeleteLicenceType/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

//GET LicenceTypeList
export const GetLicenceType = async () => {
  return await fetch(`${Url}LicenceTypeList`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "Acces-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};

//AddCommunication product

export const AddCommunicationProduct = async (data: any) => {
  return await fetch(`${Url}AddCommunicationProductType`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
export const AddCommunicationById = async (data: any, id: any) => {
  return await fetch(`${Url}Addcommunication?vendorid=${id}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

//  GET CommunicationProductType
export const GetCommunicationProductType = async () => {
  return await fetch(`${Url}CommunicationProductType`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "Acces-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};

export const UpdateCommuncationProductType = async (userData: any, id: any) => {
  return await fetch(`${Url}UpdateCommuncationProductType/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

//DeleteCommuncationProductType
export const DeleteCommuncationProductType = async (id: any) => {
  return await fetch(`${Url}DeleteCommuncationProductType/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

//Communication

export const AddCommunication = async (data: any) => {
  return await fetch(`${Url}AddCommunicationType`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

// GETCommunicationTypeList;
export const GetCommunicationTypeList = async () => {
  return await fetch(`${Url}CommunicationTypeList`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "Acces-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};

export const UpdateCommuncationType = async (userData: any, id: any) => {
  return await fetch(`${Url}UpdateCommuncationType/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

//DeleteCommuncationProductType
export const DeleteCommuncationType = async (id: any) => {
  return await fetch(`${Url}DeleteCommuncationType/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
export const DeleteCommuncationbyVendorid = async (id: any) => {
  return await fetch(`${Url}DeleteCommunication?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

//State

export const AddState = async (data: any) => {
  return await fetch(`${Url}AddState`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

// GET StateList;
export const GetStateList = async () => {
  return await fetch(`${Url}allStateList`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "Acces-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};

export const GetCountyList = async (data: any) => {
  return await fetch(`${Url}CountyList`, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};

export const GetStateListBynation = async (data: any) => {
  return await fetch(`${Url}StateList`, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};

export const GetNationList = async () => {
  return await fetch(`${Url}NationList`, {
    method: "GET",
    ...config,
  }).then((data) => data.json());
};

export const GetVendorProductsPriceList = async (
  vendorid: any,
  productid: any,
  type: any
) => {
  return await fetch(
    `${Url}GetVendorProductsPriceList?vendorid=${vendorid}&productid=${productid}&type=${type}`,
    {
      method: "GET",
      ...config,
    }
  ).then((data) => data.json());
};

export const AddVendorProductPrice = async (
  data: any,
  vendorid: any,
  productid: any
) => {
  return await fetch(
    `${Url}AddVendorProduct?vendorid=${vendorid}&productid=${productid}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};

export const AddVendorNationProduct = async (
  data: any,
  vendorid: any,
  productid: any
) => {
  return await fetch(
    `${Url}AddVendorNationProduct?vendorid=${vendorid}&productid=${productid}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};
export const AddVendorStateProduct = async (
  data: any,
  vendorid: any,
  productid: any
) => {
  return await fetch(
    `${Url}AddVendorStateProduct?vendorid=${vendorid}&productid=${productid}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};
export const AddVendorCountyProduct = async (
  data: any,
  vendorid: any,
  productid: any
) => {
  return await fetch(
    `${Url}AddVendorCountyProduct?vendorid=${vendorid}&productid=${productid}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};

export const UpdateVendorNationProduct = async (
  data: any,
  vendorid: any,
  productid: any
) => {
  return await fetch(
    `${Url}UpdateVendorNationProduct?vendorid=${vendorid}&productid=${productid}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};
export const UpdateVendorStateProduct = async (
  data: any,
  vendorid: any,
  productid: any
) => {
  return await fetch(
    `${Url}UpdateVendorStateProduct?vendorid=${vendorid}&productid=${productid}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};
export const UpdateVendorCountyProduct = async (
  data: any,
  vendorid: any,
  productid: any
) => {
  return await fetch(
    `${Url}UpdateVendorCountyProduct?vendorid=${vendorid}&productid=${productid}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};

export const UpdateState = async (userData: any, id: any) => {
  return await fetch(`${Url}UpdateState/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

//DeleteCommuncationProductType
export const DeleteState = async (id: any) => {
  return await fetch(`${Url}DeleteState/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const GetVendorProduct = async () => {
  return await fetch(`${Url}ProductList`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "Acces-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};

export const AddVendorProductList = async (data: any) => {
  return await fetch(
    `${Url}AddProductList?name=${data.name}&productid=${data.productid}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  ).then((data) => data);
};

export const AddVendor = async (data: any) => {
  return await fetch(`${Url}Addvendor`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
export const Addvendorfile = async (data: any) => {
  const formData = new FormData();
  formData.append("Files", data);
  return await fetch(`${Url}Addfile`, {
    method: "POST",
    body: JSON.stringify(formData),
    ...config,
  }).then((data) => data.json());
};
export const Addexistingvendorfile = async (data: any, id: any) => {
  return await fetch(`${Url}AddVendorFile?vendorId=${id}`, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const UpdateVendorFile = async (data: any, id: any) => {
  return await fetch(`${Url}UpdateVendorFile`, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const Addvendoreoc = async (data: any, id: any) => {
  return await fetch(`${Url}Addvendoreoc`, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const GetVendorFileById = async (id: any) => {
  return await fetch(`${Url}GetVendorFileById?vendorid=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};
export const UpdateVendorEandO = async (data: any, id: any) => {
  return await fetch(`${Url}Updatevendoreoc?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const GetVendorEandOById = async (id: any) => {
  return await fetch(`${Url}Geteobyvendorid?id=${id}`, {
    method: "GET",
    ...config,
  }).then((data) => data.json());
};

export const GetFileById = async (id: any) => {
  return await fetch(`${Url}GetFileById?Fileid=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
export const Checkexistingid = async (id: any) => {
  return await fetch(`${Url}Checkexistingid?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
export const GetallVendor = async () => {
  return await fetch(`${Url}GetAllVendors`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};
export const GetallVendorBySearch = async (data: any) => {
  return await fetch(`${Url}Vendorsearch`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};

export const Getvendorbyid = async (id: any) => {
  return await fetch(`${Url}Getvendorbyid?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};

export const GetvendorProductbyid = async (id: any) => {
  return await fetch(`${Url}GetvendorProduct?vendorid=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};

export const GetVendorCommunicationbyid = async (id: any) => {
  return await fetch(`${Url}GetVendorCommunication?vendorid=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};
export const GetVendorAddressbyid = async (id: any) => {
  return await fetch(`${Url}GetVendorAddress?vendorid=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};
export const UpdateVendorAddress = async (data: any, id: any) => {
  return await fetch(`${Url}UpdateVendorAddresses?vendorid=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
export const GetVendorContactbyid = async (id: any) => {
  return await fetch(`${Url}GetVendorContact?vendorid=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};
export const GetVendorLicencebyid = async (id: any) => {
  return await fetch(`${Url}GetVendorLicences?vendorid=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};
export const UpdateVendorContact = async (data: any, id: any) => {
  const token = localStorage.getItem("jwtTokenId");
  return await fetch(`${Url}UpdateVendorContacts?vendorid=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const UpdateVendor = async (data: any) => {
  const token = localStorage.getItem("jwtTokenId");
  return await fetch(`${Url}UpdateVendor`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
export const UpdateVendorLicences = async (data: any, id: any) => {
  const token = localStorage.getItem("jwtTokenId");
  return await fetch(`${Url}UpdateVendorLicences?vendorid=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
export const DeleteVendorLicences = async (id: any) => {
  const token = localStorage.getItem("jwtTokenId");
  return await fetch(`${Url}DeleteVendorLicence?LicenceId=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const AddVendorLicences = async (data: any, id: any) => {
  const token = localStorage.getItem("jwtTokenId");
  return await fetch(`${Url}AddVendorLicences?vendorid=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const UpdateVendorcommunications = async (data: any, id: any) => {
  const token = localStorage.getItem("jwtTokenId");
  return await fetch(`${Url}UpdateVendorcommunications?vendorid=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const UpdateVendorproducts = async (data: any, id: any) => {
  const token = localStorage.getItem("jwtTokenId");
  return await fetch(`${Url}UpdateVendorproducts?vendorid=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const updateAccountinfo = async (data: any, id: any) => {
  const token = localStorage.getItem("jwtTokenId");
  return await fetch(`${Url}updateAccountinfo?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
