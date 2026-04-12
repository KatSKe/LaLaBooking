import { useEffect, useState } from "react";
import OffersService from "../../services/offers/OffersService";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import TypeService from "../../services/types/TypeServiceLocalStorage";

export default function OfferList() {

  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(0);

  useEffect(() => {
    loadOffers();
    loadTypes();
  }, []);

  async function loadTypes() {
    const result = await TypeService.get();
    setTypes(result.data);
  }

  async function loadOffers() {
    const result = await OffersService.get();
    setOffers(result.data);
  }

  async function deleteOffer(id) {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    await OffersService.obrisi(id);
    loadOffers();
  }

  const filteredOffers =
    selectedType === 0
      ? offers
      : offers.filter(o => o.typeId === selectedType);

  return (
    <div className="page-wrapper">
      <div className="page-container">

        <h2 className="page-title">Offers</h2>

        <div className="page-card">

          <Link
            to={RouteNames.OFFERS_CREATE}
            className="btn btn-add w-100 mb-3"
          >
            Add New Offer
          </Link>

          <select
            className="form-select mb-3"
            onChange={(event) =>
              setSelectedType(parseInt(event.target.value))
            }
          >
            <option value={0}>All Types</option>
            {types.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <div className="table-container">
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Type</th>
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
                    <td>{offer.typeName || "-"}</td>
                    <td>{offer.cijena} €</td>
                    <td>{offer.aktivan ? "Yes" : "No"}</td>

                    <td className="d-flex gap-2">
                      <Button
                        size="sm"
                        className="btn-edit"
                        onClick={() =>
                          navigate(
                            RouteNames.OFFERS_EDIT.replace(":sifra", offer.sifra)
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
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
      </div>
    </div>
  );
}