import { useEffect, useState } from "react";
import KorisnikService from "../../services/korisnik/KorisnikService";
import { Button, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function KorisnikPregled() {
  const navigate = useNavigate();
  const [korisnici, setKorisnici] = useState([]);

  useEffect(() => {
    ucitajKorisnike();
  }, []);

  async function ucitajKorisnike() {
    const odgovor = await KorisnikService.get();
    setKorisnici(odgovor.data);
  }

  async function obrisi(sifra) {
    if (!window.confirm("Sigurno obrisati?")) return;

    await KorisnikService.obrisi(sifra);
    ucitajKorisnike();
  }

  function formatDatum(datum) {
    if (!datum) return "";
    return new Date(datum).toLocaleDateString("hr-HR");
  }

  return (
    <div className="bg-overlay">

      <Link
        to={RouteNames.KORISNIK_NOVI}
        className="btn btn-add w-100 my-3"
      >
        Dodaj novog korisnika
      </Link>

      <div className="table-container">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Ime</th>
              <th>Prezime</th>
              <th>Spol</th>
              <th>Datum rođenja</th>
              <th>Email</th>
              <th>Kontakt</th>
              <th>Mjesto</th>
              <th>Akcija</th>
            </tr>
          </thead>

          <tbody>
            {korisnici &&
              korisnici.map((k) => (
                <tr key={k.sifra}>
                  <td>{k.ime}</td>
                  <td>{k.prezime}</td>
                  <td>{k.spol}</td>

                  <td>{formatDatum(k.datumRodenja)}</td>

                  <td>{k.email}</td>
                  <td>{k.kontaktBroj}</td>

                  <td>{k.adresa?.mjesto}</td>

                  <td className="d-flex gap-2">
                    <Button
                      className="btn-edit"
                      onClick={() => navigate(`/korisnik/${k.sifra}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      className="btn-delete"
                      onClick={() => obrisi(k.sifra)}
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