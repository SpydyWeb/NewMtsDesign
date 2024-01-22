import { CurrentUrl } from "./UrlApi";

let Url = `${CurrentUrl}User/`;
let config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
export const UserRegistration = async (userData: aany) => {
  return await fetch(`${Url}Registration`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};
export const UserLogin = async (userData: any) => {
  return await fetch(`${Url}Login`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const ChangePassword = async (userData: any) => {
  return await fetch(`${Url}Changepassword`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then((data) => data);
};

export const GetAllUSer = async () => {
  return await fetch(`${Url}Allusers`, {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      Accept: "application/json",
      "Acces-Control-Allow-Origin": "*",
    },
  }).then((data) => data.json());
};
