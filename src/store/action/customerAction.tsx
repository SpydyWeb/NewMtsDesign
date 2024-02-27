import { constant } from '../constant';
export const getCustomerdata = (searchValue:any) => {
    return { type: constant.GET_CUSTOMER_DATA, value: searchValue };
};
