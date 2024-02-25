import axios from "axios";
import { Auth } from "aws-amplify";
class MiscellaneousServices {
    async getAll(orderId, pageNo, pageSize, sortColumn, sortDirection) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_MISCELLANEOUS_API_URL, { "eventType": "order_property_miscellaneous_get_page",
            "payload": {
                "orderId": orderId,
                "pageNo": pageNo,
                "pageSize": pageSize,
                "sortColumn": sortColumn,
                "sortDirection": sortDirection
            } }, {
            headers: {
                Authorization: token
            }
        });
    }
    async save(miscellaneous) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_MISCELLANEOUS_API_URL, { "eventType": "order_property_miscellaneous_save",
            "payload": miscellaneous }, {
            headers: {
                Authorization: token
            }
        });
    }
    async deleteItem(id) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_MISCELLANEOUS_API_URL, { "eventType": "order_property_miscellaneous_delete",
            "payload": {
                "id": id
            } }, {
            headers: {
                Authorization: token
            }
        });
    }
    async getSize(orderId) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_MISCELLANEOUS_API_URL, { "eventType": "order_property_miscellaneous_get_size",
            "payload": {
                "orderId": orderId,
            } }, {
            headers: {
                Authorization: token
            }
        });
    }
}
export default new MiscellaneousServices();
