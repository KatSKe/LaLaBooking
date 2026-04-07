import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/users/UserService";
import { Button, Form } from "react-bootstrap";
import { RouteNames } from "../../constants";

export default function UserEdit() {

  const navigate = useNavigate();
  const params = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const res = await UserService.getBySifra(params.id);
    setUser(res.data);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name in (user.address || {})) {
      setUser(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setUser(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await UserService.promjeni(params.id, user);
    navigate(RouteNames.USERS);
  }

  if (!user) return null;

  return (
    <div>

      <h3>Edit User</h3>

      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            value={user.firstName || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            value={user.lastName || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            name="gender"
            value={user.gender || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={user.dateOfBirth || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <hr />

        <Form.Group>
          <Form.Label>Street</Form.Label>
          <Form.Control
            name="street"
            value={user.address?.street || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>House Number</Form.Label>
          <Form.Control
            name="houseNumber"
            value={user.address?.houseNumber || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            name="postalCode"
            value={user.address?.postalCode || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            value={user.address?.city || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <hr />

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={user.email || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phoneNumber"
            value={user.phoneNumber || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex gap-2 mt-3">
          <Link to={RouteNames.USERS} className="btn btn-danger">
            Cancel
          </Link>

          <Button type="submit">
            Save Changes
          </Button>
        </div>

      </Form>
    </div>
  );
}