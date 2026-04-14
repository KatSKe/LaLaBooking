import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookingService from "../../services/booking/BookingService";
import UsersService from "../../services/users/UserServiceLocalStorage";
import OffersService from "../../services/offers/OffersService";

import { RouteNames } from "../../constants";

export default function BookingList() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    const b = await BookingService.get();
    const u = await UsersService.get();
    const o = await OffersService.get();

    setBookings(b.data || []);
    setUsers(u.data || []);
    setOffers(o.data || []);
  }

  function getUserName(userId) {
    const user = users.find(
      (u) => u.id == userId || u.sifra == userId
    );

    return user
      ? `${user.firstName} ${user.lastName}`
      : "Unknown";
  }

  function getOfferName(offerId) {
    const offer = offers.find(
      (o) => o.id == offerId || o.sifra == offerId
    );

    return offer?.naziv || offer?.name || "Unknown";
  }

  async function deleteBooking(id) {
    if (!window.confirm("Delete booking?")) return;

    await BookingService.obrisi(id);
    loadAll();
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Bookings</h2>

      <Button
        className="mb-3"
        variant="primary"
        onClick={() => navigate(RouteNames.BOOKING)}
      >
        Add New Booking
      </Button>

      <Table striped bordered hover responsive>
        <thead>
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
              <td>{getUserName(b.user)}</td>
              <td>{getOfferName(b.offer)}</td>
              <td>{b.startDate}</td>
              <td>{b.endDate}</td>
              <td>{b.numberOfRooms}</td>
              <td>{b.adults}</td>
              <td>{b.kids}</td>

              <td>
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => navigate(`/booking/${b.id}`)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteBooking(b.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}