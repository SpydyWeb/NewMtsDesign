import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import styled from 'styled-components';
import { pallete } from '../../../utils/style-utils';
export const StyledSideBar = styled(Sidebar) `
    height: 96vh;
    margin-left: 1vw;
    margin-top: 2vh;
    color: white;
    color: white;
    font-size: 1rem;
    overflow-y: auto;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    border-radius: 10px;
`;
export const StyledMenu = styled(Menu) `
    margin-top: 20px;
    min-height: 76vh;
`;
export const StyledFooter = styled(Menu) `
    margin-top: 2vh;
`;
export const StyledMenuItem = styled(MenuItem) `
    &:hover{
        background: white;
        color: ${pallete.sidebarHoverColor};
    }
`;
