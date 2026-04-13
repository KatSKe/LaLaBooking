import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import OffersService from "../../services/offers/OffersService";
import TypeService from "../../services/types/TypeServiceLocalStorage";

export default function OfferCreate() {

    const navigate = useNavigate();
    const [types, setTypes] = useState([]);

    useEffect(() => {
        loadTypes();
    }, []);

    async function loadTypes() {
        const result = await TypeService.get();
        setTypes(result.data);
    }

    async function createOffer(offer) {
        await OffersService.dodaj(offer);
        navigate(RouteNames.OFFERS);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        const typeId = parseInt(data.get("typeId"));
        const selectedType = types.find(t => t.id === typeId);

        createOffer({
            naziv: data.get("naziv"),
            opis: data.get("opis"),
            cijena: parseFloat(data.get("cijena")),
            aktivan: data.get("aktivan") === "on",
            typeId,
            typeName: selectedType?.name
        });
    }

    return (
        <div className="page-wrapper">
            <div className="page-container">

                <h2 className="page-title">Add New Offer</h2>

                <div className="page-card">

                    <Form onSubmit={handleSubmit}>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="naziv" required />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select name="typeId" required>
                                        <option value="">Select type</option>
                                        {types.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.name}
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

                </div>
            </div>
        </div>
    );
}