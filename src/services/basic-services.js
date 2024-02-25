import axios from "axios";
import { Auth } from "aws-amplify";
class BasicServices {
    async getDetails(orderId) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_BASIC_API_URL, { "eventType": "order_property_basic_get",
            "payload": {
                "orderId": orderId
            } }, {
            headers: {
                Authorization: token
            }
        });
    }
    async saveDetails(details) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_BASIC_API_URL, { "eventType": "order_property_basic_save",
            "payload": details }, {
            headers: {
                Authorization: token
            }
        });
    }
}
export default new BasicServices();
