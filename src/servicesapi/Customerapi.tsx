import { CurrentUrl } from "./UrlApi";

let Url = `${CurrentUrl}Customer/`;
const token = localStorage.getItem("jwtTokenId");
let config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export const AddCustomer = async (data: any) => {
  return await fetch(`${Url}AddCustomer`, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};

export const AddCustomerUser = async (data: any) => {
  return await fetch(`${CurrentUrl}User/Adduser`, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const DeleteCustomerUser = async (id: any) => {
  return await fetch(`${CurrentUrl}User/Deleteuser?id=${id}`, {
    method: "POST",
    ...config,
  }).then((data) => data.json());
};

export const CustomerSearch = async (data: any) => {
  return await fetch(`${Url}Customersearch`, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};

export const UpdateCustomerUser = async (data: any) => {
  return await fetch(`${CurrentUrl}User/Updateuser`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const GetCustomerDetaills = async (id: number) => {
  return await fetch(`${Url}GetCustomerbyid?id=${id}`, {
    method: "GET",
    ...config,
  }).then((data) => data.json());
};
export const GetCustomerProductDetaills = async (id: number) => {
  return await fetch(`${Url}GetCustomerProduct?Customerid=${id}`, {
    method: "GET",
    ...config,
  }).then((data) => data.json());
};
export const UpdateCustomerProduct = async (data: any) => {
  return await fetch(`${Url}UpdateCustomerProduct`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const GetCustomerCommunicationbyid = async (id: number) => {
  return await fetch(`${Url}GetCustomerCommunication?Customerid=${id}`, {
    method: "GET",
    ...config,
  }).then((data) => data.json());
};
export const GetCustomerAddressbyid = async (id: number) => {
  return await fetch(`${Url}GetCustomerAddress?Customerid=${id}`, {
    method: "GET",
    ...config,
  }).then((data) => data.json());
};
export const GetCustomerContactbyid = async (id: number) => {
  return await fetch(`${Url}GetCustomerContact?Customerid=${id}`, {
    method: "GET",
    ...config,
  }).then((data) => data.json());
};
export const GetCustomerIntegrationDetailbyid = async (id: number) => {
  return await fetch(`${Url}GetCustomerIntegrationDetail?customerid=${id}`, {
    method: "GET",
    ...config,
  }).then((data) => data.json());
};
export const UpdateCustomercommunications = async (data: any, id: any) => {
  return await fetch(`${Url}UpdateCommunication?id=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const addCustomercommunications = async (data: any, id: any) => {
  return await fetch(`${Url}addCommunication?customerid=${id}`, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const UpdateCustomerIntegrationDetail = async (data: any, id: any) => {
  return await fetch(`${Url}UpdateCustomerIntegrationDetail?detailid=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const Updatecustomer = async (data: any) => {
  return await fetch(`${Url}Updatecustomer`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const UpdateCustomerAddress = async (data: any, id: any) => {
  return await fetch(`${Url}UpdateCustomerAddress?addressid=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const UpdateCustomerContact = async (data: any, id: any) => {
  return await fetch(`${Url}UpdateCustomerContact?Contactid=${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const GetcommunicationLists = async () => {
  return await fetch(`${Url}GetcommunicationLists`, {
    method: "GET",
    ...config,
  }).then((data) => data.json());
};
export const Addcustomerfile = async (data: any) => {
  const formData = new FormData();
  formData.append("Files", data);
  return await fetch(`${Url}Addfile`, {
    method: "POST",
    body: JSON.stringify(formData),
    ...config,
  }).then((data) => data.json());
};
export const GetCustomerFileById = async (id: number) => {
  return await fetch(`${Url}GetCustomerFileById?vendorid=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};
export const Addexistingcustomerfile = async (data: any, id: any) => {
  return await fetch(`${Url}AddcustomerFile?Customerid=${id}`, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const UpdatecustomerFile = async (data: any, id: any) => {
  return await fetch(`${Url}UpdatecustomerFile`, {
    method: "POST",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const UploadProductFile = async (data: any, id: any) => {
  return await fetch(`${Url}Uploadfiles?Customerid=${id}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "multipart/form-data" },
  }).then((data) => data.json());
};
export const DownloadFile = async (path: any) => {
  return await fetch(`${Url}Downloadfiles?path=${path}`, {
    method: "POST",
    ...config,
  }).then((data) => data.json());
};

export const DeleteCommuncationbycutomerid = async (id: number) => {
  return await fetch(`${Url}DeleteCommunication?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
export const GetcustomerProductsPriceList = async (
  customerid: any,
  productid: any,
  type: any
) => {
  return await fetch(
    `${Url}CustomerProductPriceList?customerid=${customerid}&productid=${productid}&type=${type}`,
    {
      method: "GET",
      ...config,
    }
  ).then((data) => data.json());
};

export const AddcustomerProductPrice = async (
  data: any,
  customerid: any,
  productid: any
) => {
  return await fetch(
    `${Url}AddcustomerProduct?customerid=${customerid}&productid=${productid}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};

export const AddcustomerNationProduct = async (
  data: any,
  customerid: any,
  productid: any
) => {
  return await fetch(
    `${Url}AddcustomerNationProduct?customerid=${customerid}&productid=${productid}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};
export const AddcustomerStateProduct = async (
  data: any,
  customerid: any,
  productid: any
) => {
  return await fetch(
    `${Url}AddcustomerStateProduct?customerid=${customerid}&productid=${productid}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};
export const AddcustomerCountyProduct = async (
  data: any,
  customerid: any,
  productid: any
) => {
  return await fetch(
    `${Url}AddcustomerCountyProduct?customerid=${customerid}&productid=${productid}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};
export const UpdateCustomerNationProduct = async (
  data: any,
  customerid: any,
  productid: any
) => {
  return await fetch(
    `${Url}UpdateCustomerNationProduct?customerid=${customerid}&productid=${productid}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};
export const UpdatecustomerStateProduct = async (
  data: any,
  customerid: any,
  productid: any
) => {
  return await fetch(
    `${Url}UpdatecustomerStateProduct?customerid=${customerid}&productid=${productid}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};
export const Updatecustomeraccountinfo = async (data: any, customerid: any) => {
  return await fetch(`${Url}updateAccountinfo?id=${customerid}`, {
    method: "PUT",
    body: JSON.stringify(data),
    ...config,
  }).then((data) => data.json());
};
export const UpdatecustomerCountyProduct = async (
  data: any,
  customerid: any,
  productid: any
) => {
  return await fetch(
    `${Url}UpdatecustomerCountyProduct?customerid=${customerid}&productid=${productid}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      ...config,
    }
  ).then((data) => data.json());
};
