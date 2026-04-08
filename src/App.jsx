import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Home from "./pages/Home";

import OfferList from "./pages/offers/OfferList";
import OfferCreate from "./pages/offers/OfferCreate";
import OfferEdit from "./pages/offers/OfferEdit";

import UserList from './pages/users/UserList';
import UserCreate from './pages/users/UserCreate';
import UserEdit from './pages/users/UserEdit';

import TypeList from "./pages/types/TypeList"; // ADDED

import Menu from "./components/Menu";
import { RouteNames } from "./constants";

export default function App() {
  return (
    <>
      {/* NAVBAR */}
      <Menu />

      {/* MAIN CONTENT */}
      <Container fluid="md" className="py-3">

        <Routes>
          <Route path={RouteNames.HOME} element={<Home />} />

          {/* OFFERS */}
          <Route path={RouteNames.OFFERS} element={<OfferList />} />
          <Route path={RouteNames.OFFERS_CREATE} element={<OfferCreate />} />
          <Route path={RouteNames.OFFERS_EDIT} element={<OfferEdit />} />

          {/* USERS */}
          <Route path={RouteNames.USERS} element={<UserList />} />
          <Route path={RouteNames.USERS_NEW} element={<UserCreate />} />
          <Route path={RouteNames.USERS_EDIT} element={<UserEdit />} />

          {/* TYPES - ADDED */}
          <Route path={RouteNames.TYPES} element={<TypeList />} />
        </Routes>

        {/* FOOTER */}
        <hr />
        <div className="text-center text-muted">
          Katarina Skenderović
        </div>

      </Container>
    </>
  );
}