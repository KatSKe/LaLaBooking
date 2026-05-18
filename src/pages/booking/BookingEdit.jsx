import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import BookingService from "../../services/booking/BookingService";
import UsersService from "../../services/users/UserService";
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
    active: true,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  async function loadData() {
    const u = await UsersService.get();
    const o = await OffersService.get();

    setUsers(u.data || []);
    setOffers(o.data || []);
  }

  async function loadBooking() {
    const res = await BookingService.getById(id);

    if (!res.data) {
      navigate(RouteNames.BOOKINGS);
      return;
    }

    const b = res.data;

    setBooking({
      userId: String(b.userId || ""),
      offerId: String(b.offerId || ""),
      startDate: b.startDate.substring(0, 10),
      endDate: b.endDate.substring(0, 10),
      numberOfRooms: b.numberOfRooms ?? 0,
      adults: b.adults ?? 0,
      kids: b.kids ?? 0,
      active: b.active ?? false,
    });
  }

  useEffect(() => {
    loadData();
    loadBooking();
  }, []);

  function validate(values = booking) {
    const error = {};

    if (!values.userId) error.userId = "User is required";
    if (!values.offerId) error.offerId = "Offer is required";
    if (!values.startDate) error.startDate = "Start date is required";
    if (!values.endDate) error.endDate = "End date is required";

    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const numericFields = ["numberOfRooms", "adults", "kids"];

    const updated = {
      ...booking,
      [name]: numericFields.includes(name)
        ? Math.max(0, Number(value))
        : value,
    };

    setBooking(updated);
    setErrors(validate(updated));
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(booking));
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  function toggleActive() {
    setBooking((prev) => ({
      ...prev,
      active: !prev.active,
    }));
  }

  async function save() {
    const validationErrors = validate();

    setErrors(validationErrors);

    setTouched({
      userId: true,
      offerId: true,
      startDate: true,
      endDate: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    const selectedUser = users.find(
      (u) => String(u.id) === String(booking.userId)
    );

    const selectedOffer = offers.find(
      (o) => String(o.id) === String(booking.offerId)
    );

    await BookingService.update(id, {
      ...booking,
      userName:
        selectedUser
          ? `${selectedUser.firstName} ${selectedUser.lastName}`
          : "",
      offerName: selectedOffer?.name ?? "",
    });

    navigate(RouteNames.BOOKINGS);
  }

  return (
    <div className="users-page">
      <div className="users-page_overlay"></div>

      <div className="users-page_content">
        <div className="users-glass-card">

          <div className="users-header">
            <h2 className="users-title">Edit Booking</h2>
          </div>

          <Form>
            <Row className="g-3">

              <Col md={6}>
                <Form.Label className="types-form-label">User</Form.Label>

                <Form.Select
                  name="userId"
                  value={booking.userId}
                  onChange={handleChange}
                  onBlur={() => handleBlur("userId")}
                  isInvalid={showError("userId")}
                  className="types-form-input"
                >
                  <option value="">Select user</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.firstName} {u.lastName}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.userId}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label className="types-form-label">Offer</Form.Label>

                <Form.Select
                  name="offerId"
                  value={booking.offerId}
                  onChange={handleChange}
                  onBlur={() => handleBlur("offerId")}
                  isInvalid={showError("offerId")}
                  className="types-form-input"
                >
                  <option value="">Select offer</option>
                  {offers.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.name}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.offerId}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label className="types-form-label">Start Date</Form.Label>

                <Form.Control
                  type="date"
                  name="startDate"
                  value={booking.startDate}
                  onChange={handleChange}
                  onBlur={() => handleBlur("startDate")}
                  className="types-form-input"
                />
              </Col>

              <Col md={6}>
                <Form.Label className="types-form-label">End Date</Form.Label>

                <Form.Control
                  type="date"
                  name="endDate"
                  value={booking.endDate}
                  onChange={handleChange}
                  onBlur={() => handleBlur("endDate")}
                  className="types-form-input"
                />
              </Col>

              <Col md={4}>
                <Form.Label className="types-form-label">Rooms</Form.Label>
                <Form.Control
                  type="number"
                  name="numberOfRooms"
                  value={booking.numberOfRooms}
                  onChange={handleChange}
                  className="types-form-input"
                />
              </Col>

              <Col md={4}>
                <Form.Label className="types-form-label">Adults</Form.Label>
                <Form.Control
                  type="number"
                  name="adults"
                  value={booking.adults}
                  onChange={handleChange}
                  className="types-form-input"
                />
              </Col>

              <Col md={4}>
                <Form.Label className="types-form-label">Kids</Form.Label>
                <Form.Control
                  type="number"
                  name="kids"
                  value={booking.kids}
                  onChange={handleChange}
                  className="types-form-input"
                />
              </Col>

              <Col md={12}>
                <Form.Check
                  type="switch"
                  label="Active"
                  checked={booking.active}
                  onChange={toggleActive}
                />
              </Col>

            </Row>

            <div className="types-actions mt-4">

              <Button className="users-add-button" onClick={save}>
                Save Changes
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate(RouteNames.BOOKINGS)}
              >
                Cancel
              </Button>

            </div>
          </Form>

        </div>
      </div>
    </div>
  );
}