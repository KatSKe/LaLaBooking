import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

import UserService from "../../services/users/UserService";

export default function UserCreate() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    city: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function isValidPhoneNumber(phone) {
    const regex = /^\+385\d{8,9}$/;
    return regex.test(phone);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // reset error
    setError("");

    // validation
    if (!isValidPhoneNumber(user.phoneNumber)) {
      setError("Phone number must be in format +385912345678");
      return;
    }

    await UserService.dodaj(user);

    navigate(RouteNames.USERS);
  }

  return (
    <div className="container py-4">
      <Card className="p-4">
        <h2 className="mb-4">Add New User</h2>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">

            <Col md={6}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={user.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Col>

            <Col md={6}>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                placeholder="+385912345678"
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Col>

            <Col md={12}>
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={user.city}
                onChange={handleChange}
              />
            </Col>

          </Row>

          <div className="mt-4 d-flex justify-content-end gap-2">
            <Link to={RouteNames.USERS} className="btn btn-secondary">
              Cancel
            </Link>

            <Button type="submit" variant="primary">
              Save User
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}