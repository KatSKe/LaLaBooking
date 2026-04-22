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

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedOfferId, setSelectedOfferId] = useState("");

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const [booking, setBooking] = useState({
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

  function formatDate(date) {
    if (!date) return "";
    return date.split("T")[0];
  }

  async function loadBooking() {
    const res = await BookingService.getById(id);
    if (!res.data) return;

    const b = res.data;

    setBooking({
      startDate: formatDate(b.startDate),
      endDate: formatDate(b.endDate),
      numberOfRooms: b.numberOfRooms ?? 0,
      adults: b.adults ?? 0,
      kids: b.kids ?? 0,
    });

    setSelectedUserId(String(b.userId || ""));
    setSelectedOfferId(String(b.offer || ""));
  }

  function validate(values = booking) {
    const err = {};

    if (!selectedUserId) err.user = "User is required";
    if (!selectedOfferId) err.offer = "Offer is required";
    if (!values.startDate) err.startDate = "Start Date is required";
    if (!values.endDate) err.endDate = "End Date is required";

    return err;
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  function handleNumber(name, value) {
    const updated = {
      ...booking,
      [name]: Math.max(0, Number(value)),
    };

    setBooking(updated);
    setErrors(validate(updated));
  }

  async function save() {
    const err = validate();

    setErrors(err);
    setTouched({
      user: true,
      offer: true,
      startDate: true,
      endDate: true,
    });

    if (Object.keys(err).length > 0) return;

    await BookingService.promjeni(id, {
      ...booking,
      userId: Number(selectedUserId),
      offer: Number(selectedOfferId),
    });

    navigate(RouteNames.BOOKINGS);
  }

  const showError = (field) => touched[field] && errors[field];

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Booking</h2>

      <Card className="p-3">
        <Row className="g-3">

          <Col md={6}>
            <Form.Label>User</Form.Label>

            <Form.Select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              onBlur={() => handleBlur("user")}
              style={{ borderColor: showError("user") ? "#dc3545" : "" }}
            >
              <option value="">Select user...</option>
              {users
                .filter((u) => u && typeof u === "object")
                .filter((u) => u.sifra && u.ime && u.prezime)
                .map((u) => (
                  <option key={u.sifra} value={u.sifra}>
                    {u.ime} {u.prezime}
                  </option>
                ))}
            </Form.Select>
          </Col>

          <Col md={6}>
            <Form.Label>Offer</Form.Label>

            <Form.Select
              value={selectedOfferId}
              onChange={(e) => setSelectedOfferId(e.target.value)}
              onBlur={() => handleBlur("offer")}
              style={{ borderColor: showError("offer") ? "#dc3545" : "" }}
            >
              <option value="">Select offer...</option>
              {offers.map((o) => (
                <option key={o.sifra} value={o.sifra}>
                  {o.naziv}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={6}>
            <Form.Label>Start Date</Form.Label>

            <Form.Control
              type="date"
              value={booking.startDate}
              onChange={(e) => {
                const updated = { ...booking, startDate: e.target.value };
                setBooking(updated);
                setErrors(validate(updated));
              }}
            />
          </Col>

          <Col md={6}>
            <Form.Label>End Date</Form.Label>

            <Form.Control
              type="date"
              value={booking.endDate}
              onChange={(e) => {
                const updated = { ...booking, endDate: e.target.value };
                setBooking(updated);
                setErrors(validate(updated));
              }}
            />
          </Col>

        </Row>

        <div className="mt-4 d-flex gap-2">
          <Button variant="success" onClick={save}>
            Save Changes
          </Button>

          <Button
            variant="outline-secondary"
            onClick={() => navigate(RouteNames.BOOKINGS)}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}