import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import TypeService from "../../services/types/TypeService";
import { RouteNames } from "../../constants";

export default function TypeCreate() {
  const navigate = useNavigate();

  const [type, setType] = useState({
    name: "",
    active: true,
  });

  const [nameError, setNameError] = useState("");

  function handleChange(event) {
    const { name, value, type: inputType, checked } = event.target;

    setType({
      ...type,
      [name]: inputType === "checkbox" ? checked : value,
    });

    if (name === "name") {
      setNameError("");
    }
  }

  async function save() {
    if (!type.name.trim()) {
      setNameError("Type name is required");
      return;
    }

    const newType = {
      ...type,
      name: type.name.trim(),
    };

    await TypeService.add(newType);

    navigate(RouteNames.TYPES);
  }

  return (
    <div className="types-page">
      <div className="types-page_overlay"></div>

      <div className="types-page_content">
        <div className="types-glass-card">

          <div className="types-header">
            <h2 className="types-title">Add New Type</h2>
          </div>

          <Form>

            <Form.Group className="mb-4">
              <Form.Label className="types-form-label" htmlFor="typeName">
                Type Name
              </Form.Label>

              <Form.Control
                id="typeName"
                name="name"
                value={type.name}
                onChange={handleChange}
                placeholder="Enter type name..."
                aria-required="true"
                isInvalid={!!nameError}
                className="types-form-input"
              />

              <Form.Control.Feedback type="invalid">
                {nameError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Check
              type="switch"
              label={type.active ? "Active" : "Inactive"}
              name="active"
              checked={type.active}
              onChange={handleChange}
              className="mb-4 text-light"
            />

            <div className="types-actions">
              <Button
                className="types-add-button"
                onClick={save}
              >
                Save Type
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(RouteNames.TYPES)}
              >
                Cancel
              </Button>
            </div>

          </Form>

        </div>
      </div>
    </div>
  );
}