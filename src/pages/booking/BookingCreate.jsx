// BookingCreate.jsx

import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookingService from "../../services/booking/BookingService";
import OffersService from "../../services/offers/OffersService";
import UserService from "../../services/users/UserService";

import { RouteNames } from "../../constants";

export default function BookingCreate() {
  const navigate = useNavigate();

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
    const usersResponse = await UserService.get();
    const offersResponse = await OffersService.get();

    setUsers(usersResponse.data || []);
    setOffers(offersResponse.data || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  function validate(values = booking) {
    const error = {};

    if (!values.userId) error.userId = "User is required";
    if (!values.offerId) error.offerId = "Offer is required";
    if (!values.startDate) error.startDate = "Start date is required";
    if (!values.endDate) error.endDate = "End date is required";

    return error;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    const numberFields = ["numberOfRooms", "adults", "kids"];

    const updatedBooking = {
      ...booking,
      [name]: numberFields.includes(name)
        ? Math.max(0, Number(value))
        : value,
    };

    setBooking(updatedBooking);
    setErrors(validate(updatedBooking));
  }

  function handleBlur(field) {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    setErrors(validate());
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate();

    setErrors(validationErrors);

    setTouched({
      userId: true,
      offerId: true,
      startDate: true,
      endDate: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    await BookingService.add({
      ...booking,
      userId: Number(booking.userId),
      offerId: Number(booking.offerId),
      numberOfRooms: Number(booking.numberOfRooms),
      adults: Number(booking.adults),
      kids: Number(booking.kids),
    });

    navigate(RouteNames.BOOKINGS);
  }

  return (
    <div className="users-page">
      <div className="users-page_overlay"></div>

      <div className="users-page_content">
        <div className="users-glass-card">

          <div className="users-header">
            <h2 className="users-title">Add Booking</h2>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row className="g-3">

              <Col md={6}>
                <Form.Label className="types-form-label">
                  User
                </Form.Label>

                <Form.Select
                  name="userId"
                  value={booking.userId}
                  onChange={handleChange}
                  onBlur={() => handleBlur("userId")}
                  isInvalid={showError("userId")}
                  className="types-form-input"
                >
                  <option value="">Select user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.userId}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label className="types-form-label">
                  Offer
                </Form.Label>

                <Form.Select
                  name="offerId"
                  value={booking.offerId}
                  onChange={handleChange}
                  onBlur={() => handleBlur("offerId")}
                  isInvalid={showError("offerId")}
                  className="types-form-input"
                >
                  <option value="">Select offer</option>
                  {offers.map((offer) => (
                    <option key={offer.id} value={offer.id}>
                      {offer.name}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.offerId}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label className="types-form-label">
                  Start Date
                </Form.Label>

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
                <Form.Label className="types-form-label">
                  End Date
                </Form.Label>

                <Form.Control
                  type="date"
                  name="endDate"
                  value={booking.endDate}
                  onChange={handleChange}
                  onBlur={() => handleBlur("endDate")}
                  className="types-form-input"
                />
              </Col>

            </Row>

            <div className="types-actions mt-4">

              <Button className="users-add-button" type="submit">
                Create Booking
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