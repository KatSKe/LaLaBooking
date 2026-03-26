import { useEffect, useState } from "react";
import OffersService from "../../services/offers/OffersService";
import { Button, Table } from "react-bootstrap";
import { GrValidate } from "react-icons/gr";
import FormatDatuma from "../../components/FormatDatuma";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

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
            <th>Datum pokretanja</th>
            <th>Aktivan</th>
            <th>Akcija</th>
          </tr>
        </thead>

        <tbody>
          {offers && offers.map((offer) => (
            <tr key={offer.sifra}>
                <td>{offer.naziv}</td>
            <td className='text-end'>{smjer.trajanje} h</td>
            <td className='desno'>
                <NumericFormat
                value={smjer.cijena}
                displayType={'text'}
                thousandSeparator='.'
                decimalSeparator=','
                suffix=' €'
                prefix='='
                decimalScale={2}
                fixedDecimalScale
                />
               </td>
               <td>
                   <FormatDatuma datum={smjer.datumPokretanja} />
               </td>
               <td style={{textAlign: 'center'}}>
                    <GrValidate
                     size={25}
                     color={smjer.aktivan ? 'green' : 'red'}
                     />
               </td>
               <td>
                   <Button onClick={()=>{navigate(`/smjerovi/${smjer.sifra}`)}}>
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