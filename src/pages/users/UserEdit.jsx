import { useEffect, useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
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
    phoneNumber: "",
    city: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  // ✅ FIXED LOAD USER (SAFE REDIRECT)
  async function loadUser() {
    const response = await UsersService.getById(id);

    if (!response.success || !response.data) {
      navigate(RouteNames.USERS);
      return;
    }

    setUser(response.data);
  }

  function validate(values = user) {
    const error = {};

    if (!values.firstName) error.firstName = "First name is required";
    if (!values.lastName) error.lastName = "Last name is required";
    if (!values.email) error.email = "Email is required";

    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const updated = {
      ...user,
      [name]: value,
    };

    setUser(updated);
    setErrors(validate(updated));
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
    });

    if (Object.keys(error).length > 0) return;

    await UsersService.update(id, user);
    navigate(RouteNames.USERS);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit User</h2>

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
            </Col>

            <Col md={4}>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={user.dateOfBirth || ""}
                onChange={handleChange}
              />
            </Col>

            <Col md={4}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phoneNumber"
                value={user.phoneNumber || ""}
                onChange={handleChange}
              />
            </Col>

            <Col md={4}>
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={user.city || ""}
                onChange={handleChange}
              />
            </Col>

          </Row>

          <div className="d-flex gap-2 mt-4">
            <Button variant="success" onClick={save}>
              Save Changes
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