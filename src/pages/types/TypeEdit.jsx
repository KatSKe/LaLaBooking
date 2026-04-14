import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TypeService from "../../services/types/TypeServiceLocalStorage";
import { RouteNames } from "../../constants";

export default function TypeEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [type, setType] = useState({
    naziv: "",
  });

  useEffect(() => {
    loadType();
  }, []);

  async function loadType() {
    const res = await TypeService.getBySifra(id);
    setType(res.data);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setType((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function save() {
    await TypeService.promjeni(id, type);
    navigate(RouteNames.TYPES);
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Type</h2>

      <Card className="p-3">
        <Form>
          <Form.Control
            className="mb-3"
            placeholder="Type Name"
            name="naziv"
            value={type.naziv}
            onChange={handleChange}
          />

          <Button variant="success" onClick={save}>
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
}