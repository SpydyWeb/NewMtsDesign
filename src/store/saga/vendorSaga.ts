import { takeEvery, put } from "redux-saga/effects";
import { constant } from "../constant";
import toast from "react-hot-toast";
import {
  GetStateList,
  GetallVendorBySearch,
  GetLicenceType,
  GetCommunicationTypeList,
  AddLicenceType,
  AddCommunication,
  DeleteLicenceType,
  DeleteCommuncationType,
  UpdateLicenceType,
  UpdateCommuncationType,
  AddState,
  UpdateState,
  DeleteState,
  GetVendorProduct,
} from "../../servicesapi/Vendorapi";
import { AlterToast } from "../../utils/renderUitils";
import { apiCallSuccess } from "../action/actions";

let data: any = [];
function* getstatedata() {
  let state: any = [];
  yield put({ type: constant.SET_LOADING });
  yield GetStateList().then((res) => {
    state = res;
  });
  yield put({ type: constant.SET_STATE_DATA, data: state });
  yield put({ type: constant.SET_LOADING });
}
function* getvendordata(searchValue: any) {
  yield GetallVendorBySearch(searchValue).then((res) => {
    data = res;
  });
  yield put({ type: constant.SET_VENDOR_DATA, data: data });
}
function* getlicencetypedata() {
  yield put({ type: constant.SET_LOADING });
  yield GetLicenceType().then((res) => {
    data = res;
  });
  yield put({ type: constant.SET_LICENCETYPE_DATA, data: data });
  yield put({ type: constant.SET_LOADING });
}
function* getcommunicationtypedata() {
  yield put({ type: constant.SET_LOADING });
  yield GetCommunicationTypeList().then((res) => {
    data = res;
  });
  yield put({ type: constant.SET_COMMUNICATIONTYPE_DATA, data: data });
  yield put({ type: constant.SET_LOADING });
}
function* addlicencetypedata(formdata: any): any {
  let res: any = {};
  yield put({ type: constant.SET_LOADING, value: "" });
  if (formdata.data.editid === undefined || formdata.data.editid === "") {
    res = yield AddLicenceType(formdata.data.formData);
  } else
    res = yield UpdateLicenceType(formdata.data.formData, formdata.data.editid);
  if (res.status === 200) {
    yield put({ type: constant.SET_LOADING, value: "save" });
  } else {
    let msg;
    yield res.json().then((res:any) => (msg = res));
    yield put({ type: constant.SET_LOADING, value: msg });
  }
}
function* addcommunicationtypedata(formdata: any): any {
  let res: any = "";
  yield put({ type: constant.SET_LOADING, value: "" });
  if (formdata.data.editid === undefined || formdata.data.editid === "")
    res = yield AddCommunication(formdata.data.formData);
  else
    res = yield UpdateCommuncationType(
      formdata.data.formData,
      formdata.data.editid
    );
  if (res.status === 200) {
    yield put({ type: constant.SET_LOADING, value: "save" });
    yield put({ type: constant.SET_DIALOGUE_VIEW, value: "" });
  } else {
    let msg;
    yield res.json().then((res: any) => (msg = res));
    yield put({ type: constant.SET_LOADING, value: msg });
  }
}
function* deletelicencetypedata(formdata: any): any {
  const res = yield DeleteLicenceType(formdata.data);
  if (res.status === 200) {
    yield toast.success("Licence deleted Succsessfully");
    yield getlicencetypedata();
  } else {
    yield res.json().then((res: any) => toast.error(res));
  }
}
function* deletecommunicationtypedata(formdata: any): any {
  const res = yield DeleteCommuncationType(formdata.data);
  if (res.status === 200) {
    yield toast.success("Communication deleted Succsessfully");
    yield getcommunicationtypedata();
  } else {
    yield res.json().then((res: any) => toast.error(res));
  }
}
function* deletestatedata(formdata: any): any {
  const res = yield DeleteState(formdata.data);
  if (res.status === 200) {
    yield toast.success("State deleted Succsessfully");
    yield getstatedata();
  } else {
    yield res.json().then((res: any) => toast.error(res));
  }
}
function* addstatedata(formdata: any): any {
  let res: any = "";
  yield put({ type: constant.SET_LOADING, value: "" });
  formdata.data.formData.nationId = 1;
  if (formdata.data.editid === undefined || formdata.data.editid === "")
    res = yield AddState(formdata.data.formData);
  else res = yield UpdateState(formdata.data.formData, formdata.data.editid);
  if (res.status === 200) {
    yield put({ type: constant.SET_LOADING, value: "save" });
    yield put({ type: constant.SET_DIALOGUE_VIEW, value: "" });
    yield getstatedata();
  } else {
    let msg;
    yield res.json().then((res:any) => (msg = res));
    yield put({ type: constant.SET_LOADING, value: msg });
  }
}
function* getproductdata() {
  yield GetVendorProduct().then((res) => {
    data = res;
  });
  yield put({ type: constant.SET_PRODUCT_DATA, data: data });
}
function* vendorSaga() {
  yield takeEvery(constant.GET_STATE_DATA, getstatedata);
  yield takeEvery(constant.GET_VENDOR_DATA, getvendordata);
  yield takeEvery(constant.GET_LICENCETYPE_DATA, getlicencetypedata);
  yield takeEvery(
    constant.GET_COMMUNICATIONTYPE_DATA,
    getcommunicationtypedata
  );
  yield takeEvery(constant.ADD_LICENCETYPE_DATA, addlicencetypedata);
  yield takeEvery(
    constant.ADD_COMMUNICATIONTYPE_DATA,
    addcommunicationtypedata
  );
  yield takeEvery(constant.ADD_STATE_DATA, addstatedata);
  yield takeEvery(constant.DELETE_LICENCETYPE_DATA, deletelicencetypedata);
  yield takeEvery(
    constant.DELETE_COMMUNICATIONTYPE_DATA,
    deletecommunicationtypedata
  );
  yield takeEvery(constant.DELETE_STATE_DATA, deletestatedata);
  yield takeEvery(constant.GET_PRODUCT_DATA, getproductdata);
}

export default vendorSaga;
