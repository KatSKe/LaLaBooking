import { useEffect, useState } from "react";
import OffersService from "../../services/offers/OffersService";
import { Button, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

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
    if (!window.confirm("Sigurno obrisati?")) {
      return;
    }

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
    <>
      <Link 
        to={RouteNames.OFFERS_NOVI} 
        className="btn btn-success w-100 my-3"
      >
        Dodavanje nove ponude
      </Link>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Cijena</th>
            <th>Aktivan</th>
            <th>Akcija</th>
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

              <td>
                <Button onClick={() => navigate(`/offers/${offer.sifra}`)}>
                  Promijeni
                </Button>

                &nbsp;&nbsp;

                <Button
                  variant="danger"
                  onClick={() => obrisi(offer.sifra)}
                >
                  Obriši
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}