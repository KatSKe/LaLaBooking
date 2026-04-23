import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TypeService from "../../services/types/TypeServiceLocalStorage";
import { RouteNames } from "../../constants";

export default function TypeCreate() {
  const navigate = useNavigate();

  const [type, setType] = useState({
    name: "",
    active: true,
  });

  function handleChange(e) {
    const { name, value, type: inputType, checked } = e.target;

    setType({
      ...type,
      [name]: inputType === "checkbox" ? checked : value,
    });
  }

  async function save() {
    await TypeService.create(type);
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
            />
          </Form.Group>

          <Form.Check
            type="switch"
            label="Active"
            name="active"
            checked={type.active}
            onChange={handleChange}
            className="mb-3"
          />

          <div className="d-flex gap-2">
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