import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TypeService from "../../services/types/TypeService";
import { RouteNames } from "../../constants";

export default function TypeCreate() {
  const navigate = useNavigate();

  const [type, setType] = useState({
    name: "",
    active: true,
  });

  function handleChange(event) {
    const { name, value, type: inputType, checked } = event.target;

    setType({
      ...type,
      [name]: inputType === "checkbox" ? checked : value,
    });
  }

  async function save() {
    if (!type.name.trim()) return;

    const newType = {
      ...type,
      name: type.name.trim(),
    };

    await TypeService.add(newType);
    navigate(RouteNames.TYPES);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Add New Type</h2>

      <Card className="p-3">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Type Name</Form.Label>
            <Form.Control
              name="name"
              value={type.name}
              onChange={handleChange}
              placeholder="Enter type name..."
            />
          </Form.Group>

          <Form.Check
            type="switch"
            label={type.active ? "Active" : "Inactive"}
            name="active"
            checked={type.active}
            onChange={handleChange}
            className="mb-3"
          />

          <div className="d-flex flex-wrap gap-2">
            <Button variant="success" onClick={save}>
              Save Type
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate(RouteNames.TYPES)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}