import { constant } from '../constant';
export const getVendordata = (searchValue:any) => {
    return { type: constant.GET_VENDOR_DATA, value: searchValue };
};
export const getLicencedata = () => {
    return { type: constant.GET_LICENCETYPE_DATA };
};
export const getCommunicationdata = () => {
    return { type: constant.GET_COMMUNICATIONTYPE_DATA };
};
export const addLicencedata = (formdata:any) => {
    return { type: constant.ADD_LICENCETYPE_DATA, data: formdata };
};
export const addCommunicationdata = (formdata:any) => {
    return { type: constant.ADD_COMMUNICATIONTYPE_DATA, data: formdata };
};
export const deleteLicencedata = (id:any) => {
    return { type: constant.DELETE_LICENCETYPE_DATA, data: id };
};
export const deleteCommunicationdata = (id:any) => {
    return { type: constant.DELETE_COMMUNICATIONTYPE_DATA, data: id };
};
export const deletestatedata = (id:any) => {
    return { type: constant.DELETE_STATE_DATA, data: id };
};
export const getStatedata = () => {
    return { type: constant.GET_STATE_DATA };
};
export const addStatedata = (formdata:any) => {
    return { type: constant.ADD_STATE_DATA, data: formdata };
};
export const getProductdata = () => {
    return { type: constant.GET_PRODUCT_DATA };
};
