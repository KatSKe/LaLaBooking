import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
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
        ? Math.max(0, Number(value)) // 🔥 NO NEGATIVE VALUES
        : value,
    };

    setBooking(updatedBooking);
    setErrors(validate(updatedBooking));
  }

  function handleBlur(field) {
    setTouched(prev => ({
      ...prev,
      [field]: true
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
    <div className="container py-4">
      <Card className="p-4">

        <h2 className="mb-4">Add New Booking</h2>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">

            {/* USER */}
            <Col md={6}>
              <Form.Label htmlFor="userId">User</Form.Label>
              <Form.Select
                id="userId"
                name="userId"
                value={booking.userId}
                onChange={handleChange}
                onBlur={() => handleBlur("userId")}
                isInvalid={showError("userId")}
                aria-required="true"
              >
                <option value="">Select user</option>
                {users.map(user => (
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
              <Form.Label htmlFor="offerId">Offer</Form.Label>
              <Form.Select
                id="offerId"
                name="offerId"
                value={booking.offerId}
                onChange={handleChange}
                onBlur={() => handleBlur("offerId")}
                isInvalid={showError("offerId")}
                aria-required="true"
              >
                <option value="">Select offer</option>
                {offers.map(offer => (
                  <option key={offer.id} value={offer.id}>
                    {offer.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.offerId}
              </Form.Control.Feedback>
            </Col>

            {/* START DATE */}
            <Col md={6}>
              <Form.Label htmlFor="startDate">Start Date</Form.Label>
              <Form.Control
                id="startDate"
                type="date"
                name="startDate"
                value={booking.startDate}
                onChange={handleChange}
                onFocus={(e) => e.target.showPicker?.()}
                onMouseEnter={(e) => e.target.showPicker?.()}
                onBlur={() => handleBlur("startDate")}
                isInvalid={showError("startDate")}
                aria-required="true"
              />
              <Form.Control.Feedback type="invalid">
                {errors.startDate}
              </Form.Control.Feedback>
            </Col>

            {/* END DATE */}
            <Col md={6}>
              <Form.Label htmlFor="endDate">End Date</Form.Label>
              <Form.Control
                id="endDate"
                type="date"
                name="endDate"
                value={booking.endDate}
                onChange={handleChange}
                onFocus={(e) => e.target.showPicker?.()}
                onMouseEnter={(e) => e.target.showPicker?.()}
                onBlur={() => handleBlur("endDate")}
                isInvalid={showError("endDate")}
                aria-required="true"
              />
              <Form.Control.Feedback type="invalid">
                {errors.endDate}
              </Form.Control.Feedback>
            </Col>

            {/* ROOMS */}
            <Col md={4}>
              <Form.Label htmlFor="numberOfRooms">Rooms</Form.Label>
              <Form.Control
                id="numberOfRooms"
                type="number"
                min="0"
                name="numberOfRooms"
                value={booking.numberOfRooms}
                onChange={handleChange}
              />
            </Col>

            {/* ADULTS */}
            <Col md={4}>
              <Form.Label htmlFor="adults">Adults</Form.Label>
              <Form.Control
                id="adults"
                type="number"
                min="0"
                name="adults"
                value={booking.adults}
                onChange={handleChange}
              />
            </Col>

            {/* KIDS */}
            <Col md={4}>
              <Form.Label htmlFor="kids">Kids</Form.Label>
              <Form.Control
                id="kids"
                type="number"
                min="0"
                name="kids"
                value={booking.kids}
                onChange={handleChange}
              />
            </Col>

          </Row>

          {/* BUTTONS */}
          <div className="d-flex gap-2 mt-4">
            <Button type="submit" variant="success">
              Create Booking
            </Button>

            <Button
              type="button"
              variant="secondary"
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