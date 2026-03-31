import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OfferPregled from "./pages/offers/OfferPregled";
import { Container } from "react-bootstrap";
import Izbornik from "./components/Izbornik";
import { RouteNames } from "./constants";
import OfferNovi from "./pages/offers/OfferNovi";
import OfferPromjena from "./pages/offers/OfferPromjena";

export default function App() {
  return (
    <Container>
<Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.OFFERS} element={<OfferPregled />} />
        <Route path={RouteNames.OFFERS_NOVI} element={<OfferNovi />} />
        <Route path={RouteNames.OFFERS_PROMJENA} element={<OfferPromjena />} />
      </Routes>
<hr />
Katarina
    </Container>

      
    
  );
}