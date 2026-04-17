import { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookingService from "../../services/booking/BookingService";
import UsersService from "../../services/users/UserServiceLocalStorage";
import OffersService from "../../services/offers/OffersService";

import { RouteNames } from "../../constants";

export default function BookingCreate() {
  const navigate = useNavigate();

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
  }, []);

  async function loadData() {
    const u = await UsersService.get();
    const o = await OffersService.get();

    setUsers(u.data || []);
    setOffers(o.data || []);
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

    await BookingService.dodaj({
      ...booking,
      userId: Number(selectedUserId),
      offer: Number(selectedOfferId),
    });

    navigate(RouteNames.BOOKINGS);
  }

  const showError = (field) => touched[field] && errors[field];

  return (
    <div className="container py-4">
      <h2 className="mb-4">Create Booking</h2>

      <Card className="p-3">
        <Row className="g-3">

          {/* USER */}
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
                .filter((u) => u && u.sifra && u.ime && u.prezime)
                .map((u) => (
                  <option key={u.sifra} value={u.sifra}>
                    {u.ime} {u.prezime}
                  </option>
                ))}
            </Form.Select>

            {showError("user") && (
              <div style={{ color: "#dc3545", fontSize: "0.75rem" }}>
                User is required
              </div>
            )}
          </Col>

          {/* OFFER */}
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

            {showError("offer") && (
              <div style={{ color: "#dc3545", fontSize: "0.75rem" }}>
                Offer is required
              </div>
            )}
          </Col>

          {/* START DATE */}
          <Col md={6}>
            <Form.Label>Start Date</Form.Label>

            <Form.Control
              type="date"
              value={booking.startDate}
              onFocus={(e) => e.target.showPicker?.()}
              onChange={(e) => {
                const updated = { ...booking, startDate: e.target.value };
                setBooking(updated);
                setErrors(validate(updated));
              }}
              onBlur={() => handleBlur("startDate")}
              style={{ borderColor: showError("startDate") ? "#dc3545" : "" }}
            />

            {showError("startDate") && (
              <div style={{ color: "#dc3545", fontSize: "0.75rem" }}>
                Start Date is required
              </div>
            )}
          </Col>

          {/* END DATE */}
          <Col md={6}>
            <Form.Label>End Date</Form.Label>

            <Form.Control
              type="date"
              value={booking.endDate}
              onFocus={(e) => e.target.showPicker?.()}
              onChange={(e) => {
                const updated = { ...booking, endDate: e.target.value };
                setBooking(updated);
                setErrors(validate(updated));
              }}
              onBlur={() => handleBlur("endDate")}
              style={{ borderColor: showError("endDate") ? "#dc3545" : "" }}
            />

            {showError("endDate") && (
              <div style={{ color: "#dc3545", fontSize: "0.75rem" }}>
                End Date is required
              </div>
            )}
          </Col>

          {/* NUMBERS */}
          <Col md={4}>
            <Form.Label>Rooms</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={booking.numberOfRooms}
              onChange={(e) => handleNumber("numberOfRooms", e.target.value)}
            />
          </Col>

          <Col md={4}>
            <Form.Label>Adults</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={booking.adults}
              onChange={(e) => handleNumber("adults", e.target.value)}
            />
          </Col>

          <Col md={4}>
            <Form.Label>Kids</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={booking.kids}
              onChange={(e) => handleNumber("kids", e.target.value)}
            />
          </Col>

        </Row>

        <div className="mt-4 d-flex gap-2">
          <Button variant="success" onClick={save}>
            Create Booking
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