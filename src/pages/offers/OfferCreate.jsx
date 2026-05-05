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

  function capitalize(value) {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function validate(values = offer) {
    const err = {};

    if (!values.name.trim()) err.name = "Name is required";
    if (!values.description.trim()) err.description = "Description is required";
    if (!values.typeId) err.typeId = "Type is required";

    if (values.price === "" || values.price === null) {
      err.price = "Price is required";
    } else if (Number(values.price) < 0) {
      err.price = "Price cannot be negative";
    }

    return err;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    const updated = {
      ...offer,
      [name]: type === "checkbox" ? checked : value,
    };

    setOffer(updated);
    setErrors(validate(updated));
  }

  function handleBlur(field) {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const err = validate();
    setErrors(err);

    setTouched({
      name: true,
      description: true,
      price: true,
      typeId: true,
    });

    if (Object.keys(err).length > 0) return;

    const selectedType = types.find(t => t.id === Number(offer.typeId));

    const payload = {
      ...offer,
      name: capitalize(offer.name.trim()),
      description: capitalize(offer.description.trim()),
      price: Number(offer.price),
      typeId: Number(offer.typeId),
      typeName: selectedType?.name || "",
    };

    await OffersService.add(payload);
    navigate(RouteNames.OFFERS);
  }

  return (
    <div className="container py-4">
      <Card className="p-4">

        <h2 className="mb-4">Add New Offer</h2>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">

            {/* NAME */}
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

            {/* TYPE */}
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
                {types.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors.typeId}
              </Form.Control.Feedback>
            </Col>

            {/* DESCRIPTION */}
            <Col md={12}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={offer.description}
                onChange={handleChange}
                onBlur={() => handleBlur("description")}
                isInvalid={showError("description")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Col>

            {/* PRICE */}
            <Col md={6}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
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

            {/* ACTIVE (like Types switch style) */}
            <Col md={6} className="d-flex align-items-end">
              <Form.Check
                type="switch"
                label={offer.active ? "Active" : "Inactive"}
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