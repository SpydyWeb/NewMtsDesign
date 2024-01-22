import { Payment } from "../utils/form-types";
import axios from "axios";
import { Auth } from "aws-amplify";

class PaymentServices {

  async getAll(taxId: number, sortColumn: string, sortDirection: string) {
    const user  = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    return axios.post(
      import.meta.env.VITE_PAYMENT_API_URL, 
        {"eventType": "order_property_payment_get_page",
          "payload": {
            "taxId": taxId,
            "sortColumn": sortColumn,
            "sortDirection": sortDirection
          }}, {
            headers: {
              Authorization: token
            }
          }
      );
  }

  async save(payment: Payment){
    const user  = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    return axios.post(
      import.meta.env.VITE_PAYMENT_API_URL, 
        {"eventType": "order_property_payment_save",
          "payload": payment}, {
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
      import.meta.env.VITE_PAYMENT_API_URL, 
        {"eventType": "order_property_payment_delete",
          "payload": {
            "id": id
          }}, {
            headers: {
              Authorization: token
            }
          }
      );
  }

  async getSize(taxId: number){
    const user  = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    return axios.post(
      import.meta.env.VITE_PAYMENT_API_URL, 
        {"eventType": "order_property_payment_get_size",
          "payload": {
            "taxId": taxId,
          }}, {
            headers: {
              Authorization: token
            }
          }
      );
  }
}

export default new PaymentServices();
