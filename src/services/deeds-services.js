import axios from "axios";
import { Auth } from "aws-amplify";
class DeedsServices {
    async getAll(orderId, pageNo, pageSize, sortColumn, sortDirection) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_DEED_API_URL, { "eventType": "order_property_deed_get_page",
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
    async save(deed) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_DEED_API_URL, { "eventType": "order_property_deed_save",
            "payload": deed }, {
            headers: {
                Authorization: token
            }
        });
    }
    async deleteItem(id) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_DEED_API_URL, { "eventType": "order_property_deed_delete",
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
        return axios.post(import.meta.env.VITE_DEED_API_URL, { "eventType": "order_property_deed_get_size",
            "payload": {
                "orderId": orderId,
            } }, {
            headers: {
                Authorization: token
            }
        });
    }
}
export default new DeedsServices();
