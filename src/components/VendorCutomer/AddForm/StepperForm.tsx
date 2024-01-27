import React, { useEffect, useState } from "react";
import {
  CenterContainer,
  OrderContainer,
} from "../../order/OrderStyledComponents";
import NavigationIndicator from "../../navigation/navigationIndicator/NavigationIndicator";
import { BsFillPencilFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import Profile from "./Profile";
import {
  GetCommunicationTypeList,
  GetStateList,
} from "../../../servicesapi/Vendorapi";
import TabContainer from "./Stepper/Stepper";
import { VendorFormField, intiatalVendor } from "./FormField";
import Communication from "./Communication";
import { GetcommunicationLists } from "../../../servicesapi/Customerapi";

const StepperForm = () => {
  let orderId = "";
  const [activeTab, setActiveTab] = useState(1);
  const [communicatioonMethod, setCommunicationMethod] = useState([]);
  const [communicationType, setCommunicaionType] = useState([]);
  const [formFields, setformFields]: any = useState(
    location.pathname.split("/").includes("vendor") ? VendorFormField : ""
  );

  const [Vendordata, setVendordata]: any = useState(
    location.pathname.split("/").includes("vendor") ? intiatalVendor : ""
  );

  const [allstate, setAllState] = useState([]);
  useEffect(() => {
    GetStateList().then((res: any) => {
      setAllState(res);
    });
    GetcommunicationLists().then((res) => {
      let data = res.data.communication_Method_Masters;
      setCommunicationMethod(data);
    });
    GetCommunicationTypeList().then((res) => {
      setCommunicaionType(res);
    });
  }, []);
  return (
    <OrderContainer className="mt-4">
      <CenterContainer>
        <NavigationIndicator
          curr={
            orderId !== ""
              ? {
                  name: "Edit Order",
                  url: "/orders/edit/" + orderId,
                  icon: (
                    <BsFillPencilFill className="navigation-indicator-edit-icon" />
                  ),
                }
              : {
                  name: location.pathname.split("/").includes("vendor")
                    ? "Add Vendor"
                    : "Add Customer",
                  url: `/${
                    location.pathname.split("/").includes("vendor")
                      ? "vendor"
                      : "customer"
                  }/create`,
                  icon: <IoMdAddCircle className="navigation-indicator-icon" />,
                }
          }
          path={[
            {
              name: location.pathname.split("/").includes("vendor")
                ? "Vendor"
                : "Customer",
              url: `/${
                location.pathname.split("/").includes("vendor")
                  ? "viewvendor"
                  : "customer"
              }`,
              icon: <AiFillFileText className="navigation-indicator-icon" />,
            },
          ]}
        />
      </CenterContainer>
      <CenterContainer className="mt-3">
        <TabContainer activeTab={activeTab} setActiveTab={setActiveTab} />
      </CenterContainer>
      <CenterContainer className="mt-3 mb-5">
        <div className="container-fluid card border-0">
          {activeTab === 0 ? (
            <Profile
              allstate={allstate}
              formFields={formFields.profile}
              Vendordata={Vendordata}
            />
          ) : activeTab === 1 ? (
            <Communication
              formFields={formFields.communication}
              Vendordata={Vendordata}
              setVendordata={setVendordata}
              communicationType={communicationType}
              communicatioonMethod={communicatioonMethod}
            />
          ) : (
            <></>
          )}
        </div>
      </CenterContainer>
    </OrderContainer>
  );
};

export default StepperForm;
