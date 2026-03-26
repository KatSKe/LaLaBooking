import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import OffersService from "../../services/offers/OffersService";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";

export default function OfferPromjena(){

    const navigate = useNavigate();
    const params = useParams();
    const [offer, setOffer] = useState({});
    const [aktivan, setAktivan] = useState(false);

    useEffect(() => {
        ucitajOffer();
    }, []);

    async function ucitajOffer() {
        await OffersService.getBySifra(params.sifra).then((odgovor) => {
            const o = odgovor.data
            setOffer(o);
            setAktivan(o.aktivan ?? false);
        });
    }

    async function promjeni(offer) {
        await OffersService.promjeni(params.sifra,offer).then(() => {
            navigate(RouteNames.OFFERS);
        });
    }

    function odradiSubmit(e){
    e.preventDefault();
    const podaci = new FormData(e.target);

    promjeni({
        naziv: podaci.get('naziv'),
        opis: podaci.get('opis'),
        cijena: podaci.get('cijena'),
        aktivan: aktivan
    });
}

    return(
        <>
            <h3>Promjena ponude</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required
                    defaultValue={offer.naziv} />
                </Form.Group>

                <Form.Group controlId="opis">
                    <Form.Label>Opis</Form.Label>
                    <Form.Control type="text" name="opis" step={1}
                        defaultValue={offer.opis} />
                </Form.Group>

                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01}
                        defaultValue={offer.cijena} />
                </Form.Group>

                <Form.Group controlId="aktivan">
                    <Form.Check label="Aktivan" name="aktivan"
                        checked={aktivan}
                        onChange={(e)=>setAktivan(e.target.checked)} />
                </Form.Group>

                <Row className="mt-3">
                    <Col>
                        <Link to={RouteNames.OFFERS} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    
                    <Col className="text-end">
                        <Button type="submit" variant="success">
                            Promijeni ponudu
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}