import { useState } from "react";
import KorisnikService from "../../services/korisnik/KorisnikService";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function KorisnikNovi() {
  const navigate = useNavigate();

  const [korisnik, setKorisnik] = useState({
    ime: "",
    prezime: "",
    spol: "",
    datumRodenja: "",
    adresa: "",
    kucniBroj: "",
    postanskiBroj: "",
    grad: "",
    email: "",
    telefon: ""
  });

  function promjenaInputa(e) {
    const { name, value } = e.target;

    setKorisnik((stari) => ({
      ...stari,
      [name]: value,
    }));
  }

  async function dodaj(e) {
    e.preventDefault();
    await KorisnikService.dodaj(korisnik);
    navigate(RouteNames.KORISNIK);
  }

  return (
    <div className="form-container">

      <h3>Add New User</h3>

      <Form onSubmit={dodaj}>

        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="ime"
            value={korisnik.ime}
            onChange={promjenaInputa}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="prezime"
            value={korisnik.prezime}
            onChange={promjenaInputa}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            name="spol"
            value={korisnik.spol}
            onChange={promjenaInputa}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="datumRodenja"
            value={korisnik.datumRodenja}
            onChange={promjenaInputa}
          />
        </Form.Group>

        <h5>Address</h5>

        <Form.Group>
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            name="adresa"
            value={korisnik.adresa}
            onChange={promjenaInputa}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>House Number</Form.Label>
          <Form.Control
            type="text"
            name="kucniBroj"
            value={korisnik.kucniBroj}
            onChange={promjenaInputa}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            name="postanskiBroj"
            value={korisnik.postanskiBroj}
            onChange={promjenaInputa}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="grad"
            value={korisnik.grad}
            onChange={promjenaInputa}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={korisnik.email}
            onChange={promjenaInputa}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="telefon"
            value={korisnik.telefon}
            onChange={promjenaInputa}
          />
        </Form.Group>

        <div className="d-flex gap-2 mt-3">

          <Link
            to={RouteNames.KORISNIK}
            className="btn btn-danger"
          >
            Cancel
          </Link>

          <Button type="submit" variant="success">
            Add User
          </Button>

        </div>

      </Form>
    </div>
  );
}