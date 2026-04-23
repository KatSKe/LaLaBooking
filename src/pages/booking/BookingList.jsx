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

  return (
    <div className="container py-4">
      <h2 className="mb-3">Bookings</h2>

      {/* FIXED BUTTON (blue + full width like other pages) */}
      <Button
        className="mb-3 w-100"
        variant="primary"
        onClick={() => navigate(RouteNames.BOOKINGS_CREATE)}
      >
        <Plus size={18} style={{ marginRight: 6 }} />
        Add New Booking
      </Button>

      <Table striped bordered hover responsive>
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
              <td>{b.userName}</td>
              <td>{b.offerName}</td>
              <td>{b.startDate}</td>
              <td>{b.endDate}</td>
              <td>{b.numberOfRooms}</td>
              <td>{b.adults}</td>
              <td>{b.kids}</td>

              <td className="d-flex gap-2">
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
  );
}