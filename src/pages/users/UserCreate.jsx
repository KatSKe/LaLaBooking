import { useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UsersService from "../../services/users/UserService";
import { RouteNames } from "../../constants";

export default function UserCreate() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    city: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  async function save() {
    await UsersService.add(user);
    navigate(RouteNames.USERS);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Add New User</h2>

      <Card className="p-3">
        <Form>

          <Row className="g-3">

            <Col md={4}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </Col>

            <Col md={4}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
            </Col>

            <Col md={4}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </Col>

            {/* 🔥 DATE OF BIRTH WITH AUTO CALENDAR */}
            <Col md={4}>
              <Form.Label>Date of Birth</Form.Label>

              <Form.Control
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={handleChange}
                onFocus={(e) => e.target.showPicker?.()} // opens calendar instantly (Chrome/Edge)
                onClick={(e) => e.target.showPicker?.()} // extra safety
                style={{ cursor: "pointer" }}
              />
            </Col>

            <Col md={4}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
              />
            </Col>

            <Col md={4}>
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={user.city}
                onChange={handleChange}
              />
            </Col>

          </Row>

          <div className="d-flex gap-2 mt-4">
            <Button variant="success" onClick={save}>
              Save User
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate(RouteNames.USERS)}
            >
              Cancel
            </Button>
          </div>

        </Form>
      </Card>
    </div>
  );
}