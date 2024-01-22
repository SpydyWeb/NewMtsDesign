import React, { useState } from "react";
import Stepper from "../../navigation/stepper/Stepper";
import { CenterContainer, OrderContainer } from "../OrderStyledComponents";
import BasicInfo from "./BasicInfo";
import DeedsTable from "./DeedsTable";
import MortgageTable from "./MortgageTable";
import LienTable from "./LienTable";
import TaxTable from "./TaxTable";
import MiscellaneousTable from "./MiscellaneousTable";
import NavigationIndicator from "../../navigation/navigationIndicator/NavigationIndicator";
import { useParams } from "react-router-dom";
import {VscSymbolProperty} from "react-icons/vsc";
import {AiFillFileText} from "react-icons/ai";


const Order: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { orderId } = useParams();

  return (
    <OrderContainer className="mt-4">
      <CenterContainer>
      <NavigationIndicator curr={{ name: "Order Property", url: "/orders/property/"+orderId, icon: <VscSymbolProperty className="navigation-indicator-icon"/>}} path={[{ name: "Orders", url: "/orders", icon: <AiFillFileText className="navigation-indicator-icon"/> }]} />
      </CenterContainer>
      <CenterContainer className="mt-4">
        <Stepper activeTab={activeTab} setActiveTab={setActiveTab} />
      </CenterContainer>
      <CenterContainer>
        {activeTab == 0 && <BasicInfo />}
        {activeTab == 1 && <DeedsTable />}
        {activeTab == 2 && <MortgageTable />}
        {activeTab == 3 && <LienTable />}
        {activeTab == 4 && <TaxTable />}
        {activeTab == 5 && <MiscellaneousTable />}
      </CenterContainer>
    </OrderContainer>
  );
};

export default Order;
