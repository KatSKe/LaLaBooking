import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import OffersService from "../../services/offers/OffersService";
import TypeService from "../../services/types/TypeServiceLocalStorage";
import { RouteNames } from "../../constants";

export default function OfferEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [types, setTypes] = useState([]);

  const [offer, setOffer] = useState({
    name: "",
    description: "",
    price: "",
    typeId: "",
    active: true,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    loadOffer();
    loadTypes();
  }, []);

  // 🔥 SAFE TYPES LOADING (FIX missing types issue)
  async function loadTypes() {
    const res = await TypeService.get();
    setTypes(res?.data ?? []);
  }

  async function loadOffer() {
    const res = await OffersService.getById(id);

    if (res?.data) {
      setOffer({
        ...res.data,
        typeId: res.data.typeId?.toString() || "",
      });
    }
  }

  function capitalize(value) {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function validate(values = offer) {
    const err = {};

    if (!values.name.trim()) err.name = "Name is required";
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
    setErrors(validate(updated)); // 🔥 real-time validation
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  const showError = (field) => touched[field] && errors[field];

  async function saveChanges(e) {
    e.preventDefault();

    const err = validate();
    setErrors(err);

    setTouched({
      name: true,
      typeId: true,
      price: true,
    });

    if (Object.keys(err).length > 0) return;

    const selectedType = types.find(
      (t) => t.id === Number(offer.typeId)
    );

    await OffersService.update(id, {
      ...offer,
      name: capitalize(offer.name.trim()),
      description: capitalize(offer.description.trim()),
      price: Number(offer.price),
      typeId: Number(offer.typeId),
      typeName: selectedType?.name || "",
    });

    navigate(RouteNames.OFFERS);
  }

  return (
    <div className="container py-4">
      <Card className="p-4">

        <h2 className="mb-4">Edit Offer</h2>

        <Form onSubmit={saveChanges}>
          <Row className="g-3">

            {/* NAME */}
            <Col md={6}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                defaultValue={offer.name}
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

                {/* 🔥 FULL TYPES LIST (NO FILTERING) */}
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

            {/* DESCRIPTION */}
            <Col md={12}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={offer.description}
                onChange={handleChange}
              />
            </Col>

            {/* PRICE */}
            <Col md={6}>
              <Form.Label>Price (€)</Form.Label>
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

            {/* ACTIVE */}
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

          {/* BUTTONS */}
          <div className="mt-4 d-flex gap-2">

            <Button variant="success" type="submit">
              Save Changes
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