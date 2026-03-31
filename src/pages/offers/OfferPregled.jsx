import { useEffect, useState } from "react";
import OffersService from "../../services/offers/OffersService";
import { Button, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import animationData from "../assets/animations/location.json";

export default function OfferPregled() {

  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    ucitajOffers();
  }, []);

  async function ucitajOffers() {
    const odgovor = await OffersService.get();
    setOffers(odgovor.data);
  }

  async function obrisi(sifra) {
    if (!window.confirm("Sigurno obrisati?")) return;

    await OffersService.obrisi(sifra);
    ucitajOffers();
  }

  function formatCijena(cijena) {
    return new Intl.NumberFormat('hr-HR', {
      style: 'currency',
      currency: 'EUR'
    }).format(cijena);
  }

  return (
    <div className="bg-overlay">
      <LottieAnimacija />

      <Link 
        to={RouteNames.OFFERS_NOVI} 
        className="btn btn-add w-100 my-3"
      >
        Adding a new offer
      </Link>

      <div className="table-container">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {offers && offers.map((offer) => (
              <tr key={offer.sifra}>
                <td>{offer.naziv}</td>
                <td>{offer.opis}</td>

                <td className="text-end">
                  {formatCijena(offer.cijena)}
                </td>

                <td style={{ textAlign: "center" }}>
                  <GrValidate
                    size={25}
                    color={offer.aktivan ? "green" : "red"}
                  />
                </td>

                <td className="d-flex gap-2">
                  <Button 
                    className="btn-edit"
                    onClick={() => navigate(`/offers/${offer.sifra}`)}
                  >
                    Edit
                  </Button>

                  <Button
                    className="btn-delete"
                    onClick={() => delete(offer.sifra)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

    </div>
  );
}