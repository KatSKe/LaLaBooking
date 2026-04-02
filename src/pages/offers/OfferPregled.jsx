import { useEffect, useState } from "react";
import OffersService from "../../services/offers/OffersService";
import { Button, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function OfferPregled() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    const response = await OffersService.get();
    setOffers(response.data);
  }

  async function deleteOffer(id) {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;

    await OffersService.obrisi(id);
    loadOffers();
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  }

  return (
    <div className="bg-overlay">

      <Link
        to={RouteNames.OFFERS_NOVI}
        className="btn btn-add w-100 my-3"
      >
        Add New Offer
      </Link>

      <div className="table-container">
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {offers &&
              offers.map((offer) => (
                <tr key={offer.sifra}>
                  <td>{offer.naziv}</td>
                  <td>{offer.opis}</td>

                  <td className="text-end">
                    {formatPrice(offer.cijena)}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <GrValidate
                      size={25}
                      color={offer.aktivan ? "green" : "red"}
                    />
                  </td>

                  <td className="d-flex gap-2">
                    <Button
                      className="btn-edit"
                      onClick={() => navigate(`/offers/${offer.sifra}`)}
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