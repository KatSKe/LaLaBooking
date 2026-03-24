import { useEffect, useState } from 'react';
import OffersService from '../../services/offers/OffersService';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RouteNames } from '../../constants';

export default function OfferPregled() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    ucitajOffers();
  }, []);

  async function ucitajOffers() {
    try {
      const odgovor = await OffersService.get();
      setOffers(odgovor.data);
    } catch (e) {
      console.error("Greška:", e);
    }
  }

  return (
    <>
      <h3>Offers</h3>

      <Link to={RouteNames.OFFERS_NOVI} className="btn btn-success mb-3">
        Add new offer
      </Link>

      <Table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {offers && offers.map((offer) => (
            <tr key={offer.sifra}>
              <td>{offer.naziv}</td>
              <td>{offer.opis}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}