import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookingService from "../../services/booking/BookingServiceLocalStorage";
import { RouteNames } from "../../constants";

export default function BookingList() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const result = await BookingService.get();
    setBookings(result.data || []);
  }

  async function remove(id) {
    if (!window.confirm("Delete booking?")) return;

    await BookingService.remove(id);
    load();
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Bookings</h2>

      {/* 🔵 FIXED NAVIGATION */}
      <Button
        className="mb-3 w-100"
        onClick={() => navigate("/bookings/new")}
      >
        Add New Booking
      </Button>

      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Offer</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.userName}</td>
                <td>{b.offerName}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>

                <td className="text-end d-flex justify-content-end gap-2">
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={() =>
                      navigate(`/bookings/edit/${b.id}`)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => remove(b.id)}
                  >
                    Delete
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