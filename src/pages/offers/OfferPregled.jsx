import { useEffect, useState } from 'react'; // Dodani navodnici
import OffersService from '../../services/offers/OffersService'; // Maknuti tagovi i dodani navodnici
import { Table } from 'react-bootstrap';

export default function OfferPregled() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    ucitajDestinacije();
  }, []);

  async function ucitajDestinacije() {
    try {
      const odgovor = await OffersService.get();
      // Provjeri jesu li podaci stigli u očekivanom formatu
      setOffers(odgovor.data);
    } catch (e) {
      console.error("Greška prilikom dohvaćanja podataka:", e);
    }
  }

  return (
    <>
      <h3>Kategorije</h3>
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
                        <tr>
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
