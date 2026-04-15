import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BookingService from "../../services/booking/BookingService";
import { RouteNames } from "../../constants";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const res = await BookingService.get();
    setBookings(res.data || []);
  }

  function getUserName(b) {
    const firstName = b.user?.firstName || b.user?.ime || "";
    const lastName = b.user?.lastName || b.user?.prezime || "";
    return `${firstName} ${lastName}`.trim() || "No user";
  }

  function getOfferName(b) {
    return b.offer?.name || b.offer?.naziv || b.offer?.title || "";
  }

  function goToCreate() {
    navigate(RouteNames.BOOKINGS_CREATE);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Bookings</h2>

      <Button className="mb-3" onClick={goToCreate}>
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
            <tr key={b.id || b.sifra}>
              <td>{getUserName(b)}</td>
              <td>{getOfferName(b)}</td>
              <td>{b.startDate}</td>
              <td>{b.endDate}</td>
              <td>{b.numberOfRooms}</td>
              <td>{b.adults}</td>
              <td>{b.kids}</td>

              <td>
                <Button size="sm" variant="warning" className="me-2">
                  Edit
                </Button>
                <Button size="sm" variant="danger">
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