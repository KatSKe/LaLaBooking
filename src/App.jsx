import "bootstrap/dist/css/bootstrap.min.css";
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

function App() {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Offers */}
        <Route path="/offers" element={<OfferList />} />
        <Route path="/offers/new" element={<OfferCreate />} />
        <Route path="/offers/edit/:sifra" element={<OfferEdit />} />

        {/* Users */}
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserCreate />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />

        {/* Types */}
        <Route path="/types" element={<TypeList />} />
        <Route path="/types/new" element={<TypeCreate />} />
        <Route path="/types/:id" element={<TypeEdit />} />

        {/* ✅ BOOKINGS */}
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/bookings/new" element={<BookingCreate />} />
        <Route path="/bookings/:id" element={<BookingEdit />} />
      </Routes>
    </>
  );
}

export default App;