import { useEffect, useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import OffersService from "../../services/offers/OffersService";
import { RouteNames } from "../../constants";

export default function OfferEdit() {
  const navigate = useNavigate();
  const { sifra } = useParams();

  const [offer, setOffer] = useState({
    naziv: "",
    cijena: "",
    opis: "",
    active: true,
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadOffer();
  }, []);

  async function loadOffer() {
    const res = await OffersService.getBySifra(sifra);

    setOffer({
      ...res.data,
      active: res.data?.active ?? true,
    });
  }

  function validate(values = offer) {
    const err = {};
    if (!values.naziv) err.naziv = "Name is required";
    if (!values.cijena) err.cijena = "Price is required";
    if (!values.opis) err.opis = "Description is required";
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
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  async function save() {
    const err = validate();

    setErrors(err);
    setTouched({
      naziv: true,
      cijena: true,
      opis: true,
    });

    if (Object.keys(err).length > 0) return;

    await OffersService.promjeni(sifra, offer);
    navigate(RouteNames.OFFERS);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Offer</h2>

      <Card className="p-3">
        <Form>

          <Row className="g-3">

            <Col md={4}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="naziv"
                value={offer.naziv || ""}
                onChange={handleChange}
                onBlur={() => handleBlur("naziv")}
              />
            </Col>

            <Col md={4}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="cijena"
                value={offer.cijena || ""}
                onChange={handleChange}
                onBlur={() => handleBlur("cijena")}
              />
            </Col>

            <Col md={4}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="opis"
                value={offer.opis || ""}
                onChange={handleChange}
                onBlur={() => handleBlur("opis")}
              />
            </Col>

            {/* ACTIVE - STANDARD SWITCH */}
            <Col md={12} className="mt-3">
              <Form.Check
                type="switch"
                id="offer-active-switch"
                label={offer.active ? "Active" : "Inactive"}
                name="active"
                checked={offer.active}
                onChange={handleChange}
              />
            </Col>

          </Row>

          <div className="d-flex gap-2 mt-4">
            <Button variant="success" onClick={save}>
              Save Changes
            </Button>

            <Button
              variant="outline-secondary"
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