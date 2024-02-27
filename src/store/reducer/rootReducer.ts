import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { customerData } from './customerreducer';
import { VendorData } from './vendorreducer';
import { UserRoleData } from './userreducer';

// Define RootState type representing the entire Redux store state
type RootState = {
  customization: ReturnType<typeof customizationReducer>;
  customerData: ReturnType<typeof customerData>;
  VendorData: ReturnType<typeof VendorData>;
  UserRoleData: ReturnType<typeof UserRoleData>;
  // Add other slices here if needed
};

// Combine all individual reducers into a single root reducer
const rootReducer = combineReducers({
  customization: customizationReducer,
  customerData,
  VendorData,
  UserRoleData,
  // Add other slices here if needed
});

export default rootReducer;
export type { RootState }; // Export RootState type for external use
