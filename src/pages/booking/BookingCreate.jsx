import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import BookingService from "../../services/booking/BookingService";
import OfferService from "../../services/offers/OffersService";
import UserService from "../../services/users/UserService";

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
    active: true,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const offersResponse =
      await OfferService.get();

    const usersResponse =
      await UserService.get();

    setOffers(offersResponse.data || []);
    setUsers(usersResponse.data || []);
  }

  function validate(values = booking) {
    const validationErrors = {};

    if (!values.userId) {
      validationErrors.userId =
        "User is required";
    }

    if (!values.offerId) {
      validationErrors.offerId =
        "Offer is required";
    }

    if (!values.startDate) {
      validationErrors.startDate =
        "Start date is required";
    }

    if (!values.endDate) {
      validationErrors.endDate =
        "End date is required";
    }

    return validationErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    const numericFields = [
      "numberOfRooms",
      "adults",
      "kids",
    ];

    const updatedBooking = {
      ...booking,
      [name]: numericFields.includes(name)
        ? Math.max(0, Number(value))
        : value,
    };

    setBooking(updatedBooking);

    setErrors(validate(updatedBooking));
  }

  function toggleActive() {
    setBooking((previous) => ({
      ...previous,
      active: !previous.active,
    }));
  }

  function handleBlur(field) {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));

    setErrors(validate(booking));
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors =
      validate(booking);

    setErrors(validationErrors);

    setTouched({
      userId: true,
      offerId: true,
      startDate: true,
      endDate: true,
    });

    if (
      Object.keys(validationErrors).length > 0
    ) {
      return;
    }

    await BookingService.add({
      ...booking,
    });

    navigate(RouteNames.BOOKINGS);
  }

  return (
    <div className="container py-4">
      <Card className="p-4">
        <h2 className="mb-4">
          Add New Booking
        </h2>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Label>User</Form.Label>

              <Form.Select
                name="userId"
                value={booking.userId}
                onChange={handleChange}
                onBlur={() =>
                  handleBlur("userId")
                }
                isInvalid={showError(
                  "userId"
                )}
              >
                <option value="">
                  Select user
                </option>

                {users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.firstName}{" "}
                    {user.lastName}
                  </option>
                ))}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors.userId}
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label>Offer</Form.Label>

              <Form.Select
                name="offerId"
                value={booking.offerId}
                onChange={handleChange}
                onBlur={() =>
                  handleBlur("offerId")
                }
                isInvalid={showError(
                  "offerId"
                )}
              >
                <option value="">
                  Select offer
                </option>

                {offers.map((offer) => (
                  <option
                    key={offer.id}
                    value={offer.id}
                  >
                    {offer.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Control.Feedback type="invalid">
                {errors.offerId}
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label>
                Start Date
              </Form.Label>

              <Form.Control
                type="date"
                name="startDate"
                value={booking.startDate}
                onChange={handleChange}
                onFocus={(event) =>
                  event.target.showPicker?.()
                }
                onMouseEnter={(event) =>
                  event.target.showPicker?.()
                }
                onBlur={() =>
                  handleBlur("startDate")
                }
                isInvalid={showError(
                  "startDate"
                )}
              />

              <Form.Control.Feedback type="invalid">
                {errors.startDate}
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label>
                End Date
              </Form.Label>

              <Form.Control
                type="date"
                name="endDate"
                value={booking.endDate}
                onChange={handleChange}
                onFocus={(event) =>
                  event.target.showPicker?.()
                }
                onMouseEnter={(event) =>
                  event.target.showPicker?.()
                }
                onBlur={() =>
                  handleBlur("endDate")
                }
                isInvalid={showError(
                  "endDate"
                )}
              />

              <Form.Control.Feedback type="invalid">
                {errors.endDate}
              </Form.Control.Feedback>
            </Col>

            <Col md={4}>
              <Form.Label>Rooms</Form.Label>

              <Form.Control
                type="number"
                name="numberOfRooms"
                value={
                  booking.numberOfRooms
                }
                min={0}
                onChange={handleChange}
              />
            </Col>

            <Col md={4}>
              <Form.Label>Adults</Form.Label>

              <Form.Control
                type="number"
                name="adults"
                value={booking.adults}
                min={0}
                onChange={handleChange}
              />
            </Col>

            <Col md={4}>
              <Form.Label>Kids</Form.Label>

              <Form.Control
                type="number"
                name="kids"
                value={booking.kids}
                min={0}
                onChange={handleChange}
              />
            </Col>

            <Col xs={12}>
              <Form.Check
                type="switch"
                id="booking-active-switch"
                label="Active"
                checked={booking.active}
                onChange={toggleActive}
              />
            </Col>
          </Row>

          <div className="d-flex gap-2 mt-4 flex-wrap">
            <Button
              variant="success"
              type="submit"
            >
              Create Booking
            </Button>

            <Button
              variant="secondary"
              onClick={() =>
                navigate(
                  RouteNames.BOOKINGS
                )
              }
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}