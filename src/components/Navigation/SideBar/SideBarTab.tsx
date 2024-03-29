import { useProSidebar } from "react-pro-sidebar";
import { AiOutlineMenu, AiFillHome, AiFillFileText } from "react-icons/ai";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { pallete } from "../../../utils/style-utils";
import { Link, useNavigate } from "react-router-dom";
import {
  StyledFooter,
  StyledMenu,
  StyledMenuItem,
  StyledSideBar,
} from "./SidebarStyledComponents";
import { useEffect, useState } from "react";
export const MenuData = [
  {
    icon: <AiFillHome />,
    title: "Home",
    url: "/dashboard",
  },
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

  {
    icon: <AiFillHome />,
    title: "Vendor",
    url: "/viewvendor",
  },
  {
    icon: <AiFillHome />,
    title: "Customer",
    url: "/customer",
  },
];

// type AuthProps = {
//   signOut: any;
//   user: any;
// };

const SideBarTab = (props: any) => {
  const { collapseSidebar } = useProSidebar();
  const [defaultCollapsed, setDefaultCollapsed] = useState<boolean>(
    window.outerWidth < 768
  );
  const navigate = useNavigate();
  const { subClass,activeClass } = props;
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDefaultCollapsed(window.innerWidth < 768);
    });
  }, []);
const styleData={
  background: "#fff", color: `${pallete.sidebarHoverColor}`
}
  return (
    <>
      <StyledSideBar
        backgroundColor={pallete.sidebarBackground}
        defaultCollapsed={defaultCollapsed}
      >
        <StyledMenu>
          <StyledMenuItem
            icon={<AiOutlineMenu />}
            onClick={() => {
              collapseSidebar();
            }}
          >
            <h5 className="m-0">MTS</h5>
          </StyledMenuItem>
          {subClass.map((ele: any, i: number) => {
            return (
              <StyledMenuItem
                style={ele.title===activeClass?styleData:{}}
                key={i}
                icon={ele.icon}
                component={<Link to={ele.url} />}
                title={ele.title}
              >
                {ele.title}
              </StyledMenuItem>
            );
          })}
        </StyledMenu>
        {/* <StyledFooter>
        
          <StyledMenuItem
            icon={<FaSignOutAlt />}
          
            title="Sign out"
            onClick={()=>{
              localStorage.removeItem('jwtTokenId');
              navigate('/');
            }}
          >
            Sign out
          </StyledMenuItem>
        </StyledFooter> */}
      </StyledSideBar>
    </>
  );
};

export default SideBarTab;
