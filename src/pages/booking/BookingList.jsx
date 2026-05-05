import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { Plus, Pencil, Trash2 } from "lucide-react";
import BookingService from "../../services/booking/BookingService";
import { RouteNames } from "../../constants";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await BookingService.get();
    setBookings(res.data || []);
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    await BookingService.remove(id);
    loadData();
  }

  function formatDate(date) {
    if (!date) return "";

    const d = new Date(date);
    if (isNaN(d)) return date;

    return d.toLocaleDateString("en-GB");
  }

  // ✔ ALWAYS SHOW REAL USER NAME
  function getUserName(b) {
    if (b.userName) return b.userName;

    if (b.user?.firstName || b.user?.lastName) {
      return `${b.user.firstName ?? ""} ${b.user.lastName ?? ""}`.trim();
    }

    return "";
  }

  // ✔ ALWAYS SHOW REAL OFFER NAME
  function getOfferName(b) {
    if (b.offerName) return b.offerName;

    if (b.offer?.name) return b.offer.name;

    return "";
  }

  return (
    <div className="container py-4">

      <h2 className="mb-3">Bookings</h2>

      {/* ✔ SAME COLOR AS ADD NEW OFFER */}
      <Button
        className="mb-3 w-100"
        variant="success"
        onClick={() => navigate(RouteNames.BOOKINGS_CREATE)}
      >
        <Plus size={18} style={{ marginRight: 6 }} />
        Add New Booking
      </Button>

      <div className="table-responsive">
        <Table striped hover bordered>
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Offer</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Rooms</th>
              <th>Adults</th>
              <th>Kids</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
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

                <td>{b.status || "Active"}</td>

                <td className="text-end d-flex justify-content-end gap-2">

                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={() => navigate(`/bookings/${b.id}`)}
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(b.id)}
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