import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookingService from "../../services/booking/BookingService";
import { RouteNames } from "../../constants";
import UserService from "../../services/users/UserService";
import OffersService from "../../services/offers/OffersService";

export default function BookingList() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    loadOffers()
    loadUsers()
    load();
  }, []);

  async function load() {
    const result = await BookingService.get();
    // console.table(result.data)
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
    load();
  }

  function fullUserName(userID){
    const user = users.find(e=>e.id==userID)
    return user.firstName + ' ' + user.lastName
  }

  function fullOfferName(offerID){
    const offer = offers.find(e=>e.id==offerID)
    return offer.name
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Bookings</h2>

      {/* Add New Booking */}
      <Button
        className="mb-3 w-100"
        onClick={() => navigate(RouteNames.BOOKINGS_CREATE)}
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
                <td>{fullUserName(b.user)}</td>
                <td>{fullOfferName(b.offer)}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>

                <td className="text-end d-flex justify-content-end gap-2">
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={() =>
                      navigate(`/bookings/${b.id}`) // ✅ FIXED ROUTE
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