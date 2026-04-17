import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
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
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadOffer();
  }, []);

  async function loadOffer() {
    const res = await OffersService.getBySifra(sifra);
    setOffer(res.data || {});
  }

  function validate(values = offer) {
    const err = {};

    if (!values.naziv) err.naziv = "Name is required";
    if (!values.cijena) err.cijena = "Price is required";
    if (!values.opis) err.opis = "Description is required";

    return err;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const updated = {
      ...offer,
      [name]: value,
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

          {/* NAME */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="naziv"
              value={offer.naziv}
              onChange={handleChange}
              onBlur={() => handleBlur("naziv")}
              style={{ borderColor: showError("naziv") ? "#dc3545" : "" }}
            />
            {showError("naziv") && (
              <small style={{ color: "#dc3545" }}>
                Name is required
              </small>
            )}
          </Form.Group>

          {/* PRICE */}
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="cijena"
              value={offer.cijena}
              onChange={handleChange}
              onBlur={() => handleBlur("cijena")}
              style={{ borderColor: showError("cijena") ? "#dc3545" : "" }}
            />
            {showError("cijena") && (
              <small style={{ color: "#dc3545" }}>
                Price is required
              </small>
            )}
          </Form.Group>

          {/* DESCRIPTION */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="opis"
              value={offer.opis}
              onChange={handleChange}
              onBlur={() => handleBlur("opis")}
              style={{ borderColor: showError("opis") ? "#dc3545" : "" }}
            />
            {showError("opis") && (
              <small style={{ color: "#dc3545" }}>
                Description is required
              </small>
            )}
          </Form.Group>

          <div className="d-flex gap-2">
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