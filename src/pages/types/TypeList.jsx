import { useEffect, useState } from "react";
import TypeService from "../../services/types/TypeServiceLocalStorage";
import { Table } from "react-bootstrap";

export default function TypeList() {

  const [types, setTypes] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await TypeService.get();
    setTypes(res.data);
  }

  return (
    <>
      <h3>Types</h3>

      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>
            {types.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}