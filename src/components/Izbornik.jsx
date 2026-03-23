import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { IME_APLIKACIJE, RouteNames } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Izbornik() {
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* Promijenjeno da koristi navigate umjesto href="#home" */}
                <Navbar.Brand 
                    className="kliker" // možeš dodati kursor pointer u CSS
                    onClick={() => navigate(RouteNames.HOME)}
                    style={{ cursor: 'pointer' }}
                >
                    {IME_APLIKACIJE}
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate(RouteNames.HOME)}>
                            Home
                        </Nav.Link>
                        
                        <NavDropdown title="Izbornik" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => navigate(RouteNames.OFFERS)}>
                                Offers
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
