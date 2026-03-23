import { useEffect, useState } from "react";
import KategorijeService from "../../services/kategorija/KategorijaService";

export default function KategorijaPregled() {
  const [destinacije, setDestinacije] = useState([]);

  useEffect(() => {
    ucitajDestinacije();
  }, []);

  async function ucitajDestinacije() {
    try {
      const odgovor = await KategorijaService.get();
      setDestinacije(odgovor.data);
    } catch (e) {
      console.error("Greška prilikom dohvaćanja podataka:", e);
    }
  }

  return (
    <>
      <h3>Kategorija</h3>
      <ol>
        {destinacije && destinacije.map((d) => (
          <li key={d.sifra}>{d.naziv}</li>
        ))}
      </ol>
    </>
  );
}
