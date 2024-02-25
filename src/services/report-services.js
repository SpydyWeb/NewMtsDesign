import axios from "axios";
import { Auth } from "aws-amplify";
class ReportServices {
    async initiate(orderId, email, sequence) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_REPORT_API_URL, { "eventType": "order_property_report_initiate",
            "payload": {
                "orderId": orderId,
                "email": email,
                "sequence": sequence
            } }, {
            headers: {
                Authorization: token
            }
        });
    }
    async track(id) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_REPORT_API_URL, { "eventType": "order_property_report_track",
            "payload": {
                "id": id
            } }, {
            headers: {
                Authorization: token
            }
        });
    }
}
export default new ReportServices();
