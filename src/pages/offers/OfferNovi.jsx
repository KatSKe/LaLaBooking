import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import OffersService from "../../services/offers/OffersService";

export default function OfferNovi(){

    const navigate = useNavigate();

    async function dodaj(offer){
        await OffersService.dodaj(offer);
        navigate(RouteNames.OFFERS);
    }

    function odradiSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);

        dodaj({
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis')
        });
    }

    return (
        <>
            <h3>Enter a new offer</h3>

            <Form onSubmit={odradiSubmit}>

                <Form.Group>
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control name="naziv" required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Opis</Form.Label>
                    <Form.Control name="opis" />
                </Form.Group>

                <Row className="mt-3">
                    <Col>
                        <Link to={RouteNames.OFFERS} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" className="btn btn-success">
                            Dodaj
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}