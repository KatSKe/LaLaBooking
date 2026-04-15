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

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const [booking, setBooking] = useState({
    startDate: "",
    endDate: "",
    numberOfRooms: 1,
    adults: 1,
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
      startDate: b.startDate || "",
      endDate: b.endDate || "",
      numberOfRooms: b.numberOfRooms || 1,
      adults: b.adults || 1,
      kids: b.kids || 0,
    });

    const user = (await UsersService.get()).data.find(
      (x) => String(x.sifra || x.id) === String(b.userId || b.user)
    );

    const offer = (await OffersService.get()).data.find(
      (x) => String(x.sifra || x.id) === String(b.offerId || b.offer)
    );

    setSelectedUser(user || null);
    setSelectedOffer(offer || null);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function save() {
    await BookingService.promjeni(id, {
      ...booking,
      userId: selectedUser?.sifra ?? selectedUser?.id,
      offerId: selectedOffer?.sifra ?? selectedOffer?.id,
    });

    navigate(RouteNames.BOOKINGS);
  }

  function cancel() {
    navigate(RouteNames.BOOKINGS);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Booking</h2>

      <Card className="p-3">
        <Row className="g-3">
          {/* USER */}
          <Col md={6}>
            <Form.Label>User</Form.Label>
            <Form.Select
              value={selectedUser?.sifra || selectedUser?.id || ""}
              onChange={(e) => {
                const user = users.find(
                  (x) => String(x.sifra || x.id) === e.target.value
                );
                setSelectedUser(user);
              }}
            >
              <option value="">Select user...</option>
              {users.map((u) => (
                <option key={u.sifra || u.id} value={u.sifra || u.id}>
                  {u.firstName} {u.lastName}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* OFFER */}
          <Col md={6}>
            <Form.Label>Offer</Form.Label>
            <Form.Select
              value={selectedOffer?.sifra || selectedOffer?.id || ""}
              onChange={(e) => {
                const offer = offers.find(
                  (x) => String(x.sifra || x.id) === e.target.value
                );
                setSelectedOffer(offer);
              }}
            >
              <option value="">Select offer...</option>
              {offers.map((o) => (
                <option key={o.sifra || o.id} value={o.sifra || o.id}>
                  {o.name || o.naziv}
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

        {/* BUTTONS */}
        <div className="mt-4 d-flex gap-2">
          <Button variant="success" onClick={save}>
            Save Changes
          </Button>

          <Button variant="outline-secondary" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}