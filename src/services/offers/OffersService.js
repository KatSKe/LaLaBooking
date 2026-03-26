import { destinacije } from "./OffersPodaci";


// 1/4 READ
async function get(){
    return { data: [...offer] };
}

async function getBySifra(sifra) {
    return {data: offer.find(d => d.sifra === parseInt(sifra))}
}

// 2/4 CREATE
async function dodaj(offer){
    if(offer.length===0){
        offer.sifra=1;
    }else{
        offer.sifra = offer[offer.length - 1].sifra + 1;
    }

    offer.push(offer);
}

// 3/4 UPDATE

async function promjeni(sifra, offer){
    const index = nadiIndex(sifra);
    offer[index] = { ...offer[index], ...offer };
}

function nadiIndex(sifra){
    return offer.findIndex(d => d.sifra === parseInt(sifra));
}

export default {
    get,
    getBySifra,
    dodaj,
    promjeni
}