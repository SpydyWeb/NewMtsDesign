import { Tax } from "../utils/form-types";
import axios from "axios";
import { Auth } from "aws-amplify";

class TaxServices {

  async getAll(orderId: number, pageNo: number, pageSize: number, sortColumn: string, sortDirection: string) {
    const user  = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    return axios.post(
      import.meta.env.VITE_TAX_API_URL, 
        {"eventType": "order_property_tax_get_page",
          "payload": {
            "orderId": orderId,
            "pageNo": pageNo,
            "pageSize": pageSize,
            "sortColumn": sortColumn,
            "sortDirection": sortDirection
          }}, {
            headers: {
              Authorization: token
            }
          }
      );
  }

  async save(tax: Tax){
    const user  = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    return axios.post(
      import.meta.env.VITE_TAX_API_URL, 
        {"eventType": "order_property_tax_save",
          "payload": tax}, {
            headers: {
              Authorization: token
            }
          }
      );
  }

  async deleteItem(id: number){
    const user  = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    return axios.post(
      import.meta.env.VITE_TAX_API_URL, 
        {"eventType": "order_property_tax_delete",
          "payload": {
            "id": id
          }}, {
            headers: {
              Authorization: token
            }
          }
      );
  }

  async getSize(orderId: number){
    const user  = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    return axios.post(
      import.meta.env.VITE_TAX_API_URL, 
        {"eventType": "order_property_tax_get_size",
          "payload": {
            "orderId": orderId,
          }}, {
            headers: {
              Authorization: token
            }
          }
      );
  }
}

export default new TaxServices();
