import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useProSidebar } from "react-pro-sidebar";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { pallete } from "../../../utils/style-utils";
import { Link, useNavigate } from "react-router-dom";
import { StyledFooter, StyledMenu, StyledMenuItem, StyledSideBar, } from "./SidebarStyledComponents";
import { useEffect, useState } from "react";
export const MenuData = [
    {
        icon: _jsx(AiFillHome, {}),
        title: "Home",
        url: "/dashboard",
    },
    {
        icon: _jsx(AiFillHome, {}),
        title: "Role Master",
        url: "/role",
    },
    {
        icon: _jsx(AiFillHome, {}),
        title: "Access Role Master",
        url: "/accessrole",
    },
    {
        icon: _jsx(AiFillHome, {}),
        title: "Role Defination",
        url: "/viewaccessrole",
    },
    {
        icon: _jsx(AiFillHome, {}),
        title: "Users",
        url: "/user",
    },
    {
        icon: _jsx(AiFillHome, {}),
        title: "Licence Type",
        url: "/licencetype",
    },
    {
        icon: _jsx(AiFillHome, {}),
        title: "Communication Type",
        url: "/communicationtype",
    },
    {
        icon: _jsx(AiFillHome, {}),
        title: "State",
        url: "/state",
    },
    {
        icon: _jsx(AiFillHome, {}),
        title: "Vendor Product",
        url: "/viewvendorproduct",
    },
    {
        icon: _jsx(AiFillHome, {}),
        title: "Vendor",
        url: "/viewvendor",
    },
    {
        icon: _jsx(AiFillHome, {}),
        title: "Customer",
        url: "/customer",
    },
];
// type AuthProps = {
//   signOut: any;
//   user: any;
// };
const SideBar = () => {
    const { collapseSidebar } = useProSidebar();
    const [defaultCollapsed, setDefaultCollapsed] = useState(window.outerWidth < 768);
    const navigate = useNavigate();
    useEffect(() => {
        window.addEventListener("resize", () => {
            setDefaultCollapsed(window.innerWidth < 768);
        });
    }, []);
    return (_jsx(_Fragment, { children: _jsxs(StyledSideBar, { backgroundColor: pallete.sidebarBackground, defaultCollapsed: defaultCollapsed, children: [_jsxs(StyledMenu, { children: [_jsx(StyledMenuItem, { icon: _jsx(AiOutlineMenu, {}), onClick: () => {
                                collapseSidebar();
                            }, children: _jsx("h5", { className: "m-0", children: "MTS" }) }), MenuData.map((ele, i) => {
                            return (_jsx(StyledMenuItem, { icon: ele.icon, component: _jsx(Link, { to: ele.url }), title: ele.title, children: ele.title }, i));
                        })] }), _jsx(StyledFooter, { children: _jsx(StyledMenuItem, { icon: _jsx(FaSignOutAlt, {}), 
                        // component={<Link to="" onClick={props.signOut} />}
                        title: "Sign out", onClick: () => {
                            localStorage.removeItem('jwtTokenId');
                            navigate('/');
                        }, children: "Sign out" }) })] }) }));
};
export default SideBar;
