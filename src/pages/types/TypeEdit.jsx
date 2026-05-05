import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
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

  useEffect(() => {
    loadType();
  }, []);

  async function loadType() {
    const result = await TypeService.getById(id);

    if (result?.data) {
      setType({
        name: result.data.name || "",
        active: result.data.active ?? true,
      });
    }
  }

  function validate(values = type) {
    const error = {};

    if (!values.name || !values.name.trim()) {
      error.name = "Type name is required";
    }

    return error;
  }

  function handleChange(event) {
    const { name, value, type: inputType, checked } = event.target;

    setType({
      ...type,
      [name]: inputType === "checkbox" ? checked : value,
    });
  }

  function handleBlur(field) {
    setTouched((previous) => ({ ...previous, [field]: true }));
    setErrors(validate());
  }

  function showError(field) {
    return touched[field] && errors[field];
  }

  async function save() {
    const error = validate();

    setErrors(error);
    setTouched({ name: true });

    if (Object.keys(error).length > 0) return;

    const updatedType = {
      ...type,
      name: type.name.trim(),
    };

    await TypeService.update(id, updatedType);

    navigate(RouteNames.TYPES);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Type</h2>

      <Card className="p-3">
        <Form>
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
              Save Changes
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