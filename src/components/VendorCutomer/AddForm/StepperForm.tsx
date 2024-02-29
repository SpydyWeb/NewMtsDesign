import React, { useEffect, useState } from "react";
import {
  CenterContainer,
  OrderContainer,
} from "../../order/OrderStyledComponents";
import NavigationIndicatorTab from "../../Navigation/navigationIndicator/NavigationIndicatorTab";
import { BsFillPencilFill } from "react-icons/bs";
import { IoMdAdd, IoMdAddCircle } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import Profile from "./Profile";
import {
  GetCommunicationTypeList,
  GetLicenceType,
  GetStateList,
  GetVendorAddressbyid,
  GetVendorCommunicationbyid,
  GetVendorContactbyid,
  GetVendorEandOById,
  GetVendorFileById,
  GetVendorLicencebyid,
  GetVendorProduct,
  GetvendorProductbyid,
  Getvendorbyid,
} from "../../../servicesapi/Vendorapi";
import TabContainer from "./Stepper/Stepper";
import {
  CustomerFormField,
  VendorFormField,
  intiatalCustomer,
  intiatalVendor,
} from "./FormField";
import Communication from "./Communication";
import {
  GetCustomerCommunicationbyid,
  GetCustomerDetaills,
  GetCustomerFileById,
  GetCustomerProductDetaills,
  GetcommunicationLists,
} from "../../../servicesapi/Customerapi";
import Additional from "./Additional";
import Licence from "./Licence";
import FileUpload from "./FileUpload";
import Product from "./Product";
import UserRegistration from "./UserRegistration";
import IntegrationDetail from "./IntegrationDetail";

