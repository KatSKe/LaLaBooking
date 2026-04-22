import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TypeService from "../../services/types/TypeServiceLocalStorage";
import { RouteNames } from "../../constants";

import { Pencil, Trash2, Plus } from "lucide-react";

export default function TypeList() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const result = await TypeService.get();
    setTypes(result.data || []);
  }

  async function deleteType(id) {
    if (!window.confirm("Are you sure you want to delete this type?")) return;

    await TypeService.remove(id);
    load();
  }

  return (
    <div className="container py-4">

      <h2 className="mb-3">Types</h2>

      {/* BUTTON LIKE USERS */}
      <Button
        className="mb-3 w-100"
        onClick={() => navigate(RouteNames.TYPES_NEW)}
      >
        <Plus size={18} style={{ marginRight: 6 }} />
        Add New Type
      </Button>

      {/* TABLE */}
      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Active</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {types.map((type) => (
              <tr key={type.id}>
                <td>{type.id}</td>
                <td>{type.name}</td>

                <td>
                  {type.active !== false ? (
                    <span className="text-success">Active</span>
                  ) : (
                    <span className="text-danger">Inactive</span>
                  )}
                </td>

                <td className="text-end d-flex justify-content-end gap-2">
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={() => navigate(`/types/${type.id}`)}
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => deleteType(type.id)}
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