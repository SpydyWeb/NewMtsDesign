// project imports

// action - state management
import * as actionTypes from "../action/actions";
import { constant } from "../constant";
export const initialState = {
  isOpen: [], // for active default menu
  opened: true,
  tabview: "View",
  dialogueview: "",
  activeStep: 0,
  isDataSaved: false,
  data: null,
  error: null,
  isLoading:false,
  Message:''
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      let id = [];
      id.push(action.id);
      return {
        ...state,
        isOpen: id,
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened,
      };
    case constant.SET_TAB_VIEW:
      return { ...state, tabview: action.value };
    case constant.SET_DATA_SAVE:
      return { ...state, isDataSaved: action.value };
    case constant.SET_DIALOGUE_VIEW:
      return { ...state, dialogueview: action.value };
    case constant.SET_Active_Step_DATA:
      return { ...state, activeStep: action.value };
      case constant.SET_LOADING:
        return { ...state, isLoading:  !state.isLoading,Message:action.value};
    case constant.API_CALL_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case constant.API_CALL_FAILURE:
      return {
        ...state,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customizationReducer;
