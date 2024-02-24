import { takeEvery, put } from 'redux-saga/effects';
import { constant } from '../constant';
import toast from 'react-hot-toast';
import {
    GetRole,
    EditRole,
    CreateRole,
    Deleterole,
    GetsubRole,
    CreateSubRole,
    EditRoleDefination,
    DeleteroleDefunation
} from '../../servicesapi/Userroleapi';
import { GetAllUSer } from '../../servicesapi/Userapi';

let data = [];
function* getroledata() {
    let state = [];
    yield put({ type: constant.SET_LOADING });
    yield GetRole().then((res) => {
        state = res;
       
    });

    yield put({ type: constant.SET_ROLE_DATA, data: state });
    yield put({ type: constant.SET_LOADING });
}
function* addroledata(formdata) {
    let res = '';
    yield put({ type: constant.SET_LOADING ,value:""});
    if (formdata.data.editid === undefined || formdata.data.editid === '') {
        res = yield CreateRole(formdata.data.formData);
    } else {
        let data = {
            oldrole: formdata.data.formData.oldrole,
            newName: formdata.data.formData.name,
            newDescription: formdata.data.formData.description
        };
        res = yield EditRole(data);
    }
    if (res.status === 200) {
        yield put({ type: constant.SET_LOADING ,value:"save"});
      
        yield put({ type: constant.SET_DIALOGUE_VIEW, value: '' });
  
    } else {
        let msg
    yield res.json().then((res) => msg=res);
    yield put({ type: constant.SET_LOADING ,value:msg });
    }
}
function* deleteroledata(formdata) {
    yield put({ type: constant.SET_LOADING ,value:""});
    const res = yield Deleterole(formdata.data);
    if (res.status === 200) {
        yield put({ type: constant.SET_LOADING ,value:"delete"});
        yield getroledata();
    } else {
        let msg
        yield res.json().then((res) => msg=res);
        yield put({ type: constant.SET_LOADING ,value:msg });
    }
}
function* getaccessroledata() {
    let state = [];
    yield put({ type: constant.SET_LOADING });
    yield GetsubRole().then((res) => {
        state = res;
    });
    yield put({ type: constant.SET_ACCESS_ROLE_DATA, data: state });
    yield put({ type: constant.SET_LOADING });
}
function* addaccessroledata(formdata) {
    let res = '';
    yield put({ type: constant.SET_LOADING ,value:""});
    if (formdata.data.editid === undefined || formdata.data.editid === '') {
        res = yield CreateSubRole(formdata.data.formData);
    } else {
        let data = {
            oldname: formdata.data.formData.oldName,
            newName: formdata.data.formData.subrole
        };
        res = yield EditRoleDefination(data);
    }
    if (res.status === 200) {
        yield put({ type: constant.SET_LOADING ,value:"save"});
        yield put({ type: constant.SET_DIALOGUE_VIEW, value: '' });
        
    } else {
        let msg
    yield res.json().then((res) => msg=res);
    yield put({ type: constant.SET_LOADING ,value:msg });
    }
}
function* deleteaccessroledata(formdata) {
    yield put({ type: constant.SET_LOADING ,value:""});
    const res = yield DeleteroleDefunation(formdata.data);
    if (res.status === 200) {
        yield put({ type: constant.SET_LOADING ,value:"delete"});
        yield getaccessroledata();
    } else {
        let msg
    yield res.json().then((res) => msg=res);
    yield put({ type: constant.SET_LOADING ,value:msg });
    }
}
function* getuserdata() {
    let state = [];
    yield put({ type: constant.SET_LOADING });
    yield GetAllUSer().then((res) => {
        state = res;
    });
    yield put({ type: constant.SET_USER_DATA, data: state });
    yield put({ type: constant.SET_LOADING });
}
function* userSaga() {
    yield takeEvery(constant.GET_ROLE_DATA, getroledata);
    yield takeEvery(constant.ADD_ROLE_DATA, addroledata);
    yield takeEvery(constant.DELETE_ROLE_DATA, deleteroledata);
    yield takeEvery(constant.GET_ACCESS_ROLE_DATA, getaccessroledata);
    yield takeEvery(constant.ADD_ACCESS_ROLE_DATA, addaccessroledata);
    yield takeEvery(constant.DELETE_ACCESS_ROLE_DATA, deleteaccessroledata);
    yield takeEvery(constant.GET_USER_DATA, getuserdata);
}
export default userSaga;
