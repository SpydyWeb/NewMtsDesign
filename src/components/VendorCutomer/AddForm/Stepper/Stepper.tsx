import { Dispatch, SetStateAction, useState } from "react";
import {
  Tabs,
  TabLinkList,
  TabLink,
  TabLinkContent,
} from "./StepperStyledComponents";
import { MdOutlineDiversity2 } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { GiPayMoney, GiShakingHands } from "react-icons/gi";
import { FaWpforms } from "react-icons/fa";
import DownloadReportButton from "../../../utils/ReportDownloadButton";
type StepperProps = {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
};
const tabsCutomerName = [
  "Profile",
  "Communication",
  "Product",
  "Additional",
  "Customer Integration Details",
  "File Upload",
];

const tabsVendorName = [
  "Profile",
  "Communication",
  "Product",
  "Additional",
  "Licence",
  "File Upload",
];

const TabContainer = (props: StepperProps) => {
  const [tabs, setTabs] = useState(
    location.pathname.split("/").includes("vendor")
      ? tabsVendorName
      : tabsCutomerName
  );
  return (
    <Tabs>
      <TabLinkList>
        {tabs.map((val: any, i: number) => {
          return (
            <TabLink
              active={props.activeTab === i}
              onClick={() => props.setActiveTab(i)}
              key={i}
            >
              <TabLinkContent>
                <FaWpforms />
                &nbsp;{val}
              </TabLinkContent>
            </TabLink>
          );
        })}

        {/* <DownloadReportButton /> */}
      </TabLinkList>
    </Tabs>
  );
};

export default TabContainer;
