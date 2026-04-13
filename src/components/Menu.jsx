import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { IME_APLIKACIJE, RouteNames } from "../constants.js";
import { useNavigate, useLocation } from "react-router-dom";

export default function Menu() {

    const navigate = useNavigate();
    const location = useLocation();

    // function for active link
    const isActive = (path) => location.pathname === path;

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

                        <Nav.Link
                            onClick={() => navigate(RouteNames.HOME)}
                            className={isActive(RouteNames.HOME) ? "fw-bold text-primary" : ""}
                        >
                            Home
                        </Nav.Link>

                        <NavDropdown 
                            title="Menu" 
                            id="basic-nav-dropdown"
                            className="ms-2"
                        >

                            <NavDropdown.Item
                                onClick={() => navigate(RouteNames.TYPES)}
                                className={isActive(RouteNames.TYPES) ? "fw-bold text-primary" : ""}
                            >
                                Types
                            </NavDropdown.Item>

                            <NavDropdown.Item
                                onClick={() => navigate(RouteNames.USERS)}
                                className={isActive(RouteNames.USERS) ? "fw-bold text-primary" : ""}
                            >
                                Users
                            </NavDropdown.Item>

                            <NavDropdown.Item
                                onClick={() => navigate(RouteNames.OFFERS)}
                                className={isActive(RouteNames.OFFERS) ? "fw-bold text-primary" : ""}
                            >
                                Offers
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item
                                onClick={() => navigate(RouteNames.BOOKING)}
                                className={isActive(RouteNames.BOOKING) ? "fw-bold text-primary" : ""}
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