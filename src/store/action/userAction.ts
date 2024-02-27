import { constant } from '../constant';

export const getroledata = () => {
    return { type: constant.GET_ROLE_DATA };
};
export const addroledata = (formdata:any) => {
    return { type: constant.ADD_ROLE_DATA, data: formdata };
};
export const deleteroledata = (id:any) => {
    return { type: constant.DELETE_ROLE_DATA, data: id };
};
export const getaccessroledata = () => {
    return { type: constant.GET_ACCESS_ROLE_DATA };
};
export const addaccessroledata = (formdata:any) => {
    return { type: constant.ADD_ACCESS_ROLE_DATA, data: formdata };
};
export const deleteaccessroledata = (id:any) => {
    return { type: constant.DELETE_ACCESS_ROLE_DATA, data: id };
};
export const getalluserdata = () => {
    return { type: constant.GET_USER_DATA };
};
