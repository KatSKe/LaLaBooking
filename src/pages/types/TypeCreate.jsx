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

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  function formatName(value) {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function validate(values = type) {
    const err = {};

    if (!values.name || !values.name.trim()) {
      err.name = "Type name is required";
    }

    return err;
  }

  function handleChange(e) {
    const { name, value, type: inputType, checked } = e.target;

    setType({
      ...type,
      [name]: inputType === "checkbox" ? checked : value,
    });
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  async function save() {
    const err = validate();

    setErrors(err);
    setTouched({ name: true });

    if (Object.keys(err).length > 0) return;

    const newType = {
      name: formatName(type.name.trim()),
      active: type.active,
    };

    await TypeService.create(newType);

    navigate(RouteNames.TYPES);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Add New Type</h2>

      <Card className="p-3">
        <Form>

          {/* NAME */}
          <Form.Group className="mb-3">
            <Form.Label>Type Name</Form.Label>

            <Form.Control
              name="name"
              value={type.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              placeholder="Enter type name..."
              style={{
                borderColor: showError("name") ? "#dc3545" : "",
              }}
            />

            {showError("name") && (
              <small style={{ color: "#dc3545" }}>
                {errors.name}
              </small>
            )}
          </Form.Group>

          {/* ACTIVE */}
          <Form.Check
            type="switch"
            label={type.active ? "Active" : "Inactive"}
            name="active"
            checked={type.active}
            onChange={handleChange}
            className="mb-3"
          />

          {/* BUTTONS */}
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={save}>
              Save Type
            </Button>

            <Button
              variant="outline-secondary"
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