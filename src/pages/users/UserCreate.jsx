import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import UserService from "../../services/users/UserService";

export default function UserCreate() {
  const navigate = useNavigate();

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

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

    const updated = { ...user, [name]: value };
    setUser(updated);
    setErrors(validate(updated));
  }

  function validate(values = user) {
    const err = {};

    if (!values.firstName) err.firstName = "Required";
    if (!values.lastName) err.lastName = "Required";
    if (!values.email) err.email = "Required";
    if (!values.gender) err.gender = "Required";
    if (!values.dateOfBirth) err.dateOfBirth = "Required";
    if (!values.phoneNumber) err.phoneNumber = "Required";
    if (!values.city) err.city = "Required";

    return err;
  }

  function handleBlur(field) {
    setTouched((p) => ({ ...p, [field]: true }));
    setErrors(validate());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const err = validate();
    setErrors(err);
    setTouched({
      firstName: true,
      lastName: true,
      gender: true,
      dateOfBirth: true,
      email: true,
      phoneNumber: true,
      city: true,
    });

    if (Object.keys(err).length > 0) return;

    await UserService.dodaj(user);
    navigate(RouteNames.USERS);
  }

  const showError = (f) => touched[f] && errors[f];

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
                onBlur={() => handleBlur("firstName")}
                isInvalid={showError("firstName")}
              />
              <Form.Control.Feedback type="invalid">
                Required
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                onBlur={() => handleBlur("lastName")}
                isInvalid={showError("lastName")}
              />
              <Form.Control.Feedback type="invalid">
                Required
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                onBlur={() => handleBlur("gender")}
                isInvalid={showError("gender")}
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Col>

            <Col md={6}>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={handleChange}
                onFocus={(e) => e.target.showPicker?.()}
                onBlur={() => handleBlur("dateOfBirth")}
                isInvalid={showError("dateOfBirth")}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={user.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                isInvalid={showError("email")}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                onBlur={() => handleBlur("phoneNumber")}
                isInvalid={showError("phoneNumber")}
              />
            </Col>

            <Col md={12}>
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={user.city}
                onChange={handleChange}
                onBlur={() => handleBlur("city")}
                isInvalid={showError("city")}
              />
            </Col>

          </Row>

          <div className="mt-4 d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={() => navigate(RouteNames.USERS)}>
              Cancel
            </Button>

            <Button type="submit" variant="success">
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}