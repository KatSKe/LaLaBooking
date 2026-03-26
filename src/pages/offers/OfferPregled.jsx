import { useEffect, useState } from "react";
import OffersService from "../../services/offers/OffersService";
import { Button, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import FormatDatuma from "../../components/FormatDatuma";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { NumericFormat } from "react-number-format";

export default function OfferPregled() {

  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    ucitajOffers();
  }, []);

  async function ucitajOffers() {
    await OffersService.get().then((odgovor) => {
      setOffers(odgovor.data);
    });
  }

  return (
    <>
      <Link 
        to={RouteNames.OFFERS_NOVI} 
        className="btn btn-success w-100 my-3"
      >
        Dodavanje nove ponude
      </Link>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Cijena</th>
            <th>Aktivan</th>
            <th>Akcija</th>
          </tr>
        </thead>

        <tbody>
          {offers && offers.map((offer) => (
            <tr key={offer.sifra}>
                <td>{offer.naziv}</td>
                <td>{offer.opis}</td>
            <td className='desno'>
                <NumericFormat
                value={offer.cijena}
                displayType={'text'}
                thousandSeparator='.'
                decimalSeparator=','
                suffix=' €'
                prefix='='
                decimalScale={2}
                fixedDecimalScale
                />
               </td>
               <td style={{textAlign: 'center'}}>
                    <GrValidate
                     size={25}
                     color={offer.aktivan ? 'green' : 'red'}
                     />
               </td>
               <td>
                   <Button onClick={()=>{navigate(`/offers/${offer.sifra}`)}}>
                       Promijeni
                   </Button>
                </td>
            </tr>
                              ))}
          </tbody>
      </Table>
      </>
   )
}