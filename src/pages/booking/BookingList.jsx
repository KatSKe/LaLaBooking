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
    setBookings(res.data || []);
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
              <td>{b.userName}</td>
              <td>{b.offerName}</td>
              <td>{b.startDate}</td>
              <td>{b.endDate}</td>
              <td>{b.numberOfRooms}</td>
              <td>{b.adults}</td>
              <td>{b.kids}</td>

              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}