import { useEffect, useState } from "react";
import KorisnikService from "../../services/korisnik/KorisnikService";
import { Button, Table } from "react-bootstrap";
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
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    await KorisnikService.obrisi(sifra);
    ucitajKorisnike();
  }

  return (
    <div className="bg-overlay">

      <Link
        to={RouteNames.KORISNIK_NOVI}
        className="btn btn-add w-100 my-3"
      >
        Add New User
      </Link>

      <div className="table-container">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {korisnici &&
              korisnici.map((korisnik) => (
                <tr key={korisnik.sifra}>
                  <td>{korisnik.ime}</td>
                  <td>{korisnik.prezime}</td>
                  <td>{korisnik.spol}</td>
                  <td>{korisnik.datumRodenja}</td>
                  <td>{korisnik.email}</td>
                  <td>{korisnik.telefon}</td>
                  <td>{korisnik.grad}</td>

                  <td className="d-flex gap-2">
                    <Button
                      className="btn-edit"
                      onClick={() =>
                        navigate(`/korisnik/${korisnik.sifra}`)
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      className="btn-delete"
                      onClick={() => obrisi(korisnik.sifra)}
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