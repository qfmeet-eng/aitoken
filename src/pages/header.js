import React, { useContext } from "react";
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const HandleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData(null);
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>BuyCart</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav>
            {userData ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline-light"
                  id="dropdown-basic"
                  className="d-flex align-items-center"
                >
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    roundedCircle
                    width="30"
                    height="30"
                    className="me-2"
                  />
                  <span>{userData.name}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Header>
                    <div className="text-center">
                      <strong>{userData.name}</strong>
                      <br />
                      <small>{userData.email}</small>
                    </div>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => navigate("/profile")}>Profile</Dropdown.Item>
                  <Dropdown.Item onClick={HandleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
