import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";

import Home from "./pages/Home";

// Offers
import OfferList from "./pages/offers/OfferList";
import OfferCreate from "./pages/offers/OfferCreate";
import OfferEdit from "./pages/offers/OfferEdit";

// Users
import UserList from "./pages/users/UserList";
import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";

// Types
import TypeList from "./pages/types/TypeList";
import TypeCreate from "./pages/types/TypeCreate";
import TypeEdit from "./pages/types/TypeEdit";

// ✅ BOOKINGS (FIXED PATH)
import BookingList from "./pages/booking/BookingList";
import BookingCreate from "./pages/booking/BookingCreate";
import BookingEdit from "./pages/booking/BookingEdit";
import { RouteNames } from "./constants";


function App() {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Offers */}
        <Route path={RouteNames.OFFERS} element={<OfferList />} />
        <Route path={RouteNames.OFFERS_CREATE} element={<OfferCreate />} />
        <Route path={RouteNames.OFFERS_EDIT} element={<OfferEdit />} />

        {/* Users */}
        <Route path={RouteNames.USERS} element={<UserList />} />
        <Route path={RouteNames.USERS_NEW} element={<UserCreate />} />
        <Route path={RouteNames.USERS_EDIT} element={<UserEdit />} />

        {/* Types */}
        <Route path={RouteNames.TYPES} element={<TypeList />} />
        <Route path={RouteNames.TYPES_NEW} element={<TypeCreate />} />
        <Route path={RouteNames.TYPES_EDIT} element={<TypeEdit />} />

        {/* ✅ BOOKINGS */}
        <Route path={RouteNames.BOOKINGS} element={<BookingList />} />
        <Route path={RouteNames.BOOKINGS_CREATE} element={<BookingCreate />} />
        <Route path={RouteNames.BOOKINGS_EDIT} element={<BookingEdit />} />
      </Routes>
    </>
  );
}

export default App;