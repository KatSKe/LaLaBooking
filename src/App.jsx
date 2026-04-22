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
      </Routes>
    </>
  );
}

export default App;