import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { APP_NAME, RouteNames } from "../constants";
import { useNavigate, useLocation } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" className="bg-white shadow-sm border-bottom">
      <Container>

        <Navbar.Brand onClick={() => navigate(RouteNames.HOME)}>
          {APP_NAME}
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          <Nav className="me-auto">

            <Nav.Link
              onClick={() => navigate(RouteNames.HOME)}
              active={isActive(RouteNames.HOME)}
            >
              Home
            </Nav.Link>

            <NavDropdown title="Menu">

              <NavDropdown.Item
                onClick={() => navigate(RouteNames.USERS)}
                active={isActive(RouteNames.USERS)}
              >
                Users
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => navigate(RouteNames.TYPES)}
                active={isActive(RouteNames.TYPES)}
              >
                Types
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => navigate(RouteNames.OFFERS)}
                active={isActive(RouteNames.OFFERS)}
              >
                Offers
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                onClick={() => navigate(RouteNames.BOOKINGS)}
                active={isActive(RouteNames.BOOKINGS)}
              >
                Bookings
              </NavDropdown.Item>

            </NavDropdown>

          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}