import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookingService from "../../services/booking/BookingService";
import { RouteNames } from "../../constants";
import UserService from "../../services/users/UserService";
import OffersService from "../../services/offers/OffersService";

import { Pencil, Trash2 } from "lucide-react";

export default function BookingList() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    loadOffers();
    loadUsers();
    loadBookings();
  }, []);

  async function loadBookings() {
    const result = await BookingService.get();
    setBookings(result.data || []);
  }

  async function loadUsers() {
    const response = await UserService.get();
    setUsers(response.data || []);
  }

  async function loadOffers() {
    const res = await OffersService.get();
    setOffers(res.data || []);
  }

  async function remove(id) {
    if (!window.confirm("Delete booking?")) return;

    await BookingService.remove(id);
    loadBookings();
  }

  function fullUserName(userId) {
    const user = users.find((u) => String(u.id) === String(userId));
    if (!user) return "";
    return `${user.firstName} ${user.lastName}`;
  }

  function fullOfferName(offerId) {
    const offer = offers.find((o) => String(o.id) === String(offerId));
    return offer?.name || "";
  }

  function getActiveLabel(active) {
    return active ? "Active" : "Inactive";
  }

  function getActiveStyle(active) {
    return {
      padding: "4px 10px",
      borderRadius: "8px",
      fontSize: "0.85rem",
      fontWeight: 600,
      display: "inline-block",
      backgroundColor: active ? "#d1f7d6" : "#ffd6d6",
      color: active ? "#1e7a33" : "#a11a1a",
    };
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Bookings</h2>

      <Button
        className="mb-3 w-100"
        onClick={() => navigate(RouteNames.BOOKINGS_CREATE)}
      >
        Add New Booking
      </Button>

      <div className="table-responsive">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>User</th>
              <th>Offer</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Active</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{fullUserName(b.userId ?? b.user)}</td>
                <td>{fullOfferName(b.offerId ?? b.offer)}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>

                {/* ACTIVE COLUMN */}
                <td>
                  <span style={getActiveStyle(b.active)}>
                    {getActiveLabel(b.active)}
                  </span>
                </td>

                <td className="text-end d-flex justify-content-end gap-2">
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={() =>
                      navigate(`/bookings/${b.id}`)
                    }
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => remove(b.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}