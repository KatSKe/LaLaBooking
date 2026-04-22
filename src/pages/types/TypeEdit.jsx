import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TypeService from "../../services/types/TypeServiceLocalStorage";
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
    const res = await TypeService.getById(id);

    setType({
      ...res.data,
      active: res.data?.active ?? true,
    });
  }

  function validate(values = type) {
    const err = {};

    if (!values.name) err.name = "Type name is required";

    return err;
  }

  function handleChange(e) {
    const { name, value, type: inputType, checked } = e.target;

    const updated = {
      ...type,
      [name]: inputType === "checkbox" ? checked : value,
    };

    setType(updated);
    setErrors(validate(updated));
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

    await TypeService.update(id, type);
    navigate(RouteNames.TYPES);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Type</h2>

      <Card className="p-3">
        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={type.name || ""}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              style={{ borderColor: showError("name") ? "#dc3545" : "" }}
            />

            {showError("name") && (
              <small style={{ color: "#dc3545" }}>
                {errors.name}
              </small>
            )}
          </Form.Group>

          <Form.Check
            type="switch"
            id="type-active-switch"
            label={type.active ? "Active" : "Inactive"}
            name="active"
            checked={type.active}
            onChange={handleChange}
            className="mb-3"
          />

          <div className="d-flex gap-2">
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