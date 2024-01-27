import React from "react";
import {
  CenterContainer,
  OrderContainer,
} from "../../order/OrderStyledComponents";
import NavigationIndicator from "../../navigation/navigationIndicator/NavigationIndicator";
import { BsFillPencilFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import Profile from "./Profile";

const StepperForm = () => {
    let orderId=''
  return (
    <OrderContainer className="mt-4 mb-5">
      <CenterContainer>
        <NavigationIndicator
          curr={
            orderId!==''
              ? {
                  name: "Edit Order",
                  url: "/orders/edit/" + orderId,
                  icon: (
                    <BsFillPencilFill className="navigation-indicator-edit-icon" />
                  ),
                }
              : {
                  name:
                     location.pathname.split("/").includes("vendor")
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
      <div className="container-fluid card border-0">
        <Profile/>
        </div>
      </CenterContainer>
    </OrderContainer>
  );
};

export default StepperForm;
