import axios from "axios";
class LocationServices {
    getCityandState(zipcode) {
        return axios.get("https://api.zippopotam.us/us/" + zipcode);
    }
    getCounty(zipcode) {
        return axios.get("https://service.zipapi.us/zipcode/county/" + zipcode + "?X-API-KEY=" + import.meta.env.VITE_ZIP_API_KEY);
    }
}
export default new LocationServices();
