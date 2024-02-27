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
type StepperProps = {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
};
const tabsCutomerName = [
  {
    label: "Profile",
    isEdit: true,
  },
  {
    label: "Communication",
    isEdit: true,
  },
  {
    label: "Product",
    isEdit: true,
  },
  {
    label: "Additional",
    isEdit: true,
  },
  {
    label: "Customer Integration",
    isEdit: true,
  },
  {
    label: "File Upload",
    isEdit: true,
  },
  {
    label: "User Registration",
    isEdit: false,
  },
];

const tabsVendorName = [
  {
    label: "Profile",
    isEdit: true,
  },
  {
    label: "Communication",
    isEdit: true,
  },
  {
    label: "Product",
    isEdit: true,
  },
  {
    label: "Additional",
    isEdit: true,
  },
  {
    label: "Licence",
    isEdit: true,
  },
  {
    label: "File Upload",
    isEdit: true,
  },
  {
    label: "User Registration",
    isEdit: false,
  },
];

const TabContainer = (props: StepperProps) => {
  const [tabs, setTabs] = useState(
    location.pathname.split("/").includes("vendor")
      ? tabsVendorName
      : tabsCutomerName
  );
  let urlD =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  return (
    <Tabs>
      <TabLinkList>
        { (
          tabs.map((val: any, i: number) => {
            return ((isNaN(parseInt(urlD)) === false && val?.isEdit === true) ||
            isNaN(parseInt(urlD)) === true ?
              <TabLink
                active={props.activeTab === i}
                onClick={() => props.setActiveTab(i)}
                key={i}
              >
                <TabLinkContent>
                  <FaWpforms />
                  &nbsp;{val.label}
                </TabLinkContent>
              </TabLink>:<></>
            );
          })
        ) }

        {/* <DownloadReportButton /> */}
      </TabLinkList>
    </Tabs>
  );
};

export default TabContainer;
