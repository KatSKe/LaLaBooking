import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookingService from "../../services/booking/BookingService";
import UserService from "../../services/users/UserServiceLocalStorage";
import OfferService from "../../services/offers/OffersService";

import { RouteNames } from "../../constants";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const bookingRes = await BookingService.get();
    const userRes = await UserService.get();
    const offerRes = await OfferService.get();

    setBookings(bookingRes.data || []);
    setUsers(userRes.data || []);
    setOffers(offerRes.data || []);
  }

  function getUserName(b) {
    // NEW MODEL
    if (b.userId) {
      const u = users.find((x) => String(x.sifra) === String(b.userId));
      if (u) return `${u.ime} ${u.prezime}`;
    }

    // CUSTOM NAME
    if (b.userName) return b.userName;

    // OLD MODEL SUPPORT
    if (b.user) {
      const u = users.find((x) => String(x.sifra) === String(b.user));
      if (u) return `${u.ime} ${u.prezime}`;
      return String(b.user);
    }

    return "Unknown user";
  }

  function getOfferName(b) {
    const o = offers.find((x) => String(x.sifra) === String(b.offer));
    return o ? o.naziv : "No offer";
  }

  function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US");
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    await BookingService.obrisi(id);
    loadData();
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Bookings</h2>

      <Button className="mb-3" onClick={() => navigate(RouteNames.BOOKINGS_CREATE)}>
        Add New Booking
      </Button>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Offer</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Rooms</th>
              <th>Adults</th>
              <th>Kids</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{getUserName(b)}</td>
                <td>{getOfferName(b)}</td>
                <td>{formatDate(b.startDate)}</td>
                <td>{formatDate(b.endDate)}</td>
                <td>{b.numberOfRooms}</td>
                <td>{b.adults}</td>
                <td>{b.kids}</td>

                <td>
                  <div className="d-flex gap-1">
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => navigate(`/bookings/${b.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(b.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}