import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import OffersService from "../../services/offers/OffersService";
import TypeService from "../../services/types/TypeService";
import { RouteNames } from "../../constants";

export default function OffersList() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [types, setTypes] = useState([]);

  async function loadOffers() {
    const response = await OffersService.get();
    setOffers(response.data || []);
  }

  async function loadTypes() {
    const response = await TypeService.get();
    setTypes(response.data || []);
  }

  useEffect(() => {
    loadOffers();
    loadTypes();
  }, []);

  async function deleteOffer(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this offer?"
    );

    if (!confirmDelete) return;

    await OffersService.remove(id);
    loadOffers();
  }

  function getTypeName(typeId) {
    const type = types.find(
      (item) => item.id === Number(typeId)
    );

    return type ? type.name : "Not assigned";
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
              <th>Offer Name</th>
              <th>Type</th>
              <th>Price (€)</th>
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((offer) => (
              <tr key={offer.id}>

                <td>{offer.name}</td>

                <td>{getTypeName(offer.typeId)}</td>

                <td>
                  {Number(offer.price).toFixed(2)}
                </td>

                <td>
                  {offer.active
                    ? "Active"
                    : "Inactive"}
                </td>

                <td className="text-end d-flex justify-content-end gap-2">

                  <Button
                    size="sm"
                    variant="outline-warning"
                    aria-label={`Edit ${offer.name}`}
                    onClick={() =>
                      navigate(
                        RouteNames.OFFERS_EDIT.replace(
                          ":id",
                          offer.id
                        )
                      )
                    }
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    aria-label={`Delete ${offer.name}`}
                    onClick={() =>
                      deleteOffer(offer.id)
                    }
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