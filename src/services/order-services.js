import axios from "axios";
import { Auth } from "aws-amplify";
class OrderServices {
    async getPage(pageNo, pageSize, sortColumn, sortDirection) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.get(import.meta.env.VITE_ORDER_API_URL + "?_page=" + pageNo + "&_limit=" + pageSize + "&_sort=" + sortColumn + "&_order=" + sortDirection, {
            headers: {
                Authorization: token,
            },
        });
    }
    async getData(category, request) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        if (category == "OrderSearch") {
            console.log(request);
            console.log(request?.AdvanceSearch?.ClientId);
            return axios.post(import.meta.env.VITE_ORDER_API_URL + "/v2getdata", {
                Category: category,
                UserName: user.attributes.email,
                Request: request
            }, {
                headers: {
                    Authorization: token,
                },
            });
        }
        return axios.post(import.meta.env.VITE_ORDER_API_URL + "/v2getdata", {
            Category: category,
        }, {
            headers: {
                Authorization: token,
            },
        });
    }
    async getAll() {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.get(import.meta.env.VITE_ORDER_API_URL, {
            headers: {
                Authorization: token,
            },
        });
    }
    async save(order) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        order.UserName = user.attributes.email;
        return axios.post(import.meta.env.VITE_ORDER_API_URL + "/v2createorder", order, {
            headers: {
                Authorization: token,
            },
        });
    }
    async deleteItem(id) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.delete(import.meta.env.VITE_ORDER_API_URL + "/" + id, {
            headers: {
                Authorization: token,
            },
        });
    }
    async getSize(id) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.post(import.meta.env.VITE_ORDER_API_URL, { id: id }, {
            headers: {
                Authorization: token,
            },
        });
    }
    async getById(id) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        return axios.get(import.meta.env.VITE_ORDER_API_URL + "?Id=" + id, {
            headers: {
                Authorization: token,
            },
        });
    }
    async getPresignedUrl(FileName) {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        const UserName = user.attributes.email;
        return axios.post(import.meta.env.VITE_ORDER_API_URL + "/v2getpreurl", {
            UserName: UserName,
            FileName: FileName,
        }, {
            headers: {
                Authorization: token,
            },
        });
    }
    async uploadDocument(signedS3Url, file) {
        return axios.put(signedS3Url, {
            data: file,
        }, {
            headers: {
                "Content-Type": "application/octet-stream",
            },
        });
    }
}
export default new OrderServices();