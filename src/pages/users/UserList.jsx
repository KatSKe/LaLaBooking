import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import UserService from "../../services/users/UserService";
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

    await UserService.remove(id);
    loadUsers();
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Users</h2>

      <Button
        className="mb-3 w-100"
        onClick={() => navigate(RouteNames.USERS_NEW)}
      >
        Add New User
      </Button>

      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.city}</td>

                <td className="d-flex gap-2">
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() =>
                      navigate(RouteNames.USERS_EDIT.replace(":id", user.id))
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteUser(user.id)}
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