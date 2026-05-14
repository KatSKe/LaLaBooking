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
    contactNumber: "",
    address: {
      street: "",
      houseNumber: "",
      postalCode: "",
      city: "",
    },
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  function capitalize(value) {
    return value
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function formatPhone(value) {
    let digits = value.replace(/\D/g, "");

    if (!digits) return "";

    if (digits.startsWith("0")) {
      digits = "385" + digits.slice(1);
    }

    if (!digits.startsWith("385")) {
      digits = "385" + digits;
    }

    digits = digits.slice(0, 12);

    return `+${digits.slice(0, 3)} ${digits.slice(
      3,
      5
    )} ${digits.slice(5, 8)} ${digits.slice(8, 12)}`.trim();
  }

  function validate(values = user) {
    const error = {};

    if (!values.firstName) {
      error.firstName = "First name is required";
    }

    if (!values.lastName) {
      error.lastName = "Last name is required";
    }

    if (!values.email) {
      error.email = "Email is required";
    } else if (!isValidEmail(values.email)) {
      error.email = "Invalid email format";
    }

    if (!values.contactNumber) {
      error.contactNumber = "Contact number is required";
    }

    if (!values.dateOfBirth) {
      error.dateOfBirth = "Date of birth is required";
    }

    if (!values.address.city) {
      error.city = "City is required";
    }

    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];

      const updatedUser = {
        ...user,
        address: {
          ...user.address,
          [field]: capitalize(value),
        },
      };

      setUser(updatedUser);
      setErrors(validate(updatedUser));

      return;
    }

    if (name === "contactNumber") {
      const updatedUser = {
        ...user,
        contactNumber: formatPhone(value),
      };

      setUser(updatedUser);
      setErrors(validate(updatedUser));

      return;
    }

    let updatedValue = value;

    if (["firstName", "lastName"].includes(name)) {
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
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    setErrors(validate());
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  async function save() {
    const validationErrors = validate();

    setErrors(validationErrors);

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      contactNumber: true,
      dateOfBirth: true,
      city: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await UsersService.add(user);

    navigate(RouteNames.USERS);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Add User</h2>

      <Card className="p-3">
        <Form>
          <Row className="g-3">
            <Col md={4}>
              <Form.Label htmlFor="firstName">First Name</Form.Label>

              <Form.Control
                id="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                onBlur={() => handleBlur("firstName")}
                isInvalid={showError("firstName")}
                aria-required="true"
              />

              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>

            <Col md={4}>
              <Form.Label htmlFor="lastName">Last Name</Form.Label>

              <Form.Control
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                onBlur={() => handleBlur("lastName")}
                isInvalid={showError("lastName")}
                aria-required="true"
              />

              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>

            <Col md={4}>
              <Form.Label htmlFor="email">Email</Form.Label>

              <Form.Control
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                isInvalid={showError("email")}
                aria-required="true"
              />

              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Col>

            <Col md={4}>
              <Form.Label htmlFor="dateOfBirth">Date of Birth</Form.Label>

              <Form.Control
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth || ""}
                onChange={handleChange}
                onFocus={(e) => e.target.showPicker?.()}
                onMouseEnter={(e) => e.target.showPicker?.()}
                onBlur={() => handleBlur("dateOfBirth")}
                isInvalid={showError("dateOfBirth")}
                aria-required="true"
              />

              <Form.Control.Feedback type="invalid">
                {errors.dateOfBirth}
              </Form.Control.Feedback>
            </Col>

            <Col md={4}>
              <Form.Label htmlFor="contactNumber">Contact Number</Form.Label>

              <Form.Control
                id="contactNumber"
                name="contactNumber"
                value={user.contactNumber || ""}
                onChange={handleChange}
                placeholder="+385 91 234 5678"
                onBlur={() => handleBlur("contactNumber")}
                isInvalid={showError("contactNumber")}
                aria-required="true"
              />

              <Form.Text muted>
                Format: +385 91 234 5678
              </Form.Text>

              <Form.Control.Feedback type="invalid">
                {errors.contactNumber}
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label htmlFor="street">Street</Form.Label>

              <Form.Control
                id="street"
                name="address.street"
                value={user.address.street}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label htmlFor="houseNumber">House Number</Form.Label>

              <Form.Control
                id="houseNumber"
                name="address.houseNumber"
                value={user.address.houseNumber}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label htmlFor="postalCode">Postal Code</Form.Label>

              <Form.Control
                id="postalCode"
                name="address.postalCode"
                value={user.address.postalCode}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label htmlFor="city">City</Form.Label>

              <Form.Control
                id="city"
                name="address.city"
                value={user.address.city}
                onChange={handleChange}
                onBlur={() => handleBlur("city")}
                isInvalid={showError("city")}
                aria-required="true"
              />

              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <div className="d-flex gap-2 mt-4">
            <Button variant="success" onClick={save}>
              Save
            </Button>

            <Button
              type="button"
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