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
  GetLicenceType,
  GetStateList,
  GetVendorProduct,
} from "../../../servicesapi/Vendorapi";
import TabContainer from "./Stepper/Stepper";
import { VendorFormField, intiatalVendor } from "./FormField";
import Communication from "./Communication";
import { GetcommunicationLists } from "../../../servicesapi/Customerapi";
import Additional from "./Additional";
import Licence from "./Licence";
import FileUpload from "./FileUpload";
import Product from "./Product";

const StepperForm = () => {
  let orderId = "";
  const [activeTab, setActiveTab] = useState(0);
  const [communicatioonMethod, setCommunicationMethod] = useState([]);
  const [communicationType, setCommunicaionType] = useState([]);
  const [productD, setProductD] = useState([]);
  const [productdata, setProductdata] = useState([]);
  const [licenceType, setLicenceType] = useState([]);
  const [formFields, setformFields]: any = useState(
    location.pathname.split("/").includes("vendor") ? VendorFormField : ""
  );

  const [Vendordata, setVendordata]: any = useState(
    location.pathname.split("/").includes("vendor") ? intiatalVendor : ""
  );

  const [allstate, setAllState] = useState([]);
  useEffect(() => {
    GetLicenceType().then((res:any) => {
      setLicenceType(res);
  });
    GetVendorProduct().then((res: any) => {
      setProductdata(res);
      let data: any = [];
      res.map((ele: any) => {
        ele.subCategory.map((val: any) => {
          data.push({
            name: val.name,
            price1: 0,
            price2: 0,
            price3: 0,
            productId: ele.id,
            selected: false,
            id: val.id,
          });
        });
      });

      setProductD(data);
    });
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
              productD={productD}
            />
          ) : activeTab === 2 ? (
            <Product productdata={productdata} productD={productD} />
          ) : activeTab === 3 ? (
            <Additional
              formFields={formFields.additional}
              Vendordata={Vendordata}
              setVendordata={setVendordata}

            />
          ) : activeTab === 4 ? (
            <Licence
              formFields={formFields.licence}
              Vendordata={Vendordata}
              setVendordata={setVendordata}
              licenceType={licenceType}
              allstate={allstate}
            />
          ) : activeTab === 5 ? (
            <FileUpload
              formFields={formFields.fileupload}
              Vendordata={Vendordata}
              productD={productD}
              setVendordata={setVendordata}
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
