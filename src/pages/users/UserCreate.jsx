import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import OffersService from "../../services/offers/OffersService";

export default function OfferCreate() {

    const navigate = useNavigate();

    async function dodaj(offer) {
        await OffersService.dodaj(offer);
        navigate(RouteNames.OFFERS);
    }

    function odradiSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        dodaj({
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis'),
            cijena: parseFloat(podaci.get('cijena')),
            aktivan: podaci.get('aktivan') === 'on'
        });
    }

    return (
        <>
            <h3>Add New Offer</h3>

            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="opis" />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01} />
                </Form.Group>

                <Form.Group controlId="aktivan">
                    <Form.Check label="Active" name="aktivan" />
                </Form.Group>

                <Row className="mt-3">
                    <Col>
                        <Link to={RouteNames.OFFERS} className="btn btn-danger">
                            Cancel
                        </Link>
                    </Col>

                    <Col className="text-end">
                        <Button type="submit" variant="success">
                            Add Offer
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}