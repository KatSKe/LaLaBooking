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
    const result = await TypeService.get();
    const data = result?.data ?? result;
    setTypes(Array.isArray(data) ? data : []);
  }

  async function deleteType(id) {
    if (!window.confirm("Are you sure you want to delete this type?")) return;
    await TypeService.remove(id);
    load();
  }

  return (
    <div className="page-wrapper">
      <div className="page-container">

        <h2 className="page-title">Types</h2>

        <div className="page-card">

          <Link
            to={RouteNames.TYPES_NEW}
            className="btn btn-add w-100 mb-3"
          >
            Add New Type
          </Link>

          <div className="table-container">
            <Table striped hover responsive>
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

                    <td className="d-flex gap-2">
                      <Button
                        size="sm"
                        className="btn-edit"
                        onClick={() => navigate(`/types/${type.id}`)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        className="btn-delete"
                        onClick={() => deleteType(type.id)}
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