const StepperForm = () => {
  let orderId = "";
  const [activeTab, setActiveTab] = useState(0);
  const [communicatioonMethod, setCommunicationMethod] = useState([]);
  const [communicationType, setCommunicaionType] = useState([]);
  const [productD, setProductD] = useState([]);
  const [productdata, setProductdata] = useState([]);
  const [licenceType, setLicenceType] = useState([]);
  const [formFields, setformFields]: any = useState(
    location.pathname.split("/").includes("vendor")
      ? VendorFormField
      : CustomerFormField
  );

  const [Vendordata, setVendordata]: any = useState(
    location.pathname.split("/").includes("vendor")
      ? intiatalVendor
      : intiatalCustomer
  );

  const [allstate, setAllState] = useState([]);
  useEffect(() => {
    console.log(location, history);
    GetLicenceType().then((res: any) => {
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
      console.log(res);
     
      let data = res.communication_Method_Masters;
   
      setCommunicationMethod(data);
    });
    GetCommunicationTypeList().then((res) => {
      setCommunicaionType(res);
    });
  }, []);
  useEffect(() => {
    let urlD:any =
      location.pathname.split("/")[location.pathname.split("/").length - 1];
    if (isNaN(parseInt(urlD)) === false) {
      if (activeTab === 2) {
        if (location.pathname.split("/").includes("vendor")) {
          GetvendorProductbyid(urlD).then((res) => {
            setProductdata(res);
            setProductD(res);
          });
        } else {
          GetCustomerProductDetaills(urlD).then((res) => {
       
            
            setProductdata(res);
            setProductD(res);
          });
        }
      } else if (activeTab === 0) {
        if (location.pathname.split("/").includes("vendor")) {
          let data: any;
          Getvendorbyid(urlD).then((res) => {
            setVendordata(res);
          });
        } else {
          GetCustomerDetaills(urlD).then((res) => {
            console.log(res);
            setVendordata(res);
          });
        }
      } else if (activeTab === 1) {
        // setProductD(vendorDetail.product);
        GetcommunicationLists().then((res) => {
          let data = res.communication_Method_Masters;
          setCommunicationMethod(data);
        });
        if (location.pathname.split("/").includes("vendor")) {
          GetVendorCommunicationbyid(urlD).then((res) => {
            let comData: any = [];
            res.map((ele:any) => {
              comData.push({
                type: ele.type,
                detail: ele.detail,
                product_id: ele.product_id,
                id: ele.id,
                method: ele.method,
              });
            });
            setVendordata({ communication: comData });
          });
        } else {
          GetCustomerCommunicationbyid(+urlD).then((res) => {
            let comData: any = [];
            res.data.map((ele: any) => {
              comData.push({
                type: ele.type,
                detail: ele.detail,
                product_id: ele.product_id,
                id: ele.id,
                method: ele.method,
              });
            });
            setVendordata({ communication: comData });
          });
        }
        GetCommunicationTypeList().then((res) => {
          setCommunicaionType(res);
        });
      } else if (activeTab === 4) {
        if (location.pathname.split("/").includes("vendor")) {
          GetVendorLicencebyid(+urlD).then((res) => {
            let licencedata: any = [];
            res.map((ele:any) => {
              licencedata.push({
                firstName: ele.firstName,
                lastName: ele.lastName,
                licenceNo: ele.licenceNo,
                licenceType: ele.licenceType,
                status: ele.status,
                address: ele.address,
                expiry_Date: ele.expiry_Date.split("T")[0],
                issueDate: ele.issueDate.split("T")[0],
                disciplinaryAction: ele.disciplinaryAction,
                note: ele.note,
                state: ele.state,
                id: ele.id,
              });
            });
            setVendordata({ licences: licencedata });
          });
        } else {
          GetCustomerDetaills(urlD).then((res) => {
           console.log(res);
           
            setVendordata({customer_Integration_details:res.customer_Integration_details});
          });
          // let additional = vendorDetail.additionalDetail.length > 0 ? vendorDetail.additionalDetail[0].details : '';
          // vendorDetail['additionalDetail'] = [additional];
        }
      } else if (activeTab === 3) {
        console.log(history);

        if (location.pathname.split("/").includes("vendor")) {
          setVendordata(history.state.usr);
        } else {
          GetCustomerDetaills(urlD).then((res) => {
            console.log(res);
            setVendordata(res);
          });
        }
      } else if (activeTab === 5) {
        if (location.pathname.split("/").includes("vendor")) {
        GetVendorFileById(urlD).then((res) => {
          let data: any = [];
          res?.map((ele:any) =>
            data.push({
              fileName: ele.fileName,
              fileid: ele.fileid,
              id: ele.id,
              location: ele.location,
              remarks: ele.remarks,
              type: ele.type,
              issueDate: ele.issueDate?.split("T")[0],
              expiryDate: ele.expiryDate?.split("T")[0],
            })
          );

          setVendordata({ ...Vendordata, ["productFiles"]: data });
          // if (res.length === 0) {
          //     setiseditdata(0);
          //     seterrmsg('Data not found');
          // } else {
          //     setiseditdata(res.length);
          //     seterrmsg('');
          // }
        });
      }
      else{
        GetCustomerFileById(urlD).then((res) => {
          let data: any = [];
          res?.map((ele:any) =>
            data.push({
              fileName: ele.fileName,
              fileid: ele.fileid,
              id: ele.id,
              location: ele.location,
              remarks: ele.remarks==null?'':ele.remarks,
              type: ele.type,
              issueDate: ele.issueDate?.split("T")[0],
              expiryDate: ele.expiryDate?.split("T")[0],
            })
          );
          setVendordata({ ...Vendordata, ['productFiles']: data });
          // if (res.length === 0) {
          //     // setiseditdata(0);
          //     // seterrmsg('Data not found');
          // } else {
          //     setiseditdata(res.length);
          //     seterrmsg('');
          // }
      });
      }
      }
    }
  }, [activeTab]);
  return (
    <OrderContainer className="mt-4">
      <CenterContainer>
        <NavigationIndicatorTab
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
              setVendordata={setVendordata}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : activeTab === 1 ? (
            <Communication
              formFields={formFields.communication}
              Vendordata={Vendordata}
              setVendordata={setVendordata}
              communicationType={communicationType}
              communicatioonMethod={communicatioonMethod}
              productD={productD}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : activeTab === 2 ? (
            <Product
              productdata={productdata}
              productD={productD}
              Vendordata={Vendordata}
              setVendordata={setVendordata}
              setProductD={setProductD}
              setProductdata={setProductdata}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : activeTab === 3 ? (
            <Additional
              formFields={formFields.additional}
              Vendordata={Vendordata}
              setVendordata={setVendordata}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : activeTab === 4 ? (
            location.pathname.split("/").includes("vendor") ? (
              <Licence
                formFields={formFields.licence}
                Vendordata={Vendordata}
                setVendordata={setVendordata}
                licenceType={licenceType}
                allstate={allstate}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ) : (
              <IntegrationDetail
                formFields={formFields.customer_Integration_details}
                Vendordata={Vendordata}
                setVendordata={setVendordata}
              />
            )
          ) : activeTab === 5 ? (
            <FileUpload
              formFields={formFields.fileupload}
              Vendordata={Vendordata}
              productD={productD}
              setVendordata={setVendordata}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : activeTab === 6 ? (
            <UserRegistration
              Vendordata={Vendordata}
              setVendordata={setVendordata}
              formFields={formFields.userregistration}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
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
