import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookingService from "../../services/booking/BookingService";
import UserService from "../../services/users/UserService";
import OffersService from "../../services/offers/OffersService";

import { RouteNames } from "../../constants";

export default function BookingList() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    loadBookings();
    loadUsers();
    loadOffers();
  }, []);

  async function loadBookings() {
    const response = await BookingService.get();

    setBookings(response.data || []);
  }

  async function loadUsers() {
    const response = await UserService.get();

    setUsers(response.data || []);
  }

  async function loadOffers() {
    const response = await OffersService.get();

    setOffers(response.data || []);
  }

  async function removeBooking(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmed) {
      return;
    }

    await BookingService.remove(id);

    loadBookings();
  }

  function getUserFullName(userId) {
    const user = users.find(
      (item) => String(item.id) === String(userId)
    );

    if (!user) {
      return "";
    }

    return `${user.firstName} ${user.lastName}`;
  }

  function getOfferName(offerId) {
    const offer = offers.find(
      (item) =>
        String(item.id) === String(offerId)
    );

    if (!offer) {
      return "";
    }

    return offer.name;
  }

  function formatDate(date) {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Bookings</h2>

      <Button
        className="mb-3 w-100"
        onClick={() =>
          navigate(RouteNames.BOOKINGS_CREATE)
        }
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
              <th>Rooms</th>
              <th>Adults</th>
              <th>Kids</th>
              <th>Status</th>
              <th className="text-end">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                  {getUserFullName(
                    booking.userId
                  )}
                </td>

                <td>
                  {getOfferName(
                    booking.offerId
                  )}
                </td>

                <td>
                  {formatDate(
                    booking.startDate
                  )}
                </td>

                <td>
                  {formatDate(
                    booking.endDate
                  )}
                </td>

                <td>
                  {booking.numberOfRooms}
                </td>

                <td>{booking.adults}</td>

                <td>{booking.kids}</td>

                <td>
                  {booking.active ? (
                    <span className="text-success fw-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="text-danger fw-semibold">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline-warning"
                      onClick={() =>
                        navigate(
                          RouteNames.BOOKINGS_EDIT.replace(
                            ":id",
                            booking.id
                          )
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() =>
                        removeBooking(
                          booking.id
                        )
                      }
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