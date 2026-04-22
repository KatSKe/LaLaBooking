import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import OffersService from "../../services/offers/OffersService";
import { RouteNames } from "../../constants";

import { Pencil, Trash2 } from "lucide-react";

export default function OfferList() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await OffersService.get();
    setOffers(res.data || []);
  }

  async function remove(id) {
    if (!window.confirm("Delete this offer?")) return;

    await OffersService.obrisi(id);
    load();
  }

  return (
    <div className="container py-4">

      <h2 className="mb-3">Offers</h2>

      <Button
        className="mb-3 w-100"
        onClick={() => navigate(RouteNames.OFFERS_CREATE)}
      >
        Add New Offer
      </Button>

      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Active</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {offers.map(o => (
              <tr key={o.id}>
                <td>{o.name}</td>
                <td>{o.typeName}</td>
                <td>{o.price} €</td>
                <td>{o.active ? "Active" : "Inactive"}</td>

                <td className="text-end d-flex justify-content-end gap-2">
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={() => navigate(`/offers/edit/${o.id}`)}
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => remove(o.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

        </Table>
      </div>
    </div>
  );
}