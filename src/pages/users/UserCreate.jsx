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

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  function validate(values = user) {
    const error = {};

    if (!values.firstName) error.firstName = "First name is required";
    if (!values.lastName) error.lastName = "Last name is required";
    if (!values.email) error.email = "Email is required";
    if (!values.city) error.city = "City is required";

    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    let updatedValue = value;

    if (["firstName", "lastName", "city"].includes(name)) {
      updatedValue = capitalize(value);
    }

    const updatedUser = {
      ...user,
      [name]: updatedValue,
    };

    setUser(updatedUser);
    setErrors(validate(updatedUser));
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  async function save() {
    const error = validate();

    setErrors(error);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      city: true,
    });

    if (Object.keys(error).length > 0) return;

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
                onBlur={() => handleBlur("firstName")}
                isInvalid={showError("firstName")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>

            <Col md={4}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                onBlur={() => handleBlur("lastName")}
                isInvalid={showError("lastName")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>

            <Col md={4}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={user.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                isInvalid={showError("email")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Col>

            <Col md={4}>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth}
                onChange={handleChange}
                onFocus={(e) => e.target.showPicker?.()}
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
                onBlur={() => handleBlur("city")}
                isInvalid={showError("city")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Col>

          </Row>

          <div className="d-flex gap-2 mt-4">
            <Button variant="success" onClick={save}>
              Save User
            </Button>

            <Button variant="secondary" onClick={() => navigate(RouteNames.USERS)}>
              Cancel
            </Button>
          </div>

        </Form>
      </Card>
    </div>
  );
}