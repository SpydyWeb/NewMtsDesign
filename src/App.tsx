import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/HomeComp/Home";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import SideBarTab from "./components/Navigation/SideBar/SideBarTab";
import { ProSidebarProvider } from "react-pro-sidebar";
import { createContext, useState } from "react";
import Toasts from "./components/utils/ToastContainer";
import LoadingOverlay from "react-loading-overlay-ts";
import ReactLoading from "react-loading";
import ScrollToTop from "./components/utils/ScrollToTop";
import Login from "./components/Authenticate/Login";
import ViewTable from "./components/VendorMaster/ViewTable";
import CommonForm from "./components/VendorMaster/CommonForm";
import ViewTableData from "./components/VendorCutomer/ViewTableData";
import StepperForm from "./components/VendorCutomer/AddForm/StepperForm";
import ViewVendorProduct from "./components/VendorMaster/ViewVendorProduct";
import { AddVendorCountyProduct } from "./servicesapi/Vendorapi";
import AddVendorProduct from "./components/VendorMaster/AddVendorProduct";
import AddRoleDefination from "./components/VendorMaster/AddRoleDefination";
import Viewaccessrole from "./components/VendorMaster/Viewaccessrole";
import NavBar from "./components/Navigation/navbar/NavBar";
import { Footer } from "./components/Navigation/navbar/NavBarStyledComponents";
import { AiFillHome } from "react-icons/ai";
export type ApplicationContextType = {
  messages: any[];
  updateMessages: (m: any[]) => void;
  loading: boolean;
  updateLoading: (l: boolean) => void;
  loadingMessage: string;
  updateLoadingMessage: (message: string) => void;
};

export const ApplicationContext = createContext<ApplicationContextType | null>(
  null
);

export const MenuData = [
  {
    icon: <AiFillHome />,
    title: "Home",
    url: "/dashboard",
    subCategory:[]
  },
  {
    icon: <AiFillHome />,
    title: "User Module",
    url: "/dashboard",
    subCategory: [
      {
        icon: <AiFillHome />,
        title: "Role Master",
        url: "/role",
      },
      {
        icon: <AiFillHome />,
        title: "Access Role Master",
        url: "/accessrole",
      },
      {
        icon: <AiFillHome />,
        title: "Role Defination",
        url: "/viewaccessrole",
      },
      {
        icon: <AiFillHome />,
        title: "Users",
        url: "/user",
      },
    ],
  },
  {
    icon: <AiFillHome />,
    title: "Vendor Master Module",
    url: "/dashboard",
    subCategory: [
      {
        icon: <AiFillHome />,
        title: "Licence Type",
        url: "/licencetype",
      },
      {
        icon: <AiFillHome />,
        title: "Communication Type",
        url: "/communicationtype",
      },
      {
        icon: <AiFillHome />,
        title: "State",
        url: "/state",
      },
      {
        icon: <AiFillHome />,
        title: "Vendor Product",
        url: "/viewvendorproduct",
      },
    ],
  },

  {
    icon: <AiFillHome />,
    title: "Vendor",
    url: "/viewvendor",
    subCategory: [
      {
        icon: <AiFillHome />,
        title: "Search",
        url: "/viewvendor",
      },
      {
        icon: <AiFillHome />,
        title: "Add",
        url: "/vendor/create",
      },
    ],
  },
  {
    icon: <AiFillHome />,
    title: "Customer",
    url: "/customer",
    subCategory: [
      {
        icon: <AiFillHome />,
        title: "Search",
        url: "/customer",
      },
      {
        icon: <AiFillHome />,
        title: "Add",
        url: "/customer/create",
      },
    ],
  },
];

function App() {
  const [alertMessages, setAlertMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const location = useLocation();
  const [subClass,setSubclass]:any=useState([])
  const [activeClass,setActiveClass]=useState('')
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
const handleSubClass=(data:any,name:string)=>{
setActiveClass(name)
  setSubclass(data)
}
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
      text={loadingMessage}
    >
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
        }}
      >
        <ProSidebarProvider>
          <ScrollToTop>
            <div className="App">
              {location.pathname === "/" ||
              location.pathname === "/createuser" ? (
                <></>
              ) : (
                <NavBar MenuData={MenuData} handleSubClass={handleSubClass} activeClass={activeClass}/>
              )}
              <div className="Body" style={{ width: "100%" }}>
                {location.pathname === "/" ||
                location.pathname === "/createuser" ? (
                  <></>
                ) : (
                  <SideBarTab subClass={subClass} activeClass={activeClass}/>
                )}

                <main id="main">
                  <Toasts
                    messages={alertMessages}
                    setMessages={setAlertMessages}
                  />
                  <div className="content-section">
                    <Routes>
                      <Route path="/" Component={Login} />
                      <Route path="/dashboard" Component={Home} />
                      <Route path="/licencetype" Component={ViewTable} />
                      <Route path="/communicationtype" Component={ViewTable} />
                      <Route path="/state" Component={ViewTable} />
                      <Route path="/role" Component={ViewTable} />
                      <Route path="/user" Component={ViewTable} />
                      <Route path="/accessrole" Component={ViewTable} />
                      <Route path="/user/add" Component={CommonForm} />
                      <Route path="/createuser" Component={CommonForm} />
                      <Route path="/accessrole/add" Component={CommonForm} />
                      <Route path="/licencetype/add" Component={CommonForm} />
                      <Route
                        path="/accessrole/add/:id"
                        Component={CommonForm}
                      />
                      <Route
                        path="/licencetype/add/:id"
                        Component={CommonForm}
                      />
                      <Route
                        path="/communicationtype/add"
                        Component={CommonForm}
                      />
                      <Route
                        path="/communicationtype/add/:id"
                        Component={CommonForm}
                      />
                      <Route path="/state/add" Component={CommonForm} />
                      <Route path="/role/add" Component={CommonForm} />
                      <Route path="/state/add/:id" Component={CommonForm} />
                      <Route path="/role/add/:id" Component={CommonForm} />
                      <Route path="/viewvendor" Component={ViewTableData} />
                      <Route path="/vendor/create" Component={StepperForm} />
                      <Route path="/vendor/edit/:id" Component={StepperForm} />
                      <Route path="/customer/create" Component={StepperForm} />
                      <Route
                        path="/customer/edit/:id"
                        Component={StepperForm}
                      />
                      <Route path="/customer" Component={ViewTableData} />
                      <Route
                        path="/viewvendorproduct"
                        Component={ViewVendorProduct}
                      />
                      <Route
                        path="/viewvendorproduct/add"
                        Component={AddVendorProduct}
                      />
                      <Route
                        path="/accessroledefinition"
                        Component={AddRoleDefination}
                      />
                      <Route
                        path="/viewaccessrole"
                        Component={Viewaccessrole}
                      />
                    </Routes>
                  </div>
                  <Footer>
                    Copyright © 2024 <b>MTS Group</b>. All Rights Reserved
                  </Footer>
                </main>
              </div>
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
