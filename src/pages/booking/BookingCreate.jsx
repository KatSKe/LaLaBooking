import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import OffersService from "../../services/offers/OffersService";
import UsersService from "../../services/users/UserServiceLocalStorage";
import BookingService from "../../services/booking/BookingService";

export default function BookingCreate() {
  const [offers, setOffers] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [booking, setBooking] = useState({
    startDate: "",
    endDate: "",
    numberOfRooms: 1,
    adults: 1,
    kids: 0,
  });

  useEffect(() => {
    loadOffers();
    loadUsers();
  }, []);

  async function loadOffers() {
    const res = await OffersService.get();
    setOffers(res.data || []);
  }

  async function loadUsers() {
    const res = await UsersService.get();
    setUsers(res.data || []);
  }

  function getOfferLabel(o) {
    return o?.name || o?.naziv || o?.title || "";
  }

  // ✅ FIXED USERS LABEL (supports BOTH old + new model)
  function getUserLabel(u) {
    const firstName = u?.firstName || u?.ime || "";
    const lastName = u?.lastName || u?.prezime || "";

    return `${firstName} ${lastName}`.trim();
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function saveBooking() {
    if (!selectedUser || !selectedOffer) {
      alert("Please select user and offer");
      return;
    }

    await BookingService.dodaj({
      ...booking,
      user: selectedUser.sifra || selectedUser.id,
      offer: selectedOffer.sifra || selectedOffer.id,
    });

    alert("Booking saved");
  }

  return (
    <div className="container py-4">

      <h2 className="mb-4">Create Booking</h2>

      <Row className="g-4">

        {/* USERS - FIXED */}
        <Col md={6}>
          <Card className="p-3">
            <h5>Select User</h5>

            <Form.Select
              onChange={(e) => {
                const id = e.target.value;

                const user = users.find(
                  (u) => String(u.sifra || u.id) === id
                );

                setSelectedUser(user);
              }}
            >
              <option value="">Select user...</option>

              {users.map((u) => (
                <option key={u.sifra || u.id} value={u.sifra || u.id}>
                  {getUserLabel(u)}
                </option>
              ))}
            </Form.Select>

          </Card>
        </Col>

        {/* OFFERS (UNCHANGED) */}
        <Col md={6}>
          <Card className="p-3">
            <h5>Select Offer</h5>

            <Form.Select
              onChange={(e) => {
                const id = e.target.value;

                const offer = offers.find(
                  (o) => String(o.sifra || o.id) === id
                );

                setSelectedOffer(offer);
              }}
            >
              <option value="">Select offer...</option>

              {offers.map((o) => (
                <option key={o.sifra || o.id} value={o.sifra || o.id}>
                  {getOfferLabel(o)}
                </option>
              ))}
            </Form.Select>

          </Card>
        </Col>

      </Row>

      {/* BOOKING FORM */}
      <Card className="mt-4 p-3">
        <Row className="g-3">

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
      </Card>

      <div className="mt-4">
        <Button
          variant="primary"
          disabled={!selectedUser || !selectedOffer}
          onClick={saveBooking}
        >
          Confirm Booking
        </Button>
      </div>

    </div>
  );
}