import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import OfferPregled from './pages/offers/OfferPregled'
import OfferNovi from './pages/offers/OfferNovi'

function App() {

  return (
    <Container>
      <Izbornik />
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />
        <Route path={RouteNames.OFFERS} element={<OfferPregled />} />
        <Route path={RouteNames.OFFERS_NOVI} element={<OfferNovi />} />
      </Routes>
      <hr />
      &copy; LaLa Booking
    </Container>
  )
}

export default App