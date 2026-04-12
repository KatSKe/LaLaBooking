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
    setUsers(response.data);
  }

  async function deleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await UserService.obrisi(id);
    loadUsers();
  }

  return (
    <div className="page-wrapper">
      <div className="page-container">

        <h2 className="page-title">Users</h2>

        <div className="page-card">

          <Link
            to={RouteNames.USERS_NEW}
            className="btn btn-add w-100 mb-3"
          >
            Add New User
          </Link>

          <div className="table-container">
            <Table striped hover responsive>
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
                  <tr key={user.sifra}>
                    <td>{user.ime}</td>
                    <td>{user.prezime}</td>
                    <td>{user.spol}</td>
                    <td>
                      {new Date(user.datumRodenja).toLocaleDateString("en-GB")}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.kontaktBroj}</td>
                    <td>{user.adresa?.mjesto}</td>

                    <td className="d-flex gap-2">
                      <Button
                        size="sm"
                        className="btn-edit"
                        onClick={() => navigate(`/users/${user.sifra}`)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        className="btn-delete"
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
      </div>
    </div>
  );
}