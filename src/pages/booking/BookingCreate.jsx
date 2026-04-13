import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";

import OffersService from "../../services/offers/OffersService";
import UsersService from "../../services/users/UserService";

export default function BookingCreate() {
  const [offers, setOffers] = useState([]);
  const [users, setUsers] = useState([]);

  const [offerSearch, setOfferSearch] = useState("");
  const [offerOpen, setOfferOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);

  const [showCreateUser, setShowCreateUser] = useState(false);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [editUserMode, setEditUserMode] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  useEffect(() => {
    loadOffers();
    loadUsers();
  }, []);

  async function loadOffers() {
    const res = await OffersService.get();
    setOffers(res.data || []);
  }

  async function loadUsers() {
    const res = await UsersService.get();
    setUsers(res.data || []);
  }

  function getOfferLabel(o) {
    return o?.name || o?.naziv || o?.title || "";
  }

  function filteredOffers() {
    if (!offerSearch) return offers;

    return offers.filter((o) =>
      getOfferLabel(o).toLowerCase().includes(offerSearch.toLowerCase())
    );
  }

  function selectOffer(offer) {
    setSelectedOffer(offer);
    setOfferSearch(getOfferLabel(offer));
    setOfferOpen(false);
  }

  function cleanUsers() {
    return (users || []).filter((u) => u && (u.firstName || u.lastName));
  }

  function handleUserChange(e) {
    const { name, value } = e.target;

    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function createUser() {
    await UsersService.dodaj(newUser);

    const res = await UsersService.get();
    setUsers(res.data || []);

    setNewUser({ firstName: "", lastName: "", email: "" });
    setShowCreateUser(false);
  }

  function openEditUser(user) {
    setEditUserMode(true);
    setEditUserData(user);
    setShowCreateUser(false);
  }

  function handleEditChange(e) {
    const { name, value } = e.target;

    setEditUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function saveEditedUser() {
    await UsersService.promjeni(
      editUserData.sifra || editUserData.id,
      editUserData
    );

    const res = await UsersService.get();
    setUsers(res.data || []);

    setEditUserMode(false);
    setEditUserData(null);
  }

  async function deleteUser(user) {
    await UsersService.obrisi(user.sifra || user.id);

    const res = await UsersService.get();
    setUsers(res.data || []);

    if (selectedUser?.sifra === user.sifra) {
      setSelectedUser(null);
    }
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Create Booking</h2>

      <Row className="g-4">
        {/* OFFERS */}
        <Col md={6}>
          <Card className="p-3 h-100">
            <h5>Offer</h5>

            <Form.Control
              placeholder="Search offers..."
              value={offerSearch}
              onFocus={() => setOfferOpen(true)}
              onChange={(e) => {
                setOfferSearch(e.target.value);
                setOfferOpen(true);
                setSelectedOffer(null);
              }}
              className="mb-2"
            />

            {offerOpen && (
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  maxHeight: 220,
                  overflowY: "auto",
                  background: "white",
                }}
              >
                {(offerSearch ? filteredOffers() : offers).map((offer) => (
                  <div
                    key={offer.sifra || offer.id}
                    onClick={() => selectOffer(offer)}
                    style={{
                      padding: 10,
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {getOfferLabel(offer)}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Col>

        {/* USERS */}
        <Col md={6}>
          <Card className="p-3 h-100">
            <h5>Users</h5>

            {cleanUsers().length > 0 && (
              <Table hover responsive className="mb-3">
                <tbody>
                  {cleanUsers().map((user) => (
                    <tr key={user.sifra || user.id}>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>

                      <td className="text-end">
                        <Button
                          size="sm"
                          variant="primary"
                          className="me-1"
                          onClick={() => setSelectedUser(user)}
                        >
                          Select
                        </Button>

                        <Button
                          size="sm"
                          variant="warning"
                          className="me-1"
                          onClick={() => openEditUser(user)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => deleteUser(user)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            {cleanUsers().length === 0 && (
              <div className="text-muted mb-3">
                No users available yet.
              </div>
            )}

            <Button
              variant="primary"
              onClick={() => {
                setShowCreateUser(!showCreateUser);
                setEditUserMode(false);
              }}
            >
              Create New User
            </Button>

            {showCreateUser && !editUserMode && (
              <Card className="mt-3 p-3">
                <Form.Control
                  className="mb-2"
                  placeholder="First Name"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={handleUserChange}
                />

                <Form.Control
                  className="mb-2"
                  placeholder="Last Name"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleUserChange}
                />

                <Form.Control
                  className="mb-2"
                  placeholder="Email"
                  name="email"
                  value={newUser.email}
                  onChange={handleUserChange}
                />

                <Button variant="success" onClick={createUser}>
                  Save User
                </Button>
              </Card>
            )}

            {editUserMode && editUserData && (
              <Card className="mt-3 p-3">
                <Form.Control
                  className="mb-2"
                  placeholder="First Name"
                  name="firstName"
                  value={editUserData.firstName || ""}
                  onChange={handleEditChange}
                />

                <Form.Control
                  className="mb-2"
                  placeholder="Last Name"
                  name="lastName"
                  value={editUserData.lastName || ""}
                  onChange={handleEditChange}
                />

                <Form.Control
                  className="mb-2"
                  placeholder="Email"
                  name="email"
                  value={editUserData.email || ""}
                  onChange={handleEditChange}
                />

                <Button variant="success" onClick={saveEditedUser}>
                  Save Changes
                </Button>
              </Card>
            )}
          </Card>
        </Col>
      </Row>

      {/* SUMMARY */}
      <Card className="mt-5 p-4">
        <h5 className="mb-3">Booking Summary</h5>

        <div className="mb-3">
          <b>Offer:</b>{" "}
          {selectedOffer ? getOfferLabel(selectedOffer) : "No offer selected"}
        </div>

        <div className="mb-3">
          <b>User:</b>{" "}
          {selectedUser
            ? `${selectedUser.firstName} ${selectedUser.lastName}`
            : "No user selected"}
        </div>

        <Button variant="primary" disabled={!selectedOffer || !selectedUser}>
          Confirm Booking
        </Button>
      </Card>
    </div>
  );
}