import {
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { NavLink } from "./NavBarStyledComponents";
import { BiUserCircle } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import ImgLogo from "../../../../public/logo_black_and_blue.png"
type AuthProps = {
  MenuData: any;
  handleSubClass:any;
  activeClass:any;
};

const NavBar = (props: AuthProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { MenuData,handleSubClass,activeClass } = props;
  return (
    <div>
      <Navbar
        expand={"lg"}
        className="bg-body-tertiary w-100"
        sticky="top"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <img width={250} src={ImgLogo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                <img width={250} src={ImgLogo} />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {MenuData.map((val: any, i: number) => {
                  return (
                    <NavLink
                      active={activeClass===val.title}
                      onClick={() => {
                        navigate(val.url);
                        handleSubClass(val.subCategory,val.title)
                      }}
                      key={i}
                      className="mx-0 mx-md-2"
                    >
                      {val.title}
                    </NavLink>
                  );
                })}
                {/* <NavLink active={location.pathname == "/"} href="/">
                  Home
                </NavLink>
                <NavLink
                  active={location.pathname.startsWith("/clients")}
                  href="/clients"
                  className="mx-0 mx-md-2"
                >
                  Clients
                </NavLink>
                <NavLink
                  active={location.pathname.startsWith("/orders")}
                  href="/orders"
                  className="mx-0 mx-md-2"
                >
                  Orders
                </NavLink>
                <NavLink
                  active={location.pathname.startsWith("/vendors")}
                  href="/vendors"
                  className="mx-0 mx-md-2"
                >
                  Vendors
                </NavLink>
                <NavLink
                  active={location.pathname.startsWith("/reports")}
                  href="/reports"
                  className="mx-0 mx-md-2"
                >
                  Reports
                </NavLink>
                <NavLink
                  active={location.pathname.startsWith("/admin")}
                  href="/admin"
                  className="mx-0 mx-md-2"
                >
                  Admin
                </NavLink> */}
                <NavDropdown
                  title={<BiUserCircle className="userProfile" />}
                  id={`offcanvasNavbarDropdown-expand-md`}
                  className="d-none d-lg-block dropdown-menu-right"
                  drop="down"
                  align="end"
                >
                  <NavDropdown.Item
                    href="#"
                    // title={props.user.attributes.email}
                  >
                    {/* {props.user.attributes.name} */}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    onClick={() => {
                      localStorage.removeItem("jwtTokenId");
                      navigate("/");
                    }}
                  >
                    <FaSignOutAlt /> Sign out
                  </NavDropdown.Item>
                </NavDropdown>
                <NavLink
                  active={false}
                  href="#"
                  className="mx-0 mx-md-2 d-lg-none"
                >
                  {/* {props.user.attributes.name} */}
                </NavLink>
                <NavLink
                  active={false}
                  href="#"
                  className="mx-0 mx-md-2 d-lg-none"
                  onClick={() => {
                    localStorage.removeItem("jwtTokenId");
                    navigate("/");
                  }}
                >
                  <FaSignOutAlt /> Sign out
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
