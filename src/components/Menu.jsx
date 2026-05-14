import { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { APP_NAME, RouteNames } from "../constants";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" className="bg-white shadow-sm border-bottom" expanded={expanded} onToggle={setExpanded}>
      <Container>

        <Navbar.Brand onClick={() => navigate(RouteNames.HOME)}>
          {APP_NAME}
        </Navbar.Brand>

        <Navbar.Toggle aria-label="Toggle navigation">
          {expanded ? <X size={22} /> : <MenuIcon size={22} />}
        </Navbar.Toggle>

        <Navbar.Collapse>

          <Nav className="me-auto">

            <Nav.Link
              onClick={() => { navigate(RouteNames.HOME); setExpanded(false); }}
              active={isActive(RouteNames.HOME)}
            >
              Home
            </Nav.Link>

            <NavDropdown title="Menu">

              <NavDropdown.Item
                onClick={() => { navigate(RouteNames.USERS); setExpanded(false); }}
                active={isActive(RouteNames.USERS)}
              >
                Users
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => { navigate(RouteNames.TYPES); setExpanded(false); }}
                active={isActive(RouteNames.TYPES)}
              >
                Types
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => { navigate(RouteNames.OFFERS); setExpanded(false); }}
                active={isActive(RouteNames.OFFERS)}
              >
                Offers
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                onClick={() => { navigate(RouteNames.BOOKINGS); setExpanded(false); }}
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