import { Dispatch, SetStateAction } from "react";
import { Tabs, TabLinkList, TabLink, TabLinkContent } from "./StepperStyledComponents";
import { MdOutlineDiversity2 } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { GiPayMoney, GiShakingHands } from "react-icons/gi";
import { FaWpforms } from "react-icons/fa";
import DownloadReportButton from "../../utils/ReportDownloadButton";

type StepperProps = {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
};

const TabContainer = (props: StepperProps) => {
  return (
    <Tabs>
      <TabLinkList>
        <TabLink active={props.activeTab === 0} onClick={() => props.setActiveTab(0)}>
          <TabLinkContent>
            <FaWpforms />
            &nbsp;Basic
          </TabLinkContent>
        </TabLink>
        <TabLink active={props.activeTab === 1} onClick={() => props.setActiveTab(1)}>
          <TabLinkContent>
            <GiShakingHands />
            &nbsp;Deeds
          </TabLinkContent>
        </TabLink>
        <TabLink active={props.activeTab === 2} onClick={() => props.setActiveTab(2)}>
          <TabLinkContent>
            <GiPayMoney />
            &nbsp;Mortgage
          </TabLinkContent>
        </TabLink>
        <TabLink active={props.activeTab === 3} onClick={() => props.setActiveTab(3)}>
          <TabLinkContent>
            <MdOutlineSecurity />
            &nbsp;Liens
          </TabLinkContent>
        </TabLink>
        <TabLink active={props.activeTab === 4} onClick={() => props.setActiveTab(4)}>
          <TabLinkContent>
            <i className="bi bi-cash-coin"></i>&nbsp;Taxes
          </TabLinkContent>
        </TabLink>
        <TabLink active={props.activeTab === 5} onClick={() => props.setActiveTab(5)}>
          <TabLinkContent>
            <MdOutlineDiversity2 />
            &nbsp;Miscellaneous
          </TabLinkContent>
        </TabLink>
        <DownloadReportButton />
      </TabLinkList>
    </Tabs>
  );
};

export default TabContainer;
