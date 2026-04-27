import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

import { Pencil, Trash2, Plus } from "lucide-react";

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

  function formatPhoneNumber(phone) {
    if (!phone) return "";
    const digits = phone.replace(/\D/g, "");

    if (digits.startsWith("385")) {
      return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(
        5,
        8
      )} ${digits.slice(8)}`;
    }

    return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Users</h2>

      <Button
        className="mb-3 w-100"
        onClick={() => navigate(RouteNames.USERS_NEW)}
      >
        <Plus size={18} style={{ marginRight: 6 }} />
        Add New User
      </Button>

      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Contact Number</th>
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

                <td>
                  {user.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </td>

                <td>{formatPhoneNumber(user.contactNumber)}</td>
                <td>{user.address?.city}</td>

                <td className="d-flex gap-2">
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={() =>
                      navigate(RouteNames.USERS_EDIT.replace(":id", user.id))
                    }
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    <Trash2 size={16} />
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