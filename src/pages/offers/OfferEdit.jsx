import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import OffersService from "../../services/offers/OffersService";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";
import TypeService from "../../services/types/TypeServiceLocalStorage";

export default function OfferEdit() {

    const navigate = useNavigate();
    const { sifra } = useParams();

    const [offer, setOffer] = useState({});
    const [aktivan, setAktivan] = useState(false);

    // ADDED: types
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        loadOffer();
        loadTypes();
    }, []);

    async function loadTypes() {
        const res = await TypeService.get();
        setTypes(res.data);
    }

    async function loadOffer() {
        const odgovor = await OffersService.getBySifra(sifra);
        const o = odgovor.data;

        setOffer(o);
        setAktivan(o.aktivan ?? false);
        setSelectedType(o.typeId ?? "");
    }

    async function save(offer) {
        await OffersService.promjeni(sifra, offer);
        navigate(RouteNames.OFFERS);
    }

    function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        // ADDED: type logic
        const typeId = parseInt(data.get("typeId"));
        const selected = types.find(t => t.id === typeId);

        save({
            naziv: data.get("naziv"),
            opis: data.get("opis"),
            cijena: parseFloat(data.get("cijena")),
            aktivan,

            // ADDED
            typeId,
            typeName: selected?.name
        });
    }

    return (
        <>
            <h3>Edit Offer</h3>

            <Form onSubmit={onSubmit}>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="naziv"
                                defaultValue={offer.naziv}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        {/* ADDED: TYPE DROPDOWN */}
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Select
                                name="typeId"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value="">Select type</option>
                                {types.map(t => (
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="opis"
                        defaultValue={offer.opis}
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                name="cijena"
                                type="number"
                                step={0.01}
                                defaultValue={offer.cijena}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6} className="d-flex align-items-center">
                        <Form.Group>
                            <Form.Check
                                label="Active"
                                checked={aktivan}
                                onChange={(e) => setAktivan(e.target.checked)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col>
                        <Link to={RouteNames.OFFERS} className="btn btn-danger w-100">
                            Cancel
                        </Link>
                    </Col>

                    <Col>
                        <Button type="submit" variant="success" className="w-100">
                            Save
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}