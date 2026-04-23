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
    setSelectedOfferId(String(b.offerId || ""));
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

  const showError = (field) => touched[field] && errors[field];

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

    const selectedUser = users.find(
      (u) => String(u.id) === String(selectedUserId)
    );

    const selectedOffer = offers.find(
      (o) => String(o.id) === String(selectedOfferId)
    );

    await BookingService.promjeni(id, {
      ...booking,

      userId: Number(selectedUserId),
      userName: selectedUser
        ? `${selectedUser.firstName ?? ""} ${selectedUser.lastName ?? ""}`.trim()
        : "Unknown user",

      offerId: Number(selectedOfferId),
      offerName: selectedOffer?.name ?? selectedOffer?.title ?? "Unknown offer",
    });

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
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              onBlur={() => handleBlur("user")}
              isInvalid={showError("user")}
            >
              <option value="">Select user...</option>

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
              value={selectedOfferId}
              onChange={(e) => setSelectedOfferId(e.target.value)}
              onBlur={() => handleBlur("offer")}
              isInvalid={showError("offer")}
            >
              <option value="">Select offer...</option>

              {offers.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name ?? o.title}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* START DATE */}
          <Col md={6}>
            <Form.Label>Start Date</Form.Label>

            <Form.Control
              type="date"
              value={booking.startDate}
              onChange={(e) =>
                setBooking({ ...booking, startDate: e.target.value })
              }
              onFocus={(e) => e.target.showPicker?.()}
            />
          </Col>

          {/* END DATE */}
          <Col md={6}>
            <Form.Label>End Date</Form.Label>

            <Form.Control
              type="date"
              value={booking.endDate}
              onChange={(e) =>
                setBooking({ ...booking, endDate: e.target.value })
              }
              onFocus={(e) => e.target.showPicker?.()}
            />
          </Col>

          {/* ROOMS */}
          <Col md={4}>
            <Form.Label>Rooms</Form.Label>

            <Form.Control
              type="number"
              min="0"
              value={booking.numberOfRooms}
              onChange={(e) =>
                handleNumber("numberOfRooms", e.target.value)
              }
            />
          </Col>

          {/* ADULTS */}
          <Col md={4}>
            <Form.Label>Adults</Form.Label>

            <Form.Control
              type="number"
              min="0"
              value={booking.adults}
              onChange={(e) =>
                handleNumber("adults", e.target.value)
              }
            />
          </Col>

          {/* KIDS */}
          <Col md={4}>
            <Form.Label>Kids</Form.Label>

            <Form.Control
              type="number"
              min="0"
              value={booking.kids}
              onChange={(e) =>
                handleNumber("kids", e.target.value)
              }
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