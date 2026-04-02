import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { IME_APLIKACIJE, RouteNames } from "../constants.js";
import { useNavigate } from "react-router-dom";

export default function Izbornik() {

    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    {IME_APLIKACIJE}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link onClick={() => navigate(RouteNames.HOME)}>
                            Home
                        </Nav.Link>

                        <NavDropdown title="Menu" id="basic-nav-dropdown">

                            <NavDropdown.Item onClick={() => navigate(RouteNames.OFFERS)}>
                                Offers
                            </NavDropdown.Item>

                            <NavDropdown.Item onClick={() => navigate(RouteNames.KORISNIK)}>
                                Users
                            </NavDropdown.Item>

                        </NavDropdown>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}