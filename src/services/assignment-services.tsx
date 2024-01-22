import { Assignment } from "../utils/form-types";
import axios from "axios";
import { Auth } from "aws-amplify";

class AssignmentServices {

  async getAll(mortgageId: number, sortColumn: string, sortDirection: string) {
    const user  = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    return axios.post(
      import.meta.env.VITE_ASSIGNMENT_API_URL, 
        {"eventType": "order_property_assignment_get_page",
          "payload": {
            "mortgageId": mortgageId,
            "sortColumn": sortColumn,
            "sortDirection": sortDirection
          }}, {
            headers: {
              Authorization: token
            }
          }
      );
  }

  async save(assignment: Assignment){
    const user  = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    return axios.post(
      import.meta.env.VITE_ASSIGNMENT_API_URL, 
        {"eventType": "order_property_assignment_save",
          "payload": assignment}, {
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
      import.meta.env.VITE_ASSIGNMENT_API_URL, 
        {"eventType": "order_property_assignment_delete",
          "payload": {
            "id": id
          }}, {
            headers: {
              Authorization: token
            }
          }
      );
  }

  async getSize(mortgageId: number){
    const user  = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    return axios.post(
      import.meta.env.VITE_ASSIGNMENT_API_URL, 
        {"eventType": "order_property_assignment_get_size",
          "payload": {
            "mortgageId": mortgageId,
          }}, {
            headers: {
              Authorization: token
            }
          }
      );
  }
}

export default new AssignmentServices();
