import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
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
  });

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const res = await UsersService.getBySifra(id);
    setUser(res.data);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function save() {
    await UsersService.promjeni(id, user);
    navigate(RouteNames.USERS);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit User</h2>

      <Card className="p-3">
        <Form>
          <Form.Control
            className="mb-3"
            placeholder="First Name"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-3"
            placeholder="Last Name"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-3"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <Button variant="success" onClick={save}>
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
}