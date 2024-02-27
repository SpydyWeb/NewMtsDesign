import { takeEvery, put } from 'redux-saga/effects';
import { constant } from '../constant';
import { CustomerSearch } from '../../servicesapi/Customerapi';

function* getcustomerdata(action:any) {
    let customer :any= [];
    yield CustomerSearch(action.value).then((res:any) => {
        console.log(res);
        
        if (res.status === 200) customer = res.data;
    });
    yield put({ type: constant.SET_CUSTOMER_DATA, data: customer });
}
function* customerSaga() {
    yield takeEvery(constant.GET_CUSTOMER_DATA, getcustomerdata);
}

export default customerSaga;
