import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import BookingService from "../../services/booking/BookingService";
import UsersService from "../../services/users/UserServiceLocalStorage";
import OffersService from "../../services/offers/OffersService";

import { RouteNames } from "../../constants";

export default function BookingEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);

  const [booking, setBooking] = useState({
    userId: "",
    offerId: "",
    startDate: "",
    endDate: "",
    numberOfRooms: 0,
    adults: 0,
    kids: 0,
  });

  useEffect(() => {
    loadData();
    loadBooking();
  }, []);

  async function loadData() {
    const u = await UsersService.get();
    const o = await OffersService.get();

    setUsers(u.data || []);
    setOffers(o.data || []);
  }

  async function loadBooking() {
    const res = await BookingService.getById(id);
    if (!res.data) return;

    const b = res.data;

    setBooking({
      userId: String(b.userId || ""),
      offerId: String(b.offerId || ""),
      startDate: b.startDate || "",
      endDate: b.endDate || "",
      numberOfRooms: b.numberOfRooms ?? 0,
      adults: b.adults ?? 0,
      kids: b.kids ?? 0,
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setBooking({
      ...booking,
      [name]: value,
    });
  }

  async function save() {
    const selectedUser = users.find(
      (u) => String(u.id) === String(booking.userId)
    );

    const selectedOffer = offers.find(
      (o) => String(o.id) === String(booking.offerId)
    );

    await BookingService.update(id, {
      ...booking,

      userName: selectedUser
        ? `${selectedUser.firstName ?? ""} ${selectedUser.lastName ?? ""}`.trim()
        : "",

      offerName: selectedOffer?.name ?? "",
    });

    navigate(RouteNames.BOOKINGS);
  }

  return (
    <div className="container py-4">

      <Card className="p-4">
        <h2 className="mb-4">Edit Booking</h2>

        <Row className="g-3">

          {/* USER */}
          <Col md={6}>
            <Form.Label>User</Form.Label>
            <Form.Select
              name="userId"
              value={booking.userId}
              onChange={handleChange}
            >
              <option value="">Select user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.firstName} {u.lastName}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* OFFER */}
          <Col md={6}>
            <Form.Label>Offer</Form.Label>
            <Form.Select
              name="offerId"
              value={booking.offerId}
              onChange={handleChange}
            >
              <option value="">Select offer</option>
              {offers.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* DATES */}
          <Col md={6}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={booking.startDate}
              onChange={handleChange}
            />
          </Col>

          <Col md={6}>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={booking.endDate}
              onChange={handleChange}
            />
          </Col>

          {/* NUMBERS */}
          <Col md={4}>
            <Form.Label>Rooms</Form.Label>
            <Form.Control
              type="number"
              name="numberOfRooms"
              value={booking.numberOfRooms}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <Form.Label>Adults</Form.Label>
            <Form.Control
              type="number"
              name="adults"
              value={booking.adults}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <Form.Label>Kids</Form.Label>
            <Form.Control
              type="number"
              name="kids"
              value={booking.kids}
              onChange={handleChange}
            />
          </Col>

        </Row>

        {/* ACTIONS */}
        <div className="d-flex gap-2 mt-4">

          <Button variant="success" onClick={save}>
            Save Changes
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate(RouteNames.BOOKINGS)}
          >
            Cancel
          </Button>

        </div>

      </Card>
    </div>
  );
}