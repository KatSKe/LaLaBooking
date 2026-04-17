import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TypeService from "../../services/types/TypeServiceLocalStorage";
import { RouteNames } from "../../constants";

export default function TypeCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (!name) {
      setError("Name is required");
      return;
    }

    await TypeService.create({ name });
    navigate(RouteNames.TYPES);
  }

  return (
    <div className="container py-4">
      <h2>Add Type</h2>

      <Form onSubmit={submit}>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          isInvalid={!!error}
        />

        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>

        <div className="mt-3 d-flex gap-2">
          <Button variant="secondary" onClick={() => navigate(RouteNames.TYPES)}>
            Cancel
          </Button>

          <Button type="submit">Save</Button>
        </div>
      </Form>
    </div>
  );
}