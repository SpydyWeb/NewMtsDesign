import axios from "axios";
import { Auth } from "aws-amplify";
class LiensServices {
    async getAll(orderId, pageNo, pageSize, sortColumn, sortDirection) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_LIEN_API_URL, { "eventType": "order_property_lien_get_page",
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
    async save(lien) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_LIEN_API_URL, { "eventType": "order_property_lien_save",
            "payload": lien }, {
            headers: {
                Authorization: token
            }
        });
    }
    async deleteItem(id) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_LIEN_API_URL, { "eventType": "order_property_lien_delete",
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
        return axios.post(import.meta.env.VITE_LIEN_API_URL, { "eventType": "order_property_lien_get_size",
            "payload": {
                "orderId": orderId,
            } }, {
            headers: {
                Authorization: token
            }
        });
    }
}
export default new LiensServices();