import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import TypeService from "../../services/types/TypeService";
import { RouteNames } from "../../constants";

export default function TypeEdit() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [type, setType] = useState({
    name: "",
    active: true,
  });

  const [touched, setTouched] = useState({});

  const [errors, setErrors] = useState({});

  async function loadType() {
    const result = await TypeService.getById(id);

    if (!result?.data) {
      navigate(RouteNames.TYPES);
      return;
    }

    setType({
      name: result.data.name || "",
      active: result.data.active ?? true,
    });
  }

  useEffect(() => {
    loadType();
  }, []);

  function validate(values = type) {
    const error = {};

    if (!values.name || !values.name.trim()) {
      error.name = "Type name is required";
    }

    return error;
  }

  function handleChange(event) {
    const { name, value, type: inputType, checked } = event.target;

    const updated = {
      ...type,
      [name]: inputType === "checkbox" ? checked : value,
    };

    setType(updated);

    setErrors(validate(updated));
  }

  function handleBlur(field) {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));

    setErrors(validate());
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  async function save() {
    const error = validate();

    setErrors(error);

    setTouched({ name: true });

    if (Object.keys(error).length > 0) {
      return;
    }

    const updatedType = {
      ...type,
      name: type.name.trim(),
    };

    await TypeService.update(id, updatedType);

    navigate(RouteNames.TYPES);
  }

  return (
    <div className="types-page">
      <div className="types-page_overlay"></div>

      <div className="types-page_content">
        <div className="types-glass-card">

          <div className="types-header">
            <h2 className="types-title">Edit Type</h2>
          </div>

          <Form>

            <Form.Group className="mb-4">
              <Form.Label
                htmlFor="typeName"
                className="types-form-label"
              >
                Type Name
              </Form.Label>

              <Form.Control
                id="typeName"
                name="name"
                value={type.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                placeholder="Enter type name..."
                className="types-form-input"
                style={{
                  borderColor: showError("name")
                    ? "#dc3545"
                    : "",
                }}
              />

              {showError("name") && (
                <small style={{ color: "#ffb3b3" }}>
                  {errors.name}
                </small>
              )}
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
                Save Changes
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