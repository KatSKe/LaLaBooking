import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import OffersService from "../../services/offers/OffersService";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";

export default function OfferEdit() {

    const navigate = useNavigate();
    const { sifra } = useParams();

    const [offer, setOffer] = useState({});
    const [aktivan, setAktivan] = useState(false);

    useEffect(() => {
        loadOffer();
    }, []);

    async function loadOffer() {
        const odgovor = await OffersService.getBySifra(sifra);
        const o = odgovor.data;

        setOffer(o);
        setAktivan(o.aktivan ?? false);
    }

    async function save(offer) {
        await OffersService.promjeni(sifra, offer);
        navigate(RouteNames.OFFERS);
    }

    function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        save({
            naziv: data.get("naziv"),
            opis: data.get("opis"),
            cijena: parseFloat(data.get("cijena")),
            aktivan
        });
    }

    return (
        <>
            <h3>Edit Offer</h3>

            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="naziv" defaultValue={offer.naziv} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="opis" defaultValue={offer.opis} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        name="cijena"
                        type="number"
                        step={0.01}
                        defaultValue={offer.cijena}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Check
                        label="Active"
                        checked={aktivan}
                        onChange={(e) => setAktivan(e.target.checked)}
                    />
                </Form.Group>

                <Row className="mt-3">
                    <Col>
                        <Link to={RouteNames.OFFERS} className="btn btn-danger">
                            Cancel
                        </Link>
                    </Col>

                    <Col className="text-end">
                        <Button type="submit" variant="success">
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}