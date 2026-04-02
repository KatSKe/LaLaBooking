import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import KorisnikService from "../../services/korisnik/KorisnikService.js";

export default function KorisnikNovi(){

    const navigate = useNavigate()

    async function dodaj(korisnik){
        await KorisnikService.dodaj(korisnik).then(() => {
            navigate(RouteNames.KORISNIK);
        });
    }

    function odradiSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target)

        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            spol: podaci.get('spol'),
            datumRodenja: podaci.get('datumRodenja'),
            adresa: {
                ulica: podaci.get('ulica'),
                kucniBroj: podaci.get('kucniBroj'),
                postanskiBroj: podaci.get('postanskiBroj'),
                mjesto: podaci.get('mjesto')
            },
            email: podaci.get('email'),
            kontaktBroj: podaci.get('kontaktBroj')
        })
    }

    return (
        <>
            <h3>Unos novog korisnika</h3>

            <Form onSubmit={odradiSubmit}>

                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required />
                </Form.Group>

                <Form.Group controlId="spol">
                    <Form.Label>Spol</Form.Label>
                    <Form.Select name="spol">
                        <option value="ženski">Ženski</option>
                        <option value="muški">Muški</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="datumRodenja">
                    <Form.Label>Datum rođenja</Form.Label>
                    <Form.Control type="date" name="datumRodenja" />
                </Form.Group>

                <hr />

                <h5>Adresa</h5>

                <Form.Group controlId="ulica">
                    <Form.Label>Ulica</Form.Label>
                    <Form.Control type="text" name="ulica" />
                </Form.Group>

                <Form.Group controlId="kucniBroj">
                    <Form.Label>Kućni broj</Form.Label>
                    <Form.Control type="text" name="kucniBroj" />
                </Form.Group>

                <Form.Group controlId="postanskiBroj">
                    <Form.Label>Poštanski broj</Form.Label>
                    <Form.Control type="text" name="postanskiBroj" />
                </Form.Group>

                <Form.Group controlId="mjesto">
                    <Form.Label>Mjesto</Form.Label>
                    <Form.Control type="text" name="mjesto" />
                </Form.Group>

                <hr />

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" />
                </Form.Group>

                <Form.Group controlId="kontaktBroj">
                    <Form.Label>Kontakt broj</Form.Label>
                    <Form.Control type="text" name="kontaktBroj" />
                </Form.Group>

                <Row className="mt-3">
                    <Col>
                        <Link to={RouteNames.KORISNIK} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>

                    <Col className="text-end">
                        <Button type="submit" variant="success">
                            Dodaj novog korisnika
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}