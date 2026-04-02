import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OfferPregled from "./pages/offers/OfferPregled";
import OfferNovi from "./pages/offers/OfferNovi";
import OfferPromjena from "./pages/offers/OfferPromjena";

import KorisnikPregled from './pages/korisnik/KorisnikPregled';
import KorisnikNovi from './pages/korisnik/KorisnikNovi';
import KorisnikPromjena from './pages/korisnik/KorisnikPromjena';

import { Container } from "react-bootstrap";
import Izbornik from "./components/Izbornik";
import { RouteNames } from "./constants";

export default function App() {
  return (
    <Container>
      <Izbornik />

      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />

        {/* OFFERS */}
        <Route path={RouteNames.OFFERS} element={<OfferPregled />} />
        <Route path={RouteNames.OFFERS_NOVI} element={<OfferNovi />} />
        <Route path={RouteNames.OFFERS_PROMJENA} element={<OfferPromjena />} />

        {/* KORISNIK */}
        <Route path={RouteNames.KORISNIK} element={<KorisnikPregled />} />
        <Route path={RouteNames.KORISNIK_NOVI} element={<KorisnikNovi />} />
        <Route path={RouteNames.KORISNIK_PROMJENA} element={<KorisnikPromjena />} />
      </Routes>

      <hr />
      Katarina
    </Container>
  );
}