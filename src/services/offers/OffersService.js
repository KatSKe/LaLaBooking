import { offers } from "./OffersPodaci";


// 1/4 READ
async function get(){
    return { data: [...offers] };
}

async function getBySifra(sifra) {
    return {data: offers.find(d => d.sifra === parseInt(sifra))}
}

// 2/4 CREATE
async function dodaj(offer){
    if(offers.length===0){
        offer.sifra=1;
    }else{
        offer.sifra = offers[offers.length - 1].sifra + 1;
    }

    offers.push(offer);
}

// 3/4 UPDATE

async function promjeni(sifra, offer){
    const index = nadiIndex(sifra);
    offers[index] = { ...offers[index], ...offer };
}

function nadiIndex(sifra){
    return offers.findIndex(d => d.sifra === parseInt(sifra));
}

export default {
    get,
    getBySifra,
    dodaj,
    promjeni
}