import React, { useEffect, useState } from "react";
import {
  CenterContainer,
  OrderContainer,
} from "../../order/OrderStyledComponents";
import NavigationIndicator from "../../navigation/navigationIndicator/NavigationIndicator";
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
  GetVendorLicencebyid,
  GetVendorProduct,
} from "../../../servicesapi/Vendorapi";
import TabContainer from "./Stepper/Stepper";
import { VendorFormField, intiatalVendor } from "./FormField";
import Communication from "./Communication";
import { GetCustomerCommunicationbyid, GetcommunicationLists } from "../../../servicesapi/Customerapi";
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
    console.log(location,history);
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
      let data = res.data.communication_Method_Masters;
      setCommunicationMethod(data);
    });
    GetCommunicationTypeList().then((res) => {
      setCommunicaionType(res);
    });
   
  }, []);
  useEffect(()=>{
    let urlD =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
 if(isNaN(parseInt(urlD)) === false){
    if (activeTab === 0) {
    if (location.pathname.split("/").includes("vendor")) {
      let data: any;
      GetVendorAddressbyid(urlD).then((res) => {
        data = {
          primery_Address: {
            address: res[0].address,
            city: res[0].city,
            createdDate: res[0].createdDate,
            id: res[0].id,
            isDeleted: res[0].isDeleted,
            pincode: res[0].pincode,
            state: res[0].state,
            suite: res[0].suite,
            updateDate: res[0].updateDate,
          },
          secondary_Address: {
            address: res[1].address,
            city: res[1].city,
            createdDate: res[1].createdDate,
            id: res[1].id,
            isDeleted: res[1].isDeleted,
            pincode: res[1].pincode,
            state: res[1].state,
            suite: res[1].suite,
            updateDate: res[1].updateDate,
          },
        };
        GetVendorContactbyid(urlD).then((res) => {
          (data["primery_Contact"] = {
            firstname: res[0].firstName,
            middleName: res[0].middleName,
            lastname: res[0].lastName,
            phone: res[0].phone,
            email: res[0].email,
            ext: res[0].ext,
            cellphone: res[0].cellPhone,
            id: res[0].id,
            updateDate: res[0].updateDate,
            createdDate: res[0].createdDate,
            isDeleted: res[0].isDeleted,
          }),
            (data["secondary_contact"] = {
              firstname: res[1] !== null ? res[1].firstName : "",
              middleName: res[1] !== null ? res[1].middleName : "",
              lastname: res[1] !== null ? res[1].lastName : "",
              phone: res[1] !== null ? res[1].phone : "",
              email: res[1] !== null ? res[1].email : "",
              ext: res[1] !== null ? res[1].ext : "",
              cellphone: res[1] !== null ? res[1].cellPhone : "",
              id: res[1] !== null ? res[1].id : "",
              updateDate: res[1] !== null ? res[1].updateDate : "",
              createdDate: res[1] !== null ? res[1].createdDate : "",
              isDeleted: res[1] !== null ? res[1].isDeleted : "",
            });
          // data['accountinfo'] = vendorDetail.accountinfo;
          console.log(data);

          setVendordata(data);
          GetVendorEandOById(urlD).then((res) => {
            if (res !== "" && res !== null) setEOFormValue(res);
          });
        });
      });
    }
  }
  else if (activeTab === 1) {
    // setProductD(vendorDetail.product);
    GetcommunicationLists().then((res) => {
        let data = res.data.communication_Method_Masters;
        setCommunicationMethod(data);
    });
    if (location.pathname.split("/").includes("vendor")) {
        GetVendorCommunicationbyid(urlD).then((res) => {
          let comData:any=[]
          res.map(ele=>{
            comData.push({type: ele.type,
            detail: ele.detail,
            product_id: ele.product_id,
            method: ele.method})
          })
            setVendordata({communication:comData});
        });
    } else {
        GetCustomerCommunicationbyid(+urlD).then((res) => {
            
            setVendordata(res.data);
        });
    }
    GetCommunicationTypeList().then((res) => {
        setCommunicaionType(res);
    });
}
else if (activeTab === 4) {
  if (location.pathname.split("/").includes("vendor")) {
    GetVendorLicencebyid(+urlD).then((res)=>{
      let licencedata:any=[]
      res.map(ele=>{
        licencedata.push({
          firstName: ele.firstName,
      lastName:ele.lastName,
      licenceNo: ele.licenceNo,
      licenceType: ele.licenceType,
      status: ele.status,
      address: ele.address,
      expiry_Date: ele.expiry_Date.split("T")[0],
      issueDate: ele.issueDate.split("T")[0],
      disciplinaryAction: ele.disciplinaryAction,
      note: ele.note,
      state: ele.state,
        })
      })
      setVendordata({"licences":licencedata})
    })
  
    
  } else {
      // let additional = vendorDetail.additionalDetail.length > 0 ? vendorDetail.additionalDetail[0].details : '';
      // vendorDetail['additionalDetail'] = [additional];
  }
} 
else if (activeTab === 3) {
  if (location.pathname.split("/").includes("vendor")) {

      setVendordata(history.state.usr);
  } else {
 
      setVendordata(history.state.usr);
  }
}
 }
  },[activeTab])
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
            <Product
              productdata={productdata}
              productD={productD}
              Vendordata={Vendordata}
              setVendordata={setVendordata}
              setProductD={setProductD}
              setProductdata={setProductdata}
            />
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
