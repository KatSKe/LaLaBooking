import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import TypeService from "../../services/types/TypeServiceLocalStorage";
import { RouteNames } from "../../constants";

export default function TypeEdit() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [type, setType] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await TypeService.getById(id);
    setType(res.data);
  }

  function handleChange(e) {
    setType({
      ...type,
      name: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await TypeService.update(id, type);
    navigate(RouteNames.TYPES);
  }

  if (!type) return null;

  return (
    <>
      <h3>Edit Type</h3>

      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={type.name || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="d-flex gap-2 mt-3">
          <Link to={RouteNames.TYPES} className="btn btn-danger">
            Cancel
          </Link>

          <Button type="submit">
            Save Changes
          </Button>
        </div>

      </Form>
    </>
  );
}