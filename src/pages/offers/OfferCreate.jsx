import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
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

  function validate(values = offer) {
    const err = {};

    if (!values.name) err.name = "Name is required";
    if (!values.typeId) err.typeId = "Type is required";
    if (!values.price) err.price = "Price is required";

    return err;
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    const updated = {
      ...offer,
      [name]: newValue,
    };

    setOffer(updated);
    setErrors(validate(updated));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const err = validate();
    setErrors(err);
    setTouched({
      name: true,
      typeId: true,
      price: true,
    });

    if (Object.keys(err).length > 0) return;

    const type = types.find((t) => t.id === parseInt(offer.typeId));

    await OffersService.dodaj({
      ...offer,
      typeId: parseInt(offer.typeId),
      typeName: type?.name,
    });

    navigate(RouteNames.OFFERS);
  }

  const showError = (field) => touched[field] && errors[field];

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
                onBlur={() => handleBlur("name")}
                isInvalid={showError("name")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="typeId"
                value={offer.typeId}
                onChange={handleChange}
                onBlur={() => handleBlur("typeId")}
                isInvalid={showError("typeId")}
              >
                <option value="">Select type</option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors.typeId}
              </Form.Control.Feedback>
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
                onBlur={() => handleBlur("price")}
                isInvalid={showError("price")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Col>

            <Col md={6} className="d-flex align-items-end">
              <Form.Check
                label="Active"
                name="active"
                checked={offer.active}
                onChange={handleChange}
              />
            </Col>

          </Row>

          <div className="mt-4 d-flex gap-2">
            <Link to={RouteNames.OFFERS} className="btn btn-secondary w-100">
              Cancel
            </Link>

            <Button type="submit" className="btn btn-success w-100">
              Save Offer
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}