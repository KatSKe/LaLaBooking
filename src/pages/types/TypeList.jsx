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
      padding: "5px 12px",

      borderRadius: "10px",

      fontSize: "13px",

      fontWeight: 600,

      display: "inline-block",

      backdropFilter: "blur(6px)",

      WebkitBackdropFilter: "blur(6px)",

      background: active
        ? "rgba(140, 255, 170, 0.14)"
        : "rgba(255, 120, 120, 0.10)",

      border: active
        ? "1px solid rgba(140, 255, 170, 0.18)"
        : "1px solid rgba(255, 120, 120, 0.14)",

      color: active
        ? "rgba(205, 255, 215, 0.92)"
        : "rgba(255, 210, 210, 0.90)",
    };
  }

  return (
    <div className="types-page">
      <div className="types-page_overlay"></div>

      <div className="types-page_content">
        <div className="types-glass-card">
          <div className="types-header">
            <h2 className="types-title">Types</h2>

            <Button
              className="types-add-button"
              onClick={() => navigate(RouteNames.TYPES_NEW)}
            >
              + Add New Type
            </Button>
          </div>

          <div className="table-responsive">
            <Table className="types-table" hover responsive>
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

                    <td>
                      <span style={getStatusStyle(type.active)}>
                        {getStatusLabel(type.active)}
                      </span>
                    </td>

                    <td>
                      <div className="types-actions">
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
                      </div>
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