import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import UserService from "../../services/users/UserService";

export default function UserCreate() {

    const navigate = useNavigate();

    async function createUser(user) {
        await UserService.create(user);
        navigate(RouteNames.USERS);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        createUser({
            name: data.get("name"),
            email: data.get("email")
        });
    }

    return (
        <div className="page-wrapper">
            <div className="page-container">

                <h2 className="page-title">Add New User</h2>

                <div className="page-card">

                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" required />
                        </Form.Group>

                        <Row className="mt-3">
                            <Col>
                                <Link to={RouteNames.USERS} className="btn btn-danger w-100">
                                    Cancel
                                </Link>
                            </Col>

                            <Col>
                                <Button type="submit" variant="success" className="w-100">
                                    Add User
                                </Button>
                            </Col>
                        </Row>

                    </Form>

                </div>
            </div>
        </div>
    );
}