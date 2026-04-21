import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

    console.log("BOOKINGS:", res.data); // 👈 debug

    setBookings(res.data || []);
  }

  function getUserName(b) {
    if (b.user && typeof b.user === "object") {
      const fn = b.user.firstName || "";
      const ln = b.user.lastName || "";
      return `${fn} ${ln}`.trim() || "Unknown user";
    }

    return "Unknown user";
  }

  function getOfferName(b) {
    if (b.offer && typeof b.offer === "object") {
      return b.offer.naziv || "Unknown offer";
    }

    return "Unknown offer";
  }

  function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB");
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    await BookingService.obrisi(id);
    loadData();
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Bookings</h2>

      <Button
        className="mb-3"
        onClick={() => navigate(RouteNames.BOOKINGS_CREATE)}
      >
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