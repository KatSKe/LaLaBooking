import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { IME_APLIKACIJE, RouteNames } from "../constants.js";
import { useNavigate, useLocation } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <Navbar expand="lg" className="bg-white shadow-sm border-bottom">
      <Container>
        <Navbar.Brand
          onClick={() => navigate(RouteNames.HOME)}
          style={{ cursor: "pointer", fontWeight: "600" }}
        >
          {IME_APLIKACIJE}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">

            {/* HOME */}
            <Nav.Link
              onClick={() => navigate(RouteNames.HOME)}
              className={isActive(RouteNames.HOME) ? "text-primary fw-bold" : ""}
            >
              Home
            </Nav.Link>

            {/* MENU DROPDOWN */}
            <NavDropdown title="Menu" id="basic-nav-dropdown">

              <NavDropdown.Item
                onClick={() => navigate(RouteNames.TYPES)}
                className={isActive(RouteNames.TYPES) ? "text-primary fw-bold" : ""}
              >
                Types
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => navigate(RouteNames.USERS)}
                className={isActive(RouteNames.USERS) ? "text-primary fw-bold" : ""}
              >
                Users
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => navigate(RouteNames.OFFERS)}
                className={isActive(RouteNames.OFFERS) ? "text-primary fw-bold" : ""}
              >
                Offers
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                onClick={() => navigate(RouteNames.BOOKING)}
                className={isActive(RouteNames.BOOKING) ? "text-primary fw-bold" : ""}
              >
                Booking
              </NavDropdown.Item>

            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}