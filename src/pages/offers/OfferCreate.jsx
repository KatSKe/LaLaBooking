import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import OffersService from "../../services/offers/OffersService";
import TypeService from "../../services/types/TypeServiceLocalStorage";

export default function OfferCreate() {

    const navigate = useNavigate();

    // ADDED: types state
    const [types, setTypes] = useState([]);

    useEffect(() => {
        loadTypes();
    }, []);

    // ADDED: load types
    async function loadTypes() {
        const res = await TypeService.get();
        setTypes(res.data);
    }

    async function dodaj(offer) {
        await OffersService.dodaj(offer);
        navigate(RouteNames.OFFERS);
    }

    function odradiSubmit(e) {
        e.preventDefault();
        const podaci = new FormData(e.target);

        // ADDED: type logic
        const typeId = parseInt(podaci.get('typeId'));
        const selectedType = types.find(t => t.id === typeId);

        dodaj({
            naziv: podaci.get('naziv'),
            opis: podaci.get('opis'),
            cijena: parseFloat(podaci.get('cijena')),
            aktivan: podaci.get('aktivan') === 'on',

            // ADDED
            typeId,
            typeName: selectedType?.name
        });
    }

    return (
        <>
            <h3>Add New Offer</h3>

            <Form onSubmit={odradiSubmit}>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="naziv" required />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        {/* ADDED: TYPE DROPDOWN */}
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Select name="typeId" required>
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
                    <Form.Control type="text" name="opis" />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="cijena" step={0.01} />
                        </Form.Group>
                    </Col>

                    <Col md={6} className="d-flex align-items-center">
                        <Form.Group>
                            <Form.Check label="Active" name="aktivan" />
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
                            Add New Offer
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}