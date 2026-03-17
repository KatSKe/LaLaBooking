import { useEffect, useState } from "react"
import OffersService from "../../services/offers/OffersService"

export default function KategorijaPregled() {

    const [destinacije, setDestinacije] = useState([])

    useEffect(() => {
        ucitajDestinacije()
    }, [])

    async function ucitajDestinacije() {
        const odgovor = await OffersService.get()
        setDestinacije(odgovor.data)
    }

    return (
        <>
            <h3>Kategorije</h3>
            <ol>
                {destinacije && destinacije.map((d) => (
                    <li key={d.sifra}>{d.naziv}</li>
                ))}
            </ol>
        </>
    )
}