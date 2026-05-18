import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import UsersService from "../../services/users/UserService";
import { RouteNames } from "../../constants";

export default function UserEdit() {
  const navigate = useNavigate();

  const { id } = useParams();

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

  async function loadUser() {
    const response = await UsersService.getById(id);

    if (!response.data) {
      navigate(RouteNames.USERS);
      return;
    }

    setUser({
      ...response.data,
      dateOfBirth: response.data.dateOfBirth
        ? response.data.dateOfBirth.split("T")[0]
        : "",
      address: {
        street: response.data.address?.street || "",
        houseNumber: response.data.address?.houseNumber || "",
        postalCode: response.data.address?.postalCode || "",
        city: response.data.address?.city || "",
      },
    });
  }

  useEffect(() => {
    loadUser();
  }, []);

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

    await UsersService.update(id, user);

    navigate(RouteNames.USERS);
  }

  return (
    <div className="users-page">
      <div className="users-page_overlay"></div>

      <div className="users-page_content">
        <div className="users-glass-card">

          <div className="users-header">
            <h2 className="users-title">Edit User</h2>
          </div>

          <Form>

            <Row className="g-3">

              <Col md={4}>
                <Form.Label
                  htmlFor="firstName"
                  className="types-form-label"
                >
                  First Name
                </Form.Label>

                <Form.Control
                  id="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  onBlur={() => handleBlur("firstName")}
                  isInvalid={showError("firstName")}
                  className="types-form-input"
                />

                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Col>

              <Col md={4}>
                <Form.Label
                  htmlFor="lastName"
                  className="types-form-label"
                >
                  Last Name
                </Form.Label>

                <Form.Control
                  id="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  onBlur={() => handleBlur("lastName")}
                  isInvalid={showError("lastName")}
                  className="types-form-input"
                />

                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Col>

              <Col md={4}>
                <Form.Label
                  htmlFor="email"
                  className="types-form-label"
                >
                  Email
                </Form.Label>

                <Form.Control
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  isInvalid={showError("email")}
                  className="types-form-input"
                />

                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>

              <Col md={4}>
                <Form.Label
                  htmlFor="dateOfBirth"
                  className="types-form-label"
                >
                  Date of Birth
                </Form.Label>

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
                  className="types-form-input"
                />

                <Form.Control.Feedback type="invalid">
                  {errors.dateOfBirth}
                </Form.Control.Feedback>
              </Col>

              <Col md={4}>
                <Form.Label
                  htmlFor="contactNumber"
                  className="types-form-label"
                >
                  Contact Number
                </Form.Label>

                <Form.Control
                  id="contactNumber"
                  name="contactNumber"
                  value={user.contactNumber || ""}
                  onChange={handleChange}
                  placeholder="+385 91 234 5678"
                  onBlur={() => handleBlur("contactNumber")}
                  isInvalid={showError("contactNumber")}
                  className="types-form-input"
                />

                <Form.Text
                  style={{
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Format: +385 91 234 5678
                </Form.Text>

                <Form.Control.Feedback type="invalid">
                  {errors.contactNumber}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label
                  htmlFor="street"
                  className="types-form-label"
                >
                  Street
                </Form.Label>

                <Form.Control
                  id="street"
                  name="address.street"
                  value={user.address.street}
                  onChange={handleChange}
                  className="types-form-input"
                />
              </Col>

              <Col md={6}>
                <Form.Label
                  htmlFor="houseNumber"
                  className="types-form-label"
                >
                  House Number
                </Form.Label>

                <Form.Control
                  id="houseNumber"
                  name="address.houseNumber"
                  value={user.address.houseNumber}
                  onChange={handleChange}
                  className="types-form-input"
                />
              </Col>

              <Col md={6}>
                <Form.Label
                  htmlFor="postalCode"
                  className="types-form-label"
                >
                  Postal Code
                </Form.Label>

                <Form.Control
                  id="postalCode"
                  name="address.postalCode"
                  value={user.address.postalCode}
                  onChange={handleChange}
                  className="types-form-input"
                />
              </Col>

              <Col md={6}>
                <Form.Label
                  htmlFor="city"
                  className="types-form-label"
                >
                  City
                </Form.Label>

                <Form.Control
                  id="city"
                  name="address.city"
                  value={user.address.city}
                  onChange={handleChange}
                  onBlur={() => handleBlur("city")}
                  isInvalid={showError("city")}
                  className="types-form-input"
                />

                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Col>

            </Row>

            <div className="types-actions mt-4">

              <Button
                className="users-add-button"
                onClick={save}
              >
                Save Changes
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

        </div>
      </div>
    </div>
  );
}