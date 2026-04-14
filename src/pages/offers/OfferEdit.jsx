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

  useEffect(() => {
    loadOffer();
  }, []);

  async function loadOffer() {
    const res = await OffersService.getBySifra(sifra);
    setOffer(res.data);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setOffer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function save() {
    await OffersService.promjeni(sifra, offer);
    navigate(RouteNames.OFFERS);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Offer</h2>

      <Card className="p-3">
        <Form>
          <Form.Control
            className="mb-3"
            placeholder="Offer Name"
            name="naziv"
            value={offer.naziv}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-3"
            placeholder="Price"
            name="cijena"
            value={offer.cijena}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-3"
            placeholder="Description"
            name="opis"
            value={offer.opis}
            onChange={handleChange}
          />

          <Button variant="success" onClick={save}>
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
}