import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { Pencil, Trash2 } from "lucide-react";
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
    if (!window.confirm("Are you sure?")) return;
    await UserService.remove(id);
    loadUsers();
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Users</h2>
      <Button 
        className="w-100 mb-4" 
        onClick={() => navigate(RouteNames.USERS_NEW)}
      >
        + Add New User
      </Button>

      <Table striped bordered hover>
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
              <td>{user.dateOfBirth}</td>
              <td>{user.contactNumber}</td>
              <td>{user.address?.city}</td>
              <td className="d-flex gap-2">
                <Button 
                  variant="outline-warning" 
                  size="sm"
                  onClick={() => navigate(RouteNames.USERS_EDIT.replace(":id", user.id))}
                >
                  <Pencil size={16} />
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
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
  );
}