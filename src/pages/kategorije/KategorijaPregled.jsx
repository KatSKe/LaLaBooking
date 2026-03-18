import { useEffect, useState } from 'react'; // Dodani navodnici
import SmjerService from '../../services/smjer/SmjerService'; // Maknuti tagovi i dodani navodnici

export default function KategorijaPregled() {
  const [destinacije, setDestinacije] = useState([]);

  useEffect(() => {
    ucitajDestinacije();
  }, []);

  async function ucitajDestinacije() {
    try {
      const odgovor = await SmjerService.get();
      // Provjeri jesu li podaci stigli u očekivanom formatu
      setDestinacije(odgovor.data);
    } catch (e) {
      console.error("Greška prilikom dohvaćanja podataka:", e);
    }
  }

  return (
    <>
      <h3>Kategorije</h3>
      <ol>
        {/* Provjera destinacije?.map je sigurnija ako je početno stanje null */}
        {destinacije && destinacije.map((d) => (
          <li key={d.sifra}>{d.naziv}</li>
        ))}
      </ol>
    </>
  );
}
