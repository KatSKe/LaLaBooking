import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TypeService from "../../services/types/TypeServiceLocalStorage";
import { RouteNames } from "../../constants";

export default function TypeCreate() {
  const navigate = useNavigate();

  const [type, setType] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function validate(values = type) {
    const err = {};
    if (!values.name) err.name = "Name is required";
    return err;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setType((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors(validate({ ...type, [name]: value }));
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const err = validate();
    setErrors(err);
    setTouched({ name: true });

    if (Object.keys(err).length > 0) return;

    await TypeService.add(type);
    navigate(RouteNames.TYPES);
  }

  const showError = (field) => touched[field] && errors[field];

  return (
    <div className="container py-4">
      <Card className="p-4">
        <h2 className="mb-4">Add New Type</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={type.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              isInvalid={showError("name")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Link to={RouteNames.TYPES} className="btn btn-secondary w-100">
              Cancel
            </Link>

            <Button type="submit" className="btn btn-success w-100">
              Save Type
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}