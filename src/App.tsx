import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/Home";
import Orders from "./components/order/Order";
import "./App.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { components, formFields } from "./components/authenticate/AwsAmplifyAuthenticatorComponents";
import SideBar from "./components/navigation/sidebar/SideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import { createContext, useState } from "react";
import Toasts from "./components/utils/ToastContainer";
import LoadingOverlay from "react-loading-overlay-ts";
import ReactLoading from "react-loading";
import OrderProperty from "./components/order/orderProperty/OrderProperty";
import AddOrder from "./components/order/addOrder/AddOrder";
import Confirmation from "./components/order/addOrder/ConfirmationPage";
import ScrollToTop from "./components/utils/ScrollToTop";
import Login from "./components/Authenticate/Login";
import ViewTable from "./components/VendorMaster/ViewTable";
import CommonForm from "./components/VendorMaster/CommonForm";
import ViewTableData from "./components/VendorCutomer/ViewTableData"
import StepperForm from "./components/VendorCutomer/AddForm/StepperForm";
import ViewVendorProduct from "./components/VendorMaster/ViewVendorProduct";
import { AddVendorCountyProduct } from "./servicesapi/Vendorapi";
import AddVendorProduct from "./components/VendorMaster/AddVendorProduct";
export type ApplicationContextType = {
  messages: any[];
  updateMessages: (m: any[]) => void;
  loading: boolean;
  updateLoading: (l: boolean) => void;
  loadingMessage: string;
  updateLoadingMessage: (message: string) => void;
};

export const ApplicationContext = createContext<ApplicationContextType | null>(null);

function App() {
  const [alertMessages, setAlertMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const location = useLocation();
  const updateAlertMessages = (messages: any[]) => {
    if (messages.length > 3) messages.pop();
    setAlertMessages(messages);
  };

  const updateLoading = (l: boolean) => {
    setLoading(l);
  };

  const updateLoadingMessage = (message: string) => {
    setLoadingMessage(message);
  };

  return (
    <LoadingOverlay
      className="w-100 overflow-x-hidden"
      active={loading}
      spinner={
        <>
          <ReactLoading type="bars" className="mx-auto" />
          <br />
        </>
      }
      text={loadingMessage}>
      {/* <Authenticator formFields={formFields} components={components} hideSignUp={true}>
        {({ signOut, user }) => ( */}
          <ApplicationContext.Provider
            value={{
              messages: alertMessages,
              updateMessages: updateAlertMessages,
              loading: loading,
              updateLoading: updateLoading,
              loadingMessage: loadingMessage,
              updateLoadingMessage: updateLoadingMessage,
            }}>
            <ProSidebarProvider>
              <ScrollToTop>
                <div className="App">
                  {location.pathname==="/"?<></>:<SideBar/>}

                  <main id="main">
                    <Toasts messages={alertMessages} setMessages={setAlertMessages} />
                    <Routes>
                      <Route path="/" Component={Login} />
                      <Route path="/dashboard" Component={Home} />
                      
                      <Route path="/orders/property/:orderId" Component={OrderProperty} />
                      <Route path="/orders/edit/:orderId" Component={AddOrder} />
                      <Route path="/orders/add" Component={AddOrder} />
                      <Route path="/orders/confirmation" Component={Confirmation} />
                      <Route path="/orders" Component={Orders} />
                      <Route path="/licencetype" Component={ViewTable} />
                      <Route path="/communicationtype" Component={ViewTable} />
                      <Route path="/state" Component={ViewTable} />
                      <Route path="/role" Component={ViewTable} />
                      <Route path="/accessrole" Component={ViewTable} />
                      <Route path="/accessrole/add" Component={CommonForm} />
                      <Route path="/licencetype/add" Component={CommonForm} />
                      <Route path="/accessrole/add/:id" Component={CommonForm} />
                      <Route path="/licencetype/add/:id" Component={CommonForm} />
                      <Route path="/communicationtype/add" Component={CommonForm} />
                      <Route path="/communicationtype/add/:id" Component={CommonForm} />
                      <Route path="/state/add" Component={CommonForm} />
                      <Route path="/role/add" Component={CommonForm} />
                      <Route path="/state/add/:id" Component={CommonForm} />
                      <Route path="/role/add/:id" Component={CommonForm} />
                      <Route path="/viewvendor" Component={ViewTableData} />
                      <Route path="/vendor/create" Component={StepperForm} />
                      <Route path="/vendor/edit/:id" Component={StepperForm} />
                      <Route path="/customer/create" Component={StepperForm} />
                      <Route path="/customer" Component={ViewTableData} />
                      <Route path="/viewvendorproduct" Component={ViewVendorProduct} />
                      <Route path="/viewvendorproduct/add" Component={AddVendorProduct} />
                 
                    </Routes>
                  </main>
                </div>
              </ScrollToTop>
            </ProSidebarProvider>
          </ApplicationContext.Provider>
         {/* )}
      </Authenticator>  */}
    </LoadingOverlay>
  );
}

export default App;
