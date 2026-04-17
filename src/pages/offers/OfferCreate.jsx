import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import OffersService from "../../services/offers/OffersService";
import TypeService from "../../services/types/TypeServiceLocalStorage";

export default function OfferCreate() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  const [offer, setOffer] = useState({
    naziv: "",
    opis: "",
    cijena: "",
    typeId: "",
    aktivan: false,
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

    if (!values.naziv?.trim()) err.naziv = "Name is required";
    if (!values.typeId) err.typeId = "Type is required";
    if (!values.cijena && values.cijena !== 0) err.cijena = "Price is required";

    return err;
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(offer));
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

  async function handleSubmit(e) {
    e.preventDefault();

    const err = validate(offer);
    setErrors(err);

    setTouched({
      naziv: true,
      typeId: true,
      cijena: true,
    });

    if (Object.keys(err).length > 0) return;

    const type = types.find((t) => t.id === parseInt(offer.typeId));

    await OffersService.dodaj({
      ...offer,
      typeId: parseInt(offer.typeId),
      typeName: type?.name || "",
    });

    navigate(RouteNames.OFFERS);
  }

  const showError = (field) => touched[field] && errors[field];

  return (
    <div className="page-wrapper">
      <div className="page-container">

        <h2 className="page-title">Add New Offer</h2>

        <div className="page-card">

          <Form onSubmit={handleSubmit}>

            <Row className="g-3">

              <Col md={6}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="naziv"
                  value={offer.naziv}
                  onChange={handleChange}
                  onBlur={() => handleBlur("naziv")}
                  isInvalid={showError("naziv")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.naziv}
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
                  name="opis"
                  value={offer.opis}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="cijena"
                  value={offer.cijena}
                  onChange={handleChange}
                  onBlur={() => handleBlur("cijena")}
                  isInvalid={showError("cijena")}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cijena}
                </Form.Control.Feedback>
              </Col>

              <Col md={6} className="d-flex align-items-end">
                <Form.Check
                  label="Active"
                  name="aktivan"
                  checked={offer.aktivan}
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

        </div>
      </div>
    </div>
  );
}