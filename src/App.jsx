import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import OfferList from "./pages/offers/OfferList";
import OfferCreate from "./pages/offers/OfferCreate";
import OfferEdit from "./pages/offers/OfferEdit";

import UserList from "./pages/users/UserList";
import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";

import TypeList from "./pages/types/TypeList";
import TypeCreate from "./pages/types/TypeCreate";
import TypeEdit from "./pages/types/TypeEdit";

import BookingCreate from "./pages/booking/BookingCreate";

import Menu from "./components/Menu";
import { RouteNames } from "./constants";

export default function App() {
  return (
    <div className="app-shell">
      <Menu />

      <div className="app-view">
        <Routes>
          <Route path={RouteNames.HOME} element={<Home />} />

          <Route path={RouteNames.OFFERS} element={<OfferList />} />
          <Route path={RouteNames.OFFERS_CREATE} element={<OfferCreate />} />
          <Route path={RouteNames.OFFERS_EDIT} element={<OfferEdit />} />

          <Route path={RouteNames.USERS} element={<UserList />} />
          <Route path={RouteNames.USERS_NEW} element={<UserCreate />} />
          <Route path={RouteNames.USERS_EDIT} element={<UserEdit />} />

          <Route path={RouteNames.TYPES} element={<TypeList />} />
          <Route path={RouteNames.TYPES_NEW} element={<TypeCreate />} />
          <Route path={RouteNames.TYPES_EDIT} element={<TypeEdit />} />

          <Route path={RouteNames.BOOKING} element={<BookingCreate />} />
        </Routes>
      </div>
    </div>
  );
}