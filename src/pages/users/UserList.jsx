import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import UserService from "../../services/users/UserServiceLocalStorage";
import { RouteNames } from "../../constants";

export default function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const response = await UserService.get();
    setUsers(response.data || []);
  }

  async function deleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await UserService.obrisi(id);
    loadUsers();
  }

  function getValue(user, newKey, oldKey) {
    return user?.[newKey] ?? user?.[oldKey] ?? "";
  }

  function getCity(user) {
    return user?.city ?? user?.adresa?.mjesto ?? "";
  }

  function getPhone(user) {
    return user?.phoneNumber ?? user?.kontaktBroj ?? "";
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Users</h2>

      <Link
        to={RouteNames.USERS_NEW}
        className="btn btn-primary w-100 mb-3"
      >
        Add New User
      </Link>

      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.sifra || user.id}>
                <td>{getValue(user, "firstName", "ime")}</td>
                <td>{getValue(user, "lastName", "prezime")}</td>
                <td>{getValue(user, "gender", "spol")}</td>
                <td>
                  {user.dateOfBirth || user.datumRodenja
                    ? new Date(user.dateOfBirth || user.datumRodenja).toLocaleDateString("en-GB")
                    : ""}
                </td>
                <td>{user.email}</td>
                <td>{getPhone(user)}</td>
                <td>{getCity(user)}</td>

                <td className="d-flex gap-2">
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => navigate(`/users/${user.sifra}`)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteUser(user.sifra)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}