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
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function formatPhone(value) {
    let digits = value.replace(/\D/g, "");

    if (digits.length === 0) return "";

    if (digits.startsWith("0")) {
      digits = "385" + digits.slice(1);
    }

    if (!digits.startsWith("385")) {
      digits = "385" + digits;
    }

    digits = digits.slice(0, 12);

    return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(
      5,
      8
    )} ${digits.slice(8, 12)}`.trim();
  }

  function validate(values = user) {
    const error = {};

    if (!values.firstName) error.firstName = "First name is required";
    if (!values.lastName) error.lastName = "Last name is required";

    if (!values.email) error.email = "Email is required";
    else if (!isValidEmail(values.email))
      error.email = "Invalid email format";

    if (!values.contactNumber)
      error.contactNumber = "Contact number is required";

    if (!values.dateOfBirth)
      error.dateOfBirth = "Date of birth is required";

    if (!values.address.city) error.city = "City is required";

    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];

      const updated = {
        ...user,
        address: {
          ...user.address,
          [field]: capitalize(value),
        },
      };

      setUser(updated);
      setErrors(validate(updated));
      return;
    }

    if (name === "contactNumber") {
      const updated = {
        ...user,
        contactNumber: formatPhone(value),
      };

      setUser(updated);
      setErrors(validate(updated));
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
      contactNumber: true,
      dateOfBirth: true,
      city: true,
    });

    if (Object.keys(error).length > 0) return;

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
                value={user.dateOfBirth || ""}
                onChange={handleChange}
                onFocus={(e) => e.target.showPicker?.()}
                onMouseEnter={(e) => e.target.showPicker?.()}
                onBlur={() => handleBlur("dateOfBirth")}
                isInvalid={showError("dateOfBirth")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfBirth}
              </Form.Control.Feedback>
            </Col>

            <Col md={4}>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                name="contactNumber"
                value={user.contactNumber || ""}
                onChange={handleChange}
                placeholder="+385 91 234 5678"
                onBlur={() => handleBlur("contactNumber")}
                isInvalid={showError("contactNumber")}
              />
              <Form.Text muted>Format: +385 91 234 5678</Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.contactNumber}
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label>Street</Form.Label>
              <Form.Control
                name="address.street"
                value={user.address.street}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>House Number</Form.Label>
              <Form.Control
                name="address.houseNumber"
                value={user.address.houseNumber}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                name="address.postalCode"
                value={user.address.postalCode}
                onChange={handleChange}
              />
            </Col>

            <Col md={6}>
              <Form.Label>City</Form.Label>
              <Form.Control
                name="address.city"
                value={user.address.city}
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
              Save
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