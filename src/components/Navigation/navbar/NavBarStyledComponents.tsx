import { NavDropdown, Nav } from "react-bootstrap";
import styled from "styled-components";
import { pallete } from "../../../utils/style-utils";

export const NavLink = styled(Nav.Link)<{active: boolean}>`
    font-size: 1.25rem;
    font-weight: ${(props) => props.active? "700" : "600"};
    
    @media (min-width: 768px) {
        border-bottom: ${(props) => props.active? "3px solid " + pallete.sidebarBackground : "none"};
    }
`

export const DropDown = styled(NavDropdown)`
    font-size: 1.25rem;
    font-weight: 600;
`

export const Footer = styled.div`
    text-align: center;
    padding: 4px;
`