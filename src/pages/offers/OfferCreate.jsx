import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import OffersService from "../../services/offers/OffersService";
import TypeService from "../../services/types/TypeServiceLocalStorage";

export default function OfferCreate() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  const [offer, setOffer] = useState({
    name: "",
    description: "",
    price: "",
    typeId: "",
    active: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    loadTypes();
  }, []);

  async function loadTypes() {
    const result = await TypeService.get();
    setTypes(result.data || []);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setOffer({
      ...offer,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await OffersService.add(offer);
    navigate(RouteNames.OFFERS);
  }

  return (
    <div className="container py-4">
      <Card className="p-4">
        <h2 className="mb-4">Add New Offer</h2>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">

            <Col md={6}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={offer.name}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="typeId"
                value={offer.typeId}
                onChange={handleChange}
              >
                <option value="">Select type</option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={12}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={offer.description}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={offer.price}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Check
                label="Active"
                name="active"
                checked={offer.active}
                onChange={handleChange}
              />
            </Col>

          </Row>

          <div className="d-flex gap-2 mt-4">
            <Button variant="success" type="submit">
              Save Offer
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate(RouteNames.OFFERS)}
            >
              Cancel
            </Button>
          </div>

        </Form>
      </Card>
    </div>
  );
}