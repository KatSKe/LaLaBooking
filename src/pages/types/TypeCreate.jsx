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

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    create({
      name: data.get("name")
    });
  }

  return (
    <div className="page-wrapper">
      <div className="page-container">

        <h2 className="page-title">Add New Type</h2>

        <div className="page-card">

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" required />
            </Form.Group>

            <Row className="mt-3">
              <Col>
                <Link to={RouteNames.TYPES} className="btn btn-danger w-100">
                  Cancel
                </Link>
              </Col>

              <Col>
                <Button type="submit" variant="success" className="w-100">
                  Add Type
                </Button>
              </Col>
            </Row>

          </Form>

        </div>
      </div>
    </div>
  );
}