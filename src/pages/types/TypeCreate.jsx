import { Button, Form, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import TypeService from "../../services/types/TypeServiceLocalStorage";
import { RouteNames } from "../../constants";

export default function TypeCreate() {

  const navigate = useNavigate();

  async function create(type) {
    await TypeService.create(type);
    navigate(RouteNames.TYPES);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    create({
      name: data.get("name")
    });
  }

  return (
    <>
      <h3>Add New Type</h3>

      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" required />
        </Form.Group>

        <Row className="mt-3">
          <Col>
            <Link to={RouteNames.TYPES} className="btn btn-danger">
              Cancel
            </Link>
          </Col>

          <Col className="text-end">
            <Button type="submit" variant="success">
              Add Type
            </Button>
          </Col>
        </Row>

      </Form>
    </>
  );
}