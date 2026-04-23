import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookingService from "../../services/booking/BookingServiceLocalStorage";
import OfferService from "../../services/offers/OffersService";
import UserService from "../../services/users/UserServiceLocalStorage";

import { RouteNames } from "../../constants";

export default function BookingCreate() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [users, setUsers] = useState([]);

  const [booking, setBooking] = useState({
    userId: "",
    offerId: "",
    startDate: "",
    endDate: "",
    numberOfRooms: 0,
    adults: 0,
    kids: 0,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const offersResult = await OfferService.get();
    const usersResult = await UserService.get();

    setOffers(offersResult.data || []);
    setUsers(usersResult.data || []);
  }

  function validate(values = booking) {
    const newErrors = {};

    if (!values.userId) newErrors.userId = "User is required";
    if (!values.offerId) newErrors.offerId = "Offer is required";
    if (!values.startDate) newErrors.startDate = "Start date is required";
    if (!values.endDate) newErrors.endDate = "End date is required";

    if (
      values.startDate &&
      values.endDate &&
      values.startDate > values.endDate
    ) {
      newErrors.endDate = "End date must be after start date";
    }

    return newErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    const updated = {
      ...booking,
      [name]: value,
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

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(booking);
    setErrors(validationErrors);

    setTouched({
      userId: true,
      offerId: true,
      startDate: true,
      endDate: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    const selectedUser = users.find(
      (user) => String(user.id) === String(booking.userId)
    );

    const selectedOffer = offers.find(
      (offer) => String(offer.id) === String(booking.offerId)
    );

    await BookingService.add({
      userId: booking.userId,
      userName: selectedUser
        ? `${selectedUser.firstName ?? ""} ${selectedUser.lastName ?? ""}`.trim()
        : "Unknown user",

      offerId: booking.offerId,
      offerName: selectedOffer?.name ?? "Unknown offer",

      startDate: booking.startDate,
      endDate: booking.endDate,

      numberOfRooms: Number(booking.numberOfRooms),
      adults: Number(booking.adults),
      kids: Number(booking.kids),
    });

    navigate(RouteNames.BOOKINGS);
  }

  return (
    <div className="container py-4">
      <Card className="p-4">
        <h2 className="mb-4">Add New Booking</h2>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">

            {/* USER */}
            <Col md={6}>
              <Form.Label>User</Form.Label>

              <Form.Select
                name="userId"
                value={booking.userId}
                onChange={handleChange}
                onBlur={() => handleBlur("userId")}
                isInvalid={showError("userId")}
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

            {/* OFFER */}
            <Col md={6}>
              <Form.Label>Offer</Form.Label>

              <Form.Select
                name="offerId"
                value={booking.offerId}
                onChange={handleChange}
                onBlur={() => handleBlur("offerId")}
                isInvalid={showError("offerId")}
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

            {/* START DATE (FIXED CALENDAR) */}
            <Col md={6}>
              <Form.Label>Start Date</Form.Label>

              <Form.Control
                type="date"
                name="startDate"
                value={booking.startDate}
                onChange={handleChange}
                onBlur={() => handleBlur("startDate")}
                onFocus={(e) => e.target.showPicker?.()}
                isInvalid={showError("startDate")}
              />
            </Col>

            {/* END DATE (FIXED CALENDAR) */}
            <Col md={6}>
              <Form.Label>End Date</Form.Label>

              <Form.Control
                type="date"
                name="endDate"
                value={booking.endDate}
                onChange={handleChange}
                onBlur={() => handleBlur("endDate")}
                onFocus={(e) => e.target.showPicker?.()}
                isInvalid={showError("endDate")}
              />
            </Col>

            {/* ROOMS */}
            <Col md={4}>
              <Form.Label>Rooms</Form.Label>

              <Form.Control
                type="number"
                min="0"
                name="numberOfRooms"
                value={booking.numberOfRooms}
                onChange={handleChange}
              />
            </Col>

            {/* ADULTS */}
            <Col md={4}>
              <Form.Label>Adults</Form.Label>

              <Form.Control
                type="number"
                min="0"
                name="adults"
                value={booking.adults}
                onChange={handleChange}
              />
            </Col>

            {/* KIDS */}
            <Col md={4}>
              <Form.Label>Kids</Form.Label>

              <Form.Control
                type="number"
                min="0"
                name="kids"
                value={booking.kids}
                onChange={handleChange}
              />
            </Col>

          </Row>

          <div className="d-flex gap-2 mt-4">
            <Button variant="primary" type="submit">
              Create Booking
            </Button>

            <Button
              variant="outline-secondary"
              onClick={() => navigate(RouteNames.BOOKINGS)}
            >
              Cancel
            </Button>
          </div>

        </Form>
      </Card>
    </div>
  );
}