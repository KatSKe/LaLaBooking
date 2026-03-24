import { destinacije } from "./OffersPodaci";

async function get() {
  return { data: destinacije };
}

async function dodaj(offer) {
  if (destinacije.length === 0) {
    offer.sifra = 1;
  } else {
    offer.sifra = destinacije[destinacije.length - 1].sifra + 1;
  }

  destinacije.push(offer);
}

export default {
  get,
  dodaj
};