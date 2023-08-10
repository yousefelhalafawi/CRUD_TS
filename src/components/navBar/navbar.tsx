import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../stateManagment/authSlice";
import { clearOptions } from "../../stateManagment/optionsSlice";


const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const accessCodes = useSelector((state: RootState) => state.auth.accessCode);
  interface RootState {
    auth: {
      accessCode: string;
    };
  }
  const handleLogOut = () => {
    window.location.replace("http://localhost:3001/");

    dispatch(clear());
    dispatch(clearOptions())
  };
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Navbar expand="lg" className="mb-3">
      <Navbar.Brand as={Link} to="/home" style={{ marginRight: "25vw" }}>
        Home
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
         { accessCodes?.toString().includes("user")&&<Nav.Link
            as={Link}
            to="/Usersearch"
            className={isActive("/Usersearch") ? "active" : ""}
          >
            Users
          </Nav.Link>}
       {  accessCodes?.toString().includes("department")&& <Nav.Link
            as={Link}
            to="/DepartmentSearch"
            className={isActive("/DepartmentSearch") ? "active" : ""}
          >
            Departments
          </Nav.Link>}
        { accessCodes?.toString().includes("project")&&  <Nav.Link
            as={Link}
            to="/ProjectSearch"
            className={isActive("/ProjectSearch") ? "active" : ""}
          >
            Projects
          </Nav.Link>}
        </Nav>
        <Nav
          onClick={() => {
            handleLogOut();
          }}
          className="ms-auto"
        >
          <Nav.Link className="text-bg-danger rounded p-2">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
