// OfferList.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { Pencil, Trash2, Plus } from "lucide-react";

import OffersService from "../../services/offers/OffersService";
import TypeService from "../../services/types/TypeService";
import { RouteNames } from "../../constants";

export default function OfferList() {
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [types, setTypes] = useState([]);

  async function loadOffers() {
    const res = await OffersService.get();
    setOffers(res.data || []);
  }

  async function loadTypes() {
    const res = await TypeService.get();
    setTypes(res.data || []);
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
    const type = types.find((t) => t.id === Number(typeId));
    return type ? type.name : "";
  }

  return (
    <div className="users-page">
      <div className="users-page_overlay"></div>

      <div className="users-page_content">
        <div className="users-glass-card">

          <div className="users-header">
            <h2 className="users-title">Offers</h2>

            <Button
              className="users-add-button"
              onClick={() => navigate(RouteNames.OFFERS_CREATE)}
            >
              <Plus size={18} style={{ marginRight: 6 }} />
              Add New Offer
            </Button>
          </div>

          <div className="table-responsive">
            <Table className="users-table" hover>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Price (€)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id}>

                    <td>{offer.name}</td>

                    <td>{getTypeName(offer.typeId)}</td>

                    <td>{Number(offer.price).toFixed(2)}</td>

                    <td>{offer.active ? "Active" : "Inactive"}</td>

                    <td className="users-actions">

                      <Button
                        size="sm"
                        variant="outline-warning"
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
                        onClick={() => deleteOffer(offer.id)}
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
      </div>
    </div>
  );
}