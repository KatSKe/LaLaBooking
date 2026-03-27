import { offers } from "./OffersPodaci";

async function get() {
  return { data: [...offers] };
}

async function getBySifra(sifra) {
  return { data: offers.find(d => d.sifra === parseInt(sifra)) };
}

async function dodaj(offer) {
  if (offers.length === 0) {
    offer.sifra = 1;
  } else {
    offer.sifra = offers[offers.length - 1].sifra + 1;
  }

  offers.push(offer);
}

async function promjeni(sifra, offer) {
  const index = nadiIndex(sifra);
  offers[index] = { ...offers[index], ...offer };
}

function nadiIndex(sifra) {
  return offers.findIndex(d => d.sifra === parseInt(sifra));
}

async function obrisi(sifra) {
  const index = nadiIndex(sifra);
  offers.splice(index, 1);
}

export default {
  get,
  getBySifra,
  dodaj,
  promjeni,
  obrisi
};