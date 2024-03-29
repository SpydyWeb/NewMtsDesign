// action - customization reducer
import { constant } from "../constant";
export const SET_MENU = "@customization/SET_MENU";
export const MENU_TOGGLE = "@customization/MENU_TOGGLE";
export const MENU_OPEN = "@customization/MENU_OPEN";
export const SET_FONT_FAMILY = "@customization/SET_FONT_FAMILY";
export const SET_BORDER_RADIUS = "@customization/SET_BORDER_RADIUS";
export const setActiveStep = (value: any) => {
  return { type: constant.SET_Active_Step_DATA, value: value };
};
export const getTabview = () => {
  return { type: constant.GET_TAB_VIEW };
};
// export const SET_TAB_VIEW = constant.SET_TAB_VIEW;
export const setTabview = (value: any) => {
  return { type: constant.SET_TAB_VIEW, value: value };
};
export const setIsdataSaved = () => {
  return { type: constant.SET_DATA_SAVE, value: false };
};
export const setDialogueview = (value: any) => {
  return { type: constant.SET_DIALOGUE_VIEW, value: value };
};
export const setloading = () => {
  return { type: constant.SET_LOADING, };
};


export const triggerApiCall = (payload: any) => ({
  type: constant.TRIGGER_API_CALL,
  payload,
});

export const apiCallSuccess = (data: any) => ({
  type: constant.API_CALL_SUCCESS,
  payload: data,
});

export const apiCallFailure = (error: any) => ({
  type: constant.API_CALL_FAILURE,
  payload: error,
});
