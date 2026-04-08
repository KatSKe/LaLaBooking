import { useEffect, useState } from "react";
import OffersService from "../../services/offers/OffersService";
import { Button, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import TypeService from "../../services/types/TypeServiceLocalStorage";

export default function OfferList() {

  const navigate = useNavigate();

  // ADDED: state for offers
  const [offers, setOffers] = useState([]);

  // ADDED: state for types + filter
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(0);

  useEffect(() => {
    loadOffers();
    loadTypes();
  }, []);

  // ADDED: load types
  async function loadTypes() {
    const res = await TypeService.get();
    setTypes(res.data);
  }

  async function loadOffers() {
    const response = await OffersService.get();
    setOffers(response.data);
  }

  async function deleteOffer(id) {
    if (!window.confirm("Are you sure?")) return;

    await OffersService.obrisi(id);
    loadOffers();
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  }

  // ADDED: filtering logic
  const filteredOffers =
    selectedType === 0
      ? offers
      : offers.filter(o => o.typeId === selectedType);

  return (
    <div className="bg-overlay">

      <Link to={RouteNames.OFFERS_CREATE} className="btn btn-add w-100 my-3">
        Add New Offer
      </Link>

      {/* ADDED: TYPE FILTER */}
      <select
        className="form-select my-3"
        onChange={(e) => setSelectedType(parseInt(e.target.value))}
      >
        <option value={0}>All Types</option>
        {types.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      {/* ADDED: responsive wrapper */}
      <div className="table-responsive">

        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th> {/* ADDED */}
              <th>Price</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOffers.map((offer) => (
              <tr key={offer.sifra}>
                <td>{offer.naziv}</td>
                <td>{offer.opis}</td>

                {/* ADDED: TYPE DISPLAY */}
                <td>{offer.typeName || "-"}</td>

                <td className="text-end">
                  {formatPrice(offer.cijena)}
                </td>

                <td style={{ textAlign: "center" }}>
                  <GrValidate color={offer.aktivan ? "green" : "red"} />
                </td>

                <td className="d-flex gap-2">
                  <Button
                    className="btn-edit"
                    onClick={() =>
                      navigate(
                        RouteNames.OFFERS_EDIT.replace(':sifra', offer.sifra)
                      )
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    className="btn-delete"
                    onClick={() => deleteOffer(offer.sifra)}
                  >
                    Delete
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