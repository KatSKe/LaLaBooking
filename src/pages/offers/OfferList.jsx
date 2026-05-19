import { useEffect, useState } from "react";

console.log("OFFER LIST LOADED");

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

    console.log("SERVER OFFERS:");
    console.log(res);
    console.log(res.data);

    setOffers(res.data || []);
  }

  async function loadTypes() {
    const res = await TypeService.get();

    console.log("SERVER TYPES:");
    console.log(res);
    console.log(res.data);

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
    const type = types.find(
      (t) =>
        Number(t.id ?? t.sifra) === Number(typeId)
    );

    return type
      ? type.name ?? type.naziv
      : "";
  }

  function getStatusLabel(active) {
    return active ? "Active" : "Inactive";
  }

  function getStatusStyle(active) {
    return {
      padding: "5px 12px",

      borderRadius: "10px",

      fontSize: "13px",

      fontWeight: 600,

      display: "inline-block",

      backdropFilter: "blur(6px)",

      WebkitBackdropFilter: "blur(6px)",

      background: active
        ? "rgba(140, 255, 170, 0.14)"
        : "rgba(255, 120, 120, 0.10)",

      border: active
        ? "1px solid rgba(140, 255, 170, 0.18)"
        : "1px solid rgba(255, 120, 120, 0.14)",

      color: active
        ? "rgba(205, 255, 215, 0.92)"
        : "rgba(255, 210, 210, 0.90)",
    };
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
                {offers.map((offer, index) => {

                  const offerId =
                    offer.id ??
                    offer.sifra ??
                    index;

                  const offerName =
                    offer.name ??
                    offer.naziv ??
                    "";

                  const offerPrice =
                    offer.price ??
                    offer.cijena ??
                    0;

                  const offerActive =
                    offer.active ??
                    offer.aktivan ??
                    false;

                  const offerTypeId =
                    offer.typeId ??
                    offer.tipId ??
                    offer.vrstaId ??
                    null;

                  return (
                    <tr key={offerId}>

                      <td>{offerName}</td>

                      <td>{getTypeName(offerTypeId)}</td>

                      <td>
                        {Number(offerPrice).toFixed(2)}
                      </td>

                      <td>
                        <span style={getStatusStyle(offerActive)}>
                          {getStatusLabel(offerActive)}
                        </span>
                      </td>

                      <td className="users-actions">

                        <Button
                          size="sm"
                          variant="outline-warning"
                          onClick={() =>
                            navigate(
                              RouteNames.OFFERS_EDIT.replace(
                                ":id",
                                offerId
                              )
                            )
                          }
                        >
                          <Pencil size={16} />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => deleteOffer(offerId)}
                        >
                          <Trash2 size={16} />
                        </Button>

                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </Table>
          </div>

        </div>
      </div>
    </div>
  );
}