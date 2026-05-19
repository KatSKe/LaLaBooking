import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookingService from "../../services/booking/BookingService";
import { RouteNames } from "../../constants";
import UserService from "../../services/users/UserService";
import OffersService from "../../services/offers/OffersService";

import { Pencil, Trash2, Plus } from "lucide-react";

export default function BookingList() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);

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

  useEffect(() => {
    loadOffers();
    loadUsers();
    loadBookings();
  }, []);

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

  return (
    <div className="users-page">
      <div className="users-page_overlay"></div>

      <div className="users-page_content">
        <div className="users-glass-card">

          <div className="users-header">
            <h2 className="users-title">Bookings</h2>

            <Button
              className="users-add-button"
              onClick={() => navigate(RouteNames.BOOKINGS_CREATE)}
            >
              <Plus size={18} style={{ marginRight: 6 }} />
              Add New Booking
            </Button>
          </div>

          <div className="table-responsive">
            <Table className="users-table" hover>

              <thead>
                <tr>
                  <th>User</th>
                  <th>Offer</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Rooms</th>
                  <th>Adults</th>
                  <th>Kids</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>

                    <td>{fullUserName(b.userId ?? b.user)}</td>

                    <td>{fullOfferName(b.offerId ?? b.offer)}</td>

                    <td>{b.startDate}</td>

                    <td>{b.endDate}</td>

                    <td>{b.numberOfRooms}</td>

                    <td>{b.adults}</td>

                    <td>{b.kids}</td>

                    <td>{getActiveLabel(b.active)}</td>

                    <td className="users-actions">

                      <Button
                        size="sm"
                        variant="outline-warning"
                        onClick={() =>
                          navigate(
                            RouteNames.BOOKINGS_EDIT.replace(
                              ":id",
                              b.id
                            )
                          )
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
      </div>
    </div>
  );
}