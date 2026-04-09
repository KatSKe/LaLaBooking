import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TypeService from "../../services/types/TypeServiceLocalStorage";
import { RouteNames } from "../../constants";

export default function TypeList() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await TypeService.get();
      const data = res?.data ?? res;

      setTypes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading types:", error);
      setTypes([]);
    }
  }

  async function deleteType(id) {
    if (!window.confirm("Are you sure you want to delete this type?")) return;

    try {
      await TypeService.remove(id);
      load();
    } catch (error) {
      console.error("Error deleting type:", error);
    }
  }

  return (
    <div className="glass">
      <h3>Types</h3>

      <Link
        to={RouteNames.TYPES_NEW}
        className="btn btn-primary w-100 my-3"
      >
        Add New Type
      </Link>

      <div className="table-container">
        <Table striped hover responsive className="align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {types.map((type) => (
              <tr key={type.id}>
                <td>{type.id}</td>
                <td>{type.name}</td>

                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      size="sm"
                      className="btn-edit"
                      onClick={() => navigate(`/types/${type.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteType(type.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}