import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import KorisnikService from "../../services/korisnik/KorisnikService";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";

export default function KorisnikPromjena(){

    const navigate = useNavigate();
    const params = useParams();

    const [korisnik, setKorisnik] = useState({});
    const [spol, setSpol] = useState("");
    const [datumRodenja, setDatumRodenja] = useState("");

    useEffect(() => {
        ucitajKorisnika();
    }, []);

    async function ucitajKorisnika() {
        await KorisnikService.getBySifra(params.sifra).then((odgovor) => {
            const k = odgovor.data;
            setKorisnik(k);
            setSpol(k.spol ?? "");
            setDatumRodenja(k.datumRodenja ?? "");
        });
    }

    async function promjeni(korisnik) {
        await KorisnikService.promjeni(params.sifra, korisnik).then(() => {
            navigate(RouteNames.KORISNIK);
        });
    }

    function odradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);

        promjeni({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            spol: spol,
            datumRodenja: datumRodenja,
            adresa: {
                ulica: podaci.get('ulica'),
                kucniBroj: podaci.get('kucniBroj'),
                postanskiBroj: podaci.get('postanskiBroj'),
                mjesto: podaci.get('mjesto')
            },
            email: podaci.get('email'),
            kontaktBroj: podaci.get('kontaktBroj')
        });
    }

    return(
        <>
            <h3>Promjena korisnika</h3>

            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control
                        type="text"
                        name="ime"
                        required
                        defaultValue={korisnik.ime}
                    />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control
                        type="text"
                        name="prezime"
                        required
                        defaultValue={korisnik.prezime}
                    />
                </Form.Group>

                <Form.Group controlId="spol">
                    <Form.Label>Spol</Form.Label>
                    <Form.Select
                        value={spol}
                        onChange={(e) => setSpol(e.target.value)}
                    >
                        <option value="ženski">Ženski</option>
                        <option value="muški">Muški</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="datumRodenja">
                    <Form.Label>Datum rođenja</Form.Label>
                    <Form.Control
                        type="date"
                        value={datumRodenja}
                        onChange={(e) => setDatumRodenja(e.target.value)}
                    />
                </Form.Group>

                <hr />

                <h5>Adresa</h5>

                <Form.Group controlId="ulica">
                    <Form.Label>Ulica</Form.Label>
                    <Form.Control
                        type="text"
                        name="ulica"
                        defaultValue={korisnik.adresa?.ulica}
                    />
                </Form.Group>

                <Form.Group controlId="kucniBroj">
                    <Form.Label>Kućni broj</Form.Label>
                    <Form.Control
                        type="text"
                        name="kucniBroj"
                        defaultValue={korisnik.adresa?.kucniBroj}
                    />
                </Form.Group>

                <Form.Group controlId="postanskiBroj">
                    <Form.Label>Poštanski broj</Form.Label>
                    <Form.Control
                        type="text"
                        name="postanskiBroj"
                        defaultValue={korisnik.adresa?.postanskiBroj}
                    />
                </Form.Group>

                <Form.Group controlId="mjesto">
                    <Form.Label>Mjesto</Form.Label>
                    <Form.Control
                        type="text"
                        name="mjesto"
                        defaultValue={korisnik.adresa?.mjesto}
                    />
                </Form.Group>

                <hr />

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        defaultValue={korisnik.email}
                    />
                </Form.Group>

                <Form.Group controlId="kontaktBroj">
                    <Form.Label>Kontakt broj</Form.Label>
                    <Form.Control
                        type="text"
                        name="kontaktBroj"
                        defaultValue={korisnik.kontaktBroj}
                    />
                </Form.Group>

                <Row className="mt-3">
                    <Col>
                        <Link to={RouteNames.KORISNIK} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>

                    <Col className="text-end">
                        <Button type="submit" variant="success">
                            Promijeni korisnika
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}