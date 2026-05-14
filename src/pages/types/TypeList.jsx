import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { Pencil, Trash2 } from "lucide-react";

import TypeService from "../../services/types/TypeService";
import { RouteNames } from "../../constants";

export default function TypeList() {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  async function loadTypes() {
    const response = await TypeService.get();
    setTypes(response.data || []);
  }

  useEffect(() => {
    loadTypes();
  }, []);

  async function deleteType(id) {
    if (!window.confirm("Are you sure?")) return;

    await TypeService.remove(id);
    loadTypes();
  }

  function getStatusLabel(active) {
    return active ? "Active" : "Inactive";
  }

  function getStatusStyle(active) {
    return {
      padding: "4px 10px",
      borderRadius: "8px",
      fontSize: "0.85rem",
      fontWeight: 600,
      display: "inline-block",
      backgroundColor: active ? "#d1f7d6" : "#ffd6d6",
      color: active ? "#1e7a33" : "#a11a1a",
    };
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Types</h2>

      <Button
        className="w-100 mb-4"
        onClick={() => navigate(RouteNames.TYPES_NEW)}
      >
        + Add New Type
      </Button>

      <div className="table-responsive">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {types.map((type) => (
              <tr key={type.id}>
                <td>{type.name}</td>

                {/* ACTIVE STATUS WITH COLORS */}
                <td>
                  <span style={getStatusStyle(type.active)}>
                    {getStatusLabel(type.active)}
                  </span>
                </td>

                <td className="d-flex gap-2">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    title="Edit"
                    aria-label={`Edit ${type.name}`}
                    onClick={() =>
                      navigate(
                        RouteNames.TYPES_EDIT.replace(
                          ":id",
                          type.id
                        )
                      )
                    }
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    title="Delete"
                    aria-label={`Delete ${type.name}`}
